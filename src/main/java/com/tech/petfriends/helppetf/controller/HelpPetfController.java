package com.tech.petfriends.helppetf.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.petfriends.configuration.ApikeyConfig;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;
import com.tech.petfriends.helppetf.service.HelppetfExecuteModel;


@Controller
@RequestMapping("/helppetf")
public class HelpPetfController {
	
	@Autowired
	ApikeyConfig apikeyConfig;
	
	@Autowired
	HelpPetfDao helpDao;
	
	HelppetfExecuteModel helpServiceInterface;

	@GetMapping("/pethotel/pethotel_main") // 펫호텔 메인
	public String pethotelMain(Model model) {
		model.addAttribute("main_navbar_id", "helppetf");
		model.addAttribute("sub_navbar_id", "pethotel");
		return "/helppetf/pethotel/pethotel_main";
	}

	@GetMapping("/adoption/adoption_main") // 입양 센터 메인 페이지
	public String adoptionMain(Model model) {
		model.addAttribute("main_navbar_id", "helppetf");
		model.addAttribute("sub_navbar_id", "adoption");
		model.addAttribute("apiKey", apikeyConfig.getKakaoApikey());
		return "/helppetf/adoption/adoption_main";
	}
	
	@GetMapping("/petteacher/petteacher_main") // 펫티쳐 메인 페이지
	public String petteacherList(Model model) {
		model.addAttribute("main_navbar_id", "helppetf");
		model.addAttribute("sub_navbar_id", "petteacher");
		return "/helppetf/petteacher/petteacher_main";
	}

	@GetMapping("/find/pet_hospital") // 주변 동물병원 찾기 페이지
	public String find_hospital(Model model, HttpSession session) {
		model.addAttribute("main_navbar_id", "helppetf");
		model.addAttribute("sub_navbar_id", "pet_hospital");
		model.addAttribute("apiKey", apikeyConfig.getKakaoApikey());

		return "/helppetf/find/pet_hospital";
	}

	@GetMapping("/find/pet_facilities") // 주변 반려동물 시설 찾기 페이지
	public String pet_facilities(Model model, HttpSession session) {
		model.addAttribute("main_navbar_id", "helppetf");
		model.addAttribute("sub_navbar_id", "pet_facilities");
		model.addAttribute("apiKey", apikeyConfig.getKakaoApikey());
		
		return "/helppetf/find/pet_facilities";
	}
}
