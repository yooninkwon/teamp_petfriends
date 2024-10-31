<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	admin_body
</title>
<link rel="stylesheet" href="/static/css/admin/notice.css" />
</head>
<body>
<div class="title"><h3>공지사항/이벤트 관리</h3></div>

<!-- 게시글 등록 -->
<div id="petteacherRegister" class="tab-content">
	<!-- 필터링 영역 -->
	<div class="radio-group">
	    <div class="filter-title">카테고리</div>
	    <label><input type="radio" name="category-filter" value="공지사항" checked onclick="toggleNoticeList()"> 공지사항</label>
	    <label><input type="radio" name="category-filter" value="이벤트" onclick="toggleNoticeList()"> 이벤트</label>
	</div>
    <div class="search-group">
        <div class="filter-title">제목</div>
        <input type="search" name="titleSearch" id="titleSearch" />
        <input type="button" name="serachButton" id="serachButton" value="검색" />
    </div>
	
	<div class="array-section">
	    <!-- 정렬 드롭다운 -->
        <select id="sort-order">
            <option value="최신순">최신순</option>
            <option value="오래된순">오래된순</option>
            <option value="조회수순">조회수순</option>
        </select>
        
	    <!-- 신규등록 버튼 -->
	    <button id="newNoticeBtn" class="btn-style">선택삭제</button>
	    <button id="newNoticeBtn" class="btn-style">모두공개</button>
	    <button id="newNoticeBtn" class="btn-style">모두비공개</button>
	    <a href="notice_write"><button id="newNoticeBtn" class="btn-style">신규등록</button></a>
	</div>
	
	<!-- 리스트 영역 -->
	<div id="notice-list-container" class="notice-list-container">
	    <!-- 공지사항 리스트 테이블 -->
	    <table class="notice-list">
	        <thead class="thead">
	            <tr>
	                <th style="width: 2%;"><input type="checkbox" /></th>
	                <th style="width: 5%;">번호</th>
	                <th style="width: 50%;">제목</th>
	                <th style="width: 15%;">등록일</th>
	                <th style="width: 10%;">조회수</th>
	                <th style="width: 5%;">공개여부</th>
	                <th>수정 / 삭제</th>
	            </tr>
	        </thead>
	        <c:forEach var="notice" items="${noticeAdminList}">
	            <tr>
	                <td><input type="checkbox" /></td>
	                <td>${notice.notice_no }</td>
	                <td id="title"><a href="/notice/noticeView">${notice.notice_title }</a></td>
	                <td>${notice.notice_date }</td>
	                <td>${notice.notice_hit }</td>
	                <td>${notice.notice_show }</td>
	                <td><input type="button" value="수정" /><input type="button" value="삭제" /></td>
	            </tr>
	        </c:forEach>
	    </table>
	</div>
	
	<div id="evnet-list-container" class="notice-list-container">
	    <!-- 공지사항 리스트 테이블 -->
	    <table class="notice-list">
	        <thead class="thead">
	            <tr>
	                <th style="width: 2%;"><input type="checkbox" /></th>
	                <th style="width: 5%;">번호</th>
	                <th style="width: 30%;">제목</th>
	                <th style="width: 10%;">이벤트 시작일</th>
	                <th style="width: 10%;">이벤트 종료일</th>
	                <th style="width: 10%;">등록일</th>
	                <th style="width: 10%;">썸네일 이미지</th>
	                <th style="width: 5%;">조회수</th>
	                <th style="width: 5%;">공개여부</th>
	                <th>수정 / 삭제</th>
	            </tr>
	        </thead>
	        <c:forEach var="event" items="${eventAdminList}">
	            <tr>
	                <td><input type="checkbox" /></td>
	                <td>${event.event_no }</td>
	                <td id="title"><a href="">${event.event_title }</a></td>
	                <td>${event.event_startdate }</td>
	                <td>${event.event_enddate }</td>
	                <td>${event.event_legdate }</td>
	                <td>${event.event_thumbnail}</td>
	                <td>${event.event_hit }</td>
	                <td>${event.event_show }</td>
	                <td><input type="button" value="수정" /><input type="button" value="삭제" /></td>
	            </tr>
	        </c:forEach>
	    </table>
	</div>
	
</div>

<script src="/static/js/admin/notice.js"></script>
</body>
</html>