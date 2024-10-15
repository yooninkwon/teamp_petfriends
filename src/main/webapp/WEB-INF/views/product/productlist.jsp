<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫프렌즈</title>

<!-- 헤더푸터 css,sc -->
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />

<!-- 상품카테고리+필터메뉴바 css,sc -->

<link rel="stylesheet" href="/static/css/ProductList.css" />
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="/static/js/ProductList.js"></script>

</head>

<body>

	<!-- 헤더 -->
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<!-- 상품카테고리+필터메뉴바 css,sc -->
	<div class="category">
		<button type="button" class="filter1" id="강아지">강아지</button>
		<button type="button" class="filter1" id="고양이">고양이</button>
		<span class="separator">|</span>
		<button type="button" class="filter2" id="사료">사료</button>
		<button type="button" class="filter2" id="간식">간식</button>
		<button type="button" class="filter2" id="용품">용품</button>
	</div>
	<div class="category2" id="category2">
		<!-- 세부버튼 여기에 추가됨 -->
	</div>
	<div class="reset">
	<img src="/static/Images/ProductImg/ProImg/filterimg.png" alt="" />
	<span>필터로 내새꾸 맘마 찾기</span>
	<button type="button" class="resetbtn" id="resetbtn">초기화◁</button>
	</div>
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>