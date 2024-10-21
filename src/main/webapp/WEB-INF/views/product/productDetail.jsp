<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<!-- 헤더푸터 css,sc -->
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />

<!-- 상품상세페이지 css,sc -->
<link rel="stylesheet" href="/static/css/product/ProductDetail.css" />
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="/static/js/product/ProductDetail.js"></script>

</head>
<body>

	<!-- 헤더 -->
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	
<br /> <br /> <br /><br />	
안녀앟세요?
${product.pro_code }

  <div class="image-container">
        <img id="productImage" src="/static/images/ProductImg/MainImg/${product.main_img1}" />
        <button id="prevButton">&lt;</button> <!-- 왼쪽 버튼 -->
        <button id="nextButton">&gt;</button> <!-- 오른쪽 버튼 -->
    </div>
${product.main_img2} <br />
${product.main_img3}

	<!-- 푸터 -->
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />

</body>

</html>