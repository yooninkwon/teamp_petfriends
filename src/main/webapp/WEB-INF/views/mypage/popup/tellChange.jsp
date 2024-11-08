<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>휴대폰 번호 인증</title>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/mypage/mypage.css">
</head>
<body>
<h4 style="text-align: center;">연락처 변경</h4>

<div class="tell-container">
	<div class="form-row" style="display: block;">
	    <label for="phoneNumber">변경을 원하는 휴대폰 번호를 입력해 주세요.</label><br />
	    <input type="text" id="phoneNumber" style="width: 200px;" placeholder="'-'를 제외한 숫자만 입력해주세요"  maxlength="11">
	    <button id="requestCodeBtn" onclick="requestCode()">인증 요청</button>
	    <span id="phoneNumberError" class="error-msg" style="right: 0; left: 5px;"></span>
	</div>

	<div class="form-row" style="flex-direction: row;">
		<input type="text" id="Code" placeholder="인증번호 입력" style="display: none; width: 100px;">
	    <button id="checkCodeBtn" style="display: none; margin-left: 6px;" onclick="checkCode()">확인</button>
	    <span id="codeError" class="error-msg" style="right: 0; left: 5px;">인증번호가 일치하지 않습니다.</span>
	</div>
	
	<button class="confirm-address-btn" id="modifyBtn" disabled>변경하기</button>
</div>

<script>
window.onbeforeunload = function() {
    if (window.opener && !window.opener.closed) {
        window.opener.location.reload(); // 팝업 창이 닫힐 때 부모 페이지 새로고침
    }
};

$(document).ready(function() {
    $('#modifyBtn').on('click', function() {
	    $.ajax({
	        type: "POST",
	        url: "/mypage/setting/updatePhoneNumber",
	        data: {phoneNumber: document.getElementById("phoneNumber").value},
	        success: function() {
	            window.close();
	        },
	        error: function() {
	            alert("번호 등록 중 오류가 발생했습니다.");
	        }
	    });
    });
});
</script>
<script src="/static/js/mypage/setting.js"></script>
</body>
</html>