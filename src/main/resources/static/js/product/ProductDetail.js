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

	$('#wishListBtn').click(function() {
	    const button = $(this);
	    const productCode = button.data('product-code');
	    const memCode = button.data('mem-code'); // 세션에서 mem_code 가져오기
	    const $wishWord = $('#wishWord');

	    // 로그인 상태 확인
	    if (!memCode) {
	        // 로그인 유도 팝업
	        if (confirm("로그인이 필요합니다. 로그인 페이지로 가시겠습니까?")) {
	            window.location.href = '/login'; // 로그인 페이지로 이동
	        }
	        return; // 로그인하지 않은 경우 AJAX 요청 중단
	    }

	    // 찜목록 상품 넣기 AJAX 요청
	    $.ajax({
	        url: '/product/productWishList',
	        type: 'POST',
	        data: { productCode: productCode, memCode: memCode }, // 필요한 데이터 전송
	        success: function(response) {
	            if (response.success) {
	                if (response.action === 'added') {
	                    $wishWord.text('찜 꽁!').css('color', 'red'); // 찜 목록에 추가된 상태, 글씨 색상을 빨간색으로 변경
	                    button.find('img').attr('src', '/static/Images/ProductImg/WishListImg/wish.png'); // 찜 이미지로 변경
	                } else {
	                    $wishWord.text('찜하기').css('color', 'black'); // 찜 목록에서 제거된 상태, 글씨 색상을 검은색으로 변경
	                    button.find('img').attr('src', '/static/Images/ProductImg/WishListImg/nowish.png'); // 원래 이미지로 변경
	                }
	            } else {
	                alert('문제가 발생했습니다. 다시 시도해 주세요.');
	            }
	        },
	        error: function() {
	            alert('서버와의 연결에 문제가 발생했습니다.');
	        }
	    });
	});


});