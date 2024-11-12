<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	mypage_body
</title>
</head>
<body>
<h2>주문내역</h2>

<div class="coupon-container">
	<!-- 탭 -->
    <div class="coupon-tab-section">
        <button class="tab-btn active" data-tab="orderlist">주문내역조회</button>
        <button class="tab-btn" data-tab="cancellist">취소/반품/교환 내역</button>
    </div>
    
    <!-- 필터링 -->
    <div class="date-group">
        <button>전체</button>
        <button>오늘</button>
        <button>1주일</button>
        <button>1개월</button>
        <button>3개월</button>
        <button>6개월</button>
        <input type="date" id="start-date">
         ~ 
        <input type="date" id="end-date">
        <button id="filterBtn">조회</button>
    </div>
    
    <!-- 리스트 -->
    <div class="tab-content active" id="orderlist-list"></div>
    
    <div id="empty-list" style="display: none;">
        <img src="/static/Images/mypage/cart_empty.png" style="width: 200px;" />
        <div><strong>주문내역이 비었..다구요?</strong></div>
        <a href="/product/productlist" class="emptyBtn">쇼핑하러 가기</a>
    </div>
    
	<!-- 페이지네이션 -->
    <div id="orderlist-pagination" class="pagination" style="margin-top: 20px;"></div>
</div>

<script src="/static/js/mypage/order.js"></script>
</body>
</html>