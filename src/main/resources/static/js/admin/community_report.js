$(document).ready(function() {
    
    // 페이지 버튼 클릭 이벤트 리스너
    $(document).on("click", ".page-btn", function() {
        currentPage = $(this).data("page");
        loadData(currentPage); // 페이지 번호에 맞는 데이터 로드
    });

    // 검색 버튼 클릭 이벤트 리스너 (전체 게시글)
    $("#searchBtn").click(function() {
        currentPage = 1; 
        loadData(currentPage);
    });
    
    // 검색 버튼 클릭 이벤트 리스너 (신고 현황)
    $("#report-searchBtn").click(function() {
        currentPage = 1;
        loadReportData(currentPage); // 신고 현황 데이터 로드
    });

    // 데이터 로드 함수 (전체 게시글)
    function loadData(page) {
        const itemsPerPage = 10;
        var communityList = [];
        var totalItems = 0;

        var searchKeyword = $("#search-filter").val().trim();
        var searchFilterType = $("#search-order").val();
        var searchCategory = $("#category-filter").val();
        var searchStartDate = $("#start-date").val();
        var searchEndDate = $("#end-date").val();
        
        if ((searchStartDate != "" && searchEndDate === "") || (searchStartDate === "" && searchEndDate != "")) {
            alert("날짜를 선택해주세요.");
            return;
        }
        
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
                communityList = data.communityList || [];
                totalItems = data.totalItems || 0;

                var startIndex = (page - 1) * itemsPerPage;
                var endIndex = Math.min(startIndex + itemsPerPage, totalItems);
                var currentPageData = communityList.slice(startIndex, endIndex);

                $("#community-table-body").empty();
                var rows = '';

                if (currentPageData.length === 0) {
                    rows = '<tr><td colspan="6">데이터가 없습니다.</td></tr>';
                } else {
                    currentPageData.forEach(function(post) {
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
                
                $("#community-table-body").append(rows);
                generatePagination(totalItems, itemsPerPage, page);
            },
            error: function(xhr, status, error) {
                console.error("AJAX 요청 실패:", error);
                alert("데이터를 불러오는 중 오류가 발생했습니다.");
            }
        });
    }

    // 데이터 로드 함수 (신고 현황)
    function loadReportData(page) {
        const itemsPerPage = 10;
        var reportList = [];
        var totalItems = 0;

        var searchKeyword = $("#report-search-filter").val().trim();
        var searchFilterType = $("#report-search-order").val();
        var searchCategory = $("#report-category-filter").val();
        var searchStartDate = $("#report-start-date").val();
        var searchEndDate = $("#report-end-date").val();

        if ((searchStartDate != "" && searchEndDate === "") || (searchStartDate === "" && searchEndDate != "")) {
            alert("날짜를 선택해주세요.");
            return;
        }

        $.ajax({
            url: '/admin/report',
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
                reportList = data.reportList || [];
                totalItems = data.totalItems || 0;

                var startIndex = (page - 1) * itemsPerPage;
                var endIndex = Math.min(startIndex + itemsPerPage, totalItems);
                var currentPageData = reportList.slice(startIndex, endIndex);

                $("#report-community-table-body").empty();
                var rows = '';

                if (currentPageData.length === 0) {
                    rows = '<tr><td colspan="7">데이터가 없습니다.</td></tr>';
                } else {
                    currentPageData.forEach(function(report) {
                        rows += `<tr>
                                    <td><input type="checkbox" class="select-item"></td>
                                    <td>${report.mem_name}</td>
                                    <td>${report.reason}</td>
                                    <td>${report.report_type}</td>
                                    <td>${report.reporter_id}</td>
                                    <td>${report.report_date}</td>
                                    <td>${report.status}</td>
                                  </tr>`;
                    });
                }

                $("#report-community-table-body").append(rows);
                generatePagination(totalItems, itemsPerPage, page, "report-pagination");
            },
            error: function(xhr, status, error) {
                console.error("AJAX 요청 실패:", error);
                alert("데이터를 불러오는 중 오류가 발생했습니다.");
            }
        });
    }

    // 페이징 버튼 생성 함수
    function generatePagination(totalItems, itemsPerPage, currentPage, paginationId = "pagination") {
        var totalPages = Math.ceil(totalItems / itemsPerPage);
        var paginationHtml = '';

        for (var i = 1; i <= totalPages; i++) {
            var activeClass = (i === currentPage) ? 'active' : '';
            paginationHtml += `<a class="page-btn ${activeClass}" data-page="${i}">${i}</a>`;
        }

        $("#" + paginationId).html(paginationHtml);
    }

    var currentPage = 1;
    loadData(currentPage);

    $("#select-all").click(function() {
        var isChecked = $(this).prop('checked');
        $(".select-item").prop('checked', isChecked);
    });

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
            var ws = XLSX.utils.json_to_sheet(selectedRows);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "게시글 목록");
            XLSX.writeFile(wb, "community_posts.xlsx");
        } else {
            alert("선택된 게시글이 없습니다.");
        }
    });

    $("#report-downloadBtn").click(function() {
        var selectedRows = [];
        $(".select-item:checked").each(function() {
            var row = $(this).closest("tr");
            var rowData = {
                writer: row.find("td:nth-child(2)").text(),
                reason: row.find("td:nth-child(3)").text(),
                type: row.find("td:nth-child(4)").text(),
                reporter: row.find("td:nth-child(5)").text(),
                date: row.find("td:nth-child(6)").text(),
                status: row.find("td:nth-child(7)").text()
            };
            selectedRows.push(rowData);
        });

        if (selectedRows.length > 0) {
            var ws = XLSX.utils.json_to_sheet(selectedRows);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "신고 목록");
            XLSX.writeFile(wb, "report_list.xlsx");
        } else {
            alert("선택된 신고 내역이 없습니다.");
        }
    });

    $("#reset-date").click(function() {
        $("#start-date").val("");
        $("#end-date").val("");
    });

    $("#report-reset-date").click(function() {
        $("#report-start-date").val("");
        $("#report-end-date").val("");
    });
});