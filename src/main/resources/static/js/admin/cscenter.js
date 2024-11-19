$(document).ready(function() {
    const itemsPerPage = 10; // 페이지 당 item 수
    let currentPage = 1;
    let totalItems = 0;
    let contactList = []; // 데이터 저장할 배열
    let currPageGroup = 1;
    let totalPages = 0;

    // 필터 기본 값
	let filterParam = {
        status: '처리중',
        category: ''
    };

    fetchData(currentPage, currPageGroup, filterParam);

    function fetchData(currentPage, currPageGroup, filterParam) {
        $.ajax({
            url: '/admin/cscenter/data',
            method: 'GET',
            data: filterParam,
            dataType: 'json',
            success: function (csDatas) {
                contactList = csDatas;
                totalItems = contactList.length;
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
        const sliceList = contactList.slice(start, end);

        let lists = '';
        $.each(sliceList, function (index, contact) {
			
			// 상태에 따른 CSS 클래스 적용
			const contactStatus = contact.cs_delete ? '삭제' :
	                              contact.cs_answer ? '처리완료' : '처리중';
		    const statusClass = contactStatus === '삭제' ? 'deleted' :
                                contactStatus === '처리완료' ? 'completed' : 'pending';
				
            lists += '<tr onclick="showDetail(' + contact.cs_no + ')" style="cursor: pointer;">';
            lists += '<td>' + contact.cs_no + '</td>';
            lists += '<td>' + contact.cs_caregory + '</td>';
            lists += '<td>' + contact.cs_contect + '</td>';
            lists += '<td><a href="/admin/customer_info?memCode=' + contact.mem_code + '">' + contact.mem_name + '</a></td>';
            lists += '<td>' + contact.cs_regdate + '</td>';
            lists += '<td><span class="' + statusClass + '">' + contactStatus + '</span></td>';
        });

        $('#contact-table-body').html(lists);
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

        $('#contact-pagination').html(paginationHtml);

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
	
	// 필터링 코드
    $('#status-filter').on('change', function() {
       filterParam = {
			status: $('input[name="aswerable-filter"]:checked').map(function() { return $(this).val(); }).get().join(','),
			category: $('input[name="category-filter"]:checked').map(function() { return $(this).val(); }).get().join(',')
       };

       fetchData(currentPage, currPageGroup, filterParam);
    });
});


function showDetail(csNo) {
    $.ajax({
        url: '/admin/cscenter/detail',
        method: 'GET',
        data: { cs_no: csNo },
        dataType: 'json',
        success: function (data) {
            if (data) {
                $('#cs_no').val(data.cs_no);
                $('#cs_content').val(data.cs_contect);
                $('#cs_answer').val(data.cs_answer || ''); // 답변이 없을 경우 빈 값으로 처리
            } else {
                alert('해당 데이터를 찾을 수 없습니다.');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error fetching detail:', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다.');
        }
    });
}