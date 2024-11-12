package com.tech.petfriends.helppetf.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tech.petfriends.configuration.ApikeyConfig;
import com.tech.petfriends.helppetf.dto.PethotelFormDataDto;
import com.tech.petfriends.helppetf.dto.PetteacherDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;
import com.tech.petfriends.helppetf.service.AdoptionGetJson;
import com.tech.petfriends.helppetf.service.FindAddrTMapService;
import com.tech.petfriends.helppetf.service.HelppetfExecuteModel;
import com.tech.petfriends.helppetf.service.HelppetfExecuteModelRequest;
import com.tech.petfriends.helppetf.service.HelppetfExecuteModelSession;
import com.tech.petfriends.helppetf.service.PethotelMainService;
import com.tech.petfriends.helppetf.service.PethotelReserveService;
import com.tech.petfriends.helppetf.service.PethotelSelectPetService;
import com.tech.petfriends.helppetf.service.PetteacherDetailService;
import com.tech.petfriends.helppetf.service.PetteacherService;
import com.tech.petfriends.helppetf.vo.HelpPetfAdoptionItemsVo;
import com.tech.petfriends.mypage.dto.MyPetDto;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/helppetf")
public class HelpPetfRestController {
	
	@Autowired
	ApikeyConfig apikeyConfig;
	
	private final AdoptionGetJson adoptionGetJson;

	public HelpPetfRestController(AdoptionGetJson adoptionGetJson) {
		this.adoptionGetJson = adoptionGetJson;
	}

	@Autowired
	HelpPetfDao helpDao;

	HelppetfExecuteModel helppetfM;
	
	HelppetfExecuteModelRequest helppetfMR;

	HelppetfExecuteModelSession helppetfMS;

	@SuppressWarnings("unchecked")
	@GetMapping("/pethotel/pethotel_select_pet")
	public ArrayList<MyPetDto> pethotelSelectPet(Model model, HttpSession session) {
		helppetfMS = new PethotelSelectPetService(helpDao);
		helppetfMS.execute(session, model);
		return (ArrayList<MyPetDto>) model.getAttribute("petDto");
	}

	@PostMapping("/pethotel/pethotel_reserve_data")
	public String pethotelReserveData(@RequestBody ArrayList<PethotelFormDataDto> formList, HttpServletRequest request,
			Model model, HttpSession session) {
		
		helppetfMR = new PethotelReserveService(helpDao, session, formList);
		helppetfMR.execute(request, model); 
		
		return (String) model.getAttribute("jsonData"); // execute 메서드를 실행하여 모델에 저장한 json 형식의 데이터 반환
	}
	
	@GetMapping("/pethotel/pethotel_post_data")
	public String pethotelPostData(Model model) {
		helppetfM = new PethotelMainService(helpDao);
		helppetfM.execute(model);
				
		return (String) model.getAttribute("json");
	}
	
	@GetMapping("/adoption/getJson")
	public Mono<ResponseEntity<HelpPetfAdoptionItemsVo>> adoptionGetJson(HttpServletRequest request, Model model)
			throws Exception {
		return adoptionGetJson.fetchAdoptionData(model, request);
	}

	@SuppressWarnings("unchecked")
	@GetMapping("/petteacher/petteacher_data")
	public ArrayList<PetteacherDto> petteacherData(HttpServletRequest request, Model model) {
		helppetfMR = new PetteacherService(helpDao);
		helppetfMR.execute(request, model);
		return (ArrayList<PetteacherDto>) model.getAttribute("ylist");
	}
	
	@GetMapping("/petteacher/petteacher_detail_data")
	public PetteacherDto petteacherDetailData(HttpServletRequest request, Model model) {
		helppetfMR = new PetteacherDetailService(helpDao);
		helppetfMR.execute(request, model);
		return (PetteacherDto) model.getAttribute("petteacherDetailDto");
	}
	
	@GetMapping("/find/adress_data") // 주변 반려동물 시설 찾기 페이지
	public String pet_facilities(Model model, HttpSession session) throws JsonProcessingException {
		helppetfMS = new FindAddrTMapService(helpDao);
		helppetfMS.execute(session, model);
		return "";
	}
}
