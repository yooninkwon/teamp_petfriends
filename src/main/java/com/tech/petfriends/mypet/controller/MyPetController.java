package com.tech.petfriends.mypet.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.tech.petfriends.mypage.dto.MyPetDto;
import com.tech.petfriends.mypet.service.MyPetService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/mypet")
public class MyPetController {
	
	private final MyPetService myPetService;
	
	@GetMapping("/myPetRegistPage1")
	public String myPetRegistPage1() {	
		return "mypet/myPetRegistPage1";
	}
	
	@PostMapping("/myPetRegistPage2")
	public String myPetRegistPage2(HttpServletRequest request, Model model) {
	    Map<String, String> petData = myPetService.getPetRegistrationData(request);
	    model.addAttribute("petType", petData.get("petType"));
	    model.addAttribute("petName", petData.get("petName"));
	    return "mypet/myPetRegistPage2";
	}
	
	@PostMapping("/myPetRegistPage3")
	public String myPetRegistPage3(
	        HttpServletRequest request,
	        @RequestParam("petImg") MultipartFile petImgFile,
	        Model model) {
	    Map<String, Object> petData = myPetService.handlePetImageUpload(request, petImgFile);
	    model.addAllAttributes(petData);
	    if (petData.containsKey("error")) {return "파일 업로드 실패";}
	    return "mypet/myPetRegistPage3";
	}
	
	@PostMapping("/myPetRegistPage4")
	public String myPetRegistPage4(HttpServletRequest request, Model model) {
	    Map<String, Object> petDetails = myPetService.getPetDetails(request);
	    model.addAllAttributes(petDetails);
	    return "mypet/myPetRegistPage4";
	}
	
	@PostMapping("/myPetRegistPage5")
	public String myPetRegistPage5(HttpServletRequest request, Model model, HttpSession session) {
	    MyPetDto pet = myPetService.registerPet(request, session);
	    model.addAttribute("petType", pet.getPet_type());
	    model.addAttribute("petName", pet.getPet_name());
	    model.addAttribute("petImg", pet.getPet_img());
	    model.addAttribute("petDetailType", pet.getPet_breed());
	    model.addAttribute("petBirth", pet.getPet_birth().toString());
	    model.addAttribute("petGender", pet.getPet_gender());
	    model.addAttribute("petNeut", pet.getPet_neut());
	    model.addAttribute("petWeight", pet.getPet_weight());
	    model.addAttribute("petBodyType", pet.getPet_form());
	    model.addAttribute("petInterInfo", pet.getPet_care());
	    model.addAttribute("petAllergy", pet.getPet_allergy());
	    return "mypet/myPetRegistPage5";
	}
	
}
