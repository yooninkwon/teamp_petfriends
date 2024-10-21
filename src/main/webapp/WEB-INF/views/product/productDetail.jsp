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
<!-- 서버 데이터를 JavaScript로 전달 -->
<script>
    // 이미지 값이 있는 것만 배열에 추가
    const productImages = [
        '${product.main_img1}',
        '${product.main_img2}',
        '${product.main_img3}',
        '${product.main_img4}',
        '${product.main_img5}'
    ].filter(img => img !== ''); // 빈 문자열을 제거
</script>
<script src="/static/js/product/ProductDetail.js"></script>


</head>
	<!-- 헤더 -->
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
<body>


	<br />
	<br />
	<br />
	

	<div class="productData">
		<div class="image-container">
			<img id="productImage" />
			<button id="prevButton">&lt;</button>
			<!-- 왼쪽 버튼 -->
			<button id="nextButton">&gt;</button>
			<!-- 오른쪽 버튼 -->
		</div>
		<div class ="data-container">
		<span class = "data-petType">${product.pro_pets } 전용</span> &nbsp; 
		<span class = "data-proType">${product.pro_type } / ${product.pro_category }</span> <br />
		<span class = "data-proName">${product.pro_name }</span> <br />
		<span class = "data-reviewAverage">${reviewRank.average_rating}</span>
		<span class="data-reviewTotal">${reviewRank.total_reviews }개 후기</span> <br />
		<span class="data-proDiscount">${product.pro_discount}%</span>
		<span class="data-proPrice">${productOption.proopt_price }원</span> <br />
		<span class="data-proFinalPrice">${productOption.proopt_finalprice }원</span> <br />
		<!-- 상품 옵션 선택창  -->
		<label for="productOptions">상품 옵션 </label>
		<select id="productOptions" name="proOption">
		    <c:forEach var="option" items="${productOptionList}" varStatus="status">
		        <option value="${option.proopt_code}">
		            ${product.pro_name} ${option.proopt_name}
		            <c:if test="${status.index > 0}">
		                <c:set var="basePrice" value="${productOptionList[0].proopt_finalprice}" />
		                <c:set var="currentPrice" value="${option.proopt_finalprice}" />
		                <c:set var="priceDifference" value="${currentPrice - basePrice}" />
		                <c:choose>
		                    <c:when test="${priceDifference > 0}">
		                        +${priceDifference}원
		                    </c:when>
		                    <c:when test="${priceDifference < 0}">
		                        ${priceDifference}원
		                    </c:when>
		                </c:choose>
		            </c:if>
		        </option>
		    </c:forEach>
		</select>
		<div class="data-line"></div>
		</div>
	</div>
	

</body>
	<!-- 푸터 -->
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />

</html>