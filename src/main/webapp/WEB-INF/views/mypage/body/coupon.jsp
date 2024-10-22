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
   	<div class="info-text" id="error-message" style="display: none;">
        <h5 style="color: #ff4081; margin-bottom: 5px;">키워드를 다시 한번 확인해 주세요.</h5>
    </div>
    <div class="info-text">
    	<h5>해당 이벤트 기간이 지났거나, 유효하지 않은 키워드를 입력한 경우 쿠폰 발급이 불가합니다.</h5>
    </div>
	
    <!-- 탭 메뉴 -->
    <div class="coupon-tab-section">
      <button class="tab-btn active" data-tab="downloadable">다운로드 가능(${fn:length(coupons) })</button>
      <button class="tab-btn" data-tab="usable">사용 가능(${fn:length(mycoupons) })</button>
    </div>

    <!-- 탭별 내용 -->
    <div id="downloadable" class="tab-content active">
      <div class="coupon-grid">
        <!-- 쿠폰 카드 반복문 -->
        <c:forEach items="${coupons }" var="coupons">
          <div class="coupon-card">
            <div class="coupon-info">
		        <h4>${coupons.cp_name}</h4>
		        <p class="coupon-discount">
		            <c:choose>
		                <c:when test="${coupons.cp_type == 'A'}">
		                    <span><fmt:formatNumber value="${coupons.cp_amount}"  type="number" groupingUsed="true" />원</span>
		                </c:when>
		                <c:when test="${coupons.cp_type == 'R'}">
		                    <span>${coupons.cp_amount}%</span>
		                </c:when>
		            </c:choose>
		        </p>
		        <p>사용기간: ${coupons.cp_dead} 까지</p>
		        <p>발급기간: ${coupons.cp_start} ~ ${coupons.cp_end}</p>
		    </div>
		    <button class="receive-btn" value="${coupons.cp_no}" >쿠폰 받기<i class="fa-solid fa-download"></i></button>
          </div>
        </c:forEach>
      </div>
    </div>

    <div id="usable" class="tab-content">
      <div class="coupon-grid">
        <!-- 쿠폰 카드 반복문 -->
        <c:forEach items="${mycoupons }" var="mycoupons">
          <div class="coupon-card">
            <div class="coupon-info">
		        <h4>${mycoupons.cp_name}</h4>
		        <p class="coupon-discount">
		            <c:choose>
		                <c:when test="${mycoupons.cp_type == 'A'}">
		                    <span><fmt:formatNumber value="${mycoupons.cp_amount}"  type="number" groupingUsed="true" />원</span>
		                </c:when>
		                <c:when test="${mycoupons.cp_type == 'R'}">
		                    <span>${mycoupons.cp_amount}%</span>
		                </c:when>
		            </c:choose>
		        </p>
		        <p>사용기간: ${mycoupons.cp_dead} 까지</p>
		    </div>
		    <a href="" style="text-decoration: none;"><button class="receive-btn">적용가능 상품보기<i class="fa-solid fa-magnifying-glass-plus"></i></button></a>
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
                    $('#error-message').show(); // 키워드 오류 메시지 표시
                }
            }
        });
    });
 	
    // 쿠폰 받기 버튼 클릭 시 AJAX
    document.querySelectorAll('.receive-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var couponNo = this.dataset.couponNo;
        $.ajax({
          type: "POST",
          url: "/mypage/coupon/receive",
          data: { couponNo: couponNo },
          success: function() {
            alert('쿠폰을 받았습니다.');
            location.reload();
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