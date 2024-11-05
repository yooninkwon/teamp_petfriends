package com.tech.petfriends.admin.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.notice.dao.NoticeDao;

@Service
public class AdminNoticeEditService implements AdminServiceInterface {
	
    private NoticeDao noticeDao;

    public AdminNoticeEditService(NoticeDao noticeDao) {
        this.noticeDao = noticeDao;
    }

    @Override
    public void execute(Model model) {
        HttpServletRequest request = (HttpServletRequest) model.getAttribute("request");


        Long noticeId = Long.parseLong(request.getParameter("noticeId")); // noticeId를 요청에서 받아옵니다      
        String show = request.getParameter("notice_show");
        String title = request.getParameter("notice_title");
        String content = request.getParameter("notice_content");


        noticeDao.noticeUpdate(show, title, content, noticeId);
    }
}