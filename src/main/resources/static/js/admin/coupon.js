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
            kind: '전체',
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

				if (coupon.cp_kind === 'P') {
				    lists += '<td>일반</td>';
				} else if (coupon.cp_kind === 'G') {
				    lists += '<td>등급</td>';
				}

                lists += '<td>' + coupon.cp_name + '</td>';
                lists += '<td>' + (coupon.cp_keyword || '') + '</td>';
                lists += '<td>' + (coupon.cp_start || '') + '</td>';
                lists += '<td>' + (coupon.cp_end || '') + '</td>';

                if (coupon.cp_type === 'A') {
                    lists += '<td>' + coupon.cp_amount + '원</td>';
                } else if (coupon.cp_type === 'R') {
                    lists += '<td>' + coupon.cp_amount + '%</td>';
                }

                lists += '<td>' + coupon.issueCount + '</td>';
                lists += '<td>' + (coupon.totalUsage || '') + '</td>';
				lists += `<td>
			                  <button class="btn-style modify-coupon-btn" data-coupon-id="${coupon.cp_no}">수정</button>
			                  <button class="btn-style delete-coupon-btn" data-coupon-id="${coupon.cp_no}">삭제</button>
			              </td>`;
			    lists += '</tr>';
            });

            $('#coupon-table-body').html(lists);
			
			// 수정 버튼 이벤트 바인딩
		    $('.modify-coupon-btn').on('click', function() {
		        const couponId = $(this).data('coupon-id');
		        loadCouponForEdit(couponId); // 수정할 쿠폰 로드
				
				// 모달에 couponId를 저장하고 버튼 텍스트를 '수정'으로 설정
			    $('#registerCouponBtn').text('수정');
			    $('#couponModal').data('coupon-id', couponId).show();
		    });

		    // 삭제 버튼 이벤트 바인딩
		    $('.delete-coupon-btn').on('click', function() {
				const confirmed = confirm('쿠폰을 삭제하시겠습니까?');

				    if (confirmed) {
						const couponId = $(this).data('coupon-id');
				        deleteCoupon(couponId);
				    }
		    });
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

            $('#coupon-pagination').html(paginationHtml);

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
	    $('#status-filter-all').on('change', function() {
	       filterParam = {
				status: $('input[name="status-filter"]:checked').val(),
				kind: $('input[name="kind-filter"]:checked').val(),
                type: $('input[name="type-filter"]:checked').val(),
                sort: $('#sort-order').val()
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

            $('#memberCoupon-pagination').html(paginationHtml);

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

// 신규등록 모달 열기/닫기
$('#new-coupon-btn').on('click', function() {
	resetModal();
	$('#registerCouponBtn').text('등록완료');
    document.getElementById('couponModal').style.display = 'block';
});
function closeModal() {
    document.getElementById('couponModal').style.display = 'none';
}

// 쿠폰 타입에 따라 입력 필드 변경
function toggleCouponType(type) {
    if (type === 'G') {
        document.getElementById('periodSelect').style.display = 'none';
        document.getElementById('gradeSelect').style.display = 'flex';
    } else {
        document.getElementById('periodSelect').style.display = 'block';
        document.getElementById('gradeSelect').style.display = 'none';
    }
}

// 할인 타입에 따라 단위 변경
function updateDiscountLabel() {
    const discountType = document.getElementById('discountType').value;
	if (discountType === 'A') {
        document.getElementById('discountUnit').innerText = '원';
    } else if (discountType === 'R') {
        document.getElementById('discountUnit').innerText = '%';
    }
}

// 발급 종료일과 만료 예정일 동일 설정
document.getElementById('sameAsEndDate').addEventListener('change', function () {
    if (this.checked) {
        document.getElementById('deadDate').value = document.getElementById('endDate').value;
    }
});

// 쿠폰 등록 데이터 전송
function submitCoupon() {
    const couponData = {
        cp_name: document.getElementById('cpName').value,
        cp_keyword: document.getElementById('cpKeyword').value || null,
        cp_kind: document.querySelector('input[name="couponType"]:checked').value,
        g_no: document.getElementById('grade').value || null,
        cp_start: document.getElementById('startDate').value || null,
        cp_end: document.getElementById('endDate').value || null,
        cp_dead: document.getElementById('deadDate').value || null,
        cp_type: document.getElementById('discountType').value,
        cp_amount: document.getElementById('discountAmount').value
    };
	
	// 버튼의 텍스트로 신규 등록과 수정 구분
    const actionType = document.getElementById('registerCouponBtn').innerText;

    if (actionType === '등록완료') {
        // 신규 등록 처리
        $.ajax({
            url: '/admin/coupon/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(couponData),
            success: function () {
                alert('쿠폰이 성공적으로 등록되었습니다.');
                location.reload();
            },
            error: function (xhr, status, errorThrown) {
                console.error(errorThrown);
                alert('쿠폰 등록 중 오류가 발생했습니다.');
            }
        });
    } else if (actionType === '수정') {
        // 수정 처리
        const couponId = $('#couponModal').data('coupon-id');
        $.ajax({
            url: `/admin/coupon/update?cpNo=` + couponId,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(couponData),
            success: function () {
                alert('쿠폰이 성공적으로 수정되었습니다.');
                location.reload();
            },
            error: function (xhr, status, errorThrown) {
                console.error(errorThrown);
                alert('쿠폰 수정 중 오류가 발생했습니다.');
            }
        });
    }
}

// 수정할 쿠폰 로드 함수
function loadCouponForEdit(couponId) {
    $.ajax({
        url: `/admin/coupon/modify?cpNo=` + couponId, // 쿠폰 정보를 가져올 URL
        method: 'GET',
        success: function(coupon) {
            // 모달에 기존 쿠폰 정보 표시
            document.getElementById('cpName').value = coupon.cp_name;
            document.getElementById('cpKeyword').value = coupon.cp_keyword;
            document.querySelector(`input[name="couponType"][value="${coupon.cp_kind}"]`).checked = true;
			toggleCouponType(coupon.cp_kind);
            document.getElementById('grade').value = coupon.g_no || '';
            document.getElementById('startDate').value = coupon.cp_start || '';
            document.getElementById('endDate').value = coupon.cp_end || '';
            document.getElementById('deadDate').value = coupon.cp_dead || '';
            document.getElementById('discountType').value = coupon.cp_type;
            document.getElementById('discountAmount').value = coupon.cp_amount;
        },
        error: function(xhr, status, error) {
            alert('쿠폰 정보를 가져오는데 오류가 발생했습니다.');
        }
    });
}

function resetModal() {
    document.getElementById('cpName').value = '';
    document.getElementById('cpKeyword').value = '';
    document.querySelector('input[name="couponType"][value="P"]').checked = true;
	toggleCouponType('P');
    document.getElementById('grade').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('deadDate').value = '';
    document.getElementById('discountType').value = 'A';
    document.getElementById('discountAmount').value = '';
}

// 쿠폰 삭제
function deleteCoupon(couponId) {
    $.ajax({
        url: `/admin/coupon/delete?cpNo=` + couponId,
        method: 'DELETE',
        success: function() {
            location.reload();
        },
        error: function(xhr, status, error) {
            alert('쿠폰 삭제 중 오류가 발생했습니다.');
			console.error('Error', error);
        }
    });
}