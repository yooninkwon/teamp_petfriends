package com.tech.petfriends.helppetf.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.petfriends.configuration.ApikeyConfig;


@Controller
@RequestMapping("/helppetf")
public class HelpPetfController {
	
	final ApikeyConfig apikeyConfig;
	
	public HelpPetfController(ApikeyConfig apikeyConfig) {
		this.apikeyConfig = apikeyConfig;
	}
	
	@GetMapping("/pethotel/pethotel_main") // 펫호텔 메인
	public String pethotelMain(Model model) {
		setNavBar(model, "pethotel");
		return "/helppetf/pethotel/pethotel_main";
	}

	@GetMapping("/adoption/adoption_main") // 입양 센터 메인 페이지
	public String adoptionMain(Model model) {
		setNavBar(model, "adoption");
		model.addAttribute("apiKey", apikeyConfig.getKakaoApikey());
		return "/helppetf/adoption/adoption_main";
	}
	
	@GetMapping("/petteacher/petteacher_main") // 펫티쳐 메인 페이지
	public String petteacherList(Model model) {
		setNavBar(model, "petteacher");
		return "/helppetf/petteacher/petteacher_main";
	}

	@GetMapping("/find/pet_hospital") // 주변 동물병원 찾기 페이지
	public String find_hospital(Model model, HttpSession session) {
		setNavBar(model, "pet_hospital");
		getKakaoApiKey(model);
		return "/helppetf/find/pet_hospital";
	}

	@GetMapping("/find/pet_facilities") // 주변 반려동물 시설 찾기 페이지
	public String pet_facilities(Model model, HttpSession session) {
		setNavBar(model, "pet_facilities");
		getKakaoApiKey(model);
		return "/helppetf/find/pet_facilities";
	}
	
	private void getKakaoApiKey(Model model) {
		model.addAttribute("apiKey", apikeyConfig.getKakaoApikey());
	}

	private void setNavBar(Model model, String pageName) {
		model.addAttribute("main_navbar_id", "helppetf");
		model.addAttribute("sub_navbar_id", pageName);
	}
}
