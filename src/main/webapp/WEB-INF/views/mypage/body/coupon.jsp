<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
    <div class="info-text"><h5>해당 이벤트 기간이 지났거나, 유효하지 않은 키워드를 입력한 경우 쿠폰 발급이 불가합니다.</h5></div>
	
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
            <div class="coupon-details">
              <h2>${coupons.cp_name }</h2>
              <h2>${coupons.cp_amount }</h2>
              <p>-사용기간 : ${coupons.cp_dead }까지</p>
              <p>-발급기간 : ${coupons.cp_start } - ${coupons.cp_end }</p>
              <button class="receive-btn" data-coupon-id="${coupons.cp_no}">쿠폰 받기</button>
            </div>
          </div>
        </c:forEach>
      </div>
    </div>

    <div id="usable" class="tab-content">
      <div class="coupon-grid">
        <!-- 쿠폰 카드 반복문 -->
        
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

    // 쿠폰 받기 버튼 클릭 시 AJAX
    document.querySelectorAll('.receive-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var couponId = this.dataset.couponId;
        $.ajax({
          type: "POST",
          url: "/mypage/coupon/receive",
          data: { couponId: couponId },
          success: function() {
            alert('쿠폰을 받았습니다.');
            location.reload();
          },
          error: function() {
            alert('오류가 발생했습니다.');
          }
        });
      });
    });
  </script>
</body>
</html>