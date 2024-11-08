$(document).ready(function() {
	let itemsPerPage = 10;
	let currentPage = 1;
	let totalItems = 0;
	let currPageGroup = 1;
	let totalPages = 0;
	let customerList = [];
	let filteredList = [];

	loadCustomerData();

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
				loadCustomerData();
			}
			if (tabId === 'event-list-container') {
				loadEventData();
			}
		});
	});

	// 공지사항 불러오기
	function loadCustomerData() {
		fetch('/admin/customer_list', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
			.then(data => {
				customerList = data;
				filteredList = data;
				totalItems = customerList.length;
				totalPages = Math.ceil(totalItems / itemsPerPage);
				displayCustomerList(currentPage);
				setupPagination(currentPage, currPageGroup);
			})
			.catch(error => console.error('Fetch error:', error));
	}

	// 공지사항 보여주기
	function displayCustomerList(currentPage) {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		const sliceList = filteredList.slice(start, end); // 현재 페이지에 맞는 데이터만 표시

		let member = '<tbody>';

		sliceList.forEach(item => {
		        // 날짜 포맷 변경
		        const memRegDate = formatDate(item.mem_regdate);
		        const memLogDate = formatDate(item.mem_logdate);

		        member += `
		            <tr>
		                <td><input type="checkbox" name="checkboxNotice" class="notice-checkbox" value="${item.mem_code}" /></td>
		                <td>${memRegDate}</td>
		                <td>${memLogDate}</td>
		                <td>${item.mem_code}</td>
		                <td>${item.mem_name}</td>
		                <td>${item.mem_nick}</td>
		                <td>${item.mem_tell}</td>
		                <td>${item.mem_email}</td>
		                <td>${item.mem_gender}</td>
		                <td>${item.mem_type}</td>
		                <td>
		                    <input type="button" value="수정" onclick="location.href='/admin/notice_edit?id=${item.mem_code}'" />
		                    <input type="button" class="deleteBtn" data-id="${item.mem_code}" value="삭제" />
		                </td>
		            </tr>
		        `;
		    });

		member += '</tbody>';

		$('#notice-list-container .notice-list tbody').remove();
		$('#notice-list-container .notice-list').append(member);

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

	// 날짜 포맷팅 함수
	function formatDate(dateString) {
	    const date = new Date(dateString);
	    if (isNaN(date.getTime())) {
	        return dateString; // 유효하지 않은 날짜라면 원래 문자열을 반환
	    }
	    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
	}
	
	
	
});


