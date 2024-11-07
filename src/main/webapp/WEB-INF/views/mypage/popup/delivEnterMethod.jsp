<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>배송지 출입방법</title>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/mypage/mypage2.css">
</head>
<body>
<h4 style="text-align: center;">배송지 출입방법</h4>

<div class="popup-container">
    <form id="deliveryForm">
        <label><input type="radio" name="delivOption" value="commonDoor" onclick="handleOptionChange(this)"> 공동현관 비밀번호</label>
        <input type="text" id="input-commonDoor" class="option-input" placeholder="예) 열쇠 1234 종, #1234종" style="display: none;">

        <label><input type="radio" name="delivOption" value="freeEntry" onclick="handleOptionChange(this)"> 자유출입 가능 & 공동현관 없음</label>
        
        <label><input type="radio" name="delivOption" value="securityCall" onclick="handleOptionChange(this)"> 경비실 호출</label>
        <input type="text" id="input-securityCall" class="option-input" placeholder="경비실 호출 방법을 남겨 주세요" style="display: none;">

        <label><input type="radio" name="delivOption" value="other" onclick="handleOptionChange(this)"> 기타</label>
        <input type="text" id="input-other" class="option-input" placeholder="직접 입력" style="display: none;">

        <button type="button" id="save-btn" class="save-btn" onclick="saveDeliveryOption()" disabled>저장</button>
    </form>
</div>

<script src="/static/js/mypage/payment.js"></script>
</body>
</html>