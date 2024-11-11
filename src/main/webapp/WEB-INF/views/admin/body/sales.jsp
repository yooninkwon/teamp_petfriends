<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/admin/sales.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
<script src="/static/js/admin/sales.js"></script>



<title>admin_body</title>
</head>
<body>
	<div class="title">
		<h3>매출 통계</h3>
	</div>
	<div class="salesTodayContainer">
		<div class="slaesTodayTextBox">
			<div class="todayText1">
				<span id="todayText1_1">오늘의 순매출 현황</span> <span id="todayText1_2"></span>
			</div>
			<div class="todayText2">
				<span id="todayText2_1"></span> <span id="todayText2_2">
				<span id="todayText2_2_total"> <fmt:formatNumber value="${result[0].amount-result[1].amount }" pattern="#,###"></fmt:formatNumber></span>원</span>
			</div>
			<div class="statsContainer">
				<div class="statsRow">
					<div class="statsItem">
						<span class="statsTitle">● 결제금액</span> 
						<span class="statsValue" id="paymentAmount"> <fmt:formatNumber value="${result[0].amount }" pattern="#,###"></fmt:formatNumber> </span>
					</div>
					<div class="statsItem">
						<span class="statsTitle">● 결제건수</span>
						<span class="statsValue">${result[0].count }</span>
					</div>
				</div>
				<div class="statsRow">
					<div class="statsItem">
						<span class="statsTitle">● 환불금액</span> 
						<span class="statsValue" id="refundAmount"> <fmt:formatNumber value="${result[1].amount }" pattern="#,###"></fmt:formatNumber> </span>
					</div>
					<div class="statsItem">
						<span class="statsTitle">● 취소/반품 수</span> 
						<span class="statsValue">${result[1].count }</span>
					</div>
				</div>
			</div>
		</div>
			<div class="slaesTodayGraph">
				<canvas id="myChart"></canvas>
			</div>
	</div>
	
	<div class=title2>
	상세 매출 현황
	</div>
	<div class="salesGraphOptionBox">
		<div class="radioGroup">
			<div class="filterTitle" id="filterType">타입</div>
			<label class="radioBtn"><input type="radio" name="type-filter" value="일별" checked>일별</label>
	        <label class="radioBtn"><input type="radio" name="type-filter" value="월별">월별</label>
		</div>
		<div class="radioGroup" id="filterDay">
			<div class="filterTitle" >기간설정</div>
			<label class="radioBtn"><input type="radio" name="type-day" value="7일" >7일</label>
	        <label class="radioBtn"><input type="radio" name="type-day" value="1개월">1개월</label>
	        <label class="radioBtn"><input type="radio" name="type-day" value="3개월">3개월</label>
	        <label class="radioBtn"><input type="radio" name="type-day" value="6개월">6개월</label>
	        <label class="radioBtn"><input type="radio" name="type-day" value="직접선택일">직접선택</label>
	        <label class="radioBtn"><input type="date" id="start-day" disabled="disabled">부터</label>
            <label class="radioBtn"><input type="date" id="end-day" disabled="disabled">까지</label>
		</div>
		<div class="radioGroup" id="filterMonth">
			<div class="filterTitle" >기간설정</div>
			<label class="radioBtn"><input type="radio" name="type-day" value="1개월" >1개월</label>
	        <label class="radioBtn"><input type="radio" name="type-day" value="3개월">3개월</label>
	        <label class="radioBtn"><input type="radio" name="type-day" value="6개월">6개월</label>
	        <label class="radioBtn"><input type="radio" name="type-day" value="직접선택월">직접선택</label>
	        <label class="radioBtn"><input type="month" id="start-month">부터</label>
            <label class="radioBtn"><input type="month" id="end-month">까지</label>
		</div>
        <div class="btnBox"><input type="button" value="검색" class="btn-style" id="searchBtn"/></div>
	</div>
	
	<div class="salesGraphResultBox">
		<div class="totalResultGraph">
			<canvas id="totalChart"></canvas>
		</div>
		<div class="totalResultText">
		<table class="product-list">
			    <thead class="thead">
			        <tr>
			            <th>일자</th>
			            <th>주문수</th>
			            <th>상품수</th>
			            <th>상품구매내역</th>
			            <th>쿠폰(차감금액)</th>
			            <th>포인트(차감금액)</th>
			            <th>결제합계</th>
			            <th>환불합계</th>
			            <th>순매출</th>
			        </tr>
			    </thead>
			    <tbody id="product-table-body">
			        <!-- 전체 매출 데이터 출력 -->
			    </tbody>
			</table>
		</div>
	
	</div>





</body>
</html>