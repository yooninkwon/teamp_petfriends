<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
				<span id="todayText2_2_total">9999</span>원</span>
			</div>
			<div class="statsContainer">
				<div class="statsRow">
					<div class="statsItem">
						<span class="statsTitle">● 결제금액</span> 
						<span class="statsValue" id="paymentAmount">3921</span>
					</div>
					<div class="statsItem">
						<span class="statsTitle">● 결제건수</span>
						<span class="statsValue">27</span>
					</div>
				</div>
				<div class="statsRow">
					<div class="statsItem">
						<span class="statsTitle">● 환불금액</span> 
						<span class="statsValue" id="refundAmount">29812</span>
					</div>
					<div class="statsItem">
						<span class="statsTitle">● 취소/교환/반품 수</span> 
						<span class="statsValue">3</span>
					</div>
				</div>
			</div>
	




		</div>

		<div class="slaesTodayGraph">
		<canvas id="myChart"></canvas>

		</div>

	</div>






</body>
</html>