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
<div id="petteacherRegister">
	<!-- 필터링 영역 -->
	<div class="tab-section">
	    <button class="tab-btn active" data-tab="notice-list-container">공지사항</button>
	    <button class="tab-btn" data-tab="event-list-container">이벤트</button>
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
	    <button id="newNoticeBtn" class="btn-style" onclick="deleteSelectedNotices()">선택삭제</button>
	    <button class="btn-style" onclick="setVisibilityForSelectedNotices('show')">모두공개</button>
    	<button class="btn-style" onclick="setVisibilityForSelectedNotices('hide')">모두비공개</button>
	    <a href="notice_write"><button id="newNoticeBtn" class="btn-style">신규등록</button></a>
	</div>
	
	
	
	
	<!-- 리스트 영역 -->
	<div id="notice-list-container" class="notice-list-container tab-content">
	    <!-- 공지사항 리스트 테이블 -->
	    <table class="notice-list">
	        <thead class="thead">
	            <tr>
	                <th style="width: 2%;"><input type="checkbox" class="selectAll"/></th>
	                <th style="width: 5%;">번호</th>
	                <th style="width: 50%;">제목</th>
	                <th style="width: 15%;">등록일</th>
	                <th style="width: 10%;">조회수</th>
	                <th style="width: 5%;">공개여부</th>
	                <th>수정 / 삭제</th>
	            </tr>
	        </thead>    
	    </table>   
	</div>
	
	
	
	<div id="event-list-container" class="event-list-container tab-content" style="display: none;">
	    <!-- 공지사항 리스트 테이블 -->
	    <table class="event-list">
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
	        <tbody>
	        	
	        </tbody>  
	    </table>
	</div>
</div>

<script src="/static/js/admin/notice.js"></script>
</body>
</html>