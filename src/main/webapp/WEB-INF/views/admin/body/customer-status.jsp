<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>admin_body</title>
<link rel="stylesheet" href="/static/css/admin/member_status.css" />
</head>
<body>
	<div class="container">
		<div class="top">
			<h1>회원 현황 (최근 1주일)</h1>
			<table class="status">
				<tr>
					<th style="width: 25%;">신규회원</th>
					<th style="width: 25%;">방문회원</th>
					<th style="width: 25%;">탈퇴회원</th>
					<th style="width: 25%;">TOTAL</th>
				</tr>
				<tr>
					<td>${newMember }명</td>
					<td>${visitMember }명</td>
					<td>${withdrawMember }명</td>
					<td>${total }명</td>
				<tr>
			</table>
		</div>
		
		<div class="mid">
			<h1>최근 가입 회원</h1>
			<table class="recent">
				<tr>
					<th style="width: 25%;">가입날짜</th>
					<th style="width: 35%;">회원코드</th>
					<th style="width: 15%;">이름</th>
					<th style="width: 25%;">이메일</th>
				</tr>
				<c:forEach var="member" items="${newMemberList }">
					<tr>
						<td>${member.mem_regdate }</td>
						<td>${member.mem_code }</td>
						<td>${member.mem_name }</td>
						<td>${member.mem_email }</td>
					</tr>
				</c:forEach>
			</table>
		</div>
		
		<div class="bottom">
			<h1>최근 탈퇴 회원</h1>
			<table class="recent">
				<tr>
					<th style="width: 25%;">탈퇴날짜</th>
					<th style="width: 35%;">회원코드</th>
					<th style="width: 15%;">이름</th>
					<th style="width: 25%;">이메일</th>
				</tr>
				<c:forEach var="member" items="${withdrawMemberList }">
					<tr>
						<td>${member.mem_logdate }</td>
						<td>${member.mem_code }</td>
						<td>${member.mem_name }</td>
						<td>${member.mem_email }</td>
					</tr>
				</c:forEach>
			</table>
		</div>
	</div>
</body>
</html>