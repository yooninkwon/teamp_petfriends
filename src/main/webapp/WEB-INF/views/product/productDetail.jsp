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
   
    
 // 페이지 시작시 찜된 상품 데이터 전달
    const wishResult = ${whishCheck.wishListResult };
    
</script>
<script src="/static/js/product/ProductDetail.js"></script>


</head>
	<!-- 헤더 -->
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
<body>


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
		<span class = "data-reviewCount">${reviewRank.total_reviews}개 후기</span> <br />
		<span class="data-proDiscount">${product.pro_discount}%</span>
		<span class="data-proPrice">${productOption.proopt_price }원</span> <br />
		<span class="data-proFinalPrice">${productOption.proopt_finalprice }원</span> <br />
		
		<!-- 비로그인 시 예상 적립금 0.5% 적용 -->
		<c:set var="effectiveRate" value="${point.g_rate != null ? point.g_rate : 0.5}" />
		<c:set var="finalPrice" value="${productOption.proopt_finalprice != null ? productOption.proopt_finalprice : 0}" />
		<c:set var="estimatedReward" value="${(finalPrice * effectiveRate / 100).intValue()}" />
		<span class="data-memGrade">예상 적립금 ${estimatedReward}원</span> <br />
		
		<!-- 상품 옵션 선택창  -->
		<label for="productOptions">상품 옵션 </label>
		<select id="productOptions" name="proOption">
		    <c:forEach var="option" items="${productOptionList}" varStatus="status">
		        <option value="${option.proopt_code}" data-price="${option.proopt_finalprice}" data-name="${option.proopt_name }"
		        data-code="${option.proopt_code }">
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
	
	<!-- 구분선 -->
	<div class="line"></div>
	
	<!-- 다른 추천제품 유도 제품리스트 -->
		<div class="recommend">
			<span class="recMent">다른 댕댕이들한테 인기있는 상품</span>
			<div class="recProduct">
				<c:forEach var="recPro" items="${recPro}">
	                <div class="recProductItem" data-product-code="${recPro.pro_code}" 
	                onclick="location.href='/product/productDetail?code=${recPro.pro_code}'">
						<div class="recproduct-image-wrapper">
		   	    	        <img src="/static/images/ProductImg/MainImg/${recPro.main_img1}"/>
		                </div>
		                <span>${recPro.pro_name}</span> <br />
						<span>${recPro.proopt_price}원</span> <br />
		                <span>${recPro.pro_discount}% ${recPro.proopt_finalprice}원</span>
						<div class="recRating">
	                    <span class="data-reviewAverage2" data-average-rating="${recPro.average_rating}"></span> 
	                    <span>(${recPro.total_reviews})</span> <!-- 별점과 리뷰 개수 -->
	                      <div class="star-rating"></div> <!-- 별점 표시를 위한 요소 -->
		                </div>
		            </div>
           		</c:forEach>
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

 <!-- 장바구니 담는 팝업 -->
<form action="/product/productDetailCart" method="post">
<div id="cartPopup" class="popup-overlay">
    <div class="popup-content-cart">
        <span>${product.pro_name}</span>
        <span id="selectedOptionText"> </span>
        <p id="selectedOptionPrice"></p> <!-- 가격을 표시할 요소 추가 -->
        <input type="number" id="quantityInput" name="quantity" min="1" max="99" value="1" onkeydown="return false;" /> 최대 99개 
        <span id="finalPrice"></span> <br /> 
        <button type="submit" id="addCartBtn" class="popup-btn">장바구니 담기</button>
        <button type="button" id="closeCartBtn" class="popup-btn">닫기</button>
        
        <!-- 유저의 고유 코드, 상품 코드, 옵션 코드 추가 -->
        <input type="hidden" name="mem_code" value="${sessionScope.loginUser.mem_code}" />
        <input type="hidden" name="pro_code" value="${product.pro_code}" />
        <input type="hidden" id="opt_code" name="opt_code" value="" /> 
        
    </div>
</div>
</form>


</body>

	<!-- 푸터 -->
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />

</html>