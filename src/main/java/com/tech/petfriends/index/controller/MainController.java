package com.tech.petfriends.index.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.tech.petfriends.index.mapper.IndexDao;
import com.tech.petfriends.index.service.IndexProductService;
import com.tech.petfriends.index.service.IndexService;
import com.tech.petfriends.notice.dao.NoticeDao;
import com.tech.petfriends.notice.dto.EventDto;
import com.tech.petfriends.notice.dto.NoticeDto;

@Controller
public class MainController {
	
	@Autowired
	IndexDao indexDao;
	
	@Autowired
	NoticeDao noticeDao;
	
	IndexService indexService;
	
	
	@GetMapping("/")
	public String index(Model model) {
		//제품 best10 가져오기
		indexService = new IndexProductService(indexDao);
		indexService.execute(model);
		ArrayList<EventDto> event = noticeDao.eventList();
		model.addAttribute("event",event);
		NoticeDto notice = noticeDao.newNotice();
		model.addAttribute("notice",notice);
		return "index";
	}
		
}
