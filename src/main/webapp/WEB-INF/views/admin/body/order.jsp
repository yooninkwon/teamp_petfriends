<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/admin/order.css">
<title>
	admin_body
</title>
</head>
<body>
<div class="title"><h3>주문 현황</h3></div>

<!-- 필터링 영역 -->
<div class="filter-section-2" id="memCoupon-status-filter">
    <!-- 쿠폰 상태 체크박스 필터 -->
    <div class="filter-section-1">
        <div class="checkbox-group">
            <div class="filter-title">주문상태</div>
            <label><input type="checkbox" name="deliv-filter" value="결제완료"> 결제완료</label>
            <label><input type="checkbox" name="deliv-filter" value="배송준비중"> 배송준비중</label>
            <label><input type="checkbox" name="deliv-filter" value="배송중"> 배송중</label>
            <label><input type="checkbox" name="deliv-filter" value="배송완료"> 배송완료</label>
            <label><input type="checkbox" name="deliv-filter" value="구매확정"> 구매확정</label>
            <label><input type="checkbox" name="deliv-filter" value="주문취소"> 주문취소</label>
        </div>
    </div>
	
    <!-- 조회 기간 필터 -->
	<div class="filter-section-1">
        <div class="date-group">
            <div class="filter-title">조회기간</div>
            <label><input type="date" id="start-date"> 부터</label>
            <label><input type="date" id="end-date"> 까지</label>
            <button id="reset-date" class="btn-style">전체보기</button>
        </div>
    </div>

    <!-- 검색 필터 -->
    <div class="filter-section-1">
        <div class="search-group">
            <div class="filter-title">검색</div>
            <label>결제코드<input type="text" name="ketword-filter" id="search-order-code"></label>
            <label>상품코드<input type="text" name="ketword-filter" id="search-pro-code"></label>
            <label>회원코드<input type="text" name="ketword-filter" id="search-member-code"></label>
        </div>
    </div>
	
	<div class="array-section">
	    <!-- 배송처리 버튼 -->
	    <button value="배송준비중" class="btn-style deliv-btn">배송준비처리</button>
	    <button value="배송중" class="btn-style deliv-btn">배송중처리</button>
	    <button value="배송완료" class="btn-style deliv-btn">배송완료처리</button>
	</div>
</div>

<!-- 리스트 영역 -->
<div class="order-list-container">
	<table class="order-list">
	    <thead class="thead">
	        <tr>
	            <th><input type="checkbox" name="select-item"></th>
	            <th>결제코드</th>
	            <th>주문상태</th>
	            <th>구매금액</th>
	            <th>할인액</th>
	            <th>결제금액</th>
	            <th>주문자명</th>
	            <th>주문(결제)일시</th>
	        </tr>
	    </thead>
	    <tbody id="order-table-body">
	        <!-- 전체 쿠폰 데이터 출력 -->
	    </tbody>
	</table>
	
	<!-- 페이징 -->
	<div id="order-pagination" class="pagination"></div>
</div>
<script src="/static/js/admin/order.js"></script>
</body>
</html>