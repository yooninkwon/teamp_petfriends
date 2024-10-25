package com.tech.petfriends.mypet.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypet")
public class MyPetController {
	
	@GetMapping("/myPetRegistPage1")
	public String myPetRegistPage1() {
		System.out.println("펫등록 페이지1");
		
		return "mypet/myPetRegistPage1";
	}
	
	@PostMapping("/myPetRegistPage2")
	public String myPetRegistPage2(HttpServletRequest request, Model model) {	
		System.out.println("펫등록 페이지2");
		String petType = request.getParameter("petType");
		String petName = request.getParameter("petName");
		
		System.out.println(petType);
		System.out.println(petName);
		
		model.addAttribute("petType",petType);
		model.addAttribute("petName",petName);
		
		return "mypet/myPetRegistPage2";
	}
	
}
