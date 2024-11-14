<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>	
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주변 동물병원 찾기</title>
<script src="https://kit.fontawesome.com/6c32a5aaaa.js" crossorigin="anonymous"></script>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/helppetf/helppetf_find.css" />
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey }&libraries=services"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<jsp:include page="/WEB-INF/views/include_jsp/helppetf_sub_navbar.jsp" />
	<script>
		let main_navbar_id = `${main_navbar_id }`;
		let sub_navbar_id = `${sub_navbar_id }`;
		let pageName = `${sub_navbar_id }`;
	</script>
	<div class="my_adress">
		<div class="my_adress_wrap">
			<div class="my_adress_box">

			</div>
			<button class="search_btn" data-isOn="off">다른 주소로 찾아보기</button>
			<div class="change_adress_wrap">
				<div class="title">주소</div>
				<div class="search_wrap">
					<div class="search_input"></div>
					<ul class="search_list"></ul>
				</div>
			</div>
		</div>
	</div>
		<div class="map_wrap">
		<div>
			<div id="map"
			style="width: 1000px; height: 500px; position: relative; overflow: hidden;"></div>

			<div id="menu_wrap" class="bg_white">
				<ul id="placesList"></ul>
				<div id="pagination"></div>
			</div>
		</div>
	</div>
	<div id="road-view-modal" class="off">
		<div id="road-view-container">
		<span id="road-view-title"></span>
		<span class="close-btn"><i class="fa-solid fa-xmark"></i></span>
			<div id="road-view">
			<!-- 로드뷰 -->
			</div>
			<span><br />로드뷰가 정확하지 않을 수 있습니다.</span>
		</div>
	</div>
	<div class="click-info">
		<span>각 마커 혹은 결과 리스트를 클릭하시면, 카카오맵에서 제공하는 로드뷰를 보실 수 있습니다.</span>
	</div>
	<script src="/static/js/helppetf/find.js"></script>
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>