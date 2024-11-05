package com.tech.petfriends.notice.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.notice.dto.EventDto;
import com.tech.petfriends.notice.dto.NoticeDto;

@Mapper
public interface NoticeDao {
	// 공지사항 글 번호로 내용 가져오기
	public NoticeDto findNoticeById(long noticeId);

	// 공지사항 글 번호로 내용 가져오기
	public EventDto findEventById(long eventId);

	// 공지사항 이전 글 가져오기
	public NoticeDto getPreviousNotice(int noticeId);

	// 공지사항 다음 글 가져오기
	public NoticeDto getNextNotice(int noticeId);

	// 공지사항 조회수 증가
	public void increaseNoticeHit(int noticeId);
	
	// 공지사항 리스트 가져오기 표시여부 Y 만
	public ArrayList<NoticeDto> noticeList();

	// 공지사항 리스트 전부 가져오기
	public ArrayList<NoticeDto> noticeAdminList();

	// 이벤트 리스트 전부 가져오기
	public ArrayList<EventDto> eventAdminList();

	// 공지사항 작성
	public void noticeWrite(String show, String notice_title, String notice_content);

	// 이벤트 작성
	public void eventWrite(String show, String title, String content, Date startDate, Date endDate,
			String thumbnailFileName, String slideImgFileName);

	// 공지사항 삭제
	public int deleteNotice(long noticeNo);

	// 이벤트 삭제
	public int deleteEvent(long eventNo);

	// 공지사항 선택 공개, 비공개
	public void updateVisibilityNotice(List<Long> ids, boolean isVisible);

	// 이벤트 선택 공개, 비공개
	public void updateVisibilityEvent(List<Long> ids, boolean isVisible);

	// 공지사항 수정
	public void noticeUpdate(String show, String title, String content, long noticeId);

	// 이벤트 수정
	public void updateEvent(EventDto event);

	// 공지사항 검색
	public List<NoticeDto> searchNoticesByTitle(String title);

	// 공지사항 글 총 개수 쿼리
	public int getTotalNoticeCount();
}
