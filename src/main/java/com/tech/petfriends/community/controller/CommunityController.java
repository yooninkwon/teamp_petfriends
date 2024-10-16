package com.tech.petfriends.community.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.petfriends.community.dto.CDto;

@Controller
@RequestMapping("/community")
public class CommunityController {

	//커뮤니티 페이지로 이동
	@RequestMapping("/main")
	public String communityMain(HttpServletRequest request, Model model) {
		System.out.println("community_main() ctr");

	    List<CDto> postList = iDao.getPostList(); 
	    model.addAttribute("postList", postList);
	    
		
		return "/community/main";
	}
	
	@RequestMapping("/write")
	public String communityWrite(Model model) {
		System.out.println("community_write");

		return "/community/write";

	}
}
