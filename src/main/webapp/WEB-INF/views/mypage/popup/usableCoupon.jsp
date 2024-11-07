<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>사용가능쿠폰</title>
<script src="https://kit.fontawesome.com/6c32a5aaaa.js" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/mypage/mypage2.css">
</head>
<body>
<h4 style="text-align: center;">사용가능쿠폰</h4>

<div class="coupon-container">
	<c:forEach items="${mycoupons }" var="coupons">
		<div class="coupon-card">
			<div class="coupon-info">
				<h4 class="coupon-name">${coupons.cp_name}</h4>
				<div class="coupon-discount">
					<c:choose>
						<c:when test="${coupons.cp_type == 'A'}">
							<span><fmt:formatNumber value="${coupons.cp_amount}"  type="number" groupingUsed="true" />원</span>
						</c:when>
						<c:when test="${coupons.cp_type == 'R'}">
							<span>${coupons.cp_amount}%</span>
						</c:when>
					</c:choose>
				</div>
				<p style="margin: 5px 0;">사용기간: ${coupons.cp_dead} 까지</p>
			</div>
			<button class="coupon-btn" onclick="couponUse('${coupons.cp_name}', '${coupons.cp_type}', ${coupons.cp_amount})">사용하기<i class="fa-solid fa-check" style="color: #ffffff;"></i></button>
		</div>
	</c:forEach>
</div>

<script src="/static/js/mypage/payment.js"></script>
</body>
</html>