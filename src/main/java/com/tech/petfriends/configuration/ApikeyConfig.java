package com.tech.petfriends.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;

@Configuration
@PropertySource("classpath:com/properties/application-API-KEY.properties")
public class ApikeyConfig {
	
	@Value("${kakaoApi.key}")
	private String kakaoApiKey;
	
	public String getKakaoApikey() {
		
		return kakaoApiKey;
	}
	
	@Value("${openDataApi.key}")
	private String openDataApiKey;
	
	public String getOpenDataApikey() {
		
		return openDataApiKey;
	}
	
    @Bean
    public DefaultUriBuilderFactory builderFactory(){
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory();
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);
        return factory;
    }

    @Bean
    public WebClient webClient(){
        return WebClient.builder()
                .uriBuilderFactory(builderFactory())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build();
    }
}
