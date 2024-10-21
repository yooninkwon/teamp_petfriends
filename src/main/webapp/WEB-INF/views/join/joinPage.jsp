<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입</title>
    <link rel="stylesheet" href="/static/css/join/join.css">
    <jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
    <script src="/static/js/join.js"></script>
</head>
<body>
    <jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

    <div class="signup-form">
        <form action="joinService" method="post">
    	<h1>펫프렌즈에 오신걸 환영합니다!</h1>
            <div class="left-column">
                <label for="email">이메일</label> <br />
				<input type="email" id="email" name="email" placeholder="example@example.com" oninput="validateEmail()">
				<span id="emailError" style="font-size:15px; color:red; float:right;
				margin-right:45px; margin-top:-10px; display:none;">올바른 양식으로 입력해 주세요</span> <br />

                <label for="password">비밀번호</label> <br />
				<input type="password" id="password" name="password" placeholder="영문/숫자/특수문자 혼합 8~20자" oninput="validatePassword()">
				<p id="passwordError" style="font-size:15px; color:red; float:right;
				margin-right:45px; margin-top:-10px; display:none;">영문, 숫자, 특수문자 포함 8~20자</p> <br />

                <label for="confirmPassword">비밀번호 확인</label> <br />
				<input type="password" id="confirmPassword" name="confirmPassword" placeholder="비밀번호를 한번 더 입력해주세요" oninput="checkPasswordMatch()">
				<p id="confirmPasswordError" style="font-size:15px; color:red; float:right;
				margin-right:45px; margin-top:-10px; display:none;">비밀번호가 일치하지 않습니다.</p> <br />


                <label for="nickname">닉네임</label> <br />
				<input type="text" id="nickname" name="nickname" placeholder="2~16자 이내로 입력해주세요" oninput="checkNickname()">
				<p id="nicknameError" style="font-size:15px; color:red; float:right;
				margin-right:45px; margin-top:-10px; display:none;">중복된 닉네임입니다.</p>

				<label for="phoneNumber">휴대폰 번호</label> <br />
				<div class="phone-group">
				    <input type="text" id="phoneNumber" name="phoneNumber" placeholder="'-'를 제외한 숫자만 입력해주세요" maxlength="11" onblur="formatPhoneNumber()">
				    <button type="button" id="requestCodeBtn">인증 요청</button> <br />
				</div>
				<p id="phoneNumberError" style="font-size:15px; color:red; float:right;
				margin-right:45px; margin-top:-10px; display:none;">올바른 번호를 입력해주세요.</p>
				
                <label for="verificationCode">인증 번호</label> <br />
                <input type="text" id="verificationCode" name="verificationCode" placeholder="인증번호 입력">
            </div>

            <div class="right-column">
                <label for="name">이름</label> <br />
                <input type="text" id="name" name="name" placeholder="김펫프"> <br />

                <label for="birth">생년월일/성별</label>
                
                <div id="genderRadioGroup">
	                <input type="radio" id="gender" name="gender" value="M" checked /> 남성
	                <input type="radio" id="gender" name="gender" value="F" /> 여성
                </div>
                
				<input type="text" id="birth" name="birth" placeholder="20000922" maxlength="11" oninput="validateBirthDate()">
				<p id="birthError" style="font-size:15px; color:red; float:right;
				margin-right:45px; margin-top:-10px; display:none;">8자리의 숫자로 입력해 주세요.</p>

                <label for="inviteCode">초대코드 입력 (선택)</label> <br />
                <input type="text" id="inviteCode" name="inviteCode" placeholder="초대코드 입력하고 5천원 받기"> <br />

                <label for="address">주소</label> <br />
                <div class="address-group">
                    <input type="text" id="address" name="address" placeholder="주소 입력" >
                    <button type="button">주소 검색</button> <br />
                </div>
                <label for="detailAddress">상세주소</label> <br />
                <input type="text" id="detailAddress" name="detailAddress" placeholder="상세주소 입력">
            </div>

            <button type="submit" class="submit-btn">동의하고 가입하기</button>
        </form>
    </div>
</body>
</html>
