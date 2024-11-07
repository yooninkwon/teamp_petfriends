<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>배송메모</title>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/mypage/mypage2.css">
</head>
<body>
<h4 style="text-align: center;">배송메모</h4>

<div class="popup-container">
    <form id="deliveryForm">
        <label><input type="radio" name="delivOption" onclick="handleOptionChange(this)"> 문 앞에 놓아주세요</label>
        
        <label><input type="radio" name="delivOption" onclick="handleOptionChange(this)"> 경비(관리)실에 맡겨주세요</label>
        
        <label><input type="radio" name="delivOption" onclick="handleOptionChange(this)"> 직접수령, 부재 시 문 앞에 놓아주세요</label>
        
        <label><input type="radio" name="delivOption" onclick="handleOptionChange(this)"> 벨 누르지 말고 배송 완료 후 문자주세요</label>
        
        <label><input type="radio" name="delivOption" onclick="handleOptionChange(this)"> 배송 전에 미리 연락주세요</label>

        <label><input type="radio" name="delivOption" value="other" onclick="handleOptionChange(this)"> 직접 입력</label>
        <input type="text" id="input-other" class="option-input" placeholder="직접 입력" style="display: none;">

        <button type="button" id="save-btn" class="save-btn" onclick="saveMemoOption()" disabled>저장</button>
    </form>
</div>

<script src="/static/js/mypage/payment.js"></script>
</body>
</html>