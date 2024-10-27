$(document).ready(function() {
//    
    // 페이지 로드 시 기본적으로 첫 탭의 데이터를 불러오기
    loadPetteacherData();

    // DB 데이터 불러오는 함수
    function loadPetteacherData() {
        const itemsPerPage = 15; // 페이지 당 item 수
        let currentPage = 1;
        let totalItems = 0;
        let petteacherList = []; // 데이터 저장할 배열
        let currPageGroup = 1;
        let totalPages = 0;

        // 필터 기본 값
        let filterParam = {
            type: 'all',
            category: '0',
            sort: '최신순'
        };

        fetchData(currentPage, currPageGroup, filterParam);

        function fetchData(currentPage, currPageGroup, filterParam) {
            $.ajax({
                url: '/admin/petteacher_admin_data',
                method: 'GET',
                data: filterParam,
                dataType: 'json',
                success: function (data) {
                    petteacherList = data;
                    totalItems = petteacherList.length;
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
            const sliceList = petteacherList.slice(start, end);

            let lists = '';
            $.each(sliceList, function (index, plist) {
                lists += '<tr>';
                lists += '<td>' + plist.hpt_seq + '</td>';
                lists += '<td>' + plist.hpt_category + '</td>';
                lists += '<td><a href="/admin/petteacher_admin_detail?hpt_seq=' + plist.hpt_seq + '">'  + plist.hpt_title + '</a></td>';
                lists += '<td>' + plist.hpt_pettype + '</td>';
                lists += '<td>' + plist.hpt_exp + '</td>';
                lists += '<td>' + plist.hpt_rgedate + '</td>';
                lists += '<td>' + plist.hpt_hit + '</td>';
				lists += `<td>
			                  <button class="btn-style modify-btn" data-petteacher-id="${plist.hpt_seq}">수정</button>
			                  <button class="btn-style delete-btn" data-petteacher-id="${plist.hpt_seq}">삭제</button>
			              </td>`;
			    lists += '</tr>';
            }); 

            $('#petteacher-table-body').html(lists);
			
			// 수정 버튼 이벤트 바인딩
		    $('.modify-btn').on('click', function() {
		        const petteacherId = $(this).data('petteacher-id');
		        loadPetteacherForEdit(petteacherId); // 수정할 쿠폰 로드
				
				// 모달에 couponId를 저장하고 버튼 텍스트를 '수정'으로 설정
			    $('#registerPetteacherBtn').text('수정');
			    $('#petteacherModal').data('petteacher-id', petteacherId).show();
		    });

		    // 삭제 버튼 이벤트 바인딩
		    $('.delete-btn').on('click', function() {
				const confirmed = confirm('게시글을 삭제하시겠습니까?');

				    if (confirmed) {
						const petteacherId = $(this).data('petteacher-id');
				        deleteData(petteacherId);
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
        $('#petteacher-filter input[name="pet-type-filter"]').on('change', function() {
			console.log('asdasd');
            filterParam = {
                type: $('input[name="pet-type-filter"]:checked').val(),
                category: $('input[name="category-filter"]:selected').val(),
                sort: $('#sort-order').val()
            };
			
            fetchData(currentPage, currPageGroup, filterParam);
        });

        $('#category-filter input[name="category-filter"]').on('change', function() {
			console.log('asdasd');
            filterParam = {
				type: $('input[name="pet-type-filter"]:checked').val(),
				category: $('input[name="category-filter"]:selected').val(),
				sort: $('#sort-order').val()
            };
			
            fetchData(currentPage, currPageGroup, filterParam);
        });


        $('#sort-order').on('change', function() {
            filterParam = {
				type: $('input[name="pet-type-filter"]:checked').val(),
				category: $('input[name="category-filter"]:selected').val(),
                sort: $(this).val()
            };
			
            fetchData(currentPage, currPageGroup, filterParam);
        });
    }


// 신규등록 모달 열기/닫기
// 열기
$('#new-petteacher-btn').on('click', function() {
	resetModal();
	$('#registerPetteacherBtn').text('등록완료');
    document.getElementById('petteacherModal').style.display = 'block';
});
// 닫기
$('.close-btn').on('click', function() {
	resetModal();
    document.getElementById('petteacherModal').style.display = 'none';
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

// 수정할 데이터 로드 함수
function loadPetteacherForEdit(hpt_seq) {
    $.ajax({
        url: `/admin/petteacher_admin_data_forEdit?hpt_seq=` + hpt_seq, // 쿠폰 정보를 가져올 URL
        method: 'GET',
        success: function(petteacherList) {
            // 모달에 기존 쿠폰 정보 표시
            document.getElementById('hpt_title').value = petteacherList.hpt_title;
            document.getElementById('hpt_exp').value = petteacherList.hpt_exp;
            document.querySelector(`input[name="petType"][value="${petteacherList.petType}"]`).selected = true;
            document.querySelector(`input[name="category"][value="${petteacherList.category}"]`).selected = true;
            document.getElementById('hpt_content').value = petteacherList.hpt_content;
        },
        error: function(xhr, status, error) {
            alert('쿠폰 정보를 가져오는데 오류가 발생했습니다.');
        }
    });
}
// @@@@@@@@@@@@@ 여기 하던중 @@@@@@@@@@@@@@@@@@@
function resetModal() {
    document.getElementById('hpt_title').value = '';
    document.getElementById('hpt_exp').value = '';
	document.getElementById('petType').selectedIndex = 0;
	document.getElementById('category').selectedIndex = 0;
    document.getElementById('hpt_content').value = '';
}

// 쿠폰 삭제
function deleteData(hpt_seq) {
    $.ajax({
        url: `/admin/petteacher_admin_data_forEdit?hpt_seq=` + hpt_seq,
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

});