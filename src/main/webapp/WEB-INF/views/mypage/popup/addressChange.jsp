<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원 주소 목록</title>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://kit.fontawesome.com/6c32a5aaaa.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="/static/css/mypage.css">
</head>
<body>
<div class="addr-search-container">
	<h4>주소</h4>
	<input type="text" id="searchBox" placeholder="지번, 도로명, 건물명으로 검색" onclick="openAddressSearch()">
	<i class="fa-solid fa-magnifying-glass"></i>
</div>
	
<div class="addr-container">
	<h5 style="color: #969696;">최근 주소지</h5>
	<div id="addressList">
	    <c:forEach var="address" items="${address}">
	        <div class="address-item" onclick="selectAddress(${address.addr_code})">
	            <c:if test="${address.addr_default.toString() == 'Y'}">
	                <span class="default-badge" style="position: absolute; top: 0px;"><i class="fa-solid fa-check"></i> 기본 배송지</span>
		            <span class="address-text" style="font-weight: bold; margin-top: 2px;">${address.addr_line1} ${address.addr_line2}</span>
	            </c:if>
	            <c:if test="${address.addr_default.toString() == 'N'}">
		            <span class="address-text">${address.addr_line1} ${address.addr_line2}</span>
	            </c:if>
	            <i class="fa-solid fa-xmark" style="color: #ccc;" onclick="deleteAddress(${address.addr_code})"></i>
	        </div>
	    </c:forEach>
	</div>
</div>

<script>
function selectAddress(addrCode) {
    $.ajax({
        type: "POST",
        url: "/mypage/setDefaultAddress?addrCode=${addrCode}",
        success: function() {
            // 성공 시 페이지 새로고침
            location.reload();
        },
        error: function() {
            alert("기본 주소 변경 중 오류가 발생했습니다.");
        }
    });
});
</script>

<script src="/static/js/mypage.js"></script>
</body>
</html>