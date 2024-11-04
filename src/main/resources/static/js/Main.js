// 상단 로고 클릭시 메인화면 이동
/* @@ footer의 a태그로 바꿈
$(function(){
	$("#top_logo").click(function(){
		window.location.href = "/";
	});
});     
*/
// 푸터 인스타그램 아이콘

/* @@ footer의 a태그로 바꿈
$(function(){
	$("#instagram").click(function(){
		window.location.href = "https://www.instagram.com/petfriends_official/";
	});
});   
*/
// 상단 우측 유저 아이콘 클릭시 로그인 화면 이동
$(document).ready(function() {
	$("#user_icon").click(function() {
		// 전역 변수 userName을 사용
		if (userName === "null" || userName === "") {
			// 로그인 페이지로 이동
			window.location.href = "/login/loginPage";
		} else {
			// 마이페이지로 이동
			window.location.href = "/mypage/mypet";
		}
	});
});



$(document).ready(function() {
	var currentIndex = 0;
	var slides = $('.slide');
	var totalSlides = slides.length;

	function updateSlidePosition() {
		var offset = -currentIndex * 100 + '%';
		$('.slides').css('transform', 'translateX(' + offset + ')');
	}

	function showNextSlide() {
		currentIndex++;
		if (currentIndex >= totalSlides) {
			currentIndex = 0;
		}
		updateSlidePosition();
	}

	function moveSlide(step) {
		currentIndex += step;

		if (currentIndex < 0) {
			currentIndex = totalSlides - 1; // 마지막 슬라이드로 이동
		} else if (currentIndex >= totalSlides) {
			currentIndex = 0; // 첫 번째 슬라이드로 이동
		}

		updateSlidePosition();
	}

	// 화살표 버튼 이벤트
	$('.prev').click(function() {
		moveSlide(-1);
	});

	$('.next').click(function() {
		moveSlide(1);
	});

	// 4초마다 슬라이드 자동 전환
	setInterval(showNextSlide, 4000);
});






$(document).ready(function() {
	var currentIndex = 0;
	var slides = $('.login_slide');
	var totalSlides = slides.length;

	function showNextSlide() {
		currentIndex++;
		if (currentIndex >= totalSlides) {
			currentIndex = 0;
		}
		var offset = -currentIndex * 100 + '%';
		$('.login_slides').css('transform', 'translateX(' + offset + ')');
	}

	// 4초마다 슬라이드 전환
	setInterval(showNextSlide, 4000);
});



// 드롭다운 토글 함수
function toggleSearchDropdown() {
	const dropdown = document.getElementById("searchDropdown");

	// 드롭다운이 숨겨져 있다면 AJAX로 내용을 불러오고 표시
	if (dropdown.style.display === "none") {
		fetch('/product/productSearch')
			.then(response => response.text())
			.then(data => {
				dropdown.innerHTML = data;
				dropdown.style.display = "block";

				// AJAX 응답에서 스크립트 실행
				executeScripts(dropdown);
			})
			.catch(error => console.error('오류 발생:', error));
	} else {
		dropdown.style.display = "none"; // 다시 클릭 시 숨김
	}

}

// 응답 내 스크립트를 실행하는 함수
function executeScripts(container) {
	const scripts = container.getElementsByTagName("script");
	for (let script of scripts) {
		const newScript = document.createElement("script");
		newScript.text = script.innerHTML; // 스크립트 내용 설정
		document.body.appendChild(newScript); // 문서에 추가하여 실행
	}
}


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

//추천상품 별점표시
	$(function() {
		// 모든 데이터 리뷰 평균 점수를 기반으로 별점 생성
		document.querySelectorAll('.bestProAverage').forEach(element => {
			const averageRating = parseFloat(element.getAttribute('data-average-rating')); // 데이터 속성에서 평균 평점 가져오기
			const starRatingHtml = generateStarRating(averageRating); // 별점 HTML 생성

			// 별점 HTML을 데이터 리뷰 평균 점수 바로 옆에 추가
			        // 별점이 이미 추가되지 않았는지 확인 후 추가
			        if (!element.nextElementSibling || !element.nextElementSibling.classList.contains('star')) {
			            element.insertAdjacentHTML('afterend', starRatingHtml);
			        }
		});
	});
