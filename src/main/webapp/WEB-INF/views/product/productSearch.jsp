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
<!-- 헤더 -->
<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
</head>
<body>
	

	<div class="searchPage">
		<div class="searchProductList">
			<input type="text" value="어떤상품을 찾고있냐옹?" /> <input type="button" value="검색" />
		</div>
		<div class="top10ProductList">
			<ol>
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