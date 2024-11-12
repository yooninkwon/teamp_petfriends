<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	admin_body
</title>
<link rel="stylesheet" href="/static/css/admin/customer_stat.css" />
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
	<div class="title" style="float: left; border-right:2px solid #ddd;">
		<h3>회원 통계</h3>
	</div>
	<div class="title" style="float: right;">
		<h3>견종/묘종 통계</h3>
	</div>
	<div class="filter" style="float: left; border-right:2px solid #ddd;">
		<input type="radio" name="dateType" checked value="day" /> 일별
		<input type="radio" name="dateType" value="week" /> 주별
		<input type="radio" name="dateType" value="month" /> 월별
	</div>
	<div class="filter" style="float: right;">
		<input type="radio" name="petType" checked value="Type" /> 펫 종류
		<input type="radio" name="petType" value="dogBreed" /> 견종
		<input type="radio" name="petType" value="catBreed" /> 묘종
	</div>
	<div class="memberChartForDate">
		<canvas id="lineChart" width="100%" height="400px" ></canvas>
	</div>
	<div class="petBreedChart">
		<canvas id="doughnutChart" width="100%" height="400px" ></canvas>
	</div>
	<div class="tableContainer">
		<div id="careInfo">
			<h2>관심사 점유율</h2> <br />
			<table id="careTable">
				<tr>
					<th>관절</th>
					<th>모질</th>
					<th>소화기</th>
					<th>눈</th>
					<th>눈물</th>
					<th>체중</th>
					<th>치아</th>
					<th>피부</th>
					<th>신장</th>
					<th>귀</th>
					<th>심장</th>
					<th>호흡기</th>
					<th>기타</th>
				</tr>
				<tr>
					<td>1</td>
					<td>2</td>
					<td>4</td>
					<td>22</td>
					<td>5</td>
					<td>223</td>
					<td>44</td>
					<td>23</td>
					<td>1</td>
					<td>2</td>
					<td>1234</td>
					<td>23</td>
					<td>23</td>
				</tr>
			</table>
		</div>
		<div id="total">
			<h2>TOTAL</h2> <br />
			<div id="memberTotal">
				<h2 style="font-size: 25px; color: gray;">총 회원</h2><h2 id="mem_total"></h2>
			</div>
			<div id="petTotal">
				<h2 style="font-size: 25px; color: gray;">총 반려동물</h2><h2 id="pet_total"></h2>
			</div>
		</div>
		<div id="newCustomer">
			<h2>최근 가입</h2> <br />
			<table id="newCustomer_table">
				<tr>
					<th style="width: 10%;">가입일</th>
					<th style="width: 20%;">회원 코드</th>
					<th style="width: 10%;">이름</th>
					<th style="width: 10%;">닉네임</th>
					<th style="width: 10%;">전화번호</th>
					<th style="width: 10%;">이메일</th>
					<th style="width: 5%;">성별</th>
				</tr>
				<c:forEach var="member" items="${newMemberList }">
				<tr>
					<td><fmt:formatDate value="${member.mem_regdate}" pattern="yyyy-MM-dd" /></td>
					<td>${member.mem_code }</td>
					<td>${member.mem_name }</td>
					<td>${member.mem_nick }</td>
					<td>${member.mem_tell }</td>
					<td>${member.mem_email }</td>
					<td>${member.mem_gender }</td>
				</tr>
				</c:forEach>
			</table>
		</div>
		
	</div>

<script src="/static/js/admin/customer_stat.js"></script>
</body>
</html>