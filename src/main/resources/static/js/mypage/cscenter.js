// 탭 전환 기능
document.querySelectorAll('.tab-btn').forEach(function(tabBtn) {
  tabBtn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
      btn.classList.remove('active');
    });
    this.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(function(content) {
      content.classList.remove('active');
    });
    document.getElementById(this.dataset.tab).classList.add('active');
  });
});

// 문의상세 탭으로 전환
function showDetail(csNo) {
	document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    $('#myHistoryDetail').addClass('active');

    // AJAX로 해당 정보 가져오기
    $.ajax({
    	url: `/mypage/cscenter/csDetail`,
        method: 'GET',
        data: { csNo: csNo },
        dataType: 'json',
        success: function (data) {
			// 날짜 변환
            const originalDate = new Date(data.cs_regdate);
            const formattedDate = originalDate.toISOString().slice(0, 16).replace('T', ' ');
			
        	$('#csNo').val(data.cs_no);
        	$('#detailCategory').text(data.cs_caregory);
            $('#detailName').text(data.mem_name);
            $('#detailDate').text(formattedDate);
            $('#detailContent').text(data.cs_contect);
            $('#detailAnswer').text(data.cs_answer || '답변을 처리 중입니다.');
        }
    });
}

function goBackToHistory() {
    $('button[data-tab="myHistory"]').click();
}

//수정 탭으로 이동
function goToEdit() {
	$('button[data-tab="contact"]').click();
    // 기존 값 입력
    $('#cs_no').val($('#csNo').val());
    $('#cs_caregory').val($('#detailCategory').text());
    $('.cs_contect').val($('#detailContent').text());
}

// 삭제
function deleteCS() {
    const csNo = $('#csNo').val();

    if (confirm('문의를 삭제하시겠습니까?')) {
        $.ajax({
            url: `/mypage/cscenter/deleteCS`,
            method: 'POST',
            data: { csNo: csNo },
            success: function () {
                alert('문의가 삭제되었습니다.');
				$('button[data-tab="myHistory"]').click();
            },
            error: function () {
                alert('삭제에 실패했습니다.');
            }
        });
    }
}

//등록
$('#contact .submit-btn').on('click', function (event) {
    event.preventDefault();

    const formData = $('#contact form').serialize();

    $.ajax({
        url: '/mypage/cscenter/writeCS',
        method: 'POST',
        data: formData,
        success: function () {
            alert('문의가 등록되었습니다.');
            $('button[data-tab="myHistory"]').click();
        },
        error: function () {
            alert('문의 등록/수정에 실패했습니다.');
        },
    });
});

$(document).ready(function() {
	$('button[data-tab="contact"]').click();
	
    $('button[data-tab="myHistory"]').on('click', function () {
        myHistoryData();
    });
    $('button[data-tab="contact"]').on('click', function () {
		$('#cs_no').val('');
	    $('#cs_caregory').val('배송');
	    $('.cs_contect').val('');
    });

    function myHistoryData() {
        const itemsPerPage = 12; // 페이지 당 item 수
        let currentPage = 1;
        let totalItems = 0;
        let myHistoryList = []; // 데이터 저장할 배열
        let currPageGroup = 1;
        let totalPages = 0;
		
        fetchData(currentPage, currPageGroup);

        function fetchData(currentPage, currPageGroup) {
            $.ajax({
                url: '/mypage/cscenter/data',
                method: 'GET',
                dataType: 'json',
                success: function (myHistory) {
                    myHistoryList = myHistory;
                    totalItems = myHistoryList.length;
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
		    const sliceList = myHistoryList.slice(start, end);
			
		    let lists = '';
	        $.each(sliceList, function (index, myHistory) {
				
				const date = new Date(myHistory.cs_regdate);
		        let formattedDate = new Intl.DateTimeFormat('ko-KR', {
				                year: 'numeric',
				                month: '2-digit',
				                day: '2-digit',
				                hour: '2-digit',
				                minute: '2-digit',
				                hour12: false
				            }).format(date);
				
				lists += `
		            <tr onclick="showDetail(${myHistory.cs_no})" style="cursor: pointer;">
		                <th>${myHistory.cs_no}</th>
		                <th style="width: 60%; text-align: left;">${myHistory.cs_caregory}</th>
		                <th>${myHistory.mem_name}</th>
		                <th>${formattedDate}</th>
		                <th style="font-weight: bold; ${
		                    myHistory.cs_answer ? 'color: gray;' : 'color: #ff4081;'
		                }">${myHistory.cs_answer ? '답변완료' : '처리중'}</th>
		            </tr>
		        `;
	        });
	        $('#myHistory-list').html(lists);
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
			
			$('#myHistory-pagination').html(paginationHtml);
			
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
    }
});