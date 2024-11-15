<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	admin_side
</title>
</head>
<body>
    <div id="sidebar-left">
        <ul>
            <li class="menu-item">
                통계
                <ul class="submenu">
                    <li><a href="sales" id="sales">매출 통계</a></li>
                    <li><a href="customer" id="customer">회원 통계</a></li>
                </ul>
            </li>
            <li class="menu-item">
                주문
                <ul class="submenu">
                    <li><a href="order" id="order">주문 현황</a></li>
                    <li><a href="coupon" id="coupon">쿠폰 관리</a></li>
                </ul>
            </li>
            <li class="menu-item">
                상품
                <ul class="submenu">
                    <li><a href="product" id="product">상품 관리</a></li>
                </ul>
            </li>
            <li class="menu-item">
                고객
                <ul class="submenu">
                    <li><a href="customer_status" id="customer_status">회원 현황</a></li>
                    <li><a href="customer_info" id="customer_info">회원 정보 조회</a></li>
                    <li><a href="pet_info" id="customer_info">내새꾸 조회</a></li>
                </ul>
            </li>
            <li class="menu-item">
                게시판
                <ul class="submenu">
                    <li><a href="community" id="community">커뮤니티</a></li>
                    <li><a href="petteacher" id="petteacher">펫 티쳐</a></li>
                    <li><a href="notice" id="notice">공지사항/이벤트</a></li>
                </ul>
            </li>
            <li class="menu-item">
                펫호텔
                <ul class="submenu">
                    <li><a href="pethotel" id="pethotel">펫호텔</a></li>
                    <li><a href="pethotel_reserve" id="pethotel_reserve">예약관리</a></li>
                </ul>
            </li>
            
        </ul>
    </div>

	<script src="/static/js/admin/side_bar.js"></script>
</body>
</html>