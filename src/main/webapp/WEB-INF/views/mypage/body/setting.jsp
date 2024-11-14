<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	mypage_body
</title>
</head>
<body>
<h2>내 정보 관리</h2>

<div class="info-container">
	<h3>회원 기존 정보</h3>
	<hr />

	<form action="/mypage/updateMember" method="post" class="memberinfo" onsubmit="submitForm(event)">
	    <div class="form-row">
	        <label for="email">이메일</label>
	        <input type="text" id="email" name="mem_email" value="${loginUser.mem_email}" oninput="validateEmail()" required>
	        <span id="emailError" class="error-msg"></span>
	    </div>
	
	    <div class="form-row">
	        <label>휴대전화</label>
	        <input type="text" value="${loginUser.mem_tell}" disabled>
	        <span class="modify-text" onclick="openPhoneNumberChange()">변경하기</span>
	    </div>
	
	    <div class="form-row">
	        <label for="name">이름</label>
	        <input type="text" id="name" name="mem_name" value="${loginUser.mem_name}" required>
	    </div>
	
	    <div class="form-row">
	        <label for="nickname">닉네임</label>
	        <input type="text" id="nickname" name="mem_nick" value="${loginUser.mem_nick}" oninput="checkNickname()" required>
	        <span id="nicknameError" class="error-msg"></span>
	    </div>
	
	    <div class="form-row">
	        <label for="birth">생년월일</label>
	        <input type="text" id="birth" name="mem_birth" maxlength="8" value="${loginUser.mem_birth}" oninput="validateBirthDate()" required>
	        <span id="birthError" class="error-msg">8자리 생년월일을 입력해 주세요.</span>
	    </div>
	
	    <div class="form-row">
	        <label>주소  <span class="default-badge"><i class="fa-solid fa-check"></i> 기본 배송지</span></label>
	        <c:forEach var="address" items="${address}">
		        <c:choose>
		            <c:when test="${address.addr_default.toString() == 'Y'}">
		                <input type="text" value="${address.addr_line1} ${address.addr_line2}" disabled>
		                <span class="modify-text" onclick="openAddressChange()">변경하기</span>
		            </c:when>
			    </c:choose>
	        </c:forEach>
	    </div>
	
	    <div class="button-col">
	        <button type="submit" id="submitBtn" disabled>저장하기</button>
	        <a href="/login/withdraw" id="withdrawLink">회원탈퇴</a>
	    </div>
	</form>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".form-row input").forEach(input => {
        input.addEventListener("input", () => {
            console.log(`Input changed in field: ${input.id}`);
            document.getElementById("submitBtn").disabled = false;
        });
    });
    document.getElementById("withdrawLink").addEventListener("click", function(event) {
        event.preventDefault(); // 기본 동작 방지
        if (confirm("정말 탈퇴하시겠습니까?")) {
            var reason = prompt("회원 정보는 3개월간 유지됩니다. 탈퇴 사유를 입력 해 주세요.");
            if (reason === null) {
                alert("탈퇴가 취소되었습니다.");
                return; // 더 이상 진행하지 않음
            }
            if (reason.trim() === "") {
                reason = '없음';
            }
            // URL에 탈퇴 사유를 쿼리 파라미터로 추가하여 이동
            window.location.href = "/login/withdraw?reason=" + encodeURIComponent(reason);
        }
    });
});

</script>
<script src="/static/js/mypage/setting.js"></script>
</body>
</html>