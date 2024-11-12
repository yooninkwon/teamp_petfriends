<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문 및 결제</title>
<script src="https://cdn.iamport.kr/v1/iamport.js"></script>
<script src="https://kit.fontawesome.com/6c32a5aaaa.js" crossorigin="anonymous"></script>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/mypage/mypage2.css">
</head>
<body data-user-rate="${userGrade.g_rate}">
<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

<h2>주문/결제</h2>

<div class="payment-container">
	
    <!-- 주문자 정보 -->
    <section class="order-info" style="padding: 0 20px;">
        <h3 style="margin-top: 20px">주문자 정보</h3>
        <div>${loginUser.mem_name} | ${loginUser.mem_tell}</div>
    </section>

    <!-- 배송지 정보 -->
    <section>
        <h3>배송지 정보</h3>
        <div class="delivery-address">
            <c:forEach var="address" items="${address}">
                <c:if test="${address.addr_default.toString() == 'Y'}">
                    <div id="addr">${address.addr_line1} ${address.addr_line2}</div>
                </c:if>
            </c:forEach>
        </div>
        <div class="delivery-info">
            <div>
            	<input type="checkbox" id="defaultAddress">
            	<label for="defaultAddress"> 주문자 정보와 동일</label>
            </div>
            <div>
            	<label for="resiver-name">수령인*</label><input type="text" id="resiver-name" required>
            	<label for="resiver-tell" style="margin-left: 15px;">수령인 연락처*</label><input type="text" id="resiver-tell" required>
            </div>
        </div>
        <div class="delivery-options">
            <div><input type="text" placeholder="배송지 출입방법*" id="delivEnterMethod" disabled><span class="innerBtn1" onclick="openDelivEnterMethod()">변경 ></span></div>
            <div><input type="text" placeholder="배송 메모*" id="delivMemo" disabled><span class="innerBtn1" onclick="openDelivMemo()">변경 ></span></div>
        </div>
    </section>

    <!-- 주문 상품 -->
    <section class="order-items">
        <h3>주문 상품 <span style="color: #ff4081;">${items.size()}</span></h3>
        <c:set var="priceSum" value="0" />
        <c:forEach var="item" items="${items}">
            <div class="item">
                <img src="/static/Images/ProductImg/MainImg/${item.main_img1}" alt="${item.pro_name}" class="item-img">
                <div class="item-details">
                    <div class="item-name">${item.pro_name}</div>
                    <div class="item-option">${item.cart_cnt}개 / ${item.proopt_name}</div>
                    <div>
	                    <span class="item-price"><fmt:formatNumber value="${item.proopt_finalprice * item.cart_cnt}" type="number" groupingUsed="true"/>원</span>
	                    <span class="item-reward"><fmt:formatNumber value="${(item.proopt_finalprice * item.cart_cnt / 100) * userGrade.g_rate}" type="number" maxFractionDigits="0" groupingUsed="true"/>원 적립</span>
                    </div>
                </div>
            </div>
        	<c:set var="priceSum" value="${priceSum + (item.proopt_finalprice * item.cart_cnt)}" />
        	<input type="hidden" class="cart-code" value="${item.cart_code}">
        </c:forEach>
    </section>

    <!-- 할인/부가결제 -->
    <section class="discount-info">
        <h3>할인/부가결제</h3>
        <div class="coupon-option">
        	<input type="text" placeholder="주문 쿠폰" id="usableCoupon" disabled>
        	<span class="innerBtn2" onclick="openUsableCoupon()">사용가능 <span style="color: #ff4081;">${fn:length(mycoupons)}장</span> ></span>
        </div>
        <input type="hidden" id="couponAmount" value="0">
		<input type="hidden" id="couponType" value="">
		<input type="hidden" id="memCpCode" value="">
		
        <div class="point-option">심쿵 포인트<input type="number" placeholder="0원" id="used-point" onchange="pointUse()"><button onclick="pointUseAll()">전액 사용</button></div>
        <div class="user-point">보유 포인트 <span id="usable_point" style="color: #ff4081;"><fmt:formatNumber value="${loginUser.mem_point}" type="number" groupingUsed="true"/>원</span></div>
    </section>

    <!-- 결제금액 -->
    <section class="payment-summary" style="border: none;">
        <h3>결제금액</h3>
        <div class="summary-item">총 상품 금액 <span id="price_sum"><fmt:formatNumber value="${priceSum}" type="number" groupingUsed="true"/>원</span></div>
        <div class="summary-item">배송비 <span id="price_deliv"></span></div>
        <div class="summary-item">주문 쿠폰 <span id="discount_coupon"></span></div>
        <div class="summary-item">사용 포인트 <span id="discount_point"></span></div>
        <hr />
        <div class="total-amount">총 결제 금액 <span id="final_price"></span></div>
        <div class="total-point">구매 시 <span id="final_point" style="color: #ff4081;"></span></div>
    </section>

    <button class="payment-button" onclick="requestPay('${loginUser.mem_email}','${loginUser.mem_name}')">결제하기</button>
</div>

<script>
// 초기 포인트 값 설정을 위한 전역 변수
let initialUsablePoints = 0;
// 현재 포인트 값 저장을 위한 전역 변수
let currentPointValue = 0;

document.addEventListener("DOMContentLoaded", function() {
	initialUsablePoints = parseInt(document.getElementById('usable_point').textContent.replace(/[^0-9]/g, ''));
    updateSummary(0);
	
    document.getElementById("defaultAddress").addEventListener("change", function() {
        if (this.checked) {
        	document.getElementById("resiver-name").value = "${loginUser.mem_name}";
        	document.getElementById("resiver-tell").value = "${loginUser.mem_tell}";
        } else {
        	document.getElementById("resiver-name").value = "";
        	document.getElementById("resiver-tell").value = "";
        }
    });
});
</script>
<script src="/static/js/mypage/payment.js"></script>
<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>