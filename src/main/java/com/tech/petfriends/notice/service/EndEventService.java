package com.tech.petfriends.notice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tech.petfriends.notice.dao.NoticeDao;
import com.tech.petfriends.notice.dto.EventDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EndEventService {

	private final NoticeDao noticeDao;
	
	public List<EventDto> getEndEventList() {
        return noticeDao.endEventList(); // 종료된 이벤트 목록 조회
    }
}
