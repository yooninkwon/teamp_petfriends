package com.tech.petfriends.notice.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.notice.dto.NoticeDto;

@Mapper
public interface NoticeDao {
	
	// 공지사항 리스트 가져오기 표시여부 Y 만
	public ArrayList<NoticeDto> NoticeList();
	
	// 공지사항 리스트 가져오기 표시여부 Y 만
	public ArrayList<NoticeDto> NoticeAdminList();

	// 글 작성
	public void NoticeWrite(String notice_title, String notice_content);
	
}
