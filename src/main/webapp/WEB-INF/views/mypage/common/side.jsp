<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	mypage_side
</title>
</head>
<body>
    <aside class="sidebar">
	    <ul>
	        <li><a href="<c:url value='/mypage/mypet' />" id="mypet-menu">내 새꾸</a></li>
	        <li><a href="<c:url value='/mypage/grade' />" id="grade-menu">등급</a></li>
	        <li><a href="<c:url value='/mypage/point' />" id="point-menu">심쿵포인트</a></li>
	        <li><a href="<c:url value='/mypage/coupon' />" id="coupon-menu">쿠폰함</a></li>
	        <li><a href="<c:url value='/mypage/setting' />" id="setting-menu">내 정보 변경</a></li>
	        
	        <li class="separator"></li>
	
	        <li><a href="<c:url value='/mypage/cart' />" id="cart-menu">장바구니</a></li>
	        <li><a href="<c:url value='/mypage/order' />" id="order-menu">주문내역</a></li>
	        <li><a href="<c:url value='/mypage/review' />" id="review-menu">구매후기</a></li>
	        <li><a href="<c:url value='/mypage/wish' />" id="wish-menu">즐겨찾는 상품</a></li>
	        <li><a href="<c:url value='/mypage/pethotel' />" id="wish-menu">펫호텔 예약</a></li>
	    </ul>
	</aside>
	
	<script>
		document.addEventListener('DOMContentLoaded', function () {
		    // 현재 페이지 URL을 가져옴
		    var currentPage = window.location.pathname;
		
		    // 모든 메뉴 항목에서 active 클래스 제거
		    var allMenuItems = document.querySelectorAll('.sidebar ul li a');
		    allMenuItems.forEach(function (item) {
		        item.classList.remove('active');
		    });
		
		    // 현재 페이지 URL에 맞는 메뉴 항목에 active 클래스 추가
		    if (currentPage.includes("/mypage/mypet")) {
		        document.getElementById("mypet-menu").classList.add("active");
		    } else if (currentPage.includes("/mypage/grade")) {
		        document.getElementById("grade-menu").classList.add("active");
		    } else if (currentPage.includes("/mypage/point")) {
		        document.getElementById("point-menu").classList.add("active");
		    } else if (currentPage.includes("/mypage/coupon")) {
		        document.getElementById("coupon-menu").classList.add("active");
		    } else if (currentPage.includes("/mypage/setting")) {
		        document.getElementById("setting-menu").classList.add("active");
		    } else if (currentPage.includes("/mypage/cart")) {
		        document.getElementById("cart-menu").classList.add("active");
		    } else if (currentPage.includes("/mypage/order")) {
		        document.getElementById("order-menu").classList.add("active");
		    } else if (currentPage.includes("/mypage/review")) {
		        document.getElementById("review-menu").classList.add("active");
		    } else if (currentPage.includes("/mypage/wish")) {
		        document.getElementById("wish-menu").classList.add("active");
		    }
		});
	</script>
</body>
</html>