package com.tech.petfriends.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

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

	@Value("${coolApi.key}")
	private String coolApiKey;

	public String getCoolApikey() {

		return coolApiKey;
	}

	@Value("${coolSecret.key}")
	private String coolSecretKey;

	public String getCoolSecretkey() {

		return coolSecretKey;
	}
	
	@Value("${portOne.key}")
    private String portOneKey;
    
    public String getPortOnekey() {
        
        return portOneKey;
    }

    @Value("${portOneChannel.key}")
    private String portOneChannel;
    
    public String getPortOneChannel() {
        
        return portOneChannel;
    }
}
