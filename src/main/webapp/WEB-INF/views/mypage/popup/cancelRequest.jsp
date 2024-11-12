<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문 취소/환불</title>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/mypage/mypage2.css">
</head>
<body>
<h4 style="text-align: center;">주문을 취소/환불하시겠습니까?</h4>

<div class="popup-container">
    <form id="cancelForm">
        
        <select id="cancel-option" class="option-input" style="width: 100%;" onchang="checkFormCompletion()">
        	<option value="" disabled selected hidden>주문 취소/환불 사유를 선택해 주세요</option>
            <option value="단순변심">단순변심</option>
            <option value="주문실수">주문실수</option>
            <option value="배송지연">배송지연</option>
            <option value="서비스 불만족">서비스 불만족</option>
            <option value="기타">기타</option>
        </select>
        
        <textarea id="cancel-detail" class="option-input"  style="width: 93%; height: 70px;" placeholder="상세한 사유를 입력해 주세요" oninput="checkFormCompletion()"></textarea>

        <button type="button" id="save-btn" class="save-btn" onclick="submitCancelRequest('${orderCode}')" disabled>취소/환불</button>
    </form>
</div>

<script src="/static/js/mypage/order.js"></script>
<script>
function checkFormCompletion() {
    const selectValue = document.getElementById('cancel-option').value;
    const detailValue = document.getElementById('cancel-detail').value.trim();

    // select와 textarea 모두 값이 있을 때 버튼 활성화
    document.getElementById('save-btn').disabled = !(selectValue && detailValue);
}
</script>
</body>
</html>