<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫호텔</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/helppetf/pethotel_main.css" />
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
	<div class="container">
		<div class="top-section">
			<div class="text-content">
				<h1>펫호텔 서비스를 소개합니다!</h1>
				<!-- DB 데이터 출력으로 변경하기 -->
				<p>
					집을 오래 비울 일이 있으신 집사님들,<br> 반려동물과 특별한 시간을 보내고 싶으신 집사님들!<br>
					집사님들의 고민을 해결하기 위해 탄생했습니다!
				</p>
				<p>
					반려 동물 호텔, <strong>펫호텔</strong> 서비스는<br> 펫프렌즈가 직접 관리하여<br>
					안심하고 맡겨주실 수 있는 호텔링 서비스입니다.
				</p>
			</div>
			<img src="/static/images/helppetf/pethotel/pet_hotel.png" alt="펫호텔 로고" class="pethotel_img">
		</div>

		<div class="middle-section">
			<h2>이용안내</h2>
			<ul>
				<li>1. 로그인이 필요한 서비스입니다.</li>
				<li>2. 날짜를 지정하여 예약 신청을 하실 수 있습니다.<br> <span
					class="small-text">(*펫호텔 내 다른 투숙객이 많으면 예약이 안될 가능성이 있습니다!)</span></li>
				<li>3. 펫호텔 내 캠을 통해 멀리서도 함께하실 수 있습니다!</li>
			</ul>
		</div>
		<div class="more_info">
			<a href="/helppetf/pethotel/pethotel_info">자세히보기 &gt;</a>
		</div>

		<div class="bottom-section">
			<a href="/helppetf/pethotel/pethotel_petcam" class="button" id="left">펫캠 보기</a> 
			<a href="/helppetf/pethotel/pethotel_reserve" class="button" id="right">예약하러 가기</a>
		</div>
	</div>

	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>