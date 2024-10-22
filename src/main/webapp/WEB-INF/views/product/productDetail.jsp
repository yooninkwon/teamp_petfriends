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
    
 // 평균 별점과 리뷰 수를 가져오기
    const averageRating = ${reviewRank.average_rating};
    const totalReviews = ${reviewRank.total_reviews};
 // 페이지 시작시 찜된 상품인지 데이터 전달
    const wishResult = ${whishCheck.wishListResult };
    
 // 초기 가격을 가져옵니다.
    const basePrice = ${productOptionList[0].proopt_finalprice}; // JSP에서 가격 값을 가져옵니다.
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
		<span class="data-proDiscount">${product.pro_discount}%</span>
		<span class="data-proPrice">${productOption.proopt_price }원</span> <br />
		<span class="data-proFinalPrice">${productOption.proopt_finalprice }원</span> <br />
		<span class="data-memGrade">예상 적립금 ${  (productOption.proopt_finalprice * point.g_rate / 100).intValue() }원</span> <br />
		<!-- 상품 옵션 선택창  -->
		<label for="productOptions">상품 옵션 </label>
		<select id="productOptions" name="proOption">
		 
		    <c:forEach var="option" items="${productOptionList}" varStatus="status">
		        <option value="${option.proopt_code}" data-price="${option.proopt_finalprice}">
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
		
		<div class="putBtn">
		<button id="wishListBtn" data-product-code="${product.pro_code }" data-mem-code="${sessionScope.loginUser.mem_code }">
			
			<img src="/static/Images/ProductImg/WishListImg/nowish.png" id="wishListImg" /><br />
			<span id="wishWord">찜</span>
	
		</button>
		<button id="cartBtn" data-mem-code="${sessionScope.loginUser.mem_code }">장바구니 담기</button>
		</div>
		
		</div>
	</div>
	



 <!-- 로그인이 필요합니다 팝업 -->
<div id="loginPopup" class="popup-overlay">
    <div class="popup-content-login">
        <p>로그인이 필요해요</p>
        <button id="loginBtn" class="popup-btn">로그인 하러가기</button>
        <button id="closeBtn" class="popup-btn">닫기</button>
    </div>
</div>
 <!-- 로그인이 필요합니다 팝업 -->
<form action="product/productDetailCart">
<div id="cartPopup" class="popup-overlay">
    <div class="popup-content-cart">
        <p id="selectedOptionText">${product.pro_name} </p>
        <p id="selectedOptionPrice"></p> <!-- 가격을 표시할 요소 추가 -->
        <input type="number" id="quantityInput" name="quantity" min="1" max="99" value="1" /> 최대 99개 
        <span id="finalPrice"></span> <br /> 
        <button type="submit" id="addCartBtn" class="popup-btn">장바구니 담기</button>
        <button type="button" id="closeCartBtn" class="popup-btn">닫기</button>
        
        <!-- 유저의 고유 코드, 상품 코드, 옵션 코드 추가 -->
        <input type="hidden" name="mem_code" value="${sessionScope.loginUser.mem_code}" />
        <input type="hidden" name="pro_code" value="${product.pro_code}" />
        <input type="hidden" name="opt_code" id="optionCodeInput" value="${productOptionList[0].proopt_code}" /> <!-- 기본 값 설정 -->
        
    </div>
</div>
</form>


</body>

	<!-- 푸터 -->
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />

</html>