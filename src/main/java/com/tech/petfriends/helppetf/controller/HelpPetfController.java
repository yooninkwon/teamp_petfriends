package com.tech.petfriends.helppetf.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.petfriends.configuration.ApikeyConfig;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;
import com.tech.petfriends.helppetf.service.AdoptionViewService;
import com.tech.petfriends.helppetf.service.FindFacilitiesService;
import com.tech.petfriends.helppetf.service.FindHospitalService;
import com.tech.petfriends.helppetf.service.HelppetfServiceInter;
import com.tech.petfriends.helppetf.service.PetteacherDetailService;
import com.tech.petfriends.helppetf.service.PetteacherService;


@Controller
@RequestMapping("/helppetf")
public class HelpPetfController {
	
	@Autowired
	ApikeyConfig apikeyConfig;
	
	@Autowired
	HelpPetfDao helpDao;
	
	HelppetfServiceInter helpServiceInterface;
	
	@GetMapping("/adoption/adoption_main") // 입양 센터 메인
	public String adoptionMain() {
		return "/helppetf/adoption/adoption_main";
	}
	
	@GetMapping("/adoption/adoption_detail") // 입양 센터 상세페이지
	public String adoptionContentSend(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		helpServiceInterface = new AdoptionViewService();
		helpServiceInterface.execute(model); // <- 리다이렉트 이후 데이터 처리
		return "/helppetf/adoption/adoption_detail"; // <- view단 jsp 매핑 호출
	}
		
	@GetMapping("/petteacher/petteacher_main") // 펫티쳐 메인
	public String petteacherList() {
		return "/helppetf/petteacher/petteacher_main";
	}

	@GetMapping("/petteacher/petteacher_detail") // 펫티쳐 상세 페이지
	public String petteacherDetails(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		
		helpServiceInterface = new PetteacherDetailService(helpDao);
		helpServiceInterface.execute(model);

		return "/helppetf/petteacher/petteacher_detail";
	}

	@GetMapping("/find/pet_hospital") // 주변 동물병원 찾기 페이지
	public String find_hospital(Model model) {
		model.addAttribute("apiKey", apikeyConfig.getKakaoApikey());
		helpServiceInterface = new FindHospitalService(helpDao);
		helpServiceInterface.execute(model);
		
		return "/helppetf/find/pet_hospital";
	}

	@GetMapping("/find/pet_facilities") // 주변 반려동물 시설 찾기 페이지
	public String pet_facilities(Model model) {
		model.addAttribute("apiKey", apikeyConfig.getKakaoApikey());
		helpServiceInterface = new FindFacilitiesService(helpDao);
		helpServiceInterface.execute(model);
		
		return "/helppetf/find/pet_facilities";
	}
}
