package com.tech.petfriends.notice.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.tech.petfriends.notice.dto.EventDto;
import com.tech.petfriends.notice.dto.NoticeDto;
import com.tech.petfriends.notice.service.EndEventService;
import com.tech.petfriends.notice.service.EventPageService;
import com.tech.petfriends.notice.service.EventViewService;
import com.tech.petfriends.notice.service.NoticePageService;
import com.tech.petfriends.notice.service.NoticeViewService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {
	
	private final NoticePageService noticePageService;
	private final NoticeViewService noticeViewService;
	private final EventPageService eventPageService;
	private final EventViewService eventViewService;
	private final EndEventService endEventService;

	@GetMapping("/noticePage")
	public String NoticePage(HttpServletRequest request, Model model) {
		model.addAttribute("main_navbar_id", "notice");
	    model.addAttribute("sub_navbar_id", "notice_notice");    
	    List<NoticeDto> noticeList = noticePageService.getNoticeList();
	    model.addAttribute("noticeList", noticeList);	    
	    return "/notice/noticePage";
	}
	
	@GetMapping("/noticeView")
	public String noticeView(@RequestParam("id") int noticeNo, Model model) {
	    model.addAttribute("main_navbar_id", "notice");
	    model.addAttribute("sub_navbar_id", "notice_notice");
	    NoticeDto notice = noticeViewService.getNoticeById(noticeNo);
	    NoticeDto previousNotice = noticeViewService.getPreviousNotice(noticeNo);
	    NoticeDto nextNotice = noticeViewService.getNextNotice(noticeNo);
	    model.addAttribute("notice", notice);
	    model.addAttribute("nextNotice", nextNotice);
	    model.addAttribute("preNotice", previousNotice);
	    return "/notice/noticeView";
	}
	
	@GetMapping("/eventPage")
	public String eventPage(Model model) {
	    model.addAttribute("main_navbar_id", "notice");
	    model.addAttribute("sub_navbar_id", "notice_event");
	    List<EventDto> eventList = eventPageService.getEventList();
	    model.addAttribute("event", eventList);
	    return "/notice/eventPage";
	}
	
	@GetMapping("/eventView")
	public String eventView(
		    @RequestParam("id") int eventNo, 
		    @RequestParam(value = "active", required = false, defaultValue = "Y") String active, 
		    Model model) {
	    model.addAttribute("main_navbar_id", "notice");   
	    if ("N".equals(active)) {model.addAttribute("sub_navbar_id", "notice_endEvent");} 
	    else {model.addAttribute("sub_navbar_id", "notice_event");}
	    EventDto event = eventViewService.getEventById(eventNo);
	    model.addAttribute("event", event);   
	    return "/notice/eventView";
		}
	
	@GetMapping("/endEventPage")
	public String endEventPage(Model model) {
	    model.addAttribute("main_navbar_id", "notice");
	    model.addAttribute("sub_navbar_id", "notice_endEvent");
	    List<EventDto> eventList = endEventService.getEndEventList();
	    model.addAttribute("event", eventList);
	    return "/notice/endEventPage";
	}
}
