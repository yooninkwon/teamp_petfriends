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

	// URL 파라미터에서 orderCode 가져오기
	const urlParams = new URLSearchParams(window.location.search);
	const orderCode = urlParams.get('orderCode');
	
	if (orderCode) {
	    $('button[data-tab="couponStatus"]').trigger('click'); // 회원 쿠폰 탭 열기
        $('#search-order-code').val(orderCode); // #search-order-code 필드에 orderCode 값 입력
        loadMemberCouponData(orderCode); // 필터링된 데이터를 로드
	} else {
	    // 페이지 로드 시 기본적으로 첫 탭의 데이터를 불러오기
	    loadCouponRegisterData();
	}

	// 탭 전환 시 쿠폰 등록 데이터 로드
    $('button[data-tab="couponRegister"]').on('click', function () {
        loadCouponRegisterData();
    });

    // 탭 전환 시 회원 쿠폰 데이터 로드
    $('button[data-tab="couponStatus"]').on('click', function () {
        loadMemberCouponData(orderCode);
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
            grade: '',
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
                    lists += '<td>' + (coupon.cp_amount).toLocaleString('ko-KR') + '원</td>';
                } else if (coupon.cp_type === 'R') {
                    lists += '<td>' + coupon.cp_amount + '%</td>';
                }

                lists += '<td>' + coupon.issueCount || 0 + '</td>';
                lists += '<td>' + (coupon.totalUsage).toLocaleString('ko-KR') || 0 + '</td>';
				if(coupon.cp_kind === 'P'){
			        if (coupon.issueCount > 0 || coupon.totalUsage > 0) {
			            lists += `<td style="color: red;">수정불가</td>`;
			        } else {
			            lists += `<td>
			                          <button class="btn-style modify-coupon-btn" data-coupon-id="${coupon.cp_no}">수정</button>
			                          <button class="btn-style delete-coupon-btn" data-coupon-id="${coupon.cp_no}">삭제</button>
			                      </td>`;
			        }
				} else if (coupon.cp_kind === 'G') {
					lists += `<td>
		                          <button class="btn-style modify-coupon-btn" data-coupon-id="${coupon.cp_no}">수정</button>
		                          <button class="btn-style delete-coupon-btn" data-coupon-id="${coupon.cp_no}">삭제</button>
		                      </td>`;
				}
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
	    $('#regist-status-filter').on('change', function() {
	       filterParam = {
				status: $('input[name="status-filter"]:checked').val(),
				kind: $('input[name="kind-filter"]:checked').val(),
				grade: $('#grade-order').val(),
                type: $('input[name="type-filter"]:checked').val(),
                sort: $('#sort-order').val()
	       };
	
	       fetchData(currentPage, currPageGroup, filterParam);
	    });
		
		// 쿠폰 종류 '등급' 선택 시 드롭다운 활성화 설정
		$('input[name="kind-filter"]').on('change', function() {
		    if ($(this).val() === 'G') {
		        $('#grade-order').prop('disabled', false); // 'G'가 선택되면 활성화
		    } else {
		        $('#grade-order').prop('disabled', true);  // 다른 값이 선택되면 비활성화
		        $('#grade-order').val(''); // 비활성화 시 선택값 초기화
		    }
		});
    }

	// 회원 쿠폰 탭 데이터 로드 함수
	function loadMemberCouponData(orderCode) {
        const itemsPerPage = 12;
        let currentPage = 1;
        let totalItems = 0;
        let memberCouponList = [];
        let currPageGroup = 1;
        let totalPages = 0;
        let filterParam = {
            status: '발급,사용,만료', 
            searchOrder: '발급', 
            startDate: '', 
            endDate: '', 
            memberCode: '', 
            couponCode: '',
            orderCode: orderCode || '' // URL에서 가져온 orderCode를 필터에 설정
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
				
				const mcIssueFormatted = coupon.mc_issue 
		            ? new Date(coupon.mc_issue).toISOString().replace('T', ' ').split('.')[0]
		            : '';
		            
		        const mcUseFormatted = coupon.mc_use 
		            ? new Date(coupon.mc_use).toISOString().replace('T', ' ').split('.')[0]
		            : '';
		            
		        const mcDeadFormatted = coupon.mc_dead 
		            ? new Date(coupon.mc_dead).toISOString().split('T')[0]
		            : '';
				
                lists += '<tr>';
                lists += '<td>' + coupon.mc_code + '</td>';
                lists += '<td><a href="/admin/customer_info?memCode=' + coupon.mem_code + '">' + coupon.mem_name + '</a></td>';
                lists += '<td>' + coupon.cp_name + '</td>';
                lists += '<td>' + mcIssueFormatted + '</td>';
                lists += '<td>' + mcUseFormatted + '</td>';
                lists += '<td><a href="/admin/orderDetail?orderCode=' + coupon.o_code + '">' + (coupon.o_code || '') + '</a></td>';
                lists += '<td>' + mcDeadFormatted + '</td>';
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
		    const filterParam = {
		        status: $('input[name="issue-filter"]:checked').map(function() { return $(this).val(); }).get().join(','),
		        searchOrder: $('#search-order').val(),
		        startDate: $('#start-date').val(),
		        endDate: $('#end-date').val(),
		        memberCode: $('#search-member-code').val().trim(),
		        couponCode: $('#search-coupon-code').val().trim(),
		        orderCode: $('#search-order-code').val().trim()
		    };
		    
		    fetchData(currentPage, currPageGroup, filterParam);
		}

		// 필터 적용 이벤트
        $('input[name="issue-filter"], #search-order, #start-date, #end-date').on('change', applyFilters);
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

function unchecked() {
	if (document.getElementById('deadDate').value != document.getElementById('endDate').value) {
        document.getElementById('sameAsEndDate').checked = false;
    }
}

// 쿠폰 등록 데이터 전송
function submitCoupon() {
	
	const cp_name = document.getElementById('cpName').value.trim();
    const cp_keyword = document.getElementById('cpKeyword').value.trim();
    const cp_kind = document.querySelector('input[name="couponType"]:checked').value;
    const cp_type = document.getElementById('discountType').value;
    const cp_amount = document.getElementById('discountAmount').value.trim();
    const cp_start = document.getElementById('startDate').value || null;
    const cp_end = document.getElementById('endDate').value || null;
    const cp_dead = document.getElementById('deadDate').value || null;
    const g_no = document.getElementById('grade').value || null;
	
	// 필수 값 검증
    if (!cp_name) {
        document.getElementById('cpName').focus();
        return;
    }
    if (cp_kind === 'P') {
        if (!cp_start) {
            document.getElementById('startDate').focus();
            return;
        }
        if (!cp_end) {
            document.getElementById('startDate').focus();
            return;
        }
        if (!cp_dead) {
            document.getElementById('startDate').focus();
            return;
        }
    }
    if (!cp_amount || isNaN(cp_amount) || parseFloat(cp_amount) <= 0) {
        document.getElementById('discountAmount').focus();
        return;
    }
	
    const couponData = {cp_name,cp_keyword,cp_kind,g_no,cp_start,cp_end,cp_dead,cp_type,cp_amount};
	
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
    document.getElementById('grade').value = '1';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('deadDate').value = '';
    document.getElementById('sameAsEndDate').checked = false;
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