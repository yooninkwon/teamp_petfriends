<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>입양 센터</title>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/helppetf/adoption_main.css" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<h1>입양 센터</h1>

	<a href="/helppetf/find/pet_hospital">주변 동물병원 찾기</a> &nbsp;
	<a href="/helppetf/find/pet_facilities">주변 반려동물 시설 찾기</a> &nbsp;
	<a href="/helppetf/adoption/adoption_main">입양 센터</a> &nbsp;
	<a href="/helppetf/petteacher/petteacher_main">펫티쳐</a> &nbsp;
	<!--
	누른 값을 전송할 때 해당하는 값의 필터링 제공
	눌렀던 값을 페이지를 다시 불러왔을때 유지시키면 좋을 듯
	시군구: 누른 도시에 대한 시,군,구만 나오게끔
	품종: 고양이를 눌렀을 땐 고양이의 품종만, 강아지를 눌렀을 땐 강아지의 품종만
		  동물 종류가 아무것도 안눌려있으면 전체 품종
 	-->
	<div id="filter_form">
		<span>필터로 인연 찾아보기 </span> <br />
		<form action="/helppetf/adoption/sendFilterFormParam">
			<!-- 도시 -->
			<select name="upr_cd" id="upr_cd">
				<option value='any' selected>시, 도</option>
				<option value='6110000'>서울특별시</option>
				<option value='6260000'>부산광역시</option>
				<option value='6270000'>대구광역시</option>
				<option value='6280000'>인천광역시</option>
				<option value='6290000'>광주광역시</option>
				<option value='5690000'>세종특별자치시</option>
				<option value='6300000'>대전광역시</option>
				<option value='6310000'>울산광역시</option>
				<option value='6410000'>경기도</option>
				<option value='6530000'>강원특별자치도</option>
				<option value='6430000'>충청북도</option>
				<option value='6440000'>충청남도</option>
				<option value='6540000'>전북특별자치도</option>
				<option value='6460000'>전라남도</option>
				<option value='6470000'>경상북도</option>
				<option value='6480000'>경상남도</option>
				<option value='6500000'>제주특별자치도</option>
			</select> 
			<!-- 시/군/구 선택 -->
			<select id="org_cd" name="org_cd">
				<option value="any" selected>시, 군, 구</option>
				<option value="any">지역을 먼저 골라주세요</option>
			</select> 

			<!-- 동물 종류 선택 -->
			<select id="upKind" name="upKind">
				<option value="any" selected>동물종류</option>
				<option value="417000">강아지</option>
				<option value="422400">고양이</option>
				<option value="429900">기타</option>
			</select> 

			<!-- 품종 선택 -->
			<select id="kind" name="kind">
				<option value="any" selected>품종</option>
				<option value="any">동물종류를 먼저 골라주세요</option>
			</select> 

			<!-- 검색 버튼 -->
			<button type="button" id="filterSubmit">검색</button>
		</form>
	</div>
	<div class="adoption-container" id="adoptionContainer">
		<!-- 데이터가 채워지는 곳 -->
	</div>

	<div class="pagination" id="pagination">
		<!-- 페이지네이션 -->

		<%-- 		<c:forEach begin="1" end="10" var="i">

		</c:forEach> --%>

	</div>
	<script type="module" src="/static/js/helppetf/adoption_main.js"></script>
	
	<!-- @ TODO: 페이징, 필터링, 상세 페이지 등 -->


	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>