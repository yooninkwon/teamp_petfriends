<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주소 확인</title>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApi }&libraries=services"></script>
<link rel="stylesheet" href="/static/css/mypage/mypage.css">
</head>
<body>
<h4 style="text-align: center;">주소</h4>

<!-- 지도 영역 -->
<div id="map"></div>
	
<div class="address-confirm-container">
    <div class="address-info">
        <div class="address-type">도로명</div>
        <div class="address-text" style="font-weight: bold;">${roadAddr }</div>
    </div>
    <div class="address-info">
        <div class="address-type">지번</div>
        <div class="address-text">${jibunAddr }</div>
    </div>
    <div class="address-info">
        <div class="address-type">우편번호</div>
        <div class="address-text">${postcode }</div>
    </div>

    <input type="text" id="addr_detail" placeholder="상세주소를 입력해 주세요" class="address-detail-input" />

    <button class="confirm-address-btn" id="addrcom">이 주소가 확실해요</button>
</div>

<script>
$(document).ready(function() {
    $('#addrcom').on('click', function() {
	    $.ajax({
	        type: "POST",
	        url: "/mypage/setting/insertAddress",
	        data: { 
	        	addrPostal: '${postcode}',
	        	addrLine1: '${roadAddr}',
	        	addrLine2: document.getElementById('addr_detail').value
	        },
	        success: function() {
	            // 성공 시 창 닫고 부모창 새로고침
	        	window.opener.location.reload();
	            window.close();
	        },
	        error: function() {
	            alert("주소 등록 중 오류가 발생했습니다.");
	        }
	    });
    });
});
</script>
<script src="/static/js/mypage/setting.js"></script>
</body>
</html>