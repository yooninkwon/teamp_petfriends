package com.tech.petfriends.notice.dao;

import java.util.ArrayList;
import java.util.Date;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.notice.dto.EventDto;
import com.tech.petfriends.notice.dto.NoticeDto;

@Mapper
public interface NoticeDao {
	
	// 공지사항 리스트 가져오기 표시여부 Y 만
	public ArrayList<NoticeDto> NoticeList();
	
	// 공지사항 리스트 전부 가져오기 
	public ArrayList<NoticeDto> NoticeAdminList();
	
	// 이벤트 리스트 전부 가져오기 
	public ArrayList<EventDto> EventAdminList();

	// 공지사항 작성
	public void NoticeWrite(String show,String notice_title, String notice_content);
	
	// 이벤트
	public void EventWrite(String show, String title, String content, Date startDate, Date endDate, String thumbnailFileName, String slideImgFileName);
}
