<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>


<!-- 상품검색페이지 css -->
<link rel="stylesheet" href="/static/css/product/ProductSearch.css" />
<script src="/static/js/product/ProductSearch.js"></script>
</head>
<body>
	

	<div class="searchPage">
		<div class="searchProductList">
			<input type="text" id="searchInput" value="어떤상품을 찾고있냐옹?" onclick="this.value='';" /> 
			<div class="searchList">
				sadas 
			</div>
			
		</div>
		<div class="top10ProductList">
			<ol><span>펫프 인기아이템 TOP 10</span>
				<c:forEach var="top10" items="${resultTen }" varStatus="status">
					<c:if test="${status.index < 10}">
						<li><a href="/product/productDetail?code=${top10.pro_code }">
								${top10.pro_pets }
								${top10.pro_type } 
								${top10.pro_name } 
						</a></li>
						
					</c:if>
				</c:forEach>
			</ol>
		</div>
	</div>
</body>
</html>