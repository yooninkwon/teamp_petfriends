package com.tech.petfriends.helppetf.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.helppetf.service.AdoptionService;
import com.tech.petfriends.helppetf.vo.HelpPetfAdoptionItemsVo;

import reactor.core.publisher.Mono;


@RestController
public class HelpPetfAdoption {

	private final AdoptionService adoptionService;

    public HelpPetfAdoption(AdoptionService adoptionService) {
        this.adoptionService = adoptionService;
    }
    
	@GetMapping("/helppetf/adoption/getJson")
	public Mono<ResponseEntity<HelpPetfAdoptionItemsVo>> adoptionGetJson() throws Exception {

		return adoptionService.fetchAdoptionData();
	}
	
}
