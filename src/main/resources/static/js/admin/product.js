$(document).ready(function() {

	$("#pro-detail-type label").hide();
	loadProductList();
	// 라디오 버튼이 변경될 때마다 실행
	$('#pet-type input[type="radio"], #pro-type input[type="radio"]').change(function() {



		// 선택된 petType과 proType 값 확인
		var petType = $('input[name="pet-filter"]:checked').val();
		var proType = $('input[name="pro-filter"]:checked').val();

		// 상세타입 초기화
		$("#pro-detail-type label").hide();
		$("#pro-detail-type input[type='radio']").prop('checked', false); // 체크 해제
		// 검색 필드 초기화
		$('#search-filter').val('');

		if (petType === "강아지") {
			if (proType === "사료") {
				$('input[name="type-DF"]').parent().show();
				$('input[name="type-DF"]').first().prop('checked', true); // 첫 번째 항목 체크
			} else if (proType === "간식") {
				$('input[name="type-DS"]').parent().show();
				$('input[name="type-DS"]').first().prop('checked', true); // 첫 번째 항목 체크
			} else if (proType === "용품") {
				$('input[name="type-DG"]').parent().show();
				$('input[name="type-DG"]').first().prop('checked', true); // 첫 번째 항목 체크
			}
		} else if (petType === "고양이") {
			if (proType === "사료") {
				$('input[name="type-CF"]').parent().show();
				$('input[name="type-CF"]').first().prop('checked', true); // 첫 번째 항목 체크
			} else if (proType === "간식") {
				$('input[name="type-CS"]').parent().show();
				$('input[name="type-CS"]').first().prop('checked', true); // 첫 번째 항목 체크
			} else if (proType === "용품") {
				$('input[name="type-CG"]').parent().show();
				$('input[name="type-CG"]').first().prop('checked', true); // 첫 번째 항목 체크
			}
		}

	});


	$('#pet-type input[type="radio"], #pro-type input[type="radio"], #pro-detail-type input[type="radio"]').change(function() {
		loadProductList();
	});

	// 검색 버튼 클릭 시 loadProductList 호출
	$('#searchBtn').click(function() {
		loadProductList();
	});



	// 쿠폰 등록 탭 데이터 로드 함수
	function loadProductList() {
		const itemsPerPage = 10; // 페이지 당 item 수
		let currentPage = 1;
		let totalItems = 0;
		let couponList = []; // 데이터 저장할 배열
		let currPageGroup = 1;
		let totalPages = 0;

		var petType = $('input[name="pet-filter"]:checked').val();
		var proType = $('input[name="pro-filter"]:checked').val();
		var detailType = $('input[name="type-DF"]:checked, input[name="type-DS"]:checked, input[name="type-DG"]:checked, input[name="type-CF"]:checked, input[name="type-CS"]:checked, input[name="type-CG"]:checked').val() || null;
		var searchType = $('#search-filter').val() || null;



		fetchData(currentPage, currPageGroup);

		function fetchData(currentPage, currPageGroup) {
			$.ajax({
				url: '/admin/product/list',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({
					petType,
					proType,
					detailType,
					searchType
				}),
				success: function(products) {
					productsList = products;
					totalItems = productsList.length;
					totalPages = Math.ceil(totalItems / itemsPerPage);

					displayItems(currentPage);
					setupPagination(currentPage, currPageGroup);
				},
				error: function(xhr, status, error) {
					console.error('Error fetching data:', error);
				}
			});
		}

		function displayItems(currentPage) {
			const start = (currentPage - 1) * itemsPerPage;
			const end = start + itemsPerPage;
			const sliceList = productsList.slice(start, end);

			let lists = '';
			$.each(sliceList, function(index, pro) {

				const date = new Date(pro.pro_date); // Date 객체로 변환
				const formattedDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환

				lists += '<tr>';
				lists += '<td>' + formattedDate + '</td>';
				lists += '<td>' + pro.pro_code + '</td>';
				lists += '<td>' + pro.pro_name + '</td>';
				lists += '<td>' + pro.pro_pets + ' / ' + pro.pro_type + ' / ' + pro.pro_category + '</td>';
				lists += '<td>' + pro.pro_onoff + '</td>';



				lists += `<td>
				                  <button class="btn-style" data-product-code="${pro.pro_code}">상세보기</button>
				                 
				              </td>`;
				lists += '</tr>';
			});

			$('#product-table-body').html(lists);




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

				displayItems(currentPage);
				setupPagination(currentPage, currPageGroup);
			});
		}
	};

});