package com.tech.petfriends.index.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.tech.petfriends.index.mapper.IndexDao;
import com.tech.petfriends.index.service.IndexProductService;
import com.tech.petfriends.index.service.IndexService;

@Controller
public class MainController {
	
	@Autowired
	IndexDao indexDao;
	
	IndexService indexService;
	
	
	@GetMapping("/")
	public String index(Model model) {
		
		//제품 best10 가져오기
		indexService = new IndexProductService(indexDao);
		indexService.execute(model);
		
		return "index";
	}
		
}
