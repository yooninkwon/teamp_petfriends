package com.tech.petfriends.helppetf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import com.tech.petfriends.configuration.ApikeyConfig;
import com.tech.petfriends.helppetf.service.AdoptionService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/helppetf")
public class HelpPetfAdoption {
	// api키 주입
	@Autowired
	ApikeyConfig apikeyConfig;
	
	private final AdoptionService adoptionService;
	private final WebClient webClient;

    public HelpPetfAdoption(AdoptionService adoptionService
    		, final WebClient webClient) {
        this.adoptionService = adoptionService;
        this.webClient = webClient;
    }
    
	@GetMapping("/adoptionaaa")
	public Mono<ResponseEntity<String>> adoptionGetJson() throws Exception {

		return adoptionService.fetchAdoptionData();
	}
}
