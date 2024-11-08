<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫 종 선택</title>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/mypage/mypage.css">
</head>
<body>
<div class="breed-search-container">
    <i class="fa-solid fa-magnifying-glass"></i>
    <input type="text" id="searchInput" oninput="filterBreeds()" placeholder="🔍<c:choose><c:when test="${petType eq 'D'}">견종</c:when><c:otherwise>묘종</c:otherwise></c:choose>을 입력하세요">
</div>

<div id="breedList">
    <c:forEach var="option" items="${options}">
        <div class="breed-item" onclick="selectBreed('${option}')">${option}</div>
    </c:forEach>
</div>

<script src="/static/js/mypage/petRegist.js"></script>
</body>
</html>