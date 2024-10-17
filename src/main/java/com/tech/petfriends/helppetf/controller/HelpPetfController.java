package com.tech.petfriends.helppetf.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tech.petfriends.configuration.ApikeyConfig;
import com.tech.petfriends.helppetf.dto.AdoptionSelectedAnimalDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;
import com.tech.petfriends.helppetf.service.AdoptionService;
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
	
	@GetMapping("/adoption/adoption_main")
	public String adoptionMain(HttpServletRequest request, Model model) {
		return "/helppetf/adoption/adoption_main";
	}
	
	@PostMapping("/adoption/adoption_data")
	public void adoptionData(@RequestBody AdoptionSelectedAnimalDto adoptionSelectedDto, HttpServletRequest request, Model model) {
		// JSON 데이터를 Animal 객체로 받아옴
		// @RequestBody 어노테이션을 사용하면 JSON 데이터를 자동으로 클래스 객체로 변환해준다.
		HttpSession session = request.getSession();
		session.setAttribute("selectedAnimal", adoptionSelectedDto);
		// redirect는 jsp의 스크립트에서 하기 때문에 반복하지 않음
	}
	
	@GetMapping("/adoption/adoption_content_view")
	public String adoptionContentSend(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		helpServiceInterface = new AdoptionService();
		helpServiceInterface.execute(model); // <- 리다이렉트 이후 데이터 처리
		return "/helppetf/adoption/adoption_content_view"; // <- view단 jsp 매핑 호출
	}
		
	@GetMapping("/petteacher/petteacher_main")
	public String petteacherList(Model model) {
		helpServiceInterface = new PetteacherService(helpDao);
		helpServiceInterface.execute(model);
		
		return "/helppetf/petteacher/petteacher_main";
	}

	@GetMapping("/petteacher/petteacher_detail")
	public String petteacherDetails(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		
		helpServiceInterface = new PetteacherDetailService(helpDao);
		helpServiceInterface.execute(model);

		return "/helppetf/petteacher/petteacher_detail";
	}

	@GetMapping("/find/pet_hospital")
	public String find_hospital(Model model) {
		model.addAttribute("apiKey", apikeyConfig.getKakaoApikey());
		helpServiceInterface = new FindHospitalService(helpDao);
		helpServiceInterface.execute(model);
		
		return "/helppetf/find/pet_hospital";
	}

	@GetMapping("/find/pet_facilities")
	public String pet_facilities(Model model) {
		model.addAttribute("apiKey", apikeyConfig.getKakaoApikey());
		helpServiceInterface = new FindFacilitiesService(helpDao);
		helpServiceInterface.execute(model);
		
		return "/helppetf/find/pet_facilities";
	}
}
