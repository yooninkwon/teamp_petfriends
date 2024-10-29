package com.tech.petfriends.notice.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/notice")
public class NoticeController {

	@GetMapping("/noticePage")
	public String NoticePage(HttpServletRequest request, Model model) {
		model.addAttribute("main_navbar_id","noticeMain");
		model.addAttribute("sub_navbar_id","notice_notice");
		return "/notice/noticePage";
	}
	
	@GetMapping("/eventPage")
	public String EventPage(HttpServletRequest request, Model model) {
		model.addAttribute("main_navbar_id","noticeMain");
		model.addAttribute("sub_navbar_id","notice_event");
		return "/notice/eventPage";
	}
	
	@GetMapping("/endEventPage")
	public String EndEventPage(HttpServletRequest request, Model model) {
		model.addAttribute("main_navbar_id","noticeMain");
		model.addAttribute("sub_navbar_id","notice_endEvent");
		return "/notice/endEventPage";
	}
}
