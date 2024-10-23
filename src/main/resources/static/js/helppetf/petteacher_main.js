/**
 * 이 스크립트는 펫티쳐 메인 페이지를 로드하면 데이터베이스에 데이터를 요청하여,
 * 필터링이 설정되지 않은 데이터를 서버(Java)에서 JSP로 불러오는 Ajax 코드와,
 * 필터링 선택 후 버튼 클릭 시 설정된 필터 기준으로 데이터를 다시 요청하는 코드로 구성되어 있다.
 * 
 * 데이터가 정상적으로 수신되면, 해당 데이터를 테이블 형식으로 화면에 출력한다.
 * 
 * 동물 종류와 카테고리 필터링이 존재한다.
 */

$(document).ready(function() {

	const itemsPerPage = 6; // 페이지 당 item 수 = 6
	let currentPage = 1; // 현재 표시되는 페이지
	let totalItems = 0; // 총 item 수 초기화
	let petteacherList; // ArrayList를 담을 변수
	let currPageGroup = 1; // 현재 페이지 그룹
	let totalPages = 0; // 총 페이지 수
	let preEndPage = 0; // 이전 페이지의 마지막 페이지 번호
	let formParam = ''; // form (필터) 의 파라미터값

	fetchData(currentPage, currPageGroup, formParam); // 페이지 로드 시 호출 (formParam은 공백: 필터가 없으므로)

	function fetchData(currentPage, currPageGroup, formParam) {
		$.ajax({
			url: '/helppetf/petteacher/petteacher_data?' + formParam, // pageNo에 맞는 데이터 요청-필터링된 API 호출 
			method: 'GET',
			dataType: 'json',
			headers: {
				'Cache-Control': 'no-cache' // 캐시 없음 설정
			},
			success: function(data) {
				petteacherList = data; // 변수에 데이터 대입
				totalItems = petteacherList.length; // 받아온 데이터 총 갯수 계산
				totalPages = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수 계산

				displayItems(currentPage); // 아이템 표시
				setupPagination(currentPage, currPageGroup); // 페이지네이션 설정
			},
			error: function(xhr, status, error) {
				console.error('Error fetching data:', error);
			}
		});
	}

	// 아이템을 페이지에 맞게 출력
	function displayItems(currentPage) {
		// 화면 로드시 설정한 Y좌표로 스크롤
		const element = document.getElementById("filter_form");
		const yOffset = -110;
		const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
		window.scrollTo({ top: y, behavior: 'smooth' });
		if (currentPage <= 10) {
			// 현재 페이지가 10이하인 경우 == 페이지그룹이 1인 경우
			var start = (currentPage - 1) * itemsPerPage;
		} else {
			// 그 외 == 페이지그룹이 2이상인 경우
			// start = (현재페이지 - 이전마지막페이지 - 1) * itemsPerPage(6)
			var start = ((currentPage - preEndPage) - 1) * itemsPerPage;
		}

		// end = 시작 인덱스번호 + itemsPerPage(6)
		const end = start + itemsPerPage;
		const sliceList = petteacherList.slice(start, end);
		// .slice(start, end)는 배열에서 start부터 end 이전까지의 아이템들을 추출
		// start가 0이고 end가 6이라면 인덱스 [0] ~ [5] 을 출력

		// 데이터를 테이블로 출력
		let cards = '';
		$.each(sliceList, function(index, ylist) {
			// 인덱스가 0~5 고정이 아니므로 페이지가 넘어가도 인덱스 번호가 정상적으로 불러와지도록 현재 페이지의 시작 인덱스 번호를 더해준다
			cards += '<div class="video-card" ><a href="/helppetf/petteacher/petteacher_detail?hpt_seq=' + ylist.hpt_seq + '" class="video-link" data-index="' + (start + index) + '">';
			cards += '<img src="https://i.ytimg.com/vi/' + ylist.hpt_yt_videoid + '/hqdefault.jpg" alt="비디오 썸네일" class="video-thumbnail">';
			cards += '<div class="content">';
			cards += '<h3 class="info">' + ylist.hpt_title + '</h3>';
			cards += '<p>' + ylist.hpt_exp + '</p>';
			cards += '<p><strong>' + ylist.hpt_channal + '</strong></p>';
			cards += '<p class="views-date"><strong>조회수 </strong>' + ylist.hpt_hit + '회</p>';
			cards += '<p><strong>등록일</strong> ' + ylist.hpt_rgedate + '</p>';
			cards += '</div>';
			cards += '</a></div>';
		});

		$('#videoContainer').html(cards);
	}

	// 페이지네이션 설정
	function setupPagination() {
		const maxPagesToShow = 10; // 한 번에 보여줄 페이지 수
		const startPage = (currPageGroup - 1) * maxPagesToShow + 1; // 현재 그룹의 첫 페이지 계산
		const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages); // 마지막 페이지 계산

		let paginationHtml = '';

		// 이전 버튼 추가 (현재 페이지 그룹이 1보다 크면 표시)
		if (currPageGroup > 1) {
			paginationHtml += '<a href="#" id="prev-group">&laquo; 이전</a>';
		}

		// 페이지 번호 생성
		for (let i = startPage; i <= endPage; i++) {
			paginationHtml += '<a href="#" id="i" class="' + (i === currentPage ? 'active' : '') + '" data-page="' + i + '">' + i + '</a>';
		}

		// 다음 버튼 추가
		if (endPage < totalPages) {
			paginationHtml += '<a href="#" id="next-group">다음 &raquo;</a>';
		}
		$('#pagination').html(paginationHtml);

		// 페이지 클릭 이벤트 핸들러
		$('#pagination a').on('click', function(event) {
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
			displayItems(currentPage);
			setupPagination();
		});
	}

	// 필터 선택 후 filterSubmit 클릭 시 호출
	$('#filterSubmit').on('click', function(event) {
		event.preventDefault(); // 기본 form 제출 동작 방지 (기본 링크를 이것으로 대체함)
		formParam = $('#filter_form form').serialize(); // form 데이터 시리얼라이즈
		currentPage = 1; // 필터링 시 페이지를 1로 리셋
		console.log('Handler-formParam: ', formParam);
		fetchData(currentPage, currPageGroup, formParam); // 필터 데이터를 포함해서 fetchData 호출
	});

	// 필터 선택 후 filterSubmit 클릭 시 호출 - 필터 선택 리셋
	$('#filterReset').on('click', function() {
		$("#petType option:eq(0)").prop("selected", true);
		$("#category option:eq(0)").prop("selected", true);
		fetchData(currentPage, currPageGroup, formParam); // 필터 데이터를 포함해서 fetchData 호출
	});
});