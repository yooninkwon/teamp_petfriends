<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/admin/cscenter.css">
<title>
	admin_body
</title>
</head>
<body>
<div class="title"><h3>고객센터</h3></div>

<!-- 필터링 영역 -->
<div class="filter-section-1" id="status-filter">
    <!-- 처리 상태 체크박스 필터 -->
    <div class="checkbox-group">
        <div class="filter-title">처리상태</div>
        <label><input type="checkbox" name="aswerable-filter" value="처리중" checked> 처리중</label>
        <label><input type="checkbox" name="aswerable-filter" value="처리완료"> 처리완료</label>
        <label><input type="checkbox" name="aswerable-filter" value="삭제"> 삭제</label>
    </div>
	
    <!-- 카테고리 체크박스 필터 -->
    <div class="checkbox-group">
        <div class="filter-title">카테고리</div>
        <label><input type="checkbox" name="category-filter" value="배송" checked> 배송</label>
        <label><input type="checkbox" name="category-filter" value="주문취소" checked> 주문취소</label>
        <label><input type="checkbox" name="category-filter" value="주소변경" checked> 주소변경</label>
        <label><input type="checkbox" name="category-filter" value="반품/환불" checked> 반품/환불</label>
        <label><input type="checkbox" name="category-filter" value="기타" checked> 기타</label>
    </div>
</div>

<!-- 답변등록 영역 -->
<div class="array-section">
 	<div class="content-group">
 		<label for="cs_content" class="filter-title">문의내용</label>
 		<textarea id="cs_content" disabled></textarea>
 	</div>
 	
	<form action="/admin/cscenter/submitAnswer" class="content-group">
		<input type="hidden" id="cs_no" name="cs_no" value="">
		<label for="cs_answer" class="filter-title">답변작성</label>
			<textarea id="cs_answer" name="cs_answer"></textarea>
		<input type="submit" class="btn-style" value="등록">
	</form>
</div>

<!-- 리스트 영역 -->
<div class="contact-list-container">
	<table class="contact-list">
	    <thead class="thead">
	        <tr>
	            <th>번호</th>
	            <th>제목</th>
	            <th>내용</th>
	            <th>회원명</th>
	            <th>문의일시</th>
	            <th>처리상태</th>
	        </tr>
	    </thead>
	    <tbody id="contact-table-body">
	        <!-- 전체 문의 데이터 출력 -->
	    </tbody>
	</table>
	
	<!-- 페이징 -->
	<div id="contact-pagination" class="pagination"></div>
</div>
<script src="/static/js/admin/cscenter.js"></script>
</body>
</html>