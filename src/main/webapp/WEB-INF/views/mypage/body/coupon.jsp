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
<h2>쿠폰함</h2>
<div class="coupon-container">
    <!-- 쿠폰 키워드 입력 섹션 -->
   	<div class="coupon-search-section">
        <input type="text" id="coupon-keyword" placeholder="쿠폰 키워드를 입력해주세요" />
        <button id="coupon-search-btn">쿠폰 받기</button>
   	</div>
    <h5 id="error-message"></h5>
    <h5 class="info-text">해당 이벤트 기간이 지났거나, 유효하지 않은 키워드를 입력한 경우 쿠폰 발급이 불가합니다.</h5>
	
    <!-- 탭 메뉴 -->
    <div class="coupon-tab-section">
      <button class="tab-btn active" data-tab="downloadable">다운로드 가능(${fn:length(coupons) })</button>
      <button class="tab-btn" data-tab="usable">사용 가능(${fn:length(mycoupons) })</button>
    </div>

    <!-- 탭별 내용 -->
    <div id="downloadable" class="tab-content active">
      <div class="coupon-grid">
        <!-- 다운 가능 쿠폰 카드 반복문 -->
        <c:forEach items="${coupons }" var="coupons">
          <div class="coupon-card able-card">
            <div class="coupon-info">
		        <h4 class="coupon-name able-name">${coupons.cp_name}</h4>
		        <div class="coupon-discount able-discount">
		            <c:choose>
		                <c:when test="${coupons.cp_type == 'A'}">
		                    <span><fmt:formatNumber value="${coupons.cp_amount}"  type="number" groupingUsed="true" />원</span>
		                </c:when>
		                <c:when test="${coupons.cp_type == 'R'}">
		                    <span>${coupons.cp_amount}%</span>
		                </c:when>
		            </c:choose>
		        </div>
		        <p>사용기간: ${coupons.cp_dead} 까지</p>
		        <p>발급기간: ${coupons.cp_start} ~ ${coupons.cp_end}</p>
		    </div>
		    <button class="coupon-btn able-btn" id="receive-btn" data-coupon-no="${coupons.cp_no}" >쿠폰 받기<i class="fa-solid fa-download"></i></button>
          </div>
        </c:forEach>
        
        <!-- 다운 받은 쿠폰 카드 반복문 -->
        <c:forEach items="${issuedCoupons }" var="coupons">
          <div class="coupon-card unable-card">
            <div class="coupon-info">
		        <h4 class="coupon-name unable-name">${coupons.cp_name}</h4>
		        <div class="coupon-discount unable-name">
		            <c:choose>
		                <c:when test="${coupons.cp_type == 'A'}">
		                    <span><fmt:formatNumber value="${coupons.cp_amount}"  type="number" groupingUsed="true" />원</span>
		                </c:when>
		                <c:when test="${coupons.cp_type == 'R'}">
		                    <span>${coupons.cp_amount}%</span>
		                </c:when>
		            </c:choose>
		        </div>
		        <p>사용기간: ${coupons.cp_dead} 까지</p>
		        <p>발급기간: ${coupons.cp_start} ~ ${coupons.cp_end}</p>
		    </div>
		    <button class="coupon-btn unable-btn" >받기 완료<i class="fa-solid fa-check"></i></button>
          </div>
        </c:forEach>
      </div>
    </div>

    <div id="usable" class="tab-content">
      <div class="coupon-grid">
        <!-- 사용 가능 쿠폰 카드 반복문 -->
        <c:forEach items="${mycoupons }" var="coupons">
          <div class="coupon-card able-card">
            <div class="coupon-info">
		        <h4 class="coupon-name able-name">${coupons.cp_name}</h4>
		        <div class="coupon-discount able-discount">
		            <c:choose>
		                <c:when test="${coupons.cp_type == 'A'}">
		                    <span><fmt:formatNumber value="${coupons.cp_amount}"  type="number" groupingUsed="true" />원</span>
		                </c:when>
		                <c:when test="${coupons.cp_type == 'R'}">
		                    <span>${coupons.cp_amount}%</span>
		                </c:when>
		            </c:choose>
		        </div>
		        <p>사용기간: ${coupons.cp_dead} 까지</p>
		    </div>
		    <a href="<c:url value='/product/productlist'/>" style="text-decoration: none;">
		    	<button class="coupon-btn able-btn">적용가능 상품보기<i class="fa-solid fa-magnifying-glass-plus"></i></button>
		    </a>
          </div>
        </c:forEach>
      </div>
    </div>
</div>

<script>
   // 탭 전환 기능
   document.querySelectorAll('.tab-btn').forEach(function(tabBtn) {
     tabBtn.addEventListener('click', function() {
       document.querySelectorAll('.tab-btn').forEach(function(btn) {
         btn.classList.remove('active');
       });
       this.classList.add('active');
       
       document.querySelectorAll('.tab-content').forEach(function(content) {
         content.classList.remove('active');
       });
       document.getElementById(this.dataset.tab).classList.add('active');
     });
   });

	// 쿠폰 검색 AJAX
   $('#coupon-search-btn').click(function () {
       var keyword = $('#coupon-keyword').val();
       $.ajax({
           type: "POST",
           url: "/mypage/coupon/searchCoupon",
           data: { keyword: keyword },
           dataType: 'json',
           success: function(response) {
               if (response.success) {
                   alert(response.message);
                   // 로컬 저장소에 active 탭 상태를 'usable'로 저장
                   localStorage.setItem('activeTab', 'usable');
                   // 페이지 새로고침
                   location.reload();
               } else {
                   // 실패 시 서버로부터 받은 message를 에러 메시지 영역에 출력
                   $('#error-message').text(response.message).show();
               }
           },
           error: function() {
               $('#error-message').text(response.message).show();
           }
       });
   });
	
   // 쿠폰 받기 AJAX
   document.querySelectorAll('#receive-btn').forEach(function(btn) {
     btn.addEventListener('click', function() {
       var couponNo = this.dataset.couponNo;
       $.ajax({
         type: "POST",
         url: "/mypage/coupon/receive",
         data: { couponNo: couponNo },
         success: function() {
           alert('쿠폰을 받았습니다.');
           localStorage.setItem('activeTab', 'usable');
           location.reload();
         },
         error: function() {
             alert('쿠폰 받기에 실패했습니다.');
         }
       });
     });
   });
   
// 페이지 로드 시 로컬 저장소에 저장된 탭 정보에 따라 active 탭 설정
   $(document).ready(function() {
       var activeTab = localStorage.getItem('activeTab');
       if (activeTab === 'usable') {
           // 'usable' 탭 활성화
           $('.tab-btn').removeClass('active');
           $('[data-tab="usable"]').addClass('active');

           $('.tab-content').removeClass('active');
           $('#usable').addClass('active');
       } else {
           // 기본으로 'downloadable' 탭 활성화
           $('.tab-btn').removeClass('active');
           $('[data-tab="downloadable"]').addClass('active');

           $('.tab-content').removeClass('active');
           $('#downloadable').addClass('active');
       }
   });
 </script>
</body>
</html>