package com.tech.petfriends.notice.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.tech.petfriends.notice.dao.NoticeDao;
import com.tech.petfriends.notice.dto.EventDto;
import com.tech.petfriends.notice.dto.NoticeDto;

@Controller
@RequestMapping("/notice")
public class NoticeController {
	
	@Autowired
    private NoticeDao noticeDao;

	@GetMapping("/noticePage")
	public String NoticePage(HttpServletRequest request, Model model) {
		model.addAttribute("main_navbar_id","notice");
		model.addAttribute("sub_navbar_id","notice_notice");
		ArrayList<NoticeDto> noticeList = noticeDao.noticeList();
        model.addAttribute("noticeList", noticeList);
		return "/notice/noticePage";
	}
	
	@GetMapping("/noticeView")
	public String NoticeView(@RequestParam("id") int noticeNo, HttpServletRequest request, Model model) {
		model.addAttribute("main_navbar_id","notice");
		model.addAttribute("sub_navbar_id","notice_notice");
		noticeDao.increaseNoticeHit(noticeNo);		
		NoticeDto notice = noticeDao.findNoticeById(noticeNo);
		NoticeDto previousNotice = noticeDao.getPreviousNotice(noticeNo);
		NoticeDto nextNotice  = noticeDao.getNextNotice(noticeNo);
		model.addAttribute("notice",notice);
		model.addAttribute("nextNotice",nextNotice);
		model.addAttribute("preNotice",previousNotice);
		return "/notice/noticeView";
	}
	
	@GetMapping("/eventPage")
	public String EventPage(HttpServletRequest request, Model model) {
		model.addAttribute("main_navbar_id","notice");
		model.addAttribute("sub_navbar_id","notice_event");
		ArrayList<EventDto> event = noticeDao.eventList();
		model.addAttribute("event",event);
		return "/notice/eventPage";
	}
	
	@GetMapping("/eventView")
	public String eventView(
	    @RequestParam("id") int eventNo, 
	    @RequestParam(value = "active", required = false, defaultValue = "Y") String active, 
	    HttpServletRequest request, 
	    Model model) {
	    model.addAttribute("main_navbar_id", "notice");   
	    // active 값에 따라 sub_navbar_id 설정
	    if ("N".equals(active)) {
	        model.addAttribute("sub_navbar_id", "notice_endEvent");
	    } else {
	        model.addAttribute("sub_navbar_id", "notice_event");
	    }    
	    EventDto event = noticeDao.findEventById(eventNo);
	    noticeDao.increaseEventHit(eventNo);    
	    model.addAttribute("event", event);  
	    return "/notice/eventView";
	}
	
	@GetMapping("/endEventPage")
	public String endEventPage(HttpServletRequest request, Model model) {
		model.addAttribute("main_navbar_id","notice");
		model.addAttribute("sub_navbar_id","notice_endEvent");
		ArrayList<EventDto> event = noticeDao.endEventList();
		model.addAttribute("event",event);
		return "/notice/endEventPage";
	}
}
