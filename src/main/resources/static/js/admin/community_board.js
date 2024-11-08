$(document).ready(function() {

    // 페이지 버튼 클릭 이벤트 리스너
    $(document).on("click", ".page-btn", function() {
        currentPage = $(this).data("page");
        loadData(currentPage); // 페이지 번호에 맞는 데이터 로드
    });

    // 검색 버튼 클릭 이벤트 리스너
    $("#searchBtn").click(function() {
        currentPage = 1; // 검색 시 첫 페이지로 초기화
        loadData(currentPage); // 검색 후 첫 페이지 데이터 로드
    });

    // 데이터 로드 함수
    function loadData(page) {
        const itemsPerPage = 10; // 한 페이지에 표시할 항목 수
        var communityList = [];
        var totalItems = 0; // 전체 항목 수

        var searchKeyword = $("#search-filter").val().trim();
        var searchFilterType = $("#search-order").val();
        var searchCategory = $("#category-filter").val();
        var searchStartDate = $("#start-date").val();
        var searchEndDate = $("#end-date").val();
		
		if ( (searchStartDate != "" && searchEndDate === "") || (searchStartDate === "" && searchEndDate != "")) {
		    alert("날짜를 선택해주세요.");
		    return;
		}
        // AJAX 요청 보내기
        $.ajax({
            url: '/admin/community',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                searchKeyword: searchKeyword,
                searchFilterType: searchFilterType,
                searchCategory: searchCategory,
                searchStartDate: searchStartDate,
                searchEndDate: searchEndDate,

            }),
            success: function(data) {
                console.log("서버 응답 data:", data); // 서버에서 반환된 전체 데이터를 확인

                communityList = data.communityList || []; // 데이터 목록
                totalItems = data.totalItems || 0; // 전체 항목 수
				console.log("communityList:", communityList);
               
				 // 페이징을 위해 데이터를 나눔
                var startIndex = (page - 1) * itemsPerPage;
                var endIndex = Math.min(startIndex + itemsPerPage, totalItems);
                var currentPageData = communityList.slice(startIndex, endIndex);
				console.log("startIndex:", startIndex);  // 시작 인덱스
				console.log("endIndex:", endIndex);      // 끝 인덱스
				console.log("currentPageData:", currentPageData);  // 잘라낸 데이터
				 // 테이블 본문을 비우고 새로 데이터 추가
                $("#community-table-body").empty();
                var rows = '';

                if (currentPageData.length === 0) {
                    rows = '<tr><td colspan="6">데이터가 없습니다.</td></tr>';
                } else {
                    // 데이터 반복 처리
                    currentPageData.forEach(function(post) {
                        // 행 추가
                        rows += `<tr>
                                    <td><input type="checkbox" class="select-item"></td>
                                    <td>${post.mem_name}</td>
                                    <td><a href="/community/contentView?board_no=${post.board_no}">${post.board_title}</a></td>
                                    <td>${post.b_cate_name}</td>
                                    <td>${post.board_created}</td>
                                    <td>${post.board_views}</td>
                                  </tr>`;
                    });
					 }
				
                // 테이블에 데이터 추가
                $("#community-table-body").append(rows);

                // 페이징 버튼 생성
                generatePagination(totalItems, itemsPerPage, page);
            },
            error: function(xhr, status, error) {
                console.error("AJAX 요청 실패:", error); // 에러 메시지 출력
                alert("데이터를 불러오는 중 오류가 발생했습니다.");
            }
        });
    }

    // 페이징 버튼 생성 함수
    function generatePagination(totalItems, itemsPerPage, currentPage) {
        var totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수 계산
        var paginationHtml = '';

        for (var i = 1; i <= totalPages; i++) {
            // 현재 페이지 버튼 활성화
            var activeClass = (i === currentPage) ? 'active' : '';
            paginationHtml += `<a class="page-btn ${activeClass}" data-page="${i}">${i}</a>`;
        }

        $("#pagination").html(paginationHtml); // 페이징 버튼을 #pagination에 삽입
    }

    // 첫 페이지 로드
    var currentPage = 1;
    loadData(currentPage);

    // 전체 선택/해제 체크박스
    $("#select-all").click(function() {
        var isChecked = $(this).prop('checked');
        $(".select-item").prop('checked', isChecked);
    });

    // 엑셀 다운로드 버튼 클릭 이벤트
    $("#downloadBtn").click(function() {
        var selectedRows = [];
        $(".select-item:checked").each(function() {
            var row = $(this).closest("tr");
            var rowData = {
                writer: row.find("td:nth-child(2)").text(),
                title: row.find("td:nth-child(3)").text(),
                category: row.find("td:nth-child(4)").text(),
                date: row.find("td:nth-child(5)").text(),
                views: row.find("td:nth-child(6)").text()
            };
            selectedRows.push(rowData);
        });

        if (selectedRows.length > 0) {
            // SheetJS로 엑셀 파일 생성
            var ws = XLSX.utils.json_to_sheet(selectedRows);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "게시글 목록");

            // 엑셀 다운로드
            XLSX.writeFile(wb, "community_posts.xlsx");
        } else {
            alert("선택된 게시글이 없습니다.");
        }
    });

    // 초기화 버튼 클릭 이벤트
    $("#reset-date").click(function() {
        $("#start-date").val("");
        $("#end-date").val("");
    });

	// 페이징 버튼 생성 함수
	function generatePagination(totalItems, itemsPerPage, currentPage) {
	    var totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수 계산
	    var paginationHtml = '';

	    // 페이지 번호가 5단위로 그룹화된 방식으로 버튼 생성
	    var startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
	    var endPage = Math.min(startPage + 4, totalPages);

	    // 이전 페이지 버튼
	    var prevClass = (currentPage > 1) ? '' : 'disabled';
	    paginationHtml += `<a class="page-btn prev ${prevClass}" data-page="${currentPage - 1}">&lt;</a>`;

	    // 5페이지씩 건너뛰기
	    if (startPage > 1) {
	        paginationHtml += `<a class="page-btn" data-page="${startPage - 1}">...</a>`;
	    }

	    // 페이지 번호 버튼
	    for (var i = startPage; i <= endPage; i++) {
	        var activeClass = (i === currentPage) ? 'active' : '';
	        paginationHtml += `<a class="page-btn ${activeClass}" data-page="${i}">${i}</a>`;
	    }

	    // 다음 페이지 버튼
	    var nextClass = (currentPage < totalPages) ? '' : 'disabled';
	    paginationHtml += `<a class="page-btn next ${nextClass}" data-page="${currentPage + 1}">&gt;</a>`;

	    // "다음" 버튼 표시 (5페이지씩 건너뛰기)
	    if (endPage < totalPages) {
	        paginationHtml += `<a class="page-btn" data-page="${endPage + 1}">다음 》</a>`;
	    }

	    $("#pagination").html(paginationHtml); // 페이징 버튼을 #pagination에 삽입
	}
	
});
