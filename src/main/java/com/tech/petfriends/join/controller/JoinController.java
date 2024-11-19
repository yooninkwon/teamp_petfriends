package com.tech.petfriends.join.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tech.petfriends.configuration.ApikeyConfig;
import com.tech.petfriends.join.service.JoinService;

@Controller
@RequestMapping("/join")
public class JoinController {
	
	@Autowired
	private JoinService joinService;
	
	@Autowired
	ApikeyConfig apikeyConfig;
	
	// 회원가입 페이지
	@GetMapping("/joinPage")
	public String JoinPage(Model model) {
		String kakaoApiKey = apikeyConfig.getKakaoApikey();
		model.addAttribute("kakaoApi",kakaoApiKey);
		return "/join/joinPage";
	}
	
	// 주소 팝업
	@GetMapping("/addressMap")
	public String AddrMap(Model model) {
		String kakaoApiKey = apikeyConfig.getKakaoApikey();
		model.addAttribute("kakaoApi",kakaoApiKey);
		return "/join/addressMap";
	}
	
	// 회원가입 서비스
	@PostMapping("/joinService")
	public String joinService(HttpServletRequest request, HttpSession session, Model model, 
			RedirectAttributes redirectAttributes) {
		String redirectUrl = joinService.processJoinService(request, session, redirectAttributes);
	    return redirectUrl;
	}
}
