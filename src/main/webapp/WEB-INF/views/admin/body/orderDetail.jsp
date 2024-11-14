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
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/admin/order.css">
<title>
	admin_body
</title>
</head>
<body>
<div class="title"><h3>주문 현황</h3></div>

<div class="filter-section-1">
    <div class="filter-title">결제코드</div>
    <div style="margin-left: 10px;">${order.o_code }</div>
</div>

<h4 class="info-title">주문현황</h4>
<table class="order-list">
    <thead class="thead">
        <tr>
            <th>주문상태</th>
            <th><span class="completed">결제완료</span></th>
            <th><span class="delivered">배송준비중</span></th>
            <th><span class="delivered">배송중</span></th>
            <th><span class="delivered">배송완료</span></th>
            <th><span class="confirmed">구매확정</span></th>
            <th><span class="canceled">주문취소</span></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>일시</th>
            <td><c:forEach var="status" items="${orderStatuses}"><c:if test="${status.os_name == '결제완료'}"><fmt:formatDate value="${status.os_regdate}" pattern="yyyy-MM-dd HH:mm:ss" /></c:if></c:forEach></td>
            <td><c:forEach var="status" items="${orderStatuses}"><c:if test="${status.os_name == '배송준비중'}"><fmt:formatDate value="${status.os_regdate}" pattern="yyyy-MM-dd HH:mm:ss" /></c:if></c:forEach></td>
            <td><c:forEach var="status" items="${orderStatuses}"><c:if test="${status.os_name == '배송중'}"><fmt:formatDate value="${status.os_regdate}" pattern="yyyy-MM-dd HH:mm:ss" /></c:if></c:forEach></td>
            <td><c:forEach var="status" items="${orderStatuses}"><c:if test="${status.os_name == '배송완료'}"><fmt:formatDate value="${status.os_regdate}" pattern="yyyy-MM-dd HH:mm:ss" /></c:if></c:forEach></td>
            <td><c:forEach var="status" items="${orderStatuses}"><c:if test="${status.os_name == '구매확정'}"><fmt:formatDate value="${status.os_regdate}" pattern="yyyy-MM-dd HH:mm:ss" /></c:if></c:forEach></td>
            <td><c:forEach var="status" items="${orderStatuses}"><c:if test="${status.os_name == '주문취소'}"><fmt:formatDate value="${status.os_regdate}" pattern="yyyy-MM-dd HH:mm:ss" /></c:if></c:forEach></td>
        </tr>
    </tbody>
</table>

<h4 class="info-title">결제정보</h4>
<table class="order-list">
    <thead class="thead">
        <tr>
            <th>상품/옵션</th>
            <th>상품금액</th>
            <th>수량</th>
            <th>구매금액</th>
            <th>총 구매금액</th>
            <th>배송비</th>
            <th>쿠폰 할인</th>
            <th>포인트 할인</th>
            <th>결제금액</th>
            <th>결제수단</th>
        </tr>
    </thead>
    <tbody>
        <c:forEach var="item" items="${items}" varStatus="status">
	        <tr>
	            <td>${item.pro_name} / ${item.proopt_name}</td>
	            <td><fmt:formatNumber value="${item.proopt_finalprice}"  type="number" groupingUsed="true" /></td>
	            <td>${item.cart_cnt}</td>
	            <td><fmt:formatNumber value="${item.proopt_finalprice * item.cart_cnt}"  type="number" groupingUsed="true" /></td>
	            
	            <!-- 첫 번째 행에만 합계 정보 표시 -->
	            <c:if test="${status.index == 0}">
	                <td rowspan="${fn:length(items)}"><fmt:formatNumber value="${order.o_coupon + order.o_point + order.o_amount}"  type="number" groupingUsed="true" /></td>
	                <td rowspan="${fn:length(items)}">3,000원</td>
	                <td rowspan="${fn:length(items)}">
	                    <c:choose>
	                        <c:when test="${order.o_coupon != 0}">
	                            <a href="/admin/coupon?orderCode=${order.o_code}"><fmt:formatNumber value="${order.o_coupon}"  type="number" groupingUsed="true" /></a>
	                        </c:when>
	                        <c:otherwise>
	                            <fmt:formatNumber value="${order.o_coupon}"  type="number" groupingUsed="true" />
	                        </c:otherwise>
	                    </c:choose>
	                </td>
	                <td rowspan="${fn:length(items)}"><fmt:formatNumber value="${order.o_point}"  type="number" groupingUsed="true" /></td>
	                <td rowspan="${fn:length(items)}"><fmt:formatNumber value="${order.o_amount}"  type="number" groupingUsed="true" /></td>
	                <td rowspan="${fn:length(items)}">${order.o_payment}</td>
	            </c:if>
	        </tr>
	    </c:forEach>
    </tbody>
</table>

<h4 class="info-title">배송정보</h4>
<table class="order-list">
    <thead class="thead">
        <tr>
            <th>주문자명</th>
            <th>주문자 연락처</th>
            <th>수령인명</th>
            <th>수령인 연락처</th>
            <th>배송지</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${order.mem_name }</td>
            <td>${order.mem_tell }</td>
            <td>${order.o_resiver }</td>
            <td>${order.o_resiver_tell }</td>
            <td>${order.o_addr }</td>
        </tr>
    </tbody>
</table>
<table class="order-list">
    <thead class="thead">
        <tr>
            <th>배송지 출입방법</th>
            <th>배송지 출입방법 상세</th>
            <th>배송 메모</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${order.o_entry }</td>
            <td>${order.o_entry_detail }</td>
            <td>${order.o_memo }</td>
        </tr>
    </tbody>
</table>

<h4 class="info-title">취소정보</h4>
<table class="order-list">
    <thead class="thead">
        <tr>
            <th>취소사유</th>
            <th>취소사유 상세</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${order.o_cancel }</td>
            <td>${order.o_cancel_detail }</td>
        </tr>
    </tbody>
</table>
</body>
</html>