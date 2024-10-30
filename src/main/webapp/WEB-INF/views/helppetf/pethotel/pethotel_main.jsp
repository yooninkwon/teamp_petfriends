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
				<p>${dto.intro_line1 }<br> 
					${dto.intro_line2 }<br>
					${dto.intro_line3 }</p>
				<p>반려 동물 호텔, <strong>펫호텔</strong> 서비스는<br> 
					${dto.intro_line4 }<br>
					${dto.intro_line5 }</p>
			</div>
			<img src="/static/images/helppetf/pethotel/pet_hotel.png" alt="펫호텔 로고" class="pethotel_img">
		</div>

		<div class="middle-section">
			<h2>이용안내</h2>
			<ul>
				<li>${dto.intro_line6 }</li>
				<li>${dto.intro_line7 }<br />
					<span class="small-text">${dto.intro_line8 }</span></li>
				<li>${dto.intro_line9 }</li>
			</ul>
		</div>
		<div class="more_info">
			<a href="/helppetf/pethotel/pethotel_info">자세히보기 &gt;</a>
		</div>

		<div class="bottom-section">
		
				
			<a href="http://172.16.4.10:5500/" 
			onclick="window.open(this.href, '_blank', 'status=no ,location=no, directoryies=no, resizable=no, scrollbars=yes, titlebar=no,width=430, height=330'); return false;" class="button" id="left">
			펫캠 보기</a> 
			<a href="/helppetf/pethotel/pethotel_reserve" class="button" id="right">예약하러 가기</a>
		</div>
	</div>

	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>