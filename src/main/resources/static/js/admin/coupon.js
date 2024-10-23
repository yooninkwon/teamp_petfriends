//탭 전환 기능
document.querySelectorAll('.tab-btn').forEach(function(tabBtn) {
    tabBtn.addEventListener('click', function() {
        // 모든 탭에서 'active' 클래스를 제거
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });

        // 클릭한 탭에 'active' 클래스 추가
        this.classList.add('active');

        // 모든 콘텐츠 숨김
        document.querySelectorAll('.tab-content').forEach(function(content) {
            content.style.display = 'none';
        });

        // 클릭한 탭에 해당하는 콘텐츠만 표시
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).style.display = 'block';
    });
});

//쿠폰등록 페이지네이션 & 필터링
$(document).ready(function() {

	const itemsPerPage = 15; // 페이지 당 item 수 = 15
	let currentPage = 1; // 현재 표시되는 페이지
	let totalItems = 0; // 총 item 수 초기화
	let couponList; // couponsayList를 담을 배열
	let currPageGroup = 1; // 현재 페이지 그룹
	let totalPages = 0; // 총 페이지 수
	let preEndPage = 0; // 이전 페이지의 마지막 페이지 번호
	
	// filterParam의 초기값 설정 ('전체, 전체, 최신순')
    let filterParam = {
        status: '전체',
        type: '전체',
        sortOrder: '최신순'
    };

	fetchData(currentPage, currPageGroup, filterParam); // 페이지 로드 시 호출 (formParam은 공백: 필터가 없으므로)

	function fetchData(currentPage, currPageGroup, filterParam) {
		$.ajax({
			url: '/admin/coupon/data', // pageNo에 맞는 데이터 요청
			method: 'GET',
			data: filterParam,  // 필터 데이터를 전송
			dataType: 'json',
			headers: {
				'Cache-Control': 'no-cache' // 캐시 없음 설정
			},
			success: function(coupons) {
				couponList = coupons; // 함수에 데이터 대입
				totalItems = couponList.length; // 받아온 데이터에서 총 item 수 계산
				totalPages = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수 계산

				displayItems(currentPage); // 리스트 표시
				setupPagination(currentPage, currPageGroup); // 페이지네이션 설정
			},
			error: function(xhr, status, error) {
				console.error('Error fetching data:', error);
			}
		});
	}

	// 리스트를 페이지에 맞게 출력
	function displayItems(currentPage) {

		window.scrollTo({ top: 0, behavior: 'smooth' });

		if (currentPage <= 10) {
			// 현재 페이지가 10이하인 경우 == 페이지그룹이 1인 경우
			var start = (currentPage - 1) * itemsPerPage;
		} else {
			// 그 외 == 페이지그룹이 2이상인 경우
			// start = (현재페이지 - 이전마지막페이지 - 1) * itemsPerPage(15)
			var start = ((currentPage - preEndPage) - 1) * itemsPerPage;
		}

		// end = 시작 인덱스번호 + itemsPerPage(15)
		const end = start + itemsPerPage;
		const sliceList = couponList.slice(start, end);
		// .slice(start, end)는 배열에서 start부터 end 이전까지의 아이템들을 추출
		// start가 0이고 end가 15이라면 인덱스 [0] ~ [14] 을 출력

		// 데이터를 테이블로 출력
		let lists = '';
		$.each(sliceList, function(index, coupons) {
			lists += '<tr>';
            lists += '<td>' + coupons.cp_no + '</td>';
            lists += '<td>' + coupons.cp_name + '</td>';
            lists += '<td>' + coupons.cp_keyword + '</td>';
            lists += '<td>' + coupons.cp_start + '</td>';
            lists += '<td>' + coupons.cp_end + '</td>';
			
			if (coupons.cp_type === 'A') {
			    lists += '<td>' + coupons.cp_amount + '원</td>';
			} else if (coupons.cp_type === 'R') {
			    lists += '<td>' + coupons.cp_amount + '%</td>';
			}
			
            lists += '<td>' + coupons.issueCount + '</td>';
            lists += '<td>coupons.totalUsage</td>';
            lists += '<td><button id="edit-btn" class="btn-style">수정</button><button id="delete-btn" class="btn-style">삭제</button></td>';
            lists += '</tr>';
		});
		
		$('#coupon-table-body').html(lists);
	}

	// 페이지네이션 설정
	function setupPagination() {
	    const maxPagesToShow = 10; // 한 번에 보여줄 페이지 수
	    const startPage = (currPageGroup - 1) * maxPagesToShow + 1; // 현재 그룹의 첫 페이지 계산
	    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages); // 마지막 페이지 계산

	    let paginationHtml = '';

	    // 이전 버튼 추가 (현재 페이지 그룹이 1보다 크면 표시)
	    if (currPageGroup > 1) {
	        paginationHtml += '<a href="#" class="page-link" data-page="prev-group">&laquo; 이전</a>';
	    }

	    // 페이지 번호 생성
	    for (let i = startPage; i <= endPage; i++) {
	        paginationHtml += '<a href="#" class="page-link ' + (i === currentPage ? 'active' : '') + '" data-page="' + i + '">' + i + '</a>';
	    }

	    // 다음 버튼 추가
	    if (endPage < totalPages) {
	        paginationHtml += '<a href="#" class="page-link" data-page="next-group">다음 &raquo;</a>';
	    }

	    $('#pagination').html(paginationHtml);  // `#pagination` 요소에 페이지 번호 추가

	    // 페이지 클릭 이벤트 핸들러
	    $('.page-link').on('click', function(event) {
	        event.preventDefault();

	        let clickedPage = $(this).data('page');
	        if (clickedPage === 'prev-group') {
	            currPageGroup--;
	            currentPage = (currPageGroup - 1) * maxPagesToShow + 1; // 이전 그룹의 첫 페이지
	        } else if (clickedPage === 'next-group') {
	            currPageGroup++;
	            currentPage = (currPageGroup - 1) * maxPagesToShow + 1; // 다음 그룹의 첫 페이지
	        } else {
	            currentPage = clickedPage;  // 클릭한 페이지로 이동
	        }

	        // 페이지 번호와 그룹에 맞게 데이터 다시 로드
	        displayItems(currentPage);
	        setupPagination(); // 페이지를 다시 그리면서 active 클래스를 적용
	    });
	}

	
	// 발급상태 필터 적용
	$('#status-filter input[name="status-filter"]').on('change', function() {
	   filterParam = {
	      status: $('input[name="status-filter"]:checked').val(),
	      type: $('input[name="type-filter"]:checked').val(),
		  sort: $('#sort-order').val()
	   };
	   fetchData(currentPage, currPageGroup, filterParam);
	});

	// 쿠폰 종류 필터 적용
	$('#type-filter input[name="type-filter"]').on('change', function() {
	   filterParam = {
	      status: $('input[name="status-filter"]:checked').val(),
	      type: $('input[name="type-filter"]:checked').val(),
		  sort: $('#sort-order').val()
	   };
	   fetchData(currentPage, currPageGroup, filterParam);
	});
	
	// 정렬 드롭다운 변경 시 필터링 적용
	$('#sort-order').on('change', function() {
		filterParam = {
	        status: $('input[name="status-filter"]:checked').val(),
	        type: $('input[name="type-filter"]:checked').val(),
	        sort: $(this).val()
	    };
	    fetchData(currentPage, currPageGroup, filterParam); // 새로운 정렬 기준으로 데이터 가져오기
	});
});