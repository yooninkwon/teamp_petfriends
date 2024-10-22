/**
 * 
 */

$(document).ready(function() { 
	
	const itemsPerPage = 6; // 페이지 당 item 수 = 8
	let currentPage = 1; // 현재 표시되는 페이지
	let totalItems = 0; // 총 item 수 초기화
	let petteacherList = []; // ArrayList를 담을 배열
	let currPageGroup = 1; // 현재 페이지 그룹
	let totalPages = 0; // 총 페이지 수
	let preEndPage = 0; // 이전 페이지의 마지막 페이지 번호
	let formParam = ''; // form (필터) 의 파라미터값
	
	fetchData(currentPage, currPageGroup, formParam); // 페이지 로드 시 호출 (formParam은 공백: 필터가 없으므로)

		function fetchData(currentPage, currPageGroup, formParam) {
			$.ajax({
				url: '/petteacher/petteacher_data', // pageNo에 맞는 데이터 요청-필터링된 API 호출 
				method: 'GET',
				dataType: 'json',
				headers: {
					'Cache-Control': 'no-cache' // 캐시 없음 설정
				},
				success: function(data) {
					petteacherList = data.item; // 배열에 아이템 대입
					totalItems = adoptionItems.length; // 받아온 데이터에서 총 item 수 계산
					totalPages = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수 계산
					
					console.log(petteacherList);
					
//					displayItems(currentPage); // 아이템 표시
//					setupPagination(currentPage, currPageGroup); // 페이지네이션 설정
				},
				error: function(xhr, status, error) {
					console.error('Error fetching data:', error);
				}
			});
		}
/*		
		// 아이템을 페이지에 맞게 출력
			function displayItems(currentPage) {
				
				window.scrollTo({ top: 0, behavior: 'smooth' });

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
				// .slice(start, end)는 배열에서 start부터 end 이전까지의 아이템들을 추출
				// start가 0이고 end가 6이라면 인덱스 [0] ~ [5] 을 출력
				const visibleItems = adoptionItems.slice(start, end);
				// item 객체의 정보를 테이블로 출력
				let cards = '';
				$.each(visibleItems, function(index, ylist) {
					// 인덱스가 0~5 고정이 아니므로 페이지가 넘어가도 인덱스 번호가 정상적으로 불러와지도록 현재 페이지의 시작 인덱스 번호를 더해준다
					cards += '<div class="video-card" ><a href="#" class="vedio-link" data-index="' + (start + index) + '">';
					cards += '<img src="https://i.ytimg.com/vi/'+ ylist.hpt_yt_videoid +'/hqdefault.jpg" alt="비디오 썸네일" class="video-thumbnail">';
					cards += '<div class="content">';
					cards += '<h3>' + ylist.kindCd + '</h3>';
					cards += '<p class="info">공고번호: ' + ylist.desertionNo + '</p>';
					cards += '<p><strong>지역:</strong> ' + ylist.orgNm + '</p>';
					cards += '<p><strong>발견 장소:</strong> ' + ylist.happenPlace + '</p>';
					cards += '<p><strong>성별:</strong> ' + ylist.sexCd + '</p>';
					cards += '<p><strong>발견 날짜:</strong> ' + ylist.happenDt + '</p>';
					cards += '<p><strong>특징:</strong> ' + ylist.specialMark + '</p>';
					cards += '</div>';
					cards += '</a></div>';
				});

				$('#adoptionContainer').html(cards);
			}

	
	*/
	
	
	
	
});