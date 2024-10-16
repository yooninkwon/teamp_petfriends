package com.tech.petfriends.community.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CommunityController {

	//커뮤니티 페이지로 이동
	@RequestMapping("/community_main")
	public String community_main(HttpServletRequest request, Model model) {
		System.out.println("community_main() ctr");

		return "/community/community_main";
	}
	
	
}
