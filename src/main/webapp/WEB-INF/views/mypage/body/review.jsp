<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
<h2>구매후기</h2>
<div class="coupon-container">
	
    <!-- 탭 메뉴 -->
    <div class="coupon-tab-section">
      <button class="tab-btn active" data-tab="write-review">구매 후기 작성</button>
      <button class="tab-btn" data-tab="myreview">내 구매 후기</button>
    </div>

    <!-- 탭별 내용 -->
    <div id="write-review" class="tab-content active">
	    <!-- 리스트 영역 -->
	    <div id="write-review-list"></div>
	    
		<!-- 페이징 -->
	    <div id="write-review-pagination" class="pagination"></div>
	    
	    <!-- 리스트가 비어있을 때 보여줄 기본 이미지 -->
        <div id="empty-list" style="display: none;">
            <img src="/static/Images/mypage/review_empty.png" />
            <div><strong>상품 구매하시고 후기를 남겨주세요!</strong></div>
            <a href="/product/productlist" class="emptyBtn">쇼핑하러 가기</a>
        </div>
    </div>
    
    <div id="myreview" class="tab-content">
	    <!-- 리스트 영역 -->
	    <div id="myreview-list"></div>
	    
		<!-- 페이징 -->
	    <div id="myreview-pagination" class="pagination"></div>
	    
	    <!-- 리스트가 비어있을 때 보여줄 기본 이미지 -->
        <div id="empty-list2" style="display: none;">
            <img src="/static/Images/mypage/review_empty.png" />
            <div><strong>상품 구매하시고 후기를 남겨주세요!</strong></div>
            <a href="/product/productlist" class="emptyBtn">쇼핑하러 가기</a>
        </div>
    </div>
    
    <!-- 후기 작성 폼 -->
    <div id="write-review-container" class="tab-content">
	    <div id="product-info" class="product-link" style="padding: 15px 5px;"></div>
		<hr />
	    <form id="review-form" action="/mypage/review/writeReview" method="post" enctype="multipart/form-data">
	        <input type="hidden" id="review-cart-code" name="cart_code" />
	        <input type="hidden" id="review-pro-code" name="pro_code" />
	        <input type="hidden" id="review-code" name="review_code" />
	        <input type="hidden" id="savingPoint" name="savingPoint" value="0" />
	        <input type="hidden" id="diffDays" name="diffDays" value="0" />
			
			<div class="review-write-info">
		        <label for="rating-stars">상품은 어떠셨나요?</label>
		        <div id="rating-stars">
		            <span class="star" data-value="1">★</span>
		            <span class="star" data-value="2">★</span>
		            <span class="star" data-value="3">★</span>
		            <span class="star" data-value="4">★</span>
		            <span class="star" data-value="5">★</span>
		        </div>
		        <input type="hidden" id="review-rating" name="review_rating" value="0" />
			</div>

	        <div class="review-write-info">
	            <label for="review-text">어떤 점이 좋았나요?</label>
	            <textarea id="review-text" name="review_text"></textarea>
	        </div>

	        <div class="review-write-info">
	            <label for="review-images">사진/영상 첨부하기</label>
	            <div id="image-container">
			        <div onclick="document.getElementById('review-images').click()">
			 			<i class="fa-solid fa-square-plus" style="color: #d4d4d4; font-size: 93px; cursor: pointer;"></i>
				    </div>
				    <input type="file" name="reviewImages" accept="image/*" id="review-images" style="display:none;" multiple />
		            <div id="image-preview"></div>
	            </div>
	        </div>
	
			<div class="button-container">
		        <button type="submit" class="reviewSubmit">등록하기</button>
		        <a href="/mypage/review" onclick="return confirm('작성을 취소할까요?')" class="reviewCancel">취소</a>
			</div>
	    </form>
	</div>
</div>

<script src="/static/js/mypage/review.js"></script>
</body>
</html>