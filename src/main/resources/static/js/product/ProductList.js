$(document).ready(function() {
	// 라디오 버튼이 변경될 때마다 실행
	$('input[type="radio"]').change(function() {
		// 선택된 petType과 proType 값 확인
		var petType = $('input[name="petType"]:checked').val();
		var proType = $('input[name="proType"]:checked').val();
		var df = $('input[name="dfoodType"]:checked').val();
		var ds = $('input[name="dsnackType"]:checked').val();
		var dg = $('input[name="dgoodsType"]:checked').val();
		var cf = $('input[name="cfoodType"]:checked').val();
		var cs = $('input[name="csnackType"]:checked').val();
		var cg = $('input[name="cgoodsType"]:checked').val();

		// 모든 그룹 숨기기
		$("#df, #ds, #dg, #cf, #cs, #cg, .filter > div").hide();
		// 강아지와 사료가 선택된 경우 df 표시
		if (petType === "dog" && proType === "food") {
			$("#df").show();
			// df 외의 나머지 그룹 체크 해제
			$("#ds input[type='radio'], #dg input[type='radio'], #cf input[type='radio'], #cs input[type='radio'], #cg input[type='radio']").prop('checked', false);
			if (!$("#df input[type='radio']:checked").length) {
				$("#df input[type='radio']").first().prop('checked', true);
			}
			$("#option_dfs1, #option_dfs2").show();

		}
		// 강아지와 간식이 선택된 경우 ds 표시
		else if (petType === "dog" && proType === "snack") {
			$("#ds").show();

			// ds 외의 나머지 그룹 체크 해제
			$("#df input[type='radio'], #dg input[type='radio'], #cf input[type='radio'], #cs input[type='radio'], #cg input[type='radio']").prop('checked', false);
			if (!$("#ds input[type='radio']:checked").length) {
				$("#ds input[type='radio']").first().prop('checked', true);
			}
			$("#option_dfs1, #option_dfs2").show();
		}
		// 강아지와 용품이 선택된 경우 dg 표시
		else if (petType === "dog" && proType === "goods") {
			$("#dg").show();
			// dg 외의 나머지 그룹 체크 해제
			$("#df input[type='radio'], #ds input[type='radio'], #cf input[type='radio'], #cs input[type='radio'], #cg input[type='radio']").prop('checked', false);
			if (!$("#dg input[type='radio']:checked").length) {
				$("#dg input[type='radio']").first().prop('checked', true);
			}
			if (dg === "dgoodstype2") {
				$("#option_dg2").show();
			} else {
				$("#option_dg1").show();
			}
		}
		// 고양이와 사료가 선택된 경우 cf 표시
		else if (petType === "cat" && proType === "food") {
			$("#cf").show();
			// cf 외의 나머지 그룹 체크 해제
			$("#df input[type='radio'], #ds input[type='radio'], #dg input[type='radio'], #cs input[type='radio'], #cg input[type='radio']").prop('checked', false);
			if (!$("#cf input[type='radio']:checked").length) {
				$("#cf input[type='radio']").first().prop('checked', true);
			}
			$("#option_cfs1, #option_cfs2").show();
		}
		// 고양이와 간식이 선택된 경우 cs 표시
		else if (petType === "cat" && proType === "snack") {
			$("#cs").show();
			// cs 외의 나머지 그룹 체크 해제
			$("#df input[type='radio'], #ds input[type='radio'], #dg input[type='radio'], #cf input[type='radio'], #cg input[type='radio']").prop('checked', false);
			if (!$("#cs input[type='radio']:checked").length) {
				$("#cs input[type='radio']").first().prop('checked', true);
			}
			$("#option_cfs1, #option_cfs2").show();
		}
		// 고양이와 용품이 선택된 경우 cg 표시
		else if (petType === "cat" && proType === "goods") {
			$("#cg").show();
			// cg 외의 나머지 그룹 체크 해제
			$("#df input[type='radio'], #ds input[type='radio'], #dg input[type='radio'], #cf input[type='radio'], #cs input[type='radio']").prop('checked', false);
			if (!$("#cg input[type='radio']:checked").length) {
				$("#cg input[type='radio']").first().prop('checked', true);
			}
			if (cg === "cgoodstype2") {
				$("#option_cg2").show();
			} else {
				$("#option_cg1").show();
			}
		}
		$("#option_price").show();
		$("#option_rank").show();
	});




	// 펫타입, 상품종류, 상품타입 체크변경시 필터옵션 체크 해제
	$('.firsttype input[type="radio"], .thirdtype  input[type="radio"]').change(function() {
		$(".filter > div input[type='radio'], .filter > div input[type='checkbox']").prop('checked', false);
		$('input[name="rankOption"][value="rankopt0All"]').prop('checked', true);
	});

	// 페이지 로드 시 초기 상태 설정
	$('input[type="radio"]:checked').trigger('change');


	//------------------------ajax 이용한 상품리스트 조회----------------------------

	//페이지 새로 진입 및 새로고침시 상품 리스트값 ajax 전달
	sendAjaxRequest();

	// 라디오,체크박스 체크된 데이터 ajax 이용하여 값보내기
	// 라디오 버튼이 변경될 때마다 실행
	$('input[type="radio"], input[type="checkbox"]').change(function() {
		sendAjaxRequest();
	});

	//상품필터된 리스트 데이터 연걸 ajax 메소드
	function sendAjaxRequest() {
		// 선택된 라디오 value값 담기
		let petType = $('input[name="petType"]:checked').val(); //강아지,고양이
		let proType = $('input[name="proType"]:checked').val(); //사료,간식,용품
		let dfoodType = $('input[name="dfoodType"]:checked').val(); //습식사료,소프트사료,건식사료
		let dsnackType = $('input[name="dsnackType"]:checked').val(); //수제간식,껌,사시미/육포
		let dgoodsType = $('input[name="dgoodsType"]:checked').val(); //배변용품,장난감
		let cfoodType = $('input[name="cfoodType"]:checked').val(); //주식캔,파우치,건식사료
		let csnackType = $('input[name="csnackType"]:checked').val(); //간식캔,동결건조,스낵
		let cgoodsType = $('input[name="cgoodsType"]:checked').val(); // 낚시대/레이져, 스크래쳐박스
		let rankOption = $('input[name="rankOption"]:checked').val(); //필터_펫프랭킹순

		let priceOption = $('input[name="priceOption"]:checked').map(function() {
			return $(this).val();
		}).get();
		let dfs1option = $('input[name="dfs1option"]:checked').map(function() {
			return $(this).val();
		}).get();
		let dfs2option = $('input[name="dfs2option"]:checked').map(function() {
			return $(this).val();
		}).get();
		let dg1option = $('input[name="dg1option"]:checked').map(function() {
			return $(this).val();
		}).get();
		let dg2option = $('input[name="dg2option"]:checked').map(function() {
			return $(this).val();
		}).get();
		let cfs1option = $('input[name="cfs1option"]:checked').map(function() {
			return $(this).val();
		}).get();
		let cfs2option = $('input[name="cfs2option"]:checked').map(function() {
			return $(this).val();
		}).get();
		let cg1option = $('input[name="cg1option"]:checked').map(function() {
			return $(this).val();
		}).get();
		let cg2option = $('input[name="cg2option"]:checked').map(function() {
			return $(this).val();
		}).get();


		console.log('petType:', petType);
		console.log('proType:', proType);
		console.log('proType:', dfoodType);
		console.log('proType:', dsnackType);
		console.log('proType:', dgoodsType);
		console.log('proType:', cfoodType);
		console.log('proType:', csnackType);
		console.log('proType:', cgoodsType);
		console.log('proType:', priceOption);
		console.log('proType:', rankOption);
		console.log('proType:', dfs1option);
		console.log('proType:', dfs2option);
		console.log('proType:', dg1option);
		console.log('proType:', dg2option);
		console.log('proType:', cfs1option);
		console.log('proType:', cfs2option);
		console.log('proType:', cg1option);
		console.log('proType:', cg2option);

		// AJAX 요청 보내기
		$.ajax({
			url: '/product/productlistview',  // 서버의 엔드포인트 URL
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				petType,
				proType,
				dfoodType,
				dsnackType,
				dgoodsType,
				cfoodType,
				csnackType,
				cgoodsType,
				rankOption,
				priceOption,
				dfs1option,
				dfs2option,
				dg1option,
				dg2option,
				cfs1option,
				cfs2option,
				cg1option,
				cg2option
			}),  // JSON 형식으로 데이터 전송
			success: function(response) {
				// 성공적으로 데이터를 전송받았을 때 실행할 코드
				console.log(response);
				// 여기서 서버로부터 받은 데이터를 바탕으로 UI를 업데이트할 수 있습니다.
				updateProductList(response);



			},
			error: function(xhr, status, error) {
				// 에러 발생 시 실행할 코드
				console.error("Error:", error);
			}
		});
	};

	function updateProductList(productList) {
		// 상품 목록을 표시할 HTML 요소 선택 (예: <div id="product-list"></div>)
		const productListContainer = $('#product-List');

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




