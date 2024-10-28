$(document).ready(function() {

	console.log("Document is ready"); // 이 로그가 출력되는지 확인

	$('#searchInput').on('input', function() {
		const searchPro = $(this).val();

		console.log(searchPro);
		searchList(searchPro);
	});

	$('#searchInputBtn').on('click', function() {
		const searchPro = $('#searchInput').val();
		console.log(searchPro);
		searchList(searchPro);
	});


	// Ajax 요청
	function searchList(searchPro) {
		$.ajax({
			url: '/product/productSearchList', // 서버 API URL
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				searchPro: searchPro
			}),
			success: function(data) {
				searchProductList(data);
			},
			error: function(xhr, status, error) {
				console.error('Error: ' + error);
			}
		});
	}

	function searchProductList(productList) {
		// 상품 목록을 표시할 HTML 요소 선택 (예: <div id="product-list"></div>)
		const productListContainer = $('#searchList');

		// 기존의 내용을 지웁니다.
		productListContainer.empty();

		// 상품 개수 업데이트 (예: <div id="product-count"></div>)
		const productCountContainer = $('#product-Count');
		productCountContainer.text(`${productList.length}개의 상품`);

		// 품절 상품과 재고 있는 상품을 분리할 배열 생성
		const availableProducts = [];
		const soldOutProducts = [];

		// 제품 목록을 반복하며 HTML 요소를 생성
		productList.forEach(product => {

			const soldOutOverlay = product.pro_onoff === '품절' ? '<div class="sold-out-overlay">품절</div>' : '';



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
			            <div class="product-Item" data-product-code="${product.pro_code}">
							<div class="product-image-wrapper">
			   	    	        <img src="/static/images/ProductImg/MainImg/${product.main_img1}"/>
								${soldOutOverlay} <!-- 품절 표시 -->
			                </div>
			                <h3>${product.pro_name}</h3>
							<p>${product.proopt_price}원</p>
			                <p>${product.pro_discount}% ${product.proopt_finalprice}원</p>
							<div class="rating">
		                    ${starRatingHtml} <span>(${product.total_reviews})</span> <!-- 별점과 리뷰 개수 -->
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

	$(document).on('click', '.product-Item', function() {
		const productCode = $(this).data('product-code'); // data-product-code 값을 가져옴
		// productCode를 사용하여 작업 수행
		window.location.href = `/product/productDetail?code=${productCode}`;
	});


});