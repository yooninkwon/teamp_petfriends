<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫프렌즈 PRODUCUT</title>

<!-- 헤더푸터 css,sc -->
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />

<!-- 상품카테고리+필터메뉴바 css,sc -->
<link rel="stylesheet" href="/static/css/product/ProductList.css" />
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="/static/js/product/ProductList.js"></script>


</head>

<body>
	<!-- 헤더 -->
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<jsp:include page="/WEB-INF/views/include_jsp/product_sub_navbar.jsp" />
	
	<div class="radioBox">
	<div id="main-categories"></div>
	<div id="sub-categories"></div>
	<div id="sub-sub-categories"></div>
	</div>
	<br /><br />
	


    <div id="product-List"></div> <!-- AJAX로 데이터가 표시될 부분 -->
    
    
	<!-- 푸터 -->
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>