/**
 *
 */



$(document).ready(function() {

	// 페이지 로드시 데이터 로드
	loadPethotelReserveData();

	function loadPethotelReserveData() {
		let hph_refusal_reason = '-';
		let currStatus = '';
		let currReserveNo = '';
		const itemsPerPage = 10; // 페이지 당 item 수
		let currentPage = 1;
		let totalItems = 0;
		let reserveList = []; // 데이터 저장할 배열
		let currPageGroup = 1;
		let totalPages = 0;

		// 필터 기본 값
		let filterParam = {
			reserveType: '전체',
			startDate: '',
			endDate: '',
			memberCode: '',
			reserveCode: ''
		};

		fetchData(currentPage, currPageGroup, filterParam);

		function fetchData(currentPage, currPageGroup, filterParam) {
			$.ajax({
				url: '/admin/pethotel_admin_reserve',
				method: 'GET',
				data: filterParam,
				dataType: 'json',
				success: function(data) {
					reserveList = data;
					totalItems = data.length;
					totalPages = Math.ceil(totalItems / itemsPerPage);

					displayItems(currentPage);
					setupPagination(currentPage, currPageGroup);
				},
				error: function(xhr, status, error) {
					console.error('Error: ', error)
				}
			});

		}

		function displayItems(currentPage) {
			const start = (currentPage - 1) * itemsPerPage;
			const end = start + itemsPerPage;
			const sliceList = reserveList.slice(start, end);
			let lists = '';
			$.each(sliceList, function(index, memSelectDto) {

				let approval_date = '';

				if (memSelectDto.hph_approval_date == null) {
					approval_date = '-';
				} else {
					approval_date = memSelectDto.hph_approval_date;
				}

				lists += '<tr>';
				lists += '<td>' + memSelectDto.hph_reserve_no + '</td>';
				lists += '<td>' + memSelectDto.mem_nick + '</td>';
				lists += '<td>' + memSelectDto.hph_numof_pet + '</td>';
				lists += '<td>' + memSelectDto.hph_start_date + '</td>';
				lists += '<td>' + memSelectDto.hph_end_date + '</td>';
				lists += '<td>' + memSelectDto.hph_status + '</td>';
				lists += '<td>' + approval_date + '</td>';
				lists += '<td>' + memSelectDto.hph_refusal_reason + '</td>';
				lists += '<td><button class="btn-style detail-btn" id="button' + memSelectDto.hph_reserve_no + '">';
				lists += '상세정보 조회 </button></td></tr>';
			});
			$('#pethotel-reserve-table-body').html(lists);
			// 상세조회 버튼 클릭 시, 각 버튼의 ID에서 예약번호 추출함
			$(document).on('click', '.detail-btn', function() {
				const hph_reserve_no = $(this).attr('id').split('button')[1];  // 버튼 ID에서 예약 번호 추출
				loadReserveDetailData(hph_reserve_no);
			});

		}


		// 예약정보 상세조회
		function loadReserveDetailData(hph_reserve_no) {

			fetchDataForDetail()

			function fetchDataForDetail() {
				const url = `/admin/pethotel_admin_reserve_detail?hph_reserve_no=${hph_reserve_no}`;

				fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				})
					.then(response => {
						if (response.ok) {
							console.log('Data successfully sent to server');
							return response.json();
						}
					})
					.then(data => {
						displayItemsForDetail(data);
					})
					.catch(error => {
						console.error('Error: ', error);
					});
			}

			function displayItemsForDetail(data) {
				document.getElementById('tab1').style.display = 'none';
				document.getElementById('reserveDetailModal').style.display = 'block';

				let memPost = '';
				let lists = '';
				currStatus = data.reserveMem.hph_status;
				currReserveNo = data.reserveMem.hph_reserve_no;
				// 멤버
				let approval_date = '';
				if (data.reserveMem.hph_approval_date === null) {
					approval_date = '-';
				} else {
					approval_date = data.reserveMem.hph_approval_date;
				}
				memPost += '<tr>';
				memPost += '<td>' + data.reserveMem.hph_reserve_no + '</td>';
				memPost += '<td>' + data.reserveMem.mem_code + '</td>';
				memPost += '<td>' + data.reserveMem.mem_nick + '</td>';
				memPost += '<td>' + data.reserveMem.hph_numof_pet + '</td>';
				memPost += '<td>' + data.reserveMem.hph_start_date + '</td>';
				memPost += '<td>' + data.reserveMem.hph_end_date + '</td>';
				memPost += '<td>' + data.reserveMem.hph_status + '</td>';
				memPost += '<td>' + approval_date + '</td>';
				memPost += '<td>' + data.reserveMem.hph_refusal_reason + '</td>';
				memPost += '</tr>';

				// 펫들 // data.reservePets[i].hph_reserve_no
				for (var i = 0; i < data.reservePets.length; i++) {
					lists += '<tr>';
					lists += '<td>' + data.reservePets[i].hph_reserve_no + '</td>';
					lists += '<td>' + data.reservePets[i].hphp_reserve_pet_no + '</td>';
					lists += '<td>' + data.reservePets[i].hphp_pet_name + '</td>';
					lists += '<td>' + data.reservePets[i].hphp_pet_type + '</td>';
					lists += '<td>' + data.reservePets[i].hphp_pet_gender + '</td>';
					lists += '<td>' + data.reservePets[i].hphp_pet_neut + '</td>';
					lists += '<td>' + data.reservePets[i].hphp_pet_birth + '</td>';
					lists += '<td>' + data.reservePets[i].hphp_pet_weight + '</td>';
					lists += '<td>' + data.reservePets[i].hphp_comment + '</td>';
					lists += '</tr>';

				}
				$('input[name="reserve_status_set"][value="' + currStatus + '"]').prop("checked", true);
				$('#reserveDetailMem').html(memPost);
				$('#reserveDetailList').html(lists);
			}
		}

		// 페이징
		function setupPagination(currentPage, currPageGroup) {
			const maxPagesToShow = 10;
			const startPage = (currPageGroup - 1) * maxPagesToShow + 1;
			const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

			let paginationHtml = '';
			if (currPageGroup > 1) {
				paginationHtml += '<a href="#" class="page-link" data-page="prev-group">&laquo; 이전</a>';
			}
			for (let i = startPage; i <= endPage; i++) {
				paginationHtml += '<a href="#" class="page-link ' + (i === currentPage ? 'active' : '') + '" data-page="' + i + '">' + i + '</a>';
			}
			if (endPage < totalPages) {
				paginationHtml += '<a href="#" class="page-link" data-page="next-group">다음 &raquo;</a>';
			}

			$('#pagination').html(paginationHtml);

			$('.page-link').on('click', function(event) {
				event.preventDefault();

				let clickedPage = $(this).data('page');
				if (clickedPage === 'prev-group') {
					currPageGroup--;
					currentPage = (currPageGroup - 1) * maxPagesToShow + 1;
				} else if (clickedPage === 'next-group') {
					currPageGroup++;
					currentPage = (currPageGroup - 1) * maxPagesToShow + 1;
				} else {
					currentPage = clickedPage;
				}

				displayItems(currentPage);
				setupPagination(currentPage, currPageGroup);
			});
		}

		// 상세페이지의 예약 상태 변경 라디오버튼 중 거절 버튼 클릭시
		$('input[name="reserve_status_set"][value="거절"]').on('change', function() {
			openModal();
		});

		// 거절 사유 작성하는 창 열기
		function openModal() {
			document.getElementById('reasonModal').style.display = 'block';

		}
		
		// 예약 거절 창의 예약상태변경 버튼 클릭 시
		$(document).on('click', '#reserveSubmit_refusal', function() {
			hph_refusal_reason = $('textarea[name="refusal_reason"]').val();
			console.log(hph_refusal_reason);
			let statusObj = {
				'hph_reserve_no': currReserveNo,
				'hph_status': '거절',
				'hph_refusal_reason': hph_refusal_reason
			}
			fetchDataForStatus(statusObj);
		});

		// 예약 상세페이지의 예약상태변경 버튼 클릭 시
		$(document).on('click', '#reserveSubmit', function() {
			let statusVal = $(`input[name="reserve_status_set"]:checked`).val()
			let statusObj = {
				'hph_reserve_no': currReserveNo,
				'hph_status': statusVal,
				'hph_refusal_reason': '-'
			}
			if (statusVal === currStatus) {
				alert('변동사항이 없습니다.')
			} else {
				fetchDataForStatus(statusObj);
			}
		});

		function fetchDataForStatus(statusObj) {

			fetch('/admin/pethotel_reserve_update', {
				method: 'POST',
				headers: {
					"Content-Type": 'application/json'
				},
				body: JSON.stringify(statusObj)
			})
				.then(response => {
					if (response.ok) {
						console.log('Data successfully sent to server');
						alert('예약 상태 변경이 완료되었습니다.');
						location.replace(location.href);

					} else {
						console.error('Failed to send data');
					}
				})
				.catch(error => {
					console.error('Error: ', error)
				});
		}

		// 목록으로 버튼: 새로고침
		$(document).on('click', '#goBack', function() {
			location.replace(location.href);
		});

		// 필터 초기화 버튼 클릭 핸들러
		$(document).on('click', '#filterReset', function() {
			let filterParam = {
				reserveType: '전체',
				startDate: '',
				endDate: '',
				memberCode: '',
				reserveCode: ''
			};

			$(`input[name="reserve-type-filter"][value="전체"]`).prop('checked', true);
			$('#start-date').val('');
			$('#end-date').val('');
			$('#search-mem-code').val('');
			$('#search-reserve-code').val('');

			fetchData(currentPage, currPageGroup, filterParam);
		});


		// 필터링 
		$('#pethotelRegister').on('change', function() {
			filterParam = {
				reserveType: $('input[name="reserve-type-filter"]:checked').val(),
				startDate: $('#start-date').val(),
				endDate: $('#end-date').val(),
				memberCode: $('#search-mem-code').val(),
				reserveCode: $('#search-reserve-code').val()
			};
			fetchData(currentPage, currPageGroup, filterParam);
		});



	}
});