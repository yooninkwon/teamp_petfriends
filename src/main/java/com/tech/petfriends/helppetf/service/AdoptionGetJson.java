package com.tech.petfriends.helppetf.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.ValueInstantiationException;
import com.tech.petfriends.configuration.ApikeyConfig;
import com.tech.petfriends.helppetf.vo.HelpPetfAdoptionItemsVo;

import reactor.core.publisher.Mono;

@Service
public class AdoptionGetJson {
    
	// WebClient는 비동기적으로 HTTP 요청을 보내기 위해 사용되는 스프링 WebFlux의 클라이언트이다.
	private final WebClient webClient;

	@Autowired // api key 주입
	ApikeyConfig apikeyConfig;
	
	public AdoptionGetJson(final WebClient webClient) {
		this.webClient = webClient;
	}
	
	/**
	 * 이 메서드는 API로부터 데이터를 비동기적으로 가져옴
	 * 
	 * @return ResponseEntity<HelpPetfAdoptionItemsVo> JSON 응답을 포함한 ResponseEntity
	 * @throws Exception 예외 발생 시
	 */
	public Mono<ResponseEntity<HelpPetfAdoptionItemsVo>> fetchAdoptionDataMain(Model model) throws Exception {
		
		Map<String, Object> map = model.asMap();
		HttpServletRequest request = (HttpServletRequest) map.get("request");
		
//		request.getParameter("pageNo");
		System.out.println(request.getParameter("pageNo"));
		// api 요청주소 End point
		String baseUrl = "https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";
		
		// api serviceKey
		String apikey = "?serviceKey=" + apikeyConfig.getOpenDataApikey();
		String pageNo = "&pageNo=" + request.getParameter("pageNo");
		String numOfRows = "&numOfRows=" + "80";
		String _type = "&_type=" + "json";
		String extraParam = pageNo + numOfRows + _type;
		String addParameters = apikey + extraParam;	
		
		System.out.println(addParameters);
		/**
		 * 비동기적으로 JSON 데이터를 API로부터 받아옴
		 * Mono 객체를 리턴
		 * 리액티브 프로그래밍에서 비동기적으로 반환되는 하나의 데이터 스트림을 의미함
		 * 
		 * 설명:
		 * .get() : http get 요청 보냄
		 * .retrieve() : 서버로부터 응답 받아옴
		 * .onStatus() : 4xx, 5xx 오류일 시 예외 발생
		 * .bodyToMono(String.class) : 응답 본문을 String으로 받음
		 * 
		 * * 파싱 -> .map(json -> ... )}  
		 * 		: parsingJsonObject() 메서드 호출하여 json을 HelpPetfAdoptionItemsVo타입으로 변환
		 *  변환 성공 - ResponseEntity 객체를 생성하여 성공 상태(HttpStatus.OK)와 함께 반환
		 *  예외 발생시 - 빈 리스트를 가진 HelpPetfAdoptionItemsVo를 생성하고, 내부 서버 오류 상태로 반환
		 *  
		 *  .onErrorReturn(...) : 요청 중 에러가 발생할 경우, INTERNAL_SERVER_ERROR 상태와 함께 에러 메시지를 반환
		 */
		return webClient.get().uri(baseUrl + addParameters).retrieve()
				.onStatus(HttpStatus::is4xxClientError, clientResponse -> Mono.error(new Exception("Client Error")))
	            .onStatus(HttpStatus::is5xxServerError, clientResponse -> Mono.error(new Exception("Server Error")))
	            .bodyToMono(String.class)  // JSON 데이터를 문자열로 받음
	            .retry(3)
	            .map(json -> {
	            	HelpPetfAdoptionItemsVo adoptionItems;
					try { // try: json 파싱
						adoptionItems = parsingJsonObject(json, HelpPetfAdoptionItemsVo.class);
						return new ResponseEntity<>(adoptionItems, HttpStatus.OK);
					} catch (Exception e) {
						e.printStackTrace();
						return new ResponseEntity<>(new HelpPetfAdoptionItemsVo(List.of()), HttpStatus.INTERNAL_SERVER_ERROR);
					}
	            })
	            .onErrorReturn(new ResponseEntity<>(new HelpPetfAdoptionItemsVo(List.of()), HttpStatus.INTERNAL_SERVER_ERROR));
	}
	
	// 필터링시의 데이터
	public Mono<ResponseEntity<HelpPetfAdoptionItemsVo>> fetchAdoptionDataFilter(Model model) {
		Map<String, Object> map = model.asMap();
		HttpServletRequest request = (HttpServletRequest) map.get("request");
		/** 요청 변수
		* serviceKey = API key
		* upr_cd = 시도코드 (시도 조회 OPEN API 참조)
		* org_cd = 시군구코드 (시군구 조회 OPEN API 참조)
		* upkind = 축종코드 (요청파라미터 에서는 k가 소문자이지만, 변수이름은 upKind로 작성하였음) (개 : 417000, 고양이 : 422400, 기타 : 429900)
		* kind = 품종코드 (품종 조회 OPEN API 참조)
		*/
		// api 요청주소 End point
		String baseUrl = "https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";
		
		// api serviceKey
		String apikey = "?serviceKey=" + apikeyConfig.getOpenDataApikey();
		
		// parameter 값
		String upr_cd = setValueOfParam(request, "upr_cd");
		String org_cd = setValueOfParam(request, "org_cd");
		String upKind = setValueOfParam(request, "upKind");
		String kind = setValueOfParam(request, "kind");
		String extraParam = "&pageNo=1&numOfRows=80&_type=json";
		
		// 값이 다 있다면 addParameter는 "?serviceKey=APIKEY&upr_cd=00&org_cd=00&upKind=00&kind=00 와 같은 형식이다.
		String addParameters = apikey + upr_cd + org_cd + upKind + kind + extraParam;
		return webClient.get().uri(baseUrl + addParameters).retrieve()
				.onStatus(HttpStatus::is4xxClientError, clientResponse -> Mono.error(new Exception("Client Error")))
	            .onStatus(HttpStatus::is5xxServerError, clientResponse -> Mono.error(new Exception("Server Error")))
	            .bodyToMono(String.class)  // JSON 데이터를 문자열로 받음
	            .retry(3)
	            .map(json -> {
	            	HelpPetfAdoptionItemsVo adoptionItems;
					try { // try: json 파싱
						adoptionItems = parsingJsonObject(json, HelpPetfAdoptionItemsVo.class);
						return new ResponseEntity<>(adoptionItems, HttpStatus.OK);
					} catch (Exception e) {
						e.printStackTrace();
						return new ResponseEntity<>(new HelpPetfAdoptionItemsVo(List.of()), HttpStatus.INTERNAL_SERVER_ERROR);
					}
	            })
	            .onErrorReturn(new ResponseEntity<>(new HelpPetfAdoptionItemsVo(List.of()), HttpStatus.INTERNAL_SERVER_ERROR));
	}
	
	private String setValueOfParam(HttpServletRequest request, String paramName) {
		/** 
		 * "paramName"의 value가 "any"가 아니라면 get 메소드의 파라미터 형식으로 설정 - any라면 공백설정
		 * paramName, paramValue는 adoption_main.jsp에서 form 내부의 select 태그를 선택 후
		 * "검색" 버튼을 클릭했을 때 전달되는 파라미터이다.
		 */
	    String paramValue = request.getParameter(paramName);
	    return (paramValue != null && !paramValue.equals("any")) ? "&" + paramName + "=" + paramValue : "";
	}
	
	// 제너릭 메서드 선언: <T>
	/* 설명: 
	 * 
	 * 이 메서드는 제네릭을 사용하여 다양한 타입의 객체로 변환할 수 있다 
	 * <T>는 제네릭 타입 파라미터를 의미하며, 메서드가 반환하는 타입을 지정함.
	 * 		=> 이 메서드는 호출 시점에 전달된 valueType 클래스에 맞춰서 JSON 문자열을 해당 객체로 변환
	 * 반환형은 T로, 호출할 때 전달한 클래스 타입에 따라 달라짐
	 * 
	 * 메서드 매개변수:
	 * String json: 변환하려는 JSON 문자열
	 * Class<T> valueType: JSON 데이터를 변환할 객체의 타입을 나타내는 클래스
	 * EX) HelpPetAdoptionItemsVo.class처럼 특정 클래스의 타입을 전달
	 * 
	 * ObjectMapper:
	 * ObjectMapper는 Jackson 라이브러리의 클래스이다. JSON 데이터를 Java 객체로 변환하거나 그 반대로 변환하는 데 사용함.
	 * 여기서 사용된 mapper.readValue(json, valueType)는 JSON 문자열을 지정된 클래스 타입으로 변환하는 역할을 함.
	 * 
	 * 
	 */
	<T> T parsingJsonObject(String json, Class<T> valueType) throws Exception {
		// 예시) HelpPetfAdoptionItemsVo에 json value의 Object 형식을 매핑해 return
        try {
            ObjectMapper mapper = new ObjectMapper();
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
