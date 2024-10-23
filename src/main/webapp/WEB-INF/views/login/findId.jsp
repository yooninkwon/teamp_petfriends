<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/login/findIdAndPw.css" />
<script src="/static/js/findId.js"></script>
</head>
<body>
    <jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
    <div class="find-container">
        <div class="find-tabs">
            <a href="findId"  class="active">
            아이디 찾기
            </a>
            <a href="findPw">
            비밀번호 찾기
            </a>
        </div>
        
        <!-- 팝업 배경 -->
        <div id="popupBackground" style="display:none; position:fixed; top:0; left:0; width:100%;
         height:100%; background-color:rgba(0,0,0,0.5); z-index:999;"></div>
        <!-- 팝업 -->
		<div id="popup" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%);
		 width:400px; height:300px; background-color:#fff; padding:20px; z-index:1000;
		 box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
		    <div class="popup-content">
		        <span id="popup-close">&times;</span>
		        <h3 style='margin-top: 30px; font-size: 20px;'>회원님의 아이디(E-mail)</h3>
		        <p style='margin-top: 60px; font-size: 25px;' id="userEmail"></p>
		        <button id="loginBtn">로그인</button>
		        <button id="findPwBtn">비밀번호찾기</button>
		    </div>
		</div>

        <form class="find-form" id="findIdForm">
            <div class="form-group">
                <label for="name">이름</label>
                <input type="text" id="name" name="name" placeholder="이름을 입력해주세요">
            </div>

            <div class="form-group">
                <label for="phoneNumber">휴대폰 번호</label>
                <input type="text" id="phoneNumber" name="phoneNumber" placeholder="'-'를 제외한 숫자만 입력해주세요">
                <button type="button" id="requestCodeBtn" name="requestCodeBtn" disabled>인증번호 전송</button>
            </div>

            <div class="form-group">
                <label for="verificationCode">인증번호</label>
                <input type="text" id="verificationCode" name="verificationCode" placeholder="인증번호를 입력하세요">
            </div>

            <button type="submit" class="submit-btn-Id" id="submit-btn-Id" disabled >확인</button>
        </form>
    </div>
</body>
</html>
