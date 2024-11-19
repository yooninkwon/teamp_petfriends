package com.tech.petfriends.helppetf.service;

import java.time.Duration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.ValueInstantiationException;
import com.tech.petfriends.configuration.ApikeyConfig;
import com.tech.petfriends.helppetf.service.interfaces.HelppetfExecuteMono;
import com.tech.petfriends.helppetf.vo.HelpPetfAdoptionItemsVo;

import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

@Service
public class AdoptionGetJson implements HelppetfExecuteMono<HelpPetfAdoptionItemsVo>{
	
	// WebClient는 비동기적으로 HTTP 요청을 보내기 위해 사용되는 스프링 WebFlux의 클라이언트이다.
	private final ApikeyConfig apikeyConfig;
	private final WebClient webClient;
	private final ObjectMapper mapper;
	
	public AdoptionGetJson(ApikeyConfig apikeyConfig, WebClient webClient, ObjectMapper mapper) {
		this.apikeyConfig = apikeyConfig;
		this.webClient = webClient;
		this.mapper = mapper;
	}
	
	@Override
	public Mono<ResponseEntity<HelpPetfAdoptionItemsVo>> execute(HttpServletRequest request) {
		
		try {
			return fetchAdoptionData(request);
		} catch (Exception e) {
			e.printStackTrace();
			return Mono.error(new RuntimeException("Json 데이터를 불러오는 것에 실패하였습니다.", e));
		}
		
	}
	
    /**
     * 비동기적으로 JSON 데이터를 API로부터 받아온 후 HelpPetfAdoptionItemsVo 타입으로 변환하여 반환한다.
     * Mono는 단일 데이터 또는 빈 데이터를 발행하는 비동기 스트림을 의미하며, 비동기 HTTP 요청의 응답을 관리하는 데 사용한다.
     *
     * @param model 클라이언트 요청에서 전달된 데이터가 포함된 Model 객체
     * @return ResponseEntity<HelpPetfAdoptionItemsVo> JSON 응답을 포함한 ResponseEntity 객체
     * @throws Exception 예외 발생 시
     * 	빈 리스트를 가진 HelpPetfAdoptionItemsVo를 생성하고, 내부 서버 오류 상태를 반환
     */
	@Cacheable("adoptionData") // 캐싱 가능 어노테이션
	public Mono<ResponseEntity<HelpPetfAdoptionItemsVo>> fetchAdoptionData(HttpServletRequest request) throws Exception {
		/**
		 * 작동 : .get() : http get 요청 보냄 .retrieve() : 서버로부터 응답 받아옴 .onStatus() : 4xx, 5xx
		 * 오류일 시 예외 발생 .bodyToMono(String.class) : 응답 본문을 String으로 받음
		 * 
		 * 파싱 -> .map(json -> ... )} : parsingJsonObject() 메서드 호출
		 */		
		return webClient.get().uri(buildUrl(request))
				.retrieve()
				.onStatus(HttpStatus::is4xxClientError, clientResponse -> Mono.error(new Exception("Client Error")))
				.onStatus(HttpStatus::is5xxServerError, clientResponse -> Mono.error(new Exception("Server Error")))
				.bodyToMono(String.class) // JSON 데이터를 문자열로 받음
				.retryWhen(Retry.backoff(3, Duration.ofSeconds(5)))
				.map(json -> {
					HelpPetfAdoptionItemsVo adoptionItems;
					try { // try: json 파싱
						adoptionItems = parsingJsonObject(json, HelpPetfAdoptionItemsVo.class);
						return new ResponseEntity<>(adoptionItems, HttpStatus.OK);
					} catch (Exception e) {
						e.printStackTrace();
						return new ResponseEntity<>(new HelpPetfAdoptionItemsVo(List.of()),
								HttpStatus.INTERNAL_SERVER_ERROR);
					}
				}).onErrorReturn(
						new ResponseEntity<>(new HelpPetfAdoptionItemsVo(List.of()), HttpStatus.INTERNAL_SERVER_ERROR));
	}
	
	// 요청 URL 생성 메서드
	private String buildUrl(HttpServletRequest request) {
		// api 요청주소 End point
		String baseUrl = "https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";

		// api serviceKey
		String apikey = "?serviceKey=" + apikeyConfig.getOpenDataApikey();
		String pageNo = "&pageNo=" + request.getParameter("pageNo");

		// parameter 값
		String upr_cd = setValueOfParam(request, "upr_cd");
		String org_cd = setValueOfParam(request, "org_cd");
		String upKind = setValueOfParam(request, "upKind");

		String numOfRows = "&numOfRows=" + "80";
		String _type = "&_type=" + "json";
		String extraParam = pageNo + numOfRows + _type;
		String addParameters = apikey + upr_cd + org_cd + upKind + extraParam;
		
		return baseUrl + addParameters;
	}

    /**
     * 주어진 파라미터 이름에 대해 "any" 값이 아닌 경우 파라미터를 쿼리스트링 형식으로 반환한다.
     * 
     * @param request 요청의 HttpServletRequest 객체
     * @param paramName 조회할 파라미터 이름
     * @return "&paramName=paramValue" 형식의 문자열 또는 빈 문자열
     */
	private String setValueOfParam(HttpServletRequest request, String paramName) {
		String paramValue = request.getParameter(paramName);
		return (paramValue != null && !paramValue.equals("any")) ? "&" + paramName + "=" + paramValue : "";
	}

	
	/**
	 * JSON 문자열을 주어진 클래스 타입의 객체로 변환
	 * 
	 * 이 메서드는 제네릭을 사용하여 다양한 타입의 객체로 변환할 수 있다. 
	 * <T>는 제네릭 타입 파라미터를 의미하며, 메서드가 반환하는 타입을 지정함. 
	 * 
	 * => 이 메서드는 호출 시점에 전달된 valueType 클래스에 맞춰서 JSON 문자열을 해당 객체로 변환 반환형은 T로,
	 * 호출할 때 전달한 클래스 타입에 따라 달라짐
	 * 
	 * 메서드 매개변수: 
	 * 		String json - 변환하려는 JSON 문자열 
	 * 		Class<T> valueType - JSON 데이터를 변환할 객체의 타입을 나타내는 클래스 
	 * 			-> EX) HelpPetAdoptionItemsVo.class 처럼 특정 클래스의 타입을 전달
	 * 
	 * @param json 변환할 JSON 문자열
     * @param valueType 변환할 클래스 타입
     * @return 변환된 객체
     * @throws Exception JSON 파싱 및 매핑 오류 발생 시
	 */
	<T> T parsingJsonObject(String json, Class<T> valueType) throws Exception {
		// 예시) HelpPetfAdoptionItemsVo에 json value의 Object 형식을 매핑해 return
		try {
			// ObjectMapper mapper: ObjectMapper는 Jackson 라이브러리의 클래스이다. 자동으로 Bean으로 등록된다.
			// JSON 데이터를 Java 객체로 변환하거나 그 반대로 변환하는 데 사용함. 
			// 여기서 사용된 mapper.readValue(json, valueType)는 JSON 문자열을 지정된 클래스
			// 타입으로 변환하는 역할을 함.
			T result = mapper.readValue(json, valueType);
			return result;
		} catch (ValueInstantiationException e) {
			throw new Exception("Failed to instantiate the class: " + valueType.getName(), e);
		} catch (JsonParseException e) {
			throw new Exception("JSON parse error: " + e.getMessage(), e);
		} catch (JsonMappingException e) {
			throw new Exception("JSON mapping error: " + e.getMessage(), e);
		} catch (Exception e) {
			throw new Exception("General error while parsing JSON: " + e.getMessage(), e);
		}

	}



}
