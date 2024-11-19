package com.tech.petfriends.notice.service;

import org.springframework.stereotype.Service;

import com.tech.petfriends.notice.dao.NoticeDao;
import com.tech.petfriends.notice.dto.NoticeDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeViewService {

	private final NoticeDao noticeDao;

    public NoticeDto getNoticeById(int noticeNo) {
        noticeDao.increaseNoticeHit(noticeNo); // 조회수 증가
        return noticeDao.findNoticeById(noticeNo);
    }

    public NoticeDto getPreviousNotice(int noticeNo) {
        return noticeDao.getPreviousNotice(noticeNo);
    }

    public NoticeDto getNextNotice(int noticeNo) {
        return noticeDao.getNextNotice(noticeNo);
    }
    
}
