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
<h2>즐겨찾는 상품</h2>
<div class="coupon-container">
	
    <!-- 탭 메뉴 -->
    <div class="coupon-tab-section">
      <button class="tab-btn active" data-tab="wishlist">찜</button>
      <button class="tab-btn" data-tab="buyoften">자주 구매</button>
    </div>

    <!-- 탭별 내용 -->
    <div id="wishlist" class="tab-content active">
    	<!-- 필터링 영역 -->
	    <div class="sort-section">
	        <select id="sortDropdown" onchange="sortWishlist()">
		        <option value="최근 추가순">최근 추가순</option>
                <option value="낮은가격순">낮은가격순</option>
                <option value="높은가격순">높은가격순</option>
                <option value="리뷰 많은순">리뷰 많은순</option>
                <option value="리뷰 높은순">리뷰 높은순</option>
	        </select>
	    </div>
	    
	    <!-- 리스트 영역 -->
	    <div id="wishlist-list"></div>
	    
		<!-- 페이징 -->
	    <div id="wishlist-pagination" class="pagination"></div>
	    
	    <!-- 리스트가 비어있을 때 보여줄 기본 이미지 -->
        <div id="empty-list" style="display: none;">
            <img src="/static/Images/mypage/wish_empty.png" />
            <div><strong>앗! 찜한 상품이 없어요</strong><br />마음에 드는 상품을 찜해주세요!</div>
            <a href="/product/productlist" class="emptyBtn">찜하러 가기</a>
        </div>
    </div>
    
    <div id="buyoften" class="tab-content">
    	<!-- 필터링 영역 -->
	    <div class="sort-section">
            <label><input type="checkbox" id="orderable" value="판매"> 구매 가능한 상품</label>
	    </div>
	    
	    <!-- 리스트 영역 -->
	    <div id="buyoften-list"></div>
	    
		<!-- 페이징 -->
	    <div id="buyoften-pagination" class="pagination"></div>
	    
	    <!-- 리스트가 비어있을 때 보여줄 기본 이미지 -->
        <div id="empty-list" style="display: none;">
            <img src="/static/Images/mypage/wish_empty.png" />
            <div><strong>앗! 구매한 상품이 없어요</strong><br />마음에 드는 상품을 둘러보세요!</div>
            <a href="/product/productlist" class="emptyBtn">쇼핑하러 가기</a>
        </div>
    </div>
</div>

<script src="/static/js/mypage/wish.js"></script>
</body>
</html>