package com.tech.petfriends.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:com/properties/application-API-KEY.properties")
public class ApikeyConfig {
	
	@Value("${api.key}")
	private String apiKey;
	
	public String getApikey() {
		
		return apiKey;
	}
	
}
