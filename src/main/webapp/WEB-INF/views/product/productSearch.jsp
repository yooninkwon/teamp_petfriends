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
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

</head>
<body>


	<div class="searchPage">
		<div class="searchProductList">
			<div>
				<input type="text" id="searchInput"  placeholder="어떤상품을 찾고있냐옹?"/>
			</div>
			<div id="product-Count"></div>
			<div class="searchList" id="searchList"></div>
		</div>

		<div class="windowBox">
			<div class="searchProLine"></div>

			<div class="windowProductList">
				<span id="windowMent">방금 본 아이템</span>
				<div class="searchList" id="windowList"></div>
			</div>
		</div>
		<div class="searchProLine"></div>

		<div class="top10ProductList">
			<ol>
				<span><span style="color: #ff4081; font-size: 18px;">TOP10</span>
					펫프렌즈 인기아이템</span>
				<c:forEach var="top10" items="${resultTen }" varStatus="status">
					<c:if test="${status.index < 10}">
						<li><a href="/product/productDetail?code=${top10.pro_code }">
								${top10.pro_pets } ${top10.pro_type } ${top10.pro_name } </a></li>

					</c:if>
				</c:forEach>
			</ol>
		</div>
	</div>


</body>
<script>
	
	$(document).ready(function() {
	
	
	const memCode = '${sessionScope.loginUser.mem_code }';
	const searchPro = '';
	const searchListContainer = $('#searchList');
	const windowListContainer = $('#windowList');
	
	
		if(!memCode){
			document.querySelector('.windowBox').style.display = 'none';
		}
	
		if(memCode){
		windowList(); // AJAX 요청 실행
		}
		
		 $('#searchInput').on('input', function() {
		        const searchPro = $(this).val(); // 현재 입력값 가져오기

		        if (searchPro.length > 0) { // 검색어가 있을 때만 AJAX 요청 실행
		            searchList(searchPro); // AJAX 요청 실행
		        }else if(searchPro.length == 0){
		        	$('#searchList').empty(); // ID가 searchList인 요소를 비움
		        	$('#product-Count').empty(); // ID가 searchList인 요소를 비움
		        }
		       
		    });
		
		
			

		// Ajax 요청
		function searchList(searchPro) {
			$.ajax({
				url: '/product/productSearchList', // 서버 API URL
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({
					searchPro: searchPro,
					memCode: memCode
				}),
				success: function(data) {
					console.log("Response data:", data); // 데이터 로그 출력
					searchProductList(data.searchList,searchListContainer);
					
				},
				error: function(xhr, status, error) {
					console.error('Error: ' + error);
				}
			});
			
		}
		// Ajax 요청
		function windowList() {
			$.ajax({
				url: '/product/productSearchList', // 서버 API URL
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({
					searchPro: searchPro,
					memCode: memCode
				}),
				success: function(data) {
					console.log("Response data:", data); // 데이터 로그 출력
					
					if(data.windowList && data.windowList.length === 0){
						$('#windowList').append('<img src="/static/Images/ProductImg/WindowProImg/noWindowPro.jpg" style="width: 100%;" />'); // 이미지 추가
						$('#windowList').append('<span id="noWindowPro">최근 본 상품이 없어요</span>'); // 이미지 추가
						
					}else{
						searchProductList(data.windowList,windowListContainer);
					}
				},
				error: function(xhr, status, error) {
					console.error('Error: ' + error);
				}
			});
			
		}

		function searchProductList(productList, container) {
			const productListContainer = container;

			// 기존의 내용을 지웁니다.
			productListContainer.empty();

			if(productListContainer == searchListContainer){
			// 상품 개수 업데이트 (예: <div id="product-count"></div>)
			const productCountContainer = $('#product-Count');
			productCountContainer.text(`\${productList.length}개의 상품`);
			}
			// 품절 상품과 재고 있는 상품을 분리할 배열 생성
			const availableProducts = [];
			const soldOutProducts = [];

			// 제품 목록을 반복하며 HTML 요소를 생성
			productList.forEach(product => {

				const soldOutOverlay = product.pro_onoff === '품절' ? '<div class="searchsold-out-overlay">품절</div>' : '';



				// 소수점 포함 별점 처리
				const fullStars = Math.floor(product.average_rating);  // 정수 부분
				const halfStar = (product.average_rating % 1) >= 0.5;  // 소수점 반영 (0.5 이상일 경우 반쪽 별)

				let starRatingHtml = '';

				// 정수 부분의 별
				for (let i = 1; i <= fullStars; i++) {
					starRatingHtml += '<span class="star">&#9733;</span>';  // 노란 별 (가득 찬)
				}

				// 반쪽 별 추가
				if (halfStar) {
					starRatingHtml += '<span class="star half">&#9733;</span>';  // 반쪽 별
				}

				// 나머지 회색 별
				for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
					starRatingHtml += '<span class="star gray">&#9733;</span>';  // 회색 별 (빈 별)
				}




				const productItem = `
				            <div class="search-Item" data-product-code="\${product.pro_code}">
								<div class="search-image-wrapper">
				   	    	        <img src="/static/Images/ProductImg/MainImg/\${product.main_img1}"/>
									\${soldOutOverlay} <!-- 품절 표시 -->
				                </div>
				                <h3 class="searchProName">\${product.pro_name}</h3>
								<span class="searchPrice">\${(product.proopt_price).toLocaleString()}원</span> <br />
				                <span class="searchDiscount">\${product.pro_discount}%</span> 
				                <span class="searchFPrice">\${(product.proopt_finalprice).toLocaleString()}원</span>
								<div class="rating">
			                    \${starRatingHtml} <span class="searchRevTotal">(\${(product.total_reviews).toLocaleString()})</span> <!-- 별점과 리뷰 개수 -->
				                </div>
				            </div>
				        `;

				// 재고 여부에 따라 상품을 다른 배열에 추가
				if (product.pro_onoff === '품절') {
					soldOutProducts.push(productItem);  // 품절 상품
				} else {
					availableProducts.push(productItem);  // 재고 있는 상품
				}
			});

			// 재고 있는 상품 먼저 추가
			availableProducts.forEach(item => {
				productListContainer.append(item);
			});

			// 품절된 상품 나중에 추가
			soldOutProducts.forEach(item => {
				productListContainer.append(item);
			});

		}

		$(document).on('click', '.search-Item', function() {
			const productCode = $(this).data('product-code'); // data-product-code 값을 가져옴
			// productCode를 사용하여 작업 수행
			window.location.href = `/product/productDetail?code=\${productCode}`;
		});

		const searchInput = document.getElementById('searchInput');

		//검색창 마우스 영역 벗어날시 포커스해제
		searchInput.addEventListener('mouseleave', () => {
	        searchInput.blur(); // 마우스가 영역을 벗어나면 포커스 해제
	    });
		

	});
	
	</script>
</html>