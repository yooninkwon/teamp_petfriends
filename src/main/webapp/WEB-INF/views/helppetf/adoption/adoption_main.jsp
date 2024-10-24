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
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<jsp:include page="/WEB-INF/views/include_jsp/helppetf_sub_navbar.jsp" />
	<script>
		$(document).ready(
				function() {
					document.getElementById('${main_navbar_id }').classList
							.add('selected');
					document.getElementById('${sub_navbar_id }').classList
							.add('selected');
				});
	</script>
	<!--
	누른 값을 전송할 때 해당하는 값의 필터링 제공
	눌렀던 값을 페이지를 다시 불러왔을때 유지시키면 좋을 듯
	시군구: 누른 도시에 대한 시,군,구만 나오게끔
	품종: 고양이를 눌렀을 땐 고양이의 품종만, 강아지를 눌렀을 땐 강아지의 품종만
		  동물 종류가 아무것도 안눌려있으면 전체 품종
 	-->
	<!-- 필터 div -->
	<div id="filter_form">
		<div>
			<svg width="12" height="13" viewBox="0 0 12 13" fill="none"
				xmlns="http://www.w3.org/2000/svg" style="margin-top: 0.25rem;">
				<mask id="path-1-inside-1_82_11791" fill="white">
				<path
					d="M0.299757 1.6247C-0.224054 0.969933 0.242119 0 1.08062 0H10.9194C11.7579 0 12.2241 0.969932 11.7002 1.6247L8.33333 5.83333V11.2153C8.33333 11.9587 7.55102 12.4422 6.88612 12.1097L4.21945 10.7764C3.88067 10.607 3.66667 10.2607 3.66667 9.88197V5.83333L0.299757 1.6247Z"></path></mask>
				<path
					d="M0.299757 1.6247C-0.224054 0.969933 0.242119 0 1.08062 0H10.9194C11.7579 0 12.2241 0.969932 11.7002 1.6247L8.33333 5.83333V11.2153C8.33333 11.9587 7.55102 12.4422 6.88612 12.1097L4.21945 10.7764C3.88067 10.607 3.66667 10.2607 3.66667 9.88197V5.83333L0.299757 1.6247Z"
					fill="currentColor"></path>
				<path
					d="M8.33333 5.83333L7.3182 5.02123L7.03333 5.37732V5.83333H8.33333ZM3.66667 5.83333H4.96667V5.37732L4.6818 5.02123L3.66667 5.83333ZM11.7002 1.6247L12.7154 2.4368L11.7002 1.6247ZM4.21945 10.7764L4.80083 9.61364L4.21945 10.7764ZM1.08062 1.3H10.9194V-1.3H1.08062V1.3ZM10.6851 0.812592L7.3182 5.02123L9.34846 6.64544L12.7154 2.4368L10.6851 0.812592ZM4.6818 5.02123L1.31489 0.812593L-0.715372 2.4368L2.65154 6.64544L4.6818 5.02123ZM7.03333 5.83333V11.2153H9.63333V5.83333H7.03333ZM7.4675 10.947L4.80083 9.61364L3.63807 11.9391L6.30474 13.2725L7.4675 10.947ZM4.96667 9.88197V5.83333H2.36667V9.88197H4.96667ZM7.03333 11.2153C7.03333 10.9923 7.26803 10.8472 7.4675 10.947L6.30474 13.2725C7.83401 14.0371 9.63333 12.9251 9.63333 11.2153H7.03333ZM10.9194 1.3C10.6678 1.3 10.528 1.00902 10.6851 0.812592L12.7154 2.4368C13.9201 0.930844 12.8479 -1.3 10.9194 -1.3V1.3ZM4.80083 9.61364C4.90247 9.66446 4.96667 9.76834 4.96667 9.88197H2.36667C2.36667 10.7531 2.85887 11.5495 3.63807 11.9391L4.80083 9.61364ZM1.08062 -1.3C-0.847944 -1.3 -1.92013 0.930848 -0.715372 2.4368L1.31489 0.812593C1.47203 1.00902 1.33218 1.3 1.08062 1.3V-1.3Z"
					fill="currentColor" mask="url(#path-1-inside-1_82_11791)"></path></svg>
			&nbsp; <span>필터로 인연 찾아보기 </span> <br /> <br />
			<form action="#">
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
				<button type="button" id="filterReset">선택 초기화</button>
			</form>
		</div>
	</div>
	<div class="adoption-container" id="adoptionContainer">
		<!-- 데이터 테이블 -->
	</div>

	<div class="pagination" id="pagination">
		<!-- 페이징 -->
	</div>

	<script type="module" src="/static/js/helppetf/adoption_main.js"></script>

	<!-- @ TODO: 페이징, 필터링, 상세 페이지 등 -->


	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>