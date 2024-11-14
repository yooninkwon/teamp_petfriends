$(document).ready(function() {
    const itemsPerPage = 19; // 페이지 당 item 수
    let currentPage = 1;
    let totalItems = 0;
    let orderList = []; // 데이터 저장할 배열
    let currPageGroup = 1;
    let totalPages = 0;

    // 필터 기본 값
	let filterParam = {
        status: '',
        startDate: '', 
        endDate: '', 
        orderCode: '',
        proCode: '',
        memberCode: ''
    };

    fetchData(currentPage, currPageGroup, filterParam);

    function fetchData(currentPage, currPageGroup, filterParam) {
        $.ajax({
            url: '/admin/order/data',
            method: 'GET',
            data: filterParam,
            dataType: 'json',
            success: function (orders) {
                orderList = orders;
                totalItems = orderList.length;
                totalPages = Math.ceil(totalItems / itemsPerPage);

                displayItems(currentPage);
                setupPagination(currentPage, currPageGroup);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }

	function displayItems(currentPage) {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const sliceList = orderList.slice(start, end);

        let lists = '';
        $.each(sliceList, function (index, order) {
	        
			const orderAmount = (order.o_coupon + order.o_point + order.o_amount + 3000).toLocaleString('ko-KR');
		    const disAmount = (order.o_coupon + order.o_point).toLocaleString('ko-KR');
			
	        const osRegdateFormatted = order.orderDate
	            ? new Date(order.orderDate).toISOString().replace('T', ' ').split('.')[0]
	            : '';
			
			// 상태에 따른 CSS 클래스 적용
			const statusClass = order.currStatus === '결제완료' ? 'completed' :
	                            order.currStatus === '배송준비중' || order.currStatus === '배송중' || order.currStatus === '배송완료' ? 'delivered' :
	                            order.currStatus === '구매확정' ? 'confirmed' :
	                            order.currStatus === '주문취소' ? 'canceled' : '';
				
            lists += '<tr>';
            lists += '<td><input type="checkbox" name="select-item"></td>';
            lists += '<td><a href="/admin/orderDetail?orderCode=' + order.o_code + '">' + order.o_code + '</a></td>';
            lists += '<td><span class="' + statusClass + '">' + order.currStatus + '</span></td>';
            lists += '<td>' + orderAmount + '</td>';
            lists += '<td>' + (disAmount).toLocaleString('ko-KR') + '</td>';
            lists += '<td>' + order.o_amount + '</td>';
            lists += '<td><a href="/admin/customer_info?memCode=' + order.mem_code + '">' + order.mem_name + '</a></td>';
            lists += '<td>' + osRegdateFormatted + '</td>';
            lists += '</tr>';
        });

        $('#order-table-body').html(lists);

		// 전체 체크박스 이벤트
		document.querySelector('thead input[name="select-item"]').addEventListener('change', selectAllItem);

		// 개별 체크박스 이벤트
		document.querySelectorAll('tbody input[name="select-item"]').forEach(checkbox => {
		    checkbox.addEventListener('change', updateSelectAllStatus);
		});

		// 전체 선택/해제 기능
		function selectAllItem() {
		    const isChecked = document.querySelector('thead input[name="select-item"]').checked;
		    document.querySelectorAll('tbody input[name="select-item"]').forEach(checkbox => {
		        checkbox.checked = isChecked;
		    });
		}

		// 개별 체크박스 상태에 따라 전체 선택 체크박스 상태 업데이트
		function updateSelectAllStatus() {
		    const allChecked = Array.from(document.querySelectorAll('tbody input[name="select-item"]'))
		        .every(checkbox => checkbox.checked);

		    document.querySelector('thead input[name="select-item"]').checked = allChecked;
		}
    }

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

        $('#order-pagination').html(paginationHtml);

        $('.page-link').on('click', function (event) {
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

	// 필터 적용
	function applyFilters() {
	    const filterParam = {
	        status: $('input[name="deliv-filter"]:checked').map(function() { return $(this).val(); }).get().join(','),
	        startDate: $('#start-date').val(),
	        endDate: $('#end-date').val(),
	        orderCode: $('#search-order-code').val().trim(),
	        proCode: $('#search-pro-code').val().trim(),
	        memberCode: $('#search-member-code').val().trim()
	    };
		
	    fetchData(currentPage, currPageGroup, filterParam);
	}

	// 필터 적용 이벤트
    $('input[name="deliv-filter"], #start-date, #end-date').on('change', applyFilters);
	$('input[name="ketword-filter"]').on('input', applyFilters);

	// 조회 기간 리셋 버튼 클릭 시
	$('#reset-date').on('click', function() {
	    // 필터값 초기화
	    $('#start-date').val('');
	    $('#end-date').val('');
	    
	    applyFilters();
	});
	
	// 날짜값
	let startDateVal;
	let endDateVal;

	// 시작일이 변경될 때 - 종료날짜와 비교하여 제한
	$('#start-date').on('change', function() {
		checkDateVal($('#end-date'));
	});

	// 종료일이 변경될 때 - 시작날짜와 비교하여 제한
	$('#end-date').on('change', function() {
		checkDateVal($('#end-date'));
	});

	// 시작일과 종료일 비교
	function checkDateVal(tag) {
		// 날짜의 '-'을 공백으로 바꾸고 숫자로 타입 변경
		let startDateVal = Number($('#start-date').val().replace(/-/gi, ''));
		let endDateVal = Number($('#end-date').val().replace(/-/gi, ''));

		if (endDateVal != 0 && startDateVal != 0) {
			// 시작일이 종료일보다 클 때
			if (startDateVal > endDateVal) {
				// 해당 값을 공백으로 설정
				tag.val('');
			}
		}
	}
	
	// 배송 처리 버튼 클릭 이벤트
	document.querySelectorAll('.deliv-btn').forEach(button => {
	    button.addEventListener('click', function () {
	        // 선택된 버튼의 id 값
	        const osName = this.value;

	        // 체크된 행의 o_code 값 수집
	        const selectedOrders = Array.from(document.querySelectorAll('tbody input[name="select-item"]:checked'))
	            .map(checkbox => {
	                // 각 체크된 행의 o_code 값 가져오기
	                return checkbox.closest('tr').querySelector('td:nth-child(2) a').textContent; // o_code가 위치한 열
	            });

	        // 선택된 행이 없으면 알림 표시 후 종료
	        if (selectedOrders.length === 0) {
	            alert('처리할 주문을 선택하세요.');
	            return;
	        }
			
			// 재확인 요청
	        const confirmMessage = `선택된 주문을 "${osName}" 상태로 처리 하시겠습니까?`;
	        if (!confirm(confirmMessage)) {
	            return; // 취소를 선택한 경우 함수 종료
	        }
			
	        // 데이터 전송
			$.ajax({
	            url: '/admin/order/delivprogress',
	            type: 'POST',
	            contentType: 'application/json',
	            data: JSON.stringify({
	                osName: osName,
	                oCodes: selectedOrders
	            }),
	            success: function (data) {
					// 오류 메시지가 있는 경우
			        if (data.errorMessage) {
			            alert(data.errorMessage);
			        } else {
			            // 처리된 개수에 대한 알림 표시
			            alert(`총 ${data.processedCount}개의 주문이 "${osName}" 처리되었습니다.`);
			            location.reload();
			        }
	            },
	            error: function (error) {
	                console.error('Error:', error);
	                alert('처리 중 오류가 발생했습니다.');
	            }
	        });
	    });
	});
});