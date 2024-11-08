<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>admin_body</title>
<link rel="stylesheet" href="/static/css/admin/customer.css" />
</head>
<body>
	<div class="title">
		<h3>회원 정보 조회</h3>
	</div>

	<!-- 게시글 등록 -->
	<div id="customer">
		<!-- 필터링 영역 -->
		<div class="tab-section">
			<button class="tab-btn active" data-tab="customer-container">회원
				조회/관리</button>
			<button class="tab-btn" data-tab="customer-point-container">회원
				적립금</button>
			<button class="tab-btn" data-tab="mypet-container">내새꾸 조회</button>
		</div>

		<div class="search-group" style="width: 100%;">
			<div class="filter-title">개인정보</div>
			<select name="" id="sk" style="margin-left: 5px;">
				<option value="이름" checked>이름</option>
				<option value="닉네임">닉네임</option>
				<option value="회원코드">회원코드</option>
				<option value="이메일">이메일</option>
				<option value="이름">이름</option>
				<option value="전화번호">전화번호</option>
			</select> <input type="search" name="titleSearch" id="titleSearch" />
		</div>
		<div class="search-group" style="float: left;">
			<div class="filter-title">회원등급</div>
			<select name="" id="grade" style="margin-left: 5px;">
				<option value="0" checked>전체</option>
				<option value="1">설렘시작</option>
				<option value="2">몽글몽글</option>
				<option value="3">두근두근</option>
				<option value="4">콩닥콩닥</option>
				<option value="5">심쿵주의</option>
				<option value="6">평생연분</option>
			</select>
		</div>
		<div class="search-group" style="float: right;">
			<div class="filter-title">회원유형</div>
			<input type="radio" name="type" value="전체" checked />전체 <input
				type="radio" name="type" value="일반" />일반회원 <input type="radio"
				name="type" value="탈퇴" />탈퇴회원 <input type="radio" name="type"
				value="휴먼" />휴면회원 <input type="radio" name="type" value="관리" />관리회원
		</div>
		<div class="search-group" style="float: left;">
			<div class="filter-title">가입날짜</div>
			<input type="date" name="regdate" id="regdate" />
		</div>
		<div class="search-group">
			<div class="filter-title">접속날짜</div>
			<input type="date" name="logdate" id="logdate" />
		</div>
		<div class="search-group" style="float: left;">
			<div class="filter-title">구매금액</div>
			<select name="" id="grade" style="margin-left: 5px;">
				<option value="0" checked>전체</option>
				<option value="1">~10만원</option>
				<option value="2">~100만원</option>
				<option value="3">~500만원</option>
				<option value="4">~1000만원</option>
				<option value="5">1000만원 초과</option>
			</select>
		</div>
		<div class="search-group">
			<div class="filter-title">성별</div>
			<input type="radio" name="gender" value="" checked />전체 <input
				type="radio" name="gender" value="M" />남성 <input type="radio"
				name="gender" value="F" />여성
		</div>

		<div class="search-group" style="width: 100%; height: 50px;">
			<button id="searchBtn">검색</button>
		</div>


		<!-- 리스트 영역 -->
		<div id="customer-list-container"
			class="customer-list-container tab-content">
			<div class="array-section">
				<!-- 정렬 드롭다운 -->
				<select id="sort-order">
					<option value="가입날짜">가입날짜</option>
					<option value="접속날짜">접속날짜</option>
					<option value="구매금액">누적 구매금액</option>
				</select>

				<!-- 신규등록 버튼 -->
				<button class="btn-style">문자보내기</button>
				<button class="btn-style">회원 강제탈퇴</button>
				<button id="updateCare" class="btn-style">관리회원 설정</button>
			</div>
			<!-- 공지사항 리스트 테이블 -->
			<table class="customer-list">
				<thead class="thead">
					<tr>
						<th style="width: 2%;"><input type="checkbox"
							name="selectAll" class="selectAll" /></th>
						<th style="width: 8%;">가입일</th>
						<th style="width: 8%;">마지막 접속 일</th>
						<th style="width: 18%;">회원 코드</th>
						<th style="width: 7%;">이름</th>
						<th style="width: 9%;">닉네임</th>
						<th style="width: 7%;">등급</th>
						<th style="width: 10%;">전화번호</th>
						<th style="width: 15%;">이메일</th>
						<th style="width: 5%;">성별</th>
						<th style="width: 10%;">회원 유형</th>
					</tr>
				</thead>
			</table>
			<div id="pagination">
				<!-- 페이징 -->
			</div>
		</div>


	</div>
	
	<!-- Popup Modal -->
	<div id="memberTypePopup" class="popup-modal" style="display: none;">
	    <div class="popup-content">
	        <span class="close-btn" onclick="closePopup()">&times;</span>
	        <h3>회원 유형 변경</h3>
	        <div id="selectedMembersContainer">
	            <!-- 선택된 회원 정보가 여기에 표시됩니다 -->
	        </div>
	        <label for="newMemberType">회원 유형 선택:</label>
	        <select id="newMemberType">
	            <option value="일반">일반</option>
	            <option value="탈퇴">탈퇴</option>
	            <option value="휴면">휴면</option>
	            <option value="관리">관리</option>
	        </select>
	        <button id="updateMemberTypeBtn">변경</button>
	    </div>
	</div>

	<script src="/static/js/admin/customer-info.js"></script>
</body>
</html>