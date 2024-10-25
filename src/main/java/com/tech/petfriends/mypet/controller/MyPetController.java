package com.tech.petfriends.mypet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypet")
public class MyPetController {
	
	@GetMapping("/myPetRegistPage1")
	public String myPetRegistPage1() {
		
		return "mypet/myPetRegistPage1";
	}
	
}
