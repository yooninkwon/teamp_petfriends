package com.tech.petfriends.helppetf.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.petfriends.configuration.ApikeyConfig;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;
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
		model.addAttribute("apiKey", apikeyConfig.getApikey());
		helpServiceInterface = new FindHospitalService(helpDao);
		helpServiceInterface.execute(model);
		
		return "/helppetf/find/pet_hospital";
	}

	@GetMapping("/find/pet_facilities")
	public String pet_facilities(Model model) {
		model.addAttribute("apiKey", apikeyConfig.getApikey());
		helpServiceInterface = new FindFacilitiesService(helpDao);
		helpServiceInterface.execute(model);
		
		return "/helppetf/find/pet_facilities";
	}
}
