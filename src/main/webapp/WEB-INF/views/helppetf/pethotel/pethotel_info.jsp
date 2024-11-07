<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫호텔</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/helppetf/pethotel_info.css" />
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<jsp:include page="/WEB-INF/views/include_jsp/helppetf_sub_navbar.jsp" />
	<script>
		let mem_login = `${sessionScope.loginUser.mem_nick }`;
		let main_navbar_id = `${main_navbar_id }`;
		let sub_navbar_id = `${sub_navbar_id }`;
	</script>

    <div class="container">
    <!-- DB 데이터 불러오는것으로 바꾸기 -->
        <!-- 상단 섹션 -->
        <div class="top-section">
        	<div class="back_link">
            	<a href="/helppetf/pethotel/pethotel_main" class="back-link">&lt; 돌아가기</a>
            </div>
            <h1>펫호텔 서비스를 소개합니다!</h1>
        </div>

        <!-- 이용 안내 섹션 -->
        <div class="content-section">
            <h2>이용안내</h2>

            <!-- 공동 사항 -->
            <h3>공통사항</h3>
            <p>${dto.info_line1 }<br />
               ${dto.info_line2 }</p>

            <!-- 반려견 공통사항, 예약과 입퇴실 -->
            <h3>반려견 공통사항, 예약과 입퇴실</h3>
            <ul>
                <li>${dto.info_line3 }</li>
                <li>${dto.info_line4 }</li>
                <li>${dto.info_line5 }</li>
                <li>${dto.info_line6 }</li>
            </ul>

            <h3>입실 불가능 아이</h3>
            <ul>
                <li>${dto.info_line7 }</li>
                <li>${dto.info_line8 }</li>
                <li>${dto.info_line9 }</li>
                <li>${dto.info_line10 }</li>
            </ul>

            <h3>반려묘 공통사항, 예약과 입퇴실</h3>
            <ul>
                <li>${dto.info_line11 }</li>
                <li>${dto.info_line12 }</li>
                <li>${dto.info_line13 }</li>
                <li>${dto.info_line14 }</li>
            </ul>

            <h3>입실 불가능 아이</h3>
            <ul>
                <li>${dto.info_line15 }</li>
                <li>${dto.info_line16 }</li>
            </ul>
        </div>

        <!-- 하단 버튼 -->
        <div class="bottom-section">
            <a href="#" id="right" class="button">예약하러 가기</a>
        </div>
    	<div class="back_link">
          	<a href="/helppetf/pethotel/pethotel_main" class="back-link">&lt; 돌아가기</a>
        </div>
    </div>
    
    	<!-- 로그인이 필요합니다 팝업 -->
	<div id="loginPopup" class="popup-overlay">
		<div class="popup-content-login">
			<p>로그인이 필요해요</p>
			<button id="loginBtn" class="popup-btn">로그인 하러가기</button>
			<button id="closeBtn" class="popup-btn">닫기</button>
		</div>
	</div>
    
	<script src="/static/js/helppetf/pethotel_main.js"></script>
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>