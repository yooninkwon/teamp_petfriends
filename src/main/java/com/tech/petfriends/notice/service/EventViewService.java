package com.tech.petfriends.notice.service;

import org.springframework.stereotype.Service;

import com.tech.petfriends.notice.dao.NoticeDao;
import com.tech.petfriends.notice.dto.EventDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventViewService {

	private final NoticeDao noticeDao;
	
	public EventDto getEventById(int eventNo) {
        noticeDao.increaseEventHit(eventNo); // 조회수 증가
        return noticeDao.findEventById(eventNo);
    }
}
