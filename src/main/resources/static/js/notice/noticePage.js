$(document).ready(function() {
    let itemsPerPage = 10;
    let currentPage = 1;
    let totalItems = 0;
    let currPageGroup = 1;
    let totalPages = 0;
    let noticeList = [];
    let filteredList = [];

    // 공지사항 데이터 불러오기
    loadNoticeData();

    function loadNoticeData() {
        fetch('/notice/notice_list', {
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

    // 검색 버튼 클릭 이벤트
    $('#submitBtn').on('click', function(event) {
        event.preventDefault();
        const searchType = $('#searchType').val();
        const searchKeyword = $('#searchInput').val().trim().toLowerCase();

        // 검색어에 따른 필터링
        if (searchKeyword) {
            filteredList = noticeList.filter(item => {
                if (searchType === 'title') {
                    return item.notice_title.toLowerCase().includes(searchKeyword);
                } else if (searchType === 'content') {
                    return item.notice_content.toLowerCase().includes(searchKeyword);
                } else if (searchType === 'number') {
                    return item.notice_no.toString().includes(searchKeyword);
                }
                return false;
            });
        } else {
            filteredList = noticeList;
        }

        // 페이지 초기화 및 리스트 갱신
        currentPage = 1;
        totalItems = filteredList.length;
        totalPages = Math.ceil(totalItems / itemsPerPage);
        displayNoticeList(currentPage);
        setupPagination(currentPage, currPageGroup);
    });

    // 공지사항 리스트 표시
    function displayNoticeList(currentPage) {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const sliceList = filteredList.slice(start, end);

        let post = '<tbody>';

        sliceList.forEach(item => {
            post += `
                <tr>
                    <td>${item.notice_no}</td>
                    <td><a href="/notice/noticeView?id=${item.notice_no}">${item.notice_title}</a></td>
                    <td>${item.notice_date}</td>
                    <td>${item.notice_hit}</td>
                </tr>
            `;
        });

        post += '</tbody>';

        // 기존 tbody 제거 후 새로 추가
        $('#board tbody').remove();
        $('#board').append(post);
    }

    // 페이징 설정 함수
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
});
