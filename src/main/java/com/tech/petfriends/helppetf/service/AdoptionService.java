package com.tech.petfriends.helppetf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.ValueInstantiationException;
import com.tech.petfriends.configuration.ApikeyConfig;

import reactor.core.publisher.Mono;
// 서비스 코드 작성
// HelpPetfAdoptionItemsVo에 json value의 Object 형식을 매핑해 return
@Service
public class AdoptionService {
    
	private final WebClient webClient;

	@Autowired
	ApikeyConfig apikeyConfig;
	
	public AdoptionService(final WebClient webClient) {
		this.webClient = webClient;
	}
	
	public Mono<ResponseEntity<String>> fetchAdoptionData() throws Exception {

		String apikey = apikeyConfig.getOpenDataApikey();

		String baseUrl = "https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";
		String addParameter = "&pageNo=1&numOfRows=10&_type=json";
		
		return webClient.get().uri(baseUrl + "?serviceKey=" + apikey + addParameter).retrieve()
				.onStatus(HttpStatus::is4xxClientError, clientResponse -> Mono.error(new Exception("Client Error")))
                .onStatus(HttpStatus::is5xxServerError, clientResponse -> Mono.error(new Exception("Server Error")))
				.bodyToMono(String.class)
				.map(response -> new ResponseEntity<>(response, HttpStatus.OK))
                .onErrorReturn(new ResponseEntity<>("Error occurred while fetching data", HttpStatus.INTERNAL_SERVER_ERROR));
		
	}
	
	<T> T parsingJsonObject(String json, Class<T> valueType) throws Exception {

        try {
            ObjectMapper mapper = new ObjectMapper();
            T result = mapper.readValue(json, valueType);

            return result;
        } catch (ValueInstantiationException e) {
            throw new Exception();
        } catch(Exception e) {
            throw new Exception();
        }
    
	}
}
