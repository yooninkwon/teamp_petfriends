$(document).ready(function() {
	let currentIndex = 0; // 현재 이미지 인덱스

	// 만약 이미지가 하나 이하라면 버튼을 숨김
	if (productImages.length <= 1) {
		$('#prevButton, #nextButton').hide();
	}

	// 이미지를 보여주는 함수
	function showImage(index) {
		$('#productImage').attr('src', `/static/images/ProductImg/MainImg/${productImages[index]}`);
	}

	// 다음 버튼 클릭 시
	$('#nextButton').click(function() {
		currentIndex = (currentIndex + 1) % productImages.length; // 다음 이미지로 변경
		showImage(currentIndex);
	});

	// 이전 버튼 클릭 시
	$('#prevButton').click(function() {
		currentIndex = (currentIndex - 1 + productImages.length) % productImages.length; // 이전 이미지로 변경
		showImage(currentIndex);
	});

	// 초기 이미지 표시
	showImage(currentIndex);


	//제품상세페이지 해당상품 별점표시
	function generateStarRating(rating) {
		// 소수점 포함 별점 처리
		const fullStars = Math.floor(rating);  // 정수 부분
		const halfStar = (rating % 1) >= 0.5;  // 소수점 반영 (0.5 이상일 경우 반쪽 별)

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


		return starRatingHtml;
	}

	// 해당상품 별점 표시
	document.querySelector('.data-reviewAverage').innerHTML = `
	    ${generateStarRating(averageRating)} 
	`;
	document.querySelector('.data-reviewAverage3').innerHTML = `
	    ${generateStarRating(averageRating)} 
	`;

	//추천상품 별점표시
	$(function() {
		// 모든 데이터 리뷰 평균 점수를 기반으로 별점 생성
		document.querySelectorAll('.data-reviewAverage2').forEach(element => {
			const averageRating = parseFloat(element.getAttribute('data-average-rating')); // 데이터 속성에서 평균 평점 가져오기
			const starRatingHtml = generateStarRating(averageRating); // 별점 HTML 생성

			// 별점 HTML을 데이터 리뷰 평균 점수 바로 옆에 추가
			element.insertAdjacentHTML('afterend', starRatingHtml);
		});
	});






	//페이지 시작시 유저의 상품 찜상태 체크
	startWish(wishResult);

	function startWish(wishResult) {

		const button = $('#wishListBtn'); // 버튼 선택
		const $wishWord = $('#wishWord'); // wishWord 요소 선택

		if (wishResult === 1) {
			$wishWord.text('찜 꽁!').css('color', 'red'); // 찜 목록에 추가된 상태, 글씨 색상을 빨간색으로 변경
			button.find('img').attr('src', '/static/Images/ProductImg/WishListImg/wish.png'); // 찜 이미지로 변경
		} else {
			$wishWord.text('찜').css('color', 'black'); // 찜 목록에서 제거된 상태, 글씨 색상을 검은색으로 변경
			button.find('img').attr('src', '/static/Images/ProductImg/WishListImg/nowish.png'); // 원래 이미지로 변경

		}
	}

	//찜버튼 누를시  ajax 요청 / 세션에 로그인정보가 없을시 로그인화면 유도 팝업창
	$('#wishListBtn').click(function() {
		const button = $(this);
		const productCode = button.data('product-code');
		const memCode = button.data('mem-code'); // 세션에서 mem_code 가져오기
		const $wishWord = $('#wishWord');

		console.log(memCode);
		console.log(productCode);

		var loginPopup = document.getElementById("loginPopup");
		var loginBtn = document.getElementById("loginBtn");
		var closeBtn = document.getElementById("closeBtn");

		// 로그인 상태 확인
		if (!memCode) {
			// 팝업 표시
			loginPopup.style.display = "flex";
			// 로그인 버튼 클릭 시
			loginBtn.addEventListener("click", function() {
				window.location.href = '/login/loginPage'; // 로그인 페이지로 이동
				loginPopup.style.display = "none"; // 팝업 닫기
			});
			// 닫기 버튼 클릭 시
			closeBtn.addEventListener("click", function() {
				loginPopup.style.display = "none"; // 팝업 닫기
			});
			return;
		}

		// 찜목록 상품 넣기 AJAX 요청
		$.ajax({
			url: '/product/productWishList',
			type: 'POST',
			contentType: 'application/json', // JSON 형식으로 전송
			data: JSON.stringify({ productCode: productCode, memCode: memCode }), // 필요한 데이터 전송
			success: function(response) {
				if (response === 1) {
					$wishWord.text('찜 꽁!').css('color', 'red'); // 찜 목록에 추가된 상태, 글씨 색상을 빨간색으로 변경
					button.find('img').attr('src', '/static/Images/ProductImg/WishListImg/wish.png'); // 찜 이미지로 변경
				} else if (response === 0) {
					$wishWord.text('찜').css('color', 'black'); // 찜 목록에서 제거된 상태, 글씨 색상을 검은색으로 변경
					button.find('img').attr('src', '/static/Images/ProductImg/WishListImg/nowish.png'); // 원래 이미지로 변경

				} else {
					alert('문제가 발생했습니다. 다시 시도해 주세요.');
				}
			},
			error: function() {
				alert('서버와의 연결에 문제가 발생했습니다.');
			}

		});
	});

	//장바구니 담기 버튼
	$('#cartBtn').click(function() {
		const button = $(this);
		const proCode = button.data('pro-code');
		const memCode = button.data('mem-code'); // 세션에서 mem_code 가져오기
		const proOption = $('#productOptions').find('option:selected');
		const optCode = proOption.data('code');


		var loginPopup = document.getElementById("loginPopup");
		var loginBtn = document.getElementById("loginBtn");
		var closeBtn = document.getElementById("closeBtn");
		var cartPopup = document.getElementById("cartPopup");
		var addCartBtn = document.getElementById("addCartBtn");
		var closeCartBtn = document.getElementById("closeCartBtn");
		var goCartPopup = document.getElementById("goCartPopup");
		var goCartBtn = document.getElementById("goCartBtn");
		var closeGoCartBtn = document.getElementById("closeGoCartBtn");

		console.log(memCode);
		console.log(proCode);
		console.log(optCode);

		// 장바구니 담겨있는지 확인요청 ajax
		if (memCode) {
			$.ajax({
				url: '/product/productDetailCartCheck',
				type: 'POST',
				contentType: 'application/json', // JSON 형식으로 전송
				data: JSON.stringify({ proCode: proCode, memCode: memCode, optCode: optCode }), // 필요한 데이터 전송
				success: function(response) {
					if (response === 1) {
						console.log(response);
						goCartPopup.style.display = "flex";
					} else if (response === 0) {
						console.log(response);
						cartPopup.style.display = "flex";
					} else {
						alert('문제가 발생했습니다. 다시 시도해 주세요.');
					}
				},
				error: function() {
					alert('서버와의 연결에 문제가 발생했습니다.');
				}

			});
		}


		// 로그인 상태 확인
		if (!memCode) {
			// 팝업 표시
			loginPopup.style.display = "flex";
			// 로그인 버튼 클릭 시
			loginBtn.addEventListener("click", function() {
				window.location.href = '/login/loginPage'; // 로그인 페이지로 이동
				loginPopup.style.display = "none"; // 팝업 닫기
			});
			// 닫기 버튼 클릭 시
			closeBtn.addEventListener("click", function() {
				loginPopup.style.display = "none"; // 팝업 닫기
			});

		}


		addCartBtn.addEventListener("click", function() {
			cartPopup.style.display = "none"; // 팝업 닫기
		});

		closeCartBtn.addEventListener("click", function() {
			cartPopup.style.display = "none"; // 팝업 닫기
		});

		goCartBtn.addEventListener("click", function() {
			goCartPopup.style.display = "none"; // 팝업 닫기
		});

		closeGoCartBtn.addEventListener("click", function() {
			goCartPopup.style.display = "none"; // 팝업 닫기
		});

		$('#quantityInput').val(1); // 수량 초기화
		const selectedOption = $('#productOptions').find('option:selected');
		const selectedPrice = selectedOption.data('price');
		const selectedCode = selectedOption.val();
		const selectedOptionName = selectedOption.data('name');
		const selectedOptionCode = selectedOption.data('code');

		$('#selectedOptionPrice').text(`1개 (${selectedPrice}원)`);
		$('#optionCodeInput').val(selectedCode);
		$('#selectedOptionText').text(selectedOptionName); // 옵션 이름 업데이트
		opt_code.value = selectedOptionCode;

		updateFinalPrice(selectedPrice);

	});


	// 수량 변경 시 최종 가격 업데이트
	$('#quantityInput').on('input', function() {
		const selectedOption = $('#productOptions').find('option:selected');
		const selectedPrice = selectedOption.data('price');
		updateFinalPrice(selectedPrice);
	});

	// 최종 가격 계산 함수
	function updateFinalPrice(selectedPrice) {
		const quantity = $('#quantityInput').val();
		const finalPrice = selectedPrice * quantity;
		$('#finalPrice').text(`총 가격: ${finalPrice}원`);
	}

	//리뷰갯수 게이지
	var gauge5 = document.getElementById("heartSignalFill5");
	var gauge4 = document.getElementById("heartSignalFill4");
	var gauge3 = document.getElementById("heartSignalFill3");
	var gauge2 = document.getElementById("heartSignalFill2");
	var gauge1 = document.getElementById("heartSignalFill1");

	// 값 가져오기 및 숫자 변환
	var score5 = Number(gauge5.getAttribute("value"));
	var score4 = Number(gauge4.getAttribute("value"));
	var score3 = Number(gauge3.getAttribute("value"));
	var score2 = Number(gauge2.getAttribute("value"));
	var score1 = Number(gauge1.getAttribute("value"));
	
	var total = score1 + score2 + score3 + score4 + score5;
	
	console.log(total);
	
	//총 리뷰갯수에 따른 각 점수별 갯수 % 계산만큼 게이지바 나타내기
	gauge5.style.width = score5/total*100+"%";
	gauge4.style.width = score4/total*100+"%";
	gauge3.style.width = score3/total*100+"%";
	gauge2.style.width = score2/total*100+"%";
	gauge1.style.width = score1/total*100+"%";

	
	
	
	
	
	
});



