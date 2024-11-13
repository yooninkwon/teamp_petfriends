<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
<h2>주문상세내역</h2>
<div class="order-box" style="width: 50%;">
    <div class="order-header">
    	<div>
         주문번호 ${order.o_code}
         <c:forEach var="status" items="${orderStatuses}">
             <c:if test="${status.os_name == '결제완료'}">
                 <span> | ${fn:substring(status.os_regdate, 0, 16)}</span>
             </c:if>
         </c:forEach>
    	</div>
    </div>
	<div class="item-info">
	    <div class="order-status">
	        <c:forEach var="status" items="${orderStatuses}">
	            <c:if test="${empty latestStatus || status.os_regdate > latestStatus.os_regdate}">
	                <c:set var="latestStatus" value="${status}" />
	            </c:if>
	        </c:forEach>
	        ${latestStatus.os_name}<span> ${fn:substring(latestStatus.os_regdate, 0, 16)}</span>
	    </div>
	    <c:forEach var="item" items="${items}">
	        <div class="item">
		        <img src="/static/Images/ProductImg/MainImg/${item.main_img1}" alt="${item.pro_name}" class="item-img">
		        <div class="item-details">
		            <div>${item.pro_name}</div>
		            <div class="item-light">${item.proopt_name}</div>
		            <div class="item-bold">${item.proopt_finalprice}<span class="item-light"> | ${item.cart_cnt}개</span></div>
		        </div>
	     	</div>
	    </c:forEach>
	</div>
	<div class="pay-info">
		<div class="info-title">
			<span>배송정보</span>
			<div>수령인</div>
			<div>연락처</div>
			<div>배송주소</div>
			<div>배송메모</div>
		</div>
		<div class="info-content">
			<div>${order.o_resiver}</div>
			<div>${order.o_resiver_tell}</div>
			<div>${order.o_addr}</div>
			<div>${order.o_memo}</div>
		</div>
	</div>
	<div class="pay-info">
		<div class="info-title">
			<span>결제정보</span>
			<div>결제 수단</div>
			<div>상품 금액</div>
			<div>배송비</div>
			<div>주문 쿠폰 할인</div>
			<div>사용 포인트</div>
		</div>
		<div class="info-content">
			<div>${order.o_payment}</div>
			<div><fmt:formatNumber value="${order.o_coupon + order.o_point + order.o_amount - 3000}" type="number" groupingUsed="true"/>원</div>
			<div>3,000원</div>
			<div><fmt:formatNumber value="${order.o_coupon}" type="number" groupingUsed="true"/>원</div>
			<div><fmt:formatNumber value="${order.o_point}" type="number" groupingUsed="true"/>원</div>
		</div>
	</div>
	<div class="pay-info" style="border: none;">
		<div class="info-title">
			<span>총 결제 금액</span>
		</div>
		<div class="info-content">
			<span style="color: #ff4081; margin-left: 30px;"><fmt:formatNumber value="${order.o_amount}" type="number" groupingUsed="true"/>원</span>
		</div>
	</div>
</div>
</body>
</html>