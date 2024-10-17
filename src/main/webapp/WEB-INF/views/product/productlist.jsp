<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫프렌즈</title>

<!-- 헤더푸터 css,sc -->
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />

<!-- 상품카테고리+필터메뉴바 css,sc -->
<link rel="stylesheet" href="/static/css/ProductList.css" />
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="/static/js/ProductList.js"></script>

</head>

<body>

	<!-- 헤더 -->
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

	

	<!-- 푸터 -->
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>