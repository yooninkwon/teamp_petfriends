package com.tech.petfriends.notice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tech.petfriends.notice.dao.NoticeDao;
import com.tech.petfriends.notice.dto.NoticeDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticePageService {

    private final NoticeDao noticeDao;

    public List<NoticeDto> getNoticeList() {
        return noticeDao.noticeList(); // 공지사항 목록 조회
    }
}
