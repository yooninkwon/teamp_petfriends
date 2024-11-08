$(document).ready(function() {
	let itemsPerPage = 10;
	let currentPage = 1;
	let totalItems = 0;
	let currPageGroup = 1;
	let totalPages = 0;
	let noticeList = [];
	let eventList = [];
	let filteredList = [];

	loadNoticeData();

	// 검색 버튼 클릭 이벤트
		$('#searchButton').on('click', function() {
			const searchKeyword = $('#titleSearch').val().trim().toLowerCase();
			const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');

			if (searchKeyword) {
				// 활성화된 탭에 따라 필터링된 리스트 설정
				if (activeTab === 'notice-list-container') {
					filteredList = noticeList.filter(item => item.notice_title.toLowerCase().includes(searchKeyword));
				} else if (activeTab === 'event-list-container') {
					filteredList = eventList.filter(item => item.event_title.toLowerCase().includes(searchKeyword));
				}
			} else {
				// 검색어가 없을 경우 전체 리스트로 설정
				filteredList = activeTab === 'notice-list-container' ? noticeList : eventList;
			}

			currentPage = 1;
			totalItems = filteredList.length;
			totalPages = Math.ceil(totalItems / itemsPerPage);

			// 리스트를 표시하는 함수 호출
			if (activeTab === 'notice-list-container') {
				displayNoticeList(currentPage);
				setupPagination(currentPage, currPageGroup, 'notice');
			} else if (activeTab === 'event-list-container') {
				displayEventList(currentPage);
				setupPagination(currentPage, currPageGroup, 'event');
			}
		});

	// 탭 전환
	document.querySelectorAll('.tab-btn').forEach(function(tabBtn) {
		tabBtn.addEventListener('click', function() {
			document.querySelectorAll('.tab-btn').forEach(function(btn) {
				btn.classList.remove('active');
			});
			this.classList.add('active');

			document.querySelectorAll('.tab-content').forEach(function(content) {
				content.style.display = 'none';
			});

			const tabId = this.getAttribute('data-tab');
			document.getElementById(tabId).style.display = 'block';

			if (tabId === 'notice-list-container') {
				loadNoticeData();
			}
			if (tabId === 'event-list-container') {
				loadEventData();
			}
		});
	});

	// 공지사항 불러오기
	function loadNoticeData() {
		fetch('/admin/notice_notice_list', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
			.then(data => {
				noticeList = data;
				filteredList = data;
				totalItems = noticeList.length;
				totalPages = Math.ceil(totalItems / itemsPerPage);
				displayNoticeList(currentPage);
				setupPagination(currentPage, currPageGroup);
			})
			.catch(error => console.error('Fetch error:', error));
	}

	// 공지사항 보여주기
	function displayNoticeList(currentPage) {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		const sliceList = filteredList.slice(start, end); // 현재 페이지에 맞는 데이터만 표시

		let post = '<tbody>';

		sliceList.forEach(item => {
			post += `
                <tr>
                    <td><input type="checkbox" name="checkboxNotice" class="notice-checkbox" value="${item.notice_no}" /></td>
                    <td>${item.notice_no}</td>
                    <td><a href="/notice/noticeView?id=${item.notice_no}">${item.notice_title}</a></td>
                    <td>${item.notice_date}</td>
                    <td>${item.notice_hit}</td>
                    <td>${item.notice_show}</td>
                    <td>
                        <input type="button" value="수정" onclick="location.href='/admin/notice_edit?id=${item.notice_no}'" />
                        <input type="button" class="deleteBtn" data-id="${item.notice_no}" value="삭제" />
                    </td>
                </tr>
            `;
		});

		post += '</tbody>';

		$('#notice-list-container .notice-list tbody').remove();
		$('#notice-list-container .notice-list').append(post);

		// 삭제 버튼 이벤트 바인딩
		$('.deleteBtn').on('click', function() {
			const notice_no = this.getAttribute('data-id');
			confirm('삭제 하시겠습니까?')
			deleteNotice(notice_no);
			location.reload();
			alert('삭제가 완료되었습니다.')
		});

		// 모두 선택 기능
		$('.selectAll').on('click', function() {
			const checkboxes = document.querySelectorAll('.notice-checkbox');
			const isChecked = $(this).prop('checked');
			checkboxes.forEach(checkbox => checkbox.checked = isChecked);
		});
	}

	// 페이징 처리
	function setupPagination(currentPage, currPageGroup) {
		const maxPagesToShow = 5;
		const startPage = (currPageGroup - 1) * maxPagesToShow + 1;
		const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

		let paginationHtml = '';
		if (currPageGroup > 1) paginationHtml += '<a href="#" class="page-link" data-page="prev-group">&laquo; 이전</a>';
		for (let i = startPage; i <= endPage; i++) {
			paginationHtml += `<a href="#" class="page-link ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
		}
		if (endPage < totalPages) paginationHtml += '<a href="#" class="page-link" data-page="next-group">다음 &raquo;</a>';

		$('#pagination').html(paginationHtml);

		$('.page-link').on('click', function(event) {
			event.preventDefault();

			$('.selectAll').prop('checked', false);

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

			displayNoticeList(currentPage);
			setupPagination(currentPage, currPageGroup);
		});
	}

	$('#delete').on('click', function() {
		// 현재 활성화된 탭을 확인
		const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');

		// 공지사항인지 이벤트인지에 따라 체크박스 선택
		const selectedCheckboxes = activeTab === 'notice-list-container'
			? document.querySelectorAll('.notice-checkbox:checked')
			: document.querySelectorAll('.event-checkbox:checked');

		if (selectedCheckboxes.length === 0) {
			alert("삭제할 항목을 선택해주세요.");
			return;
		}

		if (confirm("선택한 항목을 삭제하시겠습니까?")) {
			// 선택된 항목에 따라 공지사항 삭제 또는 이벤트 삭제 요청
			const deletePromises = Array.from(selectedCheckboxes).map(checkbox => {
				const id = checkbox.value;
				return activeTab === 'notice-list-container' ? deleteNotice(id) : deleteEvent(id);
			});

			Promise.all(deletePromises)
				.then(() => {
					alert("선택된 항목이 모두 삭제되었습니다.");
					location.reload();
				})
				.catch(error => {
					console.error("Error:", error);
					alert("삭제 중 오류가 발생했습니다.");
				});
		}
	});

	// 공지사항 삭제 함수
	function deleteNotice(notice_no) {
		return fetch(`/admin/deleteNotice?id=${notice_no}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("삭제에 실패했습니다.");
				}
				return response;
			});
	}
	

	// 모두 공개 및 모두 비공개 기능
	$('#showAllBtn').on('click', () => setVisibilityForSelectedItems('show'));
	$('#hideAllBtn').on('click', () => setVisibilityForSelectedItems('hide'));

	function setVisibilityForSelectedItems(action) {
		// 현재 활성화된 탭 확인
		const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');

		// 공지사항 탭일 때와 이벤트 탭일 때 체크박스를 다르게 선택
		const selectedIds = activeTab === 'notice-list-container'
			? Array.from(document.querySelectorAll('.notice-checkbox:checked')).map(cb => cb.value)
			: Array.from(document.querySelectorAll('.event-checkbox:checked')).map(cb => cb.value);

		if (selectedIds.length === 0) {
			alert(activeTab === 'notice-list-container' ? "선택된 공지사항이 없습니다." : "선택된 이벤트가 없습니다.");
			return;
		}

		// 공지사항인지 이벤트인지에 따라 다른 URL로 API 요청
		const url = activeTab === 'notice-list-container' ? '/admin/setVisibilityForNotices' : '/admin/setVisibilityForEvents';

		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ids: selectedIds, visibility: action })
		})
			.then(response => {
				if (response.ok) {
					alert(action === 'show'
						? (activeTab === 'notice-list-container' ? "선택된 공지사항이 공개되었습니다." : "선택된 이벤트가 공개되었습니다.")
						: (activeTab === 'notice-list-container' ? "선택된 공지사항이 비공개되었습니다." : "선택된 이벤트가 비공개되었습니다.")
					);
					location.reload();
				} else {
					alert("공개여부 변경에 실패했습니다.");
				}
			})
			.catch(error => {
				console.error("Error:", error);
				alert("오류가 발생했습니다.");
			});
	}


	// 이벤트 호출
	function loadEventData() {
		fetch('/admin/notice_event_list', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
			.then(data => {
				eventList = data;
				filteredList = data;
				totalItems = eventList.length;
				totalPages = Math.ceil(totalItems / itemsPerPage);
				currentPage = 1;
				currPageGroup = 1;
				displayEventList(currentPage);
				setupEventPagination(currentPage, currPageGroup);
			})
			.catch(error => console.error('Fetch error:', error));
	}

	// 이벤트 데이터를 테이블에 표시하는 함수 
	function displayEventList(currentPage) {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		const sliceList = filteredList.slice(start, end); // 현재 페이지에 맞는 데이터만 표시

		let post = '<tbody>';

		sliceList.forEach(item => {
			post += `
                  <tr>
                      <td><input type="checkbox" class="event-checkbox" name="checkboxEvent" value="${item.event_no}" /></td>
                      <td>${item.event_no}</td>
                      <td><a href="/notice/eventView?id=${item.event_no}">${item.event_title}</a></td>
                      <td>${item.event_startdate}</td>
                      <td>${item.event_enddate}</td>
                      <td>${item.event_legdate}</td>
                      <td>${item.event_thumbnail}</td>
                      <td>${item.event_hit}</td>
                      <td>${item.event_show}</td>
                      <td>
                          <input type="button" value="수정" onclick="location.href='/admin/event_edit?id=${item.event_no}'" />
                          <input type="button" class="deleteBtn" data-id="${item.event_no}" value="삭제"/>
                      </td>
                  </tr>
              `;
		});

		post += '</tbody>';

		$('#event-list-container .event-list tbody').remove();
		$('#event-list-container .event-list').append(post);

		// 이벤트 페이징
		setupEventPagination(currentPage, currPageGroup);

		// 삭제 버튼 이벤트 바인딩
		$('.deleteBtn').on('click', function() {
			const event_no = this.getAttribute('data-id');
			if (confirm('삭제 하시겠습니까?')) {
				deleteEvent(event_no)
					.then(() => {
						alert('삭제가 완료되었습니다.');
						location.reload();
					})
					.catch(error => alert("삭제에 실패했습니다: " + error.message));
			}
		});

		// 모두 선택 기능
		$('.selectAll').on('click', function() {
			const checkboxes = document.querySelectorAll('.event-checkbox');
			const isChecked = $(this).prop('checked');
			checkboxes.forEach(checkbox => checkbox.checked = isChecked);
		});
	}

	// 이벤트 삭제 함수
	function deleteEvent(event_no) {
		return fetch(`/admin/deleteEvent?id=${event_no}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("삭제에 실패했습니다.");
				}
				return response;
			});
	}

	// 이벤트 페이징
	function setupEventPagination(currentPage, currPageGroup) {
		const maxPagesToShow = 5;
		const startPage = (currPageGroup - 1) * maxPagesToShow + 1;
		const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

		let paginationHtml = '';
		if (currPageGroup > 1) paginationHtml += '<a href="#" class="page-link" data-page="prev-group">&laquo; 이전</a>';
		for (let i = startPage; i <= endPage; i++) {
			paginationHtml += `<a href="#" class="page-link ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
		}
		if (endPage < totalPages) paginationHtml += '<a href="#" class="page-link" data-page="next-group">다음 &raquo;</a>';

		$('#event-pagination').html(paginationHtml);

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

			displayEventList(currentPage);
			setupEventPagination(currentPage, currPageGroup);
		});
	}
});


