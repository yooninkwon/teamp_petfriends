<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	mypage_body
</title>
</head>
<body>
<h2>배송조회</h2>
<div class="order-box" style="width: 60%;">
    <div class="deliv-header">
    	<c:forEach var="status" items="${orderStatuses}">
            <c:if test="${empty latestStatus || status.os_regdate > latestStatus.os_regdate}">
                <c:set var="latestStatus" value="${status}" />
            </c:if>
        </c:forEach>
        <c:choose>
            <c:when test="${latestStatus.os_name == '배송완료'}">
                <div style="font-size: 30px;">${latestStatus.os_regdate} 도착 완료</div><div>고객님이 주문하신 상품이 배송완료 되었습니다.</div>
            </c:when>
            <c:otherwise>
                <div style="font-size: 30px;">${myorder.o_expecdate} 도착 예정</div><div>고객님이 주문하신 상품이 배송중입니다.</div>
            </c:otherwise>
        </c:choose>
    </div>
	<div class="deliv-info">
		<div class="pay-info" style="border: none;">
			<div class="info-title">
				<span>배송정보</span>
				<div>수령인</div>
				<div>수령 주소</div>
			</div>
			<div class="info-content">
				<div>${order.o_resiver}</div>
				<div>${order.o_addr}</div>
			</div>
		</div>
		<div class="pay-info" style="border: none;">
			<div class="info-title">
				<span>배송메모</span>
				<div>배송지 출입방법</div>
				<div>수령 장소</div>
			</div>
			<div class="info-content">
				<div>${order.o_entry}<c:if test="${order.o_entry_detail ne null}"> (${order.o_entry_detail})</c:if></div>
				<div>${order.o_memo}</div>
			</div>
		</div>
	</div>
	<div class="deliv-detail">
		<span>시간</span>
		<span>배송상태</span>
	</div>
	<c:forEach var="status" items="${orderStatuses}">
		<div class="deliv-detail" style="border: none;">
			<span>${status.os_regdate}</span>
			<span>${status.os_name}</span>
		</div>
	</c:forEach>
</div>
</body>
</html>