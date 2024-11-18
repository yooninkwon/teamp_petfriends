package com.tech.petfriends.notice.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.notice.dao.NoticeDao;
import com.tech.petfriends.notice.dto.NoticeDto;

@RequestMapping("/notice")
@RestController
public class NoticeRestController {
	
	@Autowired
	private NoticeDao noticeDao;
	
	@GetMapping("/notice_list")
	public ArrayList<NoticeDto> NoticeList() {
		ArrayList<NoticeDto> noticeList = noticeDao.noticeList();
		return noticeList;
	}
}
