package com.tech.petfriends.helppetf.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tech.petfriends.helppetf.dto.PethotelFormDataDto;
import com.tech.petfriends.helppetf.dto.PetteacherDto;
import com.tech.petfriends.helppetf.service.group.HelppetfServiceGroup;
import com.tech.petfriends.helppetf.vo.HelpPetfAdoptionItemsVo;
import com.tech.petfriends.mypage.dto.MyPetDto;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/helppetf")
public class HelpPetfRestController {
	
	final HelppetfServiceGroup serviceGroup;
	
	public HelpPetfRestController(HelppetfServiceGroup serviceGroup) {
		this.serviceGroup = serviceGroup;
	}
	
	@GetMapping("/pethotel/pethotel_select_pet")
	public ResponseEntity<ArrayList<MyPetDto>> pethotelSelectPet(Model model, HttpSession session) {
		return serviceGroup.executePethotelSelectPetService(model, session);
	}

	@PostMapping("/pethotel/pethotel_reserve_data")
	public ResponseEntity<String> pethotelReserveData(@RequestBody ArrayList<PethotelFormDataDto> formList, HttpServletRequest request,
			Model model, HttpSession session) {
		return serviceGroup.executePethotelReserveDataService(model, request, session, formList);
	}
	
	@GetMapping("/pethotel/pethotel_post_data")
	public ResponseEntity<String> pethotelPostData(Model model) {
		return serviceGroup.executePethotelMainService(model);
	}
	
	@GetMapping("/adoption/getJson")
	public Mono<ResponseEntity<HelpPetfAdoptionItemsVo>> adoptionGetJson(HttpServletRequest request, Model model)
			throws Exception {
		return serviceGroup.executeAdoptionGetJson(model, request);
	}

	@GetMapping("/petteacher/petteacher_data")
	public ResponseEntity<ArrayList<PetteacherDto>> petteacherData(HttpServletRequest request, Model model) {
		return serviceGroup.executePetteacherMainService(model, request);
	}
	
	@GetMapping("/petteacher/petteacher_detail_data")
	public ResponseEntity<PetteacherDto> petteacherDetailData(HttpServletRequest request, Model model) {
		return serviceGroup.executePetteacherDetailService(model, request);
	}
	
	@GetMapping("/find/adress_data") // 주변 반려동물 시설 찾기 페이지
	public ResponseEntity<String> pet_facilities(Model model, HttpSession session) throws JsonProcessingException {
		return serviceGroup.executeFindAddrMapService(model, session);
	}
}
