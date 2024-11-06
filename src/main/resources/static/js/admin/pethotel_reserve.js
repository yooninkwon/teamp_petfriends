/**
 * 이 스크립트는 관리자페이지의 펫호텔 예약 리스트를 불러오는 스크립트이다.
 * 초기 로드 시 필터링값이 없는 전체 리스트가 출력된다.
 * 
 * 상단의 input태그들로 필터링이 존재하며
 * 각각의 필터에 따라 동적으로 리스트가 변경된다.
 * 
 * input 태그의 값에 변동이 있을 때 마다 해당하는 필터의 리스트가 출력된다.
 * 
 * "상세정보 보기" 버튼을 눌러 각 버튼에 있는 dataset 데이터를 불러온다.
 * 이 데이터는 버튼이 포함된 열에 해당하는 예약번호이다.
 * 
 * 예약번호를 컨트롤러에 전송해 예약번호에 해당하는 정보를 불러온다.
 * (예약 일시, 예약한 유저, 예약 상태, 승인일자, 거절 사유)
 * 
 * 또한, 그 예약번호에 포함된 펫들도 불러온다.
 * 여러 마리가 있을 경우 여러마리가 리스트로 표현된다.
 * (펫 코드, 이름, 동물 종류, 성별, 중성화, 생일, 체중(Kg), 전달사항)
 * 
 * 예약 상세 페이지에서 예약 상태를 "신청중", "승인", "거절"로 변경할 수 있고
 * 승인으로 체크하여 요청할 시 승인일자를 포함해 상태를 업데이트하고,
 * 거절을 체크하여 요청할 시 모달창이 나와 거절사유를 적어 상태를 업데이트하고,
 * 신청중을 체크하여 요청할 시 거절사유와 예약 승인일을 제거하고 상태를 업데이트한다.
 * 
 */



$(document).ready(function() {

	// 페이지 로드시 데이터 로드
	loadPethotelReserveData();

	function loadPethotelReserveData() {
		let hph_refusal_reason = '-'; // 거절 사유 초기화
		let currStatus = ''; // 현재 상태 저장 변수 (상세페이지)
		let currReserveNo = ''; // 현재 예약 번호 저장 변수 (상세페이지)
		const itemsPerPage = 10; // 페이지 당 item 수
		let currentPage = 1; // 현재 페이지
		let totalItems = 0; // 총 데이터 length
		let reserveList = []; // 데이터 저장할 배열
		let currPageGroup = 1; // 현재 페이지 그룹
		let totalPages = 0; // 총 데이터를 페이지당 아이템 수로 나눈 값

		// 필터 기본 값
		let filterParam = {
			reserveType: '전체',
			startDate: '',
			endDate: '',
			memberCode: '',
			reserveCode: ''
		};

		// 페이지 로드 시, 기본값의 필터값을 포함하여 요청
		fetchData(currentPage, currPageGroup, filterParam);

		// 컨트롤러에 데이터 요청
		function fetchData(currentPage, currPageGroup, filterParam) {
			$.ajax({
				url: '/admin/pethotel_admin_reserve',
				method: 'GET',
				data: filterParam, // 필터 내용을 컨트롤러에 전달
				dataType: 'json',
				success: function(data) {
					// 성공시: 배열에 data 저장, 총 아이템 수 설정, 총 페이지 수 설정
					reserveList = data;
					totalItems = data.length;
					totalPages = Math.ceil(totalItems / itemsPerPage);

					// 로드된 데이터를 화면에 배치하는 함수
					displayItems(currentPage);
					// 페이징 처리를 하는 함수
					setupPagination(currentPage, currPageGroup);
				},
				error: function(xhr, status, error) {
					console.error('Error: ', error)
				}
			});

		}

		// 로드된 데이터를 화면에 배치하는 함수
		function displayItems(currentPage) {
			/**
			 * start = ( 현재 페이지 - 1 ) * 페이지 당 아이템의 수
			 * 	: 각 페이지당 시작 인덱스 번호 
			 * 		-> 현재 페이지가 1인 경우 -> (1 - 1) * 10 = 0 
			 * 		   현재 페이지가 5인 경우 -> (5 - 1) * 10 = 40
			 * end = start + 페이지당 아이템 수
			 *  : 각 페이지의 마지막 인덱스 번호
			 * 		-> 현재 페이지가 1인 경우 -> 0 + 10 = 10
			 * 		   현재 페이지가 5인 경우 -> 40 + 10 = 50
			 */
			const start = (currentPage - 1) * itemsPerPage;
			const end = start + itemsPerPage;
			// .slice(start, end)는 배열에서 start부터 end 이전까지의 아이템들을 추출
			// start가 0이고 end가 10이라면 인덱스 [0] ~ [10] 을 저장
			const sliceList = reserveList.slice(start, end);
			let lists = '';
			// .slice를 한 객체를 memSelectDto 라는 이름으로 반복시킴
			$.each(sliceList, function(i, memSelectDto) {
				let approval_date = '';
				// 불러온 데이터 중 "거절사유"가 null 이라면, 
				// null로 표시하는 대신 '-'로 표시한다.
				if (memSelectDto.hph_approval_date == null) {
					approval_date = '-';
				} else {
					// null이 아닌 경우, 실제 데이터를 출력
					approval_date = memSelectDto.hph_approval_date;
				}
				lists += '<tr><td>' + memSelectDto.hph_reserve_no + '</td>';
				lists += '<td>' + memSelectDto.mem_nick + '</td>';
				lists += '<td>' + memSelectDto.hph_numof_pet + '</td>';
				lists += '<td>' + memSelectDto.hph_start_date + '</td>';
				lists += '<td>' + memSelectDto.hph_end_date + '</td>';
				lists += '<td>' + memSelectDto.hph_status + '</td>';
				lists += '<td>' + approval_date + '</td>';
				lists += '<td>' + memSelectDto.hph_refusal_reason + '</td>';
				lists += '<td><button class="btn-style detail-btn" data-reserveno="' + memSelectDto.hph_reserve_no + '">';
				lists += '상세정보 조회 </button></td></tr>';
			});
			$('#pethotel-reserve-table-body').html(lists);

			$(document).on('click', '.detail-btn', function() {
				// 클릭된 버튼의 dataset 값을 불러옴
				// 이 값은 각 '<tr>'에 해당하는 예약 번호임
				const hph_reserve_no = $(this).data('reserveno');

				// 예약번호를 매개변수로 데이터 불러오는 함수
				loadReserveDetailData(hph_reserve_no);
			});
		}

		// 예약번호를 매개변수로 데이터 불러오는 함수
		function loadReserveDetailData(hph_reserve_no) {
			fetchDataForDetail()
			// 예약 상제정보 불러오는 함수
			function fetchDataForDetail() {
				fetch('/admin/pethotel_admin_reserve_detail?hph_reserve_no=' + hph_reserve_no, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				})
					.then(response => {
						if (response.ok) {
							console.log('Data successfully sent to server');
							// 성공시: 결과를 json으로 리턴
							return response.json();
						}
					})
					.then(data => {
						// 받아온 데이터를 화면에 배치하는 함수
						displayItemsForDetail(data);
					})
					.catch(error => {
						console.error('Error: ', error);
					});
			}

			// 받아온 데이터를 화면에 배치하는 함수
			function displayItemsForDetail(data) {

				// 예약 전체 리스트의 div를 보이지 않게 하고,
				// 예약 정보 상세페이지의 div를 보이게 한다.
				document.getElementById('tab1').style.display = 'none';
				document.getElementById('reserveDetailDiv').style.display = 'block';

				// memPost, lists는 각각 예약에 대한 정보, 예약된 펫에 대한 정보이다.
				let memPost = '';
				let lists = '';

				// 현재 예약 상태와, 현재 예약 번호를 저장
				currStatus = data.reserveMem.hph_status;
				currReserveNo = data.reserveMem.hph_reserve_no;

				// 불러온 데이터 중 승인 날짜가 null 이라면, 
				// null로 표시하는 대신 '-'로 표시한다.
				let approval_date = '';
				if (data.reserveMem.hph_approval_date === null) {
					approval_date = '-';
				} else {
					// null이 아니라면 실제 데이터로 표시
					approval_date = data.reserveMem.hph_approval_date;
				}

				// 예약 정보
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

				// 펫 정보
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
				// 예약 상태 라디오버튼을 현재 예약 상태 데이터에 맞게 체크하도록 한다.
				$('input[name="reserve_status_set"][value="' + currStatus + '"]').prop("checked", true);

				$('#reserveDetailMem').html(memPost);
				$('#reserveDetailList').html(lists);
			}
		}

		// 페이징 처리 함수
		function setupPagination(currentPage, currPageGroup) {
			// 한 페이지 그룹에서 보여줄 최대 페이지 수
			const maxPagesToShow = 10;

			// 현재 페이지 그룹의 시작 페이지 계산
			const startPage = (currPageGroup - 1) * maxPagesToShow + 1;

			// 현재 페이지 그룹의 마지막 페이지 계산 (총 페이지 수를 넘지 않도록 제한)
			const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

			// 페이지네이션 HTML 초기화
			let paginationHtml = '';

			// 이전 그룹으로 이동 버튼 표시 (현재 페이지 그룹이 첫 번째 그룹이 아닐 때만)
			if (currPageGroup > 1) {
				paginationHtml += '<a href="#" class="page-link" data-page="prev-group">&laquo; 이전</a>';
			}

			// 현재 페이지 그룹에 속하는 각 페이지 번호를 링크로 생성
			for (let i = startPage; i <= endPage; i++) {
				paginationHtml += '<a href="#" class="page-link ' + (i === currentPage ? 'active' : '') + '" data-page="' + i + '">' + i + '</a>';
			}

			// 다음 그룹으로 이동 버튼 표시 (현재 페이지 그룹이 마지막 그룹이 아닐 때만)
			if (endPage < totalPages) {
				paginationHtml += '<a href="#" class="page-link" data-page="next-group">다음 &raquo;</a>';
			}

			// #pagination 요소에 생성한 페이지네이션 HTML 삽입
			$('#pagination').html(paginationHtml);

			// 각 페이지 링크 클릭 이벤트 설정
			$('.page-link').on('click', function(event) {
				event.preventDefault(); // 링크 기본 동작 방지

				// 클릭한 페이지의 데이터를 가져옴
				let clickedPage = $(this).data('page');

				// 이전 그룹 버튼을 클릭한 경우
				if (clickedPage === 'prev-group') {
					currPageGroup--; // 현재 페이지 그룹 감소
					currentPage = (currPageGroup - 1) * maxPagesToShow + 1; // 이전 그룹의 첫 번째 페이지로 설정

					// 다음 그룹 버튼을 클릭한 경우
				} else if (clickedPage === 'next-group') {
					currPageGroup++; // 현재 페이지 그룹 증가
					currentPage = (currPageGroup - 1) * maxPagesToShow + 1; // 다음 그룹의 첫 번째 페이지로 설정

					// 특정 페이지를 클릭한 경우
				} else {
					currentPage = clickedPage; // 해당 페이지를 현재 페이지로 설정
				}

				// 선택한 페이지의 항목들을 표시
				displayItems(currentPage);

				// 선택된 페이지를 기준으로 페이지네이션 업데이트
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
			// 작성한 거절 사유를 오브젝트에 저장해 DB 업데이트 요청
			let statusObj = {
				'hph_reserve_no': currReserveNo,
				'hph_status': '거절',
				'hph_refusal_reason': hph_refusal_reason
			}
			if (statusVal === '거절') {
				// 현재 승인 상태가 요청할 상태와 같을 때 알림
				alert('변동사항이 없습니다.')
			} else {
				// 다를 경우 업데이트 요청 보냄
				fetchDataForStatus(statusObj);
			}
		});

		// 예약 상세페이지의 예약상태변경 버튼 클릭 시
		$(document).on('click', '#reserveSubmit', function() {
			// (거절을 제외한) 체크되어 있는 라디오버튼의 값을 오브젝트에 저장
			let statusVal = $(`input[name="reserve_status_set"]:checked`).val()
			let statusObj = {
				'hph_reserve_no': currReserveNo,
				'hph_status': statusVal,
				'hph_refusal_reason': '-'
			}
			if (statusVal === currStatus) {
				// 선택한 라디오버튼의 값과 현재 승인 상태와 같을 때 알림
				alert('변동사항이 없습니다.')
			} else {
				// 다를 경우 업데이트 요청 보냄
				fetchDataForStatus(statusObj);
			}
		});
		
		// 승인 상태 변경 DB 요청 함수
		function fetchDataForStatus(statusObj) {
		
			fetch('/admin/pethotel_reserve_update', {
				method: 'POST',
				headers: {
					"Content-Type": 'application/json'
				},
				body: JSON.stringify(statusObj) // 저장된 예약번호, 상태, 거절사유 오브젝트 전달
			})
				.then(response => {
					if (response.ok) {
						console.log('Data successfully sent to server');
						alert('예약 상태 변경이 완료되었습니다.');
						// 성공시 알림과 함께 새로고침
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
		
		// 필터 초기화 버튼 클릭시
		$(document).on('click', '#filterReset', function() {
			// 필터를 기본값으로 변경
			filterParam = {
				reserveType: '전체',
				startDate: '',
				endDate: '',
				memberCode: '',
				reserveCode: ''
			};
			
			// 필터를 초기화 한 뒤, input 태그의 값을 초기화
			$(`input[name="reserve-type-filter"][value="전체"]`).prop('checked', true);
			$('#start-date').val('');
			$('#end-date').val('');
			$('#search-mem-code').val('');
			$('#search-reserve-code').val('');
			
			// 초기화한 뒤 데이터 새로 요청
			fetchData(currentPage, currPageGroup, filterParam);
		});


		// 필터링 div의 값이 변경될 때
		$('#pethotelRegister').on('change', function() {
			// 오브젝트에 각각의 값을 저장
			filterParam = {
				reserveType: $('input[name="reserve-type-filter"]:checked').val(),
				startDate: $('#start-date').val(),
				endDate: $('#end-date').val(),
				memberCode: $('#search-mem-code').val(),
				reserveCode: $('#search-reserve-code').val()
			};
			// 저장된 오브젝트 첨부하여 DB 요청
			fetchData(currentPage, currPageGroup, filterParam);
		});
	}
});