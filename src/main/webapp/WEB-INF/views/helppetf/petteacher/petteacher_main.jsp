<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫티쳐</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/helppetf/petteacher_main.css" />
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<h1>펫티쳐</h1>

	<a href="/helppetf/find/pet_hospital">주변 동물병원 찾기</a> &nbsp;
	<a href="/helppetf/find/pet_facilities">주변 반려동물 시설 찾기</a> &nbsp;
	<a href="/helppetf/adoption/adoption_main">입양 센터</a> &nbsp;
	<a href="/helppetf/petteacher/petteacher_main">펫티쳐</a> &nbsp;
	<hr />
	<!-- 임시: admin page 이동 -->
	<a href="/admin/admin_petteacher">임시 링크: 펫티쳐 어드민 페이지 이동</a>
	<br />
	<br />
	<div id="filter_form">
		<form action="#">
			<select id="petType" name="petType">
				<option disabled selected>동물종류</option>
				<option value="cat">고양이</option>
				<option value="dog">강아지</option>
				<option value="etc">기타 동물</option>
			</select> <select id="category" name="category">
				<option disabled selected>카테고리</option>
				<option value="1">훈련</option>
				<option value="2">건강</option>
				<option value="3">습관</option>
				<option value="4">관찰</option>
				<option value="5">케어</option>
				<option value="6">생활</option>
			</select>
			<button id="filterSubmit">검색</button>
			<button id="filterReset">선택 초기화</button>
		</form>
	</div>

	<div class="video-grid" id="videoContainer">
		<!-- 데이터 테이블 -->
	</div>
	<div id="pagination">
		<!-- 페이징 -->
	</div>
	<script type="module" src="/static/js/helppetf/petteacher_main.js"></script>

	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>