/**
 * 
 */


//각각의 tr을 눌렀을 때 예약 상세정보 조회 페이지 필요
//페이지네이션 필요

$(document).ready(function() {
	const itemsPerPage = 10; // 페이지 당 item 수 = 6
	let currentPage = 1; // 현재 표시되는 페이지
	let totalItems = 0; // 총 item 수 초기화
	let pethotelReserveList; // ArrayList를 담을 변수
	let currPageGroup = 1; // 현재 페이지 그룹
	let totalPages = 0; // 총 페이지 수
	let preEndPage = 0; // 이전 페이지의 마지막 페이지 번호

	fetchData(currentPage, currPageGroup); // 페이지 로드 시 호출 (formParam은 공백: 필터가 없으므로)

	function fetchData(currentPage, currPageGroup) {
		$.ajax({
			url: '/mypage/pethotel/dataList', // pageNo에 맞는 데이터 요청-필터링된 API 호출 
			method: 'GET',
			dataType: 'json',
			headers: {
				'Cache-Control': 'no-cache' // 캐시 없음 설정
			},
			success: function(data) {
				pethotelReserveList = data; // 변수에 데이터 대입
				totalItems = pethotelReserveList.pethotelMemDto.length; // 받아온 데이터 총 갯수 계산
				totalPages = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수 계산

				displayItemsForList(currentPage); // 아이템 표시
				setupPagination(currentPage, currPageGroup); // 페이지네이션 설정
			},
			error: function(xhr, status, error) {
				console.error('Error fetching data:', error);
			}
		});
	}

	// 아이템을 페이지에 맞게 출력
	function displayItemsForList(currentPage) {

		if (currentPage <= 10) {
			// 현재 페이지가 10이하인 경우 == 페이지그룹이 1인 경우
			var start = (currentPage - 1) * itemsPerPage;
		} else {
			// 그 외 == 페이지그룹이 2이상인 경우
			// start = (현재페이지 - 이전마지막페이지 - 1) * itemsPerPage(10)
			var start = ((currentPage - preEndPage) - 1) * itemsPerPage;
		}

		// end = 시작 인덱스번호 + itemsPerPage(10)
		const end = start + itemsPerPage;
		const sliceList = pethotelReserveList.pethotelMemDto.slice(start, end);
		// .slice(start, end)는 배열에서 start부터 end 이전까지의 아이템들을 추출
		// start가 0이고 end가 6이라면 인덱스 [0] ~ [9] 을 출력
		console.log(sliceList);
		// 데이터를 테이블로 출력
		let table = '';
		if (pethotelReserveList.pethotelMemDto.length == 0) {
			table += '<tr><td colspan="6"><div id="empty-list"><div><strong>예약 내역이 없습니다.</strong></div>';
			table += '<a href="/helppetf/pethotel/pethotel_main" class="emptyBtn">예약하러 가기</a></div></td></tr>';
		} else {
			$.each(sliceList, function(index, memReserveData) {
				table += '<tr data-reserveno="' + memReserveData.hph_reserve_no + '">';
				table += '<td><div class="reserve-no">' + memReserveData.hph_reserve_no + '</div></td>';
				table += '<td><div><span class="numofpet">' + memReserveData.hph_numof_pet + '</span></div></td>';
				table += '<td>' + memReserveData.hph_start_date + ' 부터</td>';
				table += '<td>' + memReserveData.hph_end_date + ' 까지</td>';
				table += '<td>' + memReserveData.hph_rge_date + '</td>';
				table += '<td class="status">' + memReserveData.hph_status + '</td></tr>';
			});
		}
		$('#pethotel-table tbody').html(table);
		
		// 출력된 테이블의 'tr'이 클릭 될 때
		$('#pethotel-table tbody').on('click', 'tr', function() {
			// 클릭된 'tr'의 dataset 값을 불러옴
			const reserveNo = $(this).data('reserveno');
			console.log(reserveNo);
			fetch('/mypage/pethotel/dataDetail?reserveNo=' + reserveNo, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(response => {
				if(response.ok) {
					// 서버에 데이터 전송 성공 후 간단히 콘솔에 로그 출력
					console.log('Data successfully sent to server');
					return response.json();
				} else {
					console.error('Failed to send data');
				}
			})
			.then(data => {
				displayItemsForDetail(data);
			})
			.catch(error => {
				console.error('ERROR:', error);
			});
		});
	}
	
	function displayItemsForDetail(data) {
		// 불러온 데이터 중 승인 날짜가 null 이라면, 
		// null로 표시하는 대신 '-'로 표시한다.
		pageScroll(0);
		$("#reserveList").removeClass().addClass('off');
		$("#reserveDetail").removeClass().addClass('on');
		
		let approval_date = '';
		if (data.pethotelMemDto.hph_approval_date === null) {
			approval_date = '-';
		} else {
			// null이 아니라면 실제 데이터로 표시
			approval_date = data.pethotelMemDto.hph_approval_date;
		}
		let memPost = '';
		// 예약 정보
		memPost += '<tr>';
		memPost += '<td>' + data.pethotelMemDto.hph_reserve_no + '</td>';
		memPost += '<td>' + data.pethotelMemDto.hph_numof_pet + '</td>';
		memPost += '<td>' + data.pethotelMemDto.hph_start_date + '</td>';
		memPost += '<td>' + data.pethotelMemDto.hph_end_date + '</td>';
		memPost += '<td>' + data.pethotelMemDto.hph_status + '</td>';
		memPost += '<td>' + approval_date + '</td>';
		memPost += '<td>' + data.pethotelMemDto.hph_refusal_reason + '</td>';
		memPost += '</tr><tr><td class="space" colspan="7"></td></tr>';
		
		let lists = '';
		// 펫 정보
		for (var i = 0; i < data.pethotelPetsDto.length; i++) {
			lists += '<tr><th class="thead">펫 코드</th>';
			lists += '<th class="thead">이름</th>';
			lists += '<th class="thead">동물 종류</th>';
			lists += '<th class="thead">성별</th>';
			lists += '<th class="thead">중성화</th>';
			lists += '<th class="thead">생일</th>';
			lists += '<th class="thead">체중(Kg)</th></tr>';
			lists += '<tr>';
			lists += '<td>' + data.pethotelPetsDto[i].hphp_reserve_pet_no + '</td>';
			lists += '<td>' + data.pethotelPetsDto[i].hphp_pet_name + '</td>';
			lists += '<td>' + data.pethotelPetsDto[i].hphp_pet_type + '</td>';
			lists += '<td>' + data.pethotelPetsDto[i].hphp_pet_gender + '</td>';
			lists += '<td>' + data.pethotelPetsDto[i].hphp_pet_neut + '</td>';
			lists += '<td>' + data.pethotelPetsDto[i].hphp_pet_birth + '</td>';
			lists += '<td>' + data.pethotelPetsDto[i].hphp_pet_weight + '</td></tr>';
			lists += '<tr><th class="detail-comment-th thead" colspan="7">전달사항</th>';
			lists += '</tr><tr><td colspan="7" class="detail-comment">' + data.pethotelPetsDto[i].hphp_comment + '</td>';
			lists += '</tr> <tr><td class="space" colspan="7"></td></tr>';
		}
		$('#reserveDetailMem').html(memPost);
		$('#reserveDetailList').html(lists);
	}
	
	$('.goBack').on('click', function(){
		pageScroll(0);
		$("#reserveList").removeClass().addClass('on');
		$("#reserveDetail").removeClass().addClass('off');
	})

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
			pageScroll(0); // 페이지 스크롤 함수
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
			displayItemsForList(currentPage);
			setupPagination();
		});
	}
	
	function pageScroll(y) {
		// 함수 호출시 파라미터의 값(Y좌표)으로 스크롤
		window.scrollTo({
			top: y,
			behavior: 'smooth'
		});
	}

});