//탭 전환 기능
document.querySelectorAll('.tab-btn').forEach(function(tabBtn) {
    tabBtn.addEventListener('click', function() {
        // 모든 탭에서 'active' 클래스를 제거
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });

        // 클릭한 탭에 'active' 클래스 추가
        this.classList.add('active');

        // 모든 콘텐츠 숨김
        document.querySelectorAll('.tab-content').forEach(function(content) {
            content.style.display = 'none';
        });

        // 클릭한 탭에 해당하는 콘텐츠만 표시
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).style.display = 'block';
    });
});

$(document).ready(function() {
    
    // 페이지 로드 시 기본적으로 첫 탭의 데이터를 불러오기
    loadCouponRegisterData();

	// 탭 전환 시 쿠폰 등록 데이터 로드
    $('button[data-tab="couponRegister"]').on('click', function () {
        loadCouponRegisterData();
    });

    // 탭 전환 시 회원 쿠폰 데이터 로드
    $('button[data-tab="couponStatus"]').on('click', function () {
        loadMemberCouponData();
    });

    // 쿠폰 등록 탭 데이터 로드 함수
    function loadCouponRegisterData() {
        const itemsPerPage = 15; // 페이지 당 item 수
        let currentPage = 1;
        let totalItems = 0;
        let couponList = []; // 데이터 저장할 배열
        let currPageGroup = 1;
        let totalPages = 0;

        // 필터 기본 값
        let filterParam = {
            status: '전체',
            type: '전체',
            sort: '최신순'
        };
	
		
        fetchData(currentPage, currPageGroup, filterParam);

        function fetchData(currentPage, currPageGroup, filterParam) {
            $.ajax({
                url: '/admin/coupon/data',
                method: 'GET',
                data: filterParam,
                dataType: 'json',
                success: function (coupons) {
                    couponList = coupons;
                    totalItems = couponList.length;
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
            const sliceList = couponList.slice(start, end);

            let lists = '';
            $.each(sliceList, function (index, coupon) {
                lists += '<tr>';
                lists += '<td>' + coupon.cp_no + '</td>';
                lists += '<td>' + coupon.cp_name + '</td>';
                lists += '<td>' + coupon.cp_keyword + '</td>';
                lists += '<td>' + coupon.cp_start + '</td>';
                lists += '<td>' + coupon.cp_end + '</td>';

                if (coupon.cp_type === 'A') {
                    lists += '<td>' + coupon.cp_amount + '원</td>';
                } else if (coupon.cp_type === 'R') {
                    lists += '<td>' + coupon.cp_amount + '%</td>';
                }

                lists += '<td>' + coupon.issueCount + '</td>';
                lists += '<td>' + (coupon.totalUsage || 'N/A') + '</td>';
                lists += '<td><button class="btn-style">수정</button><button class="btn-style">삭제</button></td>';
                lists += '</tr>';
            });

            $('#coupon-table-body').html(lists);
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

            $('#pagination').html(paginationHtml);

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

        // 필터링 관련 코드
        $('#status-filter input[name="status-filter"]').on('change', function() {
            filterParam = {
                status: $('input[name="status-filter"]:checked').val(),
                type: $('input[name="type-filter"]:checked').val(),
                sort: $('#sort-order').val()
            };
			
            fetchData(currentPage, currPageGroup, filterParam);
        });

        $('#type-filter input[name="type-filter"]').on('change', function() {
            filterParam = {
                status: $('input[name="status-filter"]:checked').val(),
                type: $('input[name="type-filter"]:checked').val(),
                sort: $('#sort-order').val()
            };
			
            fetchData(currentPage, currPageGroup, filterParam);
        });

        $('#sort-order').on('change', function() {
            filterParam = {
                status: $('input[name="status-filter"]:checked').val(),
                type: $('input[name="type-filter"]:checked').val(),
                sort: $(this).val()
            };
			
            fetchData(currentPage, currPageGroup, filterParam);
        });
    }

	// 회원 쿠폰 탭 데이터 로드 함수
	function loadMemberCouponData() {
        const itemsPerPage = 12;
        let currentPage = 1;
        let totalItems = 0;
        let memberCouponList = [];
        let currPageGroup = 1;
        let totalPages = 0;
        let filterParam = {
            status: '발급,사용,만료', 
            startDate: '', 
            endDate: '', 
            memberCode: '', 
            couponCode: ''
        };
		
		
        fetchData(currentPage, currPageGroup, filterParam);

        function fetchData(currentPage, currPageGroup, filterParam) {
            $.ajax({
                url: '/admin/memberCoupon/data',
                method: 'GET',
                data: filterParam,
                dataType: 'json',
                success: function (coupons) {
                    memberCouponList = coupons;
                    totalItems = memberCouponList.length;
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
            const sliceList = memberCouponList.slice(start, end);

            let lists = '';
            $.each(sliceList, function (index, coupon) {
                lists += '<tr>';
                lists += '<td>' + coupon.mc_code + '</td>';
                lists += '<td>' + coupon.mem_name + '</td>';
                lists += '<td>' + coupon.cp_name + '</td>';
                lists += '<td>' + coupon.mc_issue + '</td>';
                lists += '<td>' + coupon.mc_use + '</td>';
                lists += '<td>' + (coupon.payment_code || 'N/A') + '</td>';
                lists += '<td>' + coupon.mc_dead + '</td>';
                lists += '</tr>';
            });

            $('#member-coupon-table-body').html(lists);
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

            $('#pagination').html(paginationHtml);

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
            filterParam = {
                status: $('input[name="issue-filter"]:checked').map(function() { return $(this).val(); }).get().join(','),
                searchOrder: $('#search-order').val(),
                startDate: $('#start-date').val(),
                startDate: $('#start-date').val(),
                endDate: $('#end-date').val(),
                memberCode: $('#search-member-code').val(),
                couponCode: $('#search-coupon-code').val(),
                orderCode: $('#search-order-code').val()
            };
			
            fetchData(currentPage, currPageGroup, filterParam);
        }

        // 쿠폰 상태 필터 적용
        $('input[name="issue-filter"]').on('change', function() {
            applyFilters();
        });
		
        // 조회 기간 필터 적용
        $('#search-order, #start-date, #end-date').on('change', function() {
            applyFilters();
        });

        // 검색 필터 적용
        $('#search-btn').on('click', function() {
            applyFilters();
        });

        // 조회 기간 리셋
        $('#reset-date').on('click', function() {
            $('#start-date').val('');
            $('#end-date').val('');
            applyFilters();
        });
    }
});