$(document).ready(function() {

	//sub메뉴바 클릭 활성화
	$(document).ready(function() {
		$('#productPetItem').addClass('selected');
	});


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
		const selectedOptionStock = selectedOption.data('stock');
		
		$('#selectedOptionPrice').text(`1개 (${Number(selectedPrice).toLocaleString()}원)`);
		$('#optionCodeInput').val(selectedCode);
		$('#selectedOptionText').text(selectedOptionName); // 옵션 이름 업데이트
		opt_code.value = selectedOptionCode;
		$('#quantityInput').attr('max', selectedOptionStock);
		$('#quantityMaxText').text(`최대 ${Number(selectedOptionStock).toLocaleString()}개`); // 화면에 재고 표시

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
		$('#finalPrice').html(`총 수량 ${Number(quantity).toLocaleString()}개 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ${Number(finalPrice).toLocaleString()}원`);
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
	gauge5.style.width = score5 / total * 100 + "%";
	gauge4.style.width = score4 / total * 100 + "%";
	gauge3.style.width = score3 / total * 100 + "%";
	gauge2.style.width = score2 / total * 100 + "%";
	gauge1.style.width = score1 / total * 100 + "%";


	//리뷰리스트 불러오기 ajax 비동기
	var selectedOpt = $('#reviewOption').val(); //리뷰리스트 옵션선택값 가져오기
	var totalReviews = total;
	var proCode = $('#reviewOption').data('procode');


	const itemsPerPage = 5; // 페이지 당 item 수 = 6
	let currentPage = 1; // 현재 표시되는 페이지
	let totalItems = 0; // 총 item 수 초기화
	let reviewList; // ArrayList를 담을 변수
	let currPageGroup = 1; // 현재 페이지 그룹
	let totalPages = 0; // 총 페이지 수
	let preEndPage = 0; // 이전 페이지의 마지막 페이지 번호

	loadReviewList(currentPage, currPageGroup)

	// 리뷰 리스트 옵션이 변경될 때마다 AJAX 요청 실행
	$('#reviewOption').change(function() {
		selectedOpt = $('#reviewOption').val(); //리뷰리스트 옵션선택값 가져오기
		currentPage = 1; // 필터링 시 페이지를 1로 리셋
		loadReviewList(currentPage, currPageGroup); // 옵션이 변경될 때마다 loadReviewList 호출
	});

	// 리뷰리스트 불러오기 ajax
	function loadReviewList(currentPage, currPageGroup) {
		$.ajax({
			url: '/product/productDetailReivewList',
			type: 'POST',
			contentType: 'application/json', // JSON 형식으로 전송
			data: JSON.stringify({
				proCode: proCode, selectedOpt: selectedOpt

			}),

			success: function(response) {
				reviewList = response; // 변수에 데이터 대입
				totalItems = reviewList.length; // 받아온 데이터 총 갯수 계산
				totalPages = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수 계산

				displayItems(currentPage); // 아이템 표시
				setupPagination(currentPage, currPageGroup); // 페이지네이션 설정


			},
			error: function() {
				alert('서버와의 연결에 문제가 발생했습니다.');
			}

		});
	}


	// 아이템을 페이지에 맞게 출력
	function displayItems(currentPage) {

		if (currentPage <= 5) {
			// 현재 페이지가 10이하인 경우 == 페이지그룹이 1인 경우
			var start = (currentPage - 1) * itemsPerPage;
		} else {
			// 그 외 == 페이지그룹이 2이상인 경우
			// start = (현재페이지 - 이전마지막페이지 - 1) * itemsPerPage(6)
			var start = ((currentPage - preEndPage) - 1) * itemsPerPage;
		}

		// end = 시작 인덱스번호 + itemsPerPage(6)
		const end = start + itemsPerPage;
		const sliceList = reviewList.slice(start, end);
		// .slice(start, end)는 배열에서 start부터 end 이전까지의 아이템들을 추출
		// start가 0이고 end가 6이라면 인덱스 [0] ~ [5] 을 출력

		// 데이터를 테이블로 출력
		let cards = '';
		$.each(sliceList, function(index, rlist) {
			// 리뷰 날짜 포맷팅 함수
			function formatDate(dateString) {
				const dateObject = new Date(dateString);
				const year = dateObject.getFullYear(); // 연도
				const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
				const day = String(dateObject.getDate()).padStart(2, '0'); // 일

				return `${year}-${month}-${day}`; // 형식: YYYY-MM-DD
			}
			// 리뷰 카드 생성
			cards += '<div class="reviewList">';

			// 반려동물 이미지
			cards += '<div class="reviewFirst">'
			if (rlist.pet_img) {
				cards += '<img src="/static/Images/pet/' + rlist.pet_img + '" class="petImage">';
			} else {
				cards += '<img src="/static/Images/pet/noPetImg.jpg" class="petImage">';
			}

			// 작성자 이름
			cards += '<div class="reviewAuthor">';
			cards += '<strong>' + rlist.pet_name + '</strong>'; // 작성자 이름
			cards += '</div>';

			// 리뷰 평점
			cards += '<div class="reviewRating">';
			cards += '<span> ' + generateStarRating(rlist.review_rating) + ' </span>'; // 평점
			cards += '</div>';

			// 리뷰 날짜
			cards += '<div class="reviewDate">';
			cards += '<span>' + formatDate(rlist.review_date) + '</span>'; // 포맷팅된 날짜
			cards += '</div>';
			cards += '</div>';



			// 리뷰 이미지
			cards += '<div class="reviewImages">';
			if (rlist.review_img1) {
				cards += '<img src="/static/Images/ProductImg/ReviewImg/' + rlist.review_img1 + '" class="reviewImage">';
			}
			if (rlist.review_img2) {
				cards += '<img src="/static/Images/ProductImg/ReviewImg/' + rlist.review_img2 + '" class="reviewImage">';
			}
			if (rlist.review_img3) {
				cards += '<img src="/static/Images/ProductImg/ReviewImg/' + rlist.review_img3 + '" class="reviewImage">';
			}
			if (rlist.review_img4) {
				cards += '<img src="/static/Images/ProductImg/ReviewImg/' + rlist.review_img4 + '" class="reviewImage">';
			}
			if (rlist.review_img5) {
				cards += '<img src="/static/Images/ProductImg/ReviewImg/' + rlist.review_img5 + '" class="reviewImage">';
			}
			cards += '</div>'; // reviewImages

			// 리뷰 텍스트
			cards += '<div class="reviewText">';
			cards += '<p>' + rlist.review_text + '</p>'; // 리뷰 텍스트
			cards += '</div>'; // reviewText

			cards += '</div>'; // reviewList
		});

		$('.reviewContentListContainer').html(cards);
	}

	// 페이지네이션 설정
	function setupPagination() {
		const maxPagesToShow = 5; // 한 번에 보여줄 페이지 수
		const startPage = (currPageGroup - 1) * maxPagesToShow + 1; // 현재 그룹의 첫 페이지 계산
		const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages); // 마지막 페이지 계산

		let reviewListPagination = '';

		// 이전 버튼 추가 (현재 페이지 그룹이 1보다 크면 표시)
		if (currPageGroup > 1) {
			reviewListPagination += '<a href="#" id="prev-group">&laquo; 이전</a>';
		}

		// 페이지 번호 생성
		for (let i = startPage; i <= endPage; i++) {
			reviewListPagination += '<a href="#" id="i" class="' + (i === currentPage ? 'active' : '') + '" data-page="' + i + '">' + i + '</a>';
		}

		// 다음 버튼 추가
		if (endPage < totalPages) {
			reviewListPagination += '<a href="#" id="next-group">다음 &raquo;</a>';
		}
		$('.reviewListPagination').html(reviewListPagination);

		// 페이지 클릭 이벤트 핸들러
		$('.reviewListPagination a').on('click', function(event) {
			event.preventDefault();

			if ($(this).attr('id') === 'prev-group') {
				// 이전 그룹으로 이동
				currPageGroup--;
				currentPage = (currPageGroup - 1) * maxPagesToShow + 1; // 이전 그룹의 첫 페이지
			} else if ($(this).attr('id') === 'next-group') {
				// 다음 그룹으로 이동
				currPageGroup++;
				currentPage = (currPageGroup - 1) * maxPagesToShow + 1; // 다음 그룹의 첫 페이지
			} else {
				// 클릭한 페이지로 이동
				currentPage = $(this).data('page');
			}

			// 페이지 번호와 그룹에 맞게 데이터 다시 로드
			loadReviewList(currentPage, currPageGroup);
		});
	}


	// 이미지 클릭 이벤트 추가
	document.addEventListener('click', function(event) {
		if (event.target.closest('.reviewImages')) {
			const clickedImage = event.target;
			if (clickedImage.classList.contains('reviewImage')) {
				// 클릭한 이미지 크기 조정
				if (clickedImage.classList.contains('large')) {
					clickedImage.classList.remove('large'); // 큰 이미지 클래스를 제거
				} else {
					const images = clickedImage.closest('.reviewImages').querySelectorAll('.reviewImage');
					images.forEach(img => img.classList.remove('large')); // 다른 이미지에서 큰 클래스 제거
					clickedImage.classList.add('large'); // 클릭한 이미지에 큰 클래스 추가
				}
			}
		}
	});

	// 스크롤 이벤트 추가
	window.addEventListener('scroll', function() {
		const largeImages = document.querySelectorAll('.reviewImage.large');
		largeImages.forEach(img => img.classList.remove('large')); // 스크롤 시 모든 큰 이미지 클래스 제거
	});



























	// 버튼 표시 및 숨김 기능
	window.onscroll = function() {
		const scrollTopBtn = document.getElementById("scrollTopBtn");
		if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
			scrollTopBtn.style.display = "block"; // 200px 이상 스크롤하면 버튼 보이기
		} else {
			scrollTopBtn.style.display = "none"; // 200px 이하일 때 버튼 숨기기
		}
	};

	// 버튼 클릭 시 페이지 맨 위로 이동
	document.getElementById("scrollTopBtn").onclick = function() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth' // 부드럽게 스크롤
		});
	};





});



