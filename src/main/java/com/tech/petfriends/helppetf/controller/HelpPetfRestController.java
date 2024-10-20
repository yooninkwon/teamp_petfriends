package com.tech.petfriends.helppetf.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.helppetf.dto.AdoptionSelectedAnimalDto;
import com.tech.petfriends.helppetf.service.AdoptionGetJson;
import com.tech.petfriends.helppetf.vo.HelpPetfAdoptionItemsVo;

import reactor.core.publisher.Mono;


@RestController
@RequestMapping("/helppetf")
public class HelpPetfRestController {

	private final AdoptionGetJson adoptionService;

    public HelpPetfRestController(AdoptionGetJson adoptionService) {
        this.adoptionService = adoptionService;
    }
    
	@GetMapping("/adoption/getJson")
	public Mono<ResponseEntity<HelpPetfAdoptionItemsVo>> adoptionGetJson(HttpServletRequest request, Model model) throws Exception {
		model.addAttribute("request", request);
		return adoptionService.fetchAdoptionDataMain(model);
	}
	
	@GetMapping("/adoption/getFilterJson")
	public Mono<ResponseEntity<HelpPetfAdoptionItemsVo>> adoptionGetFilterJson(HttpServletRequest request, Model model) throws Exception {
		model.addAttribute("request", request);
		return adoptionService.fetchAdoptionDataFilter(model);
	}

	@PostMapping("/adoption/adoption_data")
	public String adoptionData(@RequestBody AdoptionSelectedAnimalDto adoptionSelectedDto, HttpServletRequest request) {
		// adoption_main에서 호출한 함수로 인해 작동
		// JSON 데이터를 AdoptionSelectedAnimalDto 객체로 받아옴
		// @RequestBody 어노테이션을 사용하면 JSON 데이터를 자동으로 클래스 객체로 변환해준다.
		HttpSession session = request.getSession();
		session.setAttribute("selectedAnimal", adoptionSelectedDto); // session에 AdoptionSelectedAnimalDto 등록
		// redirect는 jsp의 스크립트에서 하기 때문에 반복하지 않음
		return "{\"status\": \"success\"}"; // 성공 메세지를 반환
	}
}
