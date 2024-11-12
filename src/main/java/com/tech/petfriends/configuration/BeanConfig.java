package com.tech.petfriends.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.tech.petfriends.helppetf.dto.PethotelInfoDto;
import com.tech.petfriends.helppetf.dto.PethotelIntroDto;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@Configuration
public class BeanConfig {

    @Bean
    PethotelInfoDto pethotelInfoDto() {
		return new PethotelInfoDto();
	}

    @Bean
    PethotelIntroDto pethotelIntroDto() {
		return new PethotelIntroDto();
	}

    @Bean
    PetteacherDto petteacherDto() {
		return new PetteacherDto();
	}
	
}
