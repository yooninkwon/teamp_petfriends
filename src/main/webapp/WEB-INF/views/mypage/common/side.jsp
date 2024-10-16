<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
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
            <li><a href="mypet">내 새꾸</a></li>
            <li><a href="grade">등급</a></li>
            <li><a href="point">심쿵포인트</a></li>
            <li><a href="coupon">쿠폰함</a></li>
            <li><a href="setting">내 정보 변경</a></li>

            <li class="separator"></li>

            <li><a href="cart">장바구니</a></li>
            <li><a href="order">주문내역</a></li>
            <li><a href="review">구매후기</a></li>
            <li><a href="wish">즐겨찾는 상품</a></li>
        </ul>
    </aside>
    
<script>
	document.addEventListener('DOMContentLoaded', function () {
	    // 현재 페이지 URL을 가져온다 (마지막 경로만 가져옴)
	    var currentPage = window.location.pathname.split('/').pop();
	
	    // 모든 메뉴 링크에서 active 클래스 제거
	    var allMenuItems = document.querySelectorAll('.sidebar ul li a');
	    allMenuItems.forEach(function (item) {
	        item.classList.remove('active');
	    });
	
	    // 현재 페이지와 일치하는 메뉴 항목에 active 클래스 추가
	    var activeMenuItem = document.querySelector('a[href*="' + currentPage + '"]');
	    if (activeMenuItem) {
	        activeMenuItem.classList.add('active'); // active 클래스 추가
	    }
	
	    // 링크 클릭 시 active 클래스 적용
	    allMenuItems.forEach(function (item) {
	        item.addEventListener('click', function () {
	            allMenuItems.forEach(function (link) {
	                link.classList.remove('active');
	            });
	            item.classList.add('active');
	        });
	    });
	});
</script>
</body>
</html>