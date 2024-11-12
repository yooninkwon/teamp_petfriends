<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
<h2>펫호텔 예약내역</h2>
<div class="coupon-container">
<div id="reserveList" class="on">
	<div class="form-col">
	    <h3>전체 예약 내역 
	    <button class="orderAllItem" onclick="location.href='/helppetf/pethotel/pethotel_main'">예약하러 가기</button>
   	   	</h3>
	</div>
	    <table id="pethotel-table" class="pethotel-table" style="text-align: center;">
	        <thead>
	            <tr>
	                <th>예약번호</th>
	                <th>마리 수</th>
	                <th>예약시작일</th>
	                <th>예약종료일</th>
	                <th>예약등록일</th>
	                <th>상태</th>
	            </tr>
	        </thead>
	        <tbody>
				<!-- 예약 리스트 -->
	        </tbody>
	    </table>
	    <div id="pagination" class="pagination">
	    	<!-- 페이징 -->
	    </div>
	    <br />

	</div>
</div>

<div id="reserveDetail" class="off">
	<!-- 예약 상세정보 -->
	<h3>
		예약 상세 정보
		<button class="orderAllItem" id="cancelReserve" data-reserveno="0" data-status="-">예약 취소하기</button>
	</h3>
    <hr />
		<div id="reserveDetailMemTable">
			<!-- 상세정보의 멤버 -->
			<table style="text-align: center;" class="cart-table" id="reserveList">
				<thead class="thead">
					<tr>
						<th>예약 코드</th>
						<th>마리 수</th>
						<th>예약 시작일</th>
						<th>예약 종료일</th>
						<th>예약 상태</th>
						<th>예약 승인일</th>
						<th>예약 거절 사유</th>
					</tr>
				</thead>
				<tbody id="reserveDetailMem">
				
				</tbody>
				
			</table>
		</div>
		<h3>예약 펫 목록</h3>
		<div id="reserveDetailListTable"  class="cart-table">
			<!-- 상세정보의 펫 목록 -->
			<table id="reserveDetailList">
				
			</table>
			<button class="goBack orderAllItem">목록으로</button>
		</div>
</div>

<script src="/static/js/mypage/mypage_pethotel.js"></script>
</body>
</html>