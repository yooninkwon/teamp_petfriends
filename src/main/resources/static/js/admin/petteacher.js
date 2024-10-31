/**
 * 관리자페이지 - 펫티쳐
 * 펫티쳐의 게시물들을 관리하는 페이지이다.
 * 
 * 동물종류, 카테고리, 등록일 의 선택을 통해 필터링이 가능하다.
 * 각각의 필터 체크, 선택을 변경할 때마다 그에 맞는 데이터를 불러온다.
 * 
 * 신규 등록 버튼으로 새로운 게시글을 등록 할 수 있다.
 * 
 * 글 각각의 수정, 삭제 버튼을 통해 해당하는 글의 내용을 수정하고 삭제할 수 있다.
 * 
 */



$(document).ready(function() {
	
	loadPetteacherData();

	// 페이징, 필터값 설정 후 데이터 로드
	function loadPetteacherData() {
		const itemsPerPage = 10; // 페이지 당 item 수
		let currentPage = 1;
		let totalItems = 0;
		let petteacherList = []; // 데이터 저장할 배열
		let currPageGroup = 1;
		let totalPages = 0;

		// 필터 기본 값
		let filterParam = {
			type: '전체',
			category: '전체',
			sort: '최신순'
		};

		fetchData(currentPage, currPageGroup, filterParam);

//		


		// DB 데이터 불러오는 함수
		function fetchData(currentPage, currPageGroup, filterParam) {
			$.ajax({
				url: '/admin/petteacher_admin_data',
				method: 'GET',
				data: filterParam,
				dataType: 'json',
				success: function(data) {
					petteacherList = data;
					totalItems = petteacherList.length;
					totalPages = Math.ceil(totalItems / itemsPerPage);

					displayItems(currentPage);
					setupPagination(currentPage, currPageGroup);
				},
				error: function(xhr, status, error) {
					console.error('Error fetching data:', error);
				}
			});
		}
		
		// DB 데이터 화면에 배치하는 함수
		function displayItems(currentPage) {
			const start = (currentPage - 1) * itemsPerPage;
			const end = start + itemsPerPage;
			const sliceList = petteacherList.slice(start, end);

			let lists = '';
			$.each(sliceList, function(index, plist) {
				lists += '<tr>';
				lists += '<td>' + plist.hpt_seq + '</td>';
				lists += '<td>' + plist.hpt_category + '</td>';
				lists += '<td><a href="/helppetf/petteacher/petteacher_detail?hpt_seq=' + plist.hpt_seq + '">' + plist.hpt_title + '</a></td>';
				lists += '<td>' + plist.hpt_channal + '</td>';
				lists += '<td>' + plist.hpt_pettype + '</td>';
				lists += '<td>' + plist.hpt_exp + '</td>';
				lists += '<td>' + plist.hpt_rgedate + '</td>';
				lists += '<td>' + plist.hpt_hit + '</td>';
				lists += `<td>
			                  <button class="btn-style modify-btn" data-hpt_seq="${plist.hpt_seq}">수정</button>
			                  <button class="btn-style delete-btn" data-hpt_seq="${plist.hpt_seq}">삭제</button>
			              </td>`;
				lists += '</tr>';
			});

			$('#petteacher-table-body').html(lists);

			// 수정 버튼 이벤트 바인딩
			$('.modify-btn').on('click', function() {
				const hpt_seq = $(this).data('hpt_seq');
				loadPetteacherForEdit(hpt_seq); // 수정할 쿠폰 로드
				// 모달에 seq를 저장하고 버튼 텍스트를 '수정'으로 설정
				$('#registerPetteacherBtn').text('수정');
				$('#petteacherModal').data('hpt_seq', hpt_seq).show();
			});

			// 삭제 버튼 이벤트 바인딩
			$('.delete-btn').on('click', function() {
				const confirmed = confirm('게시글을 삭제하시겠습니까?');

				if (confirmed) {
					const hpt_seq = $(this).data('hpt_seq');
					deleteData(hpt_seq);
				}
			});
		}
		
		// 페이징
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

		// 필터링 관련 코드 
		$('#petteacher-filter input[name="pet-type-filter"]').on('change', function() {
			// 동물 종류 필터가 변할때마다 그에 맞는 데이터 불러옴
			filterParam = {
				type: $('input[name="pet-type-filter"]:checked').val(),
				category: $('input[name="category-filter"]:checked').val(),
				sort: $('#sort-order').val()
			};

			fetchData(currentPage, currPageGroup, filterParam);
		});

		$('#category-filter input[name="category-filter"]').on('change', function() {
			// 카테고리 필터가 변할때마다 그에 맞는 데이터 불러옴
			filterParam = {
				type: $('input[name="pet-type-filter"]:checked').val(),
				category: $('input[name="category-filter"]:checked').val(),
				sort: $('#sort-order').val()
			};

			fetchData(currentPage, currPageGroup, filterParam);
		});


		$('#sort-order').on('change', function() {
			// 등록일자 필터가 변할때마다 그에 맞는 데이터 불러옴
			filterParam = {
				type: $('input[name="pet-type-filter"]:checked').val(),
				category: $('input[name="category-filter"]:checked').val(),
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


	// registerPetteacherBtn 클릭시
	$('#registerPetteacherBtn').on('click', function() {
		submitPetteacher();
	});

	// 게시글 등록, 수정
	function submitPetteacher() {
		const petteacherData = {
			hpt_title: document.getElementById('hpt_title').value,
			hpt_exp: document.getElementById('hpt_exp').value,
			hpt_yt_videoid: document.getElementById('hpt_yt_videoid').value,
			hpt_channal: document.getElementById('hpt_channal').value,
			hpt_category: document.querySelector('select[name="hpt_category"] > option:checked').value,
			hpt_pettype: document.querySelector('select[name="hpt_pettype"] > option:checked').value,
			hpt_content: document.getElementById('hpt_content').value
		};

		// 버튼의 텍스트로 신규 등록과 수정 구분
		const actionType = document.getElementById('registerPetteacherBtn').innerText;
		
		// registerPetteacherBtn의 text가 등록완료라면 새 게시물 등록
		// 수정이라면 게시물 수정
		if (actionType === '등록완료') {
			// 신규 등록 처리
			$.ajax({
				url: '/admin/petteacher_admin_data_forWrite',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(petteacherData),
				success: function() {
					alert('게시물이 성공적으로 등록되었습니다.');
					location.reload();
				},
				error: function(xhr, status, errorThrown) {
					console.error(errorThrown);
					alert('게시물 등록 중 오류가 발생했습니다.');
				}
			});
		} else if (actionType === '수정') {
			// 수정 처리
			const hpt_seq = $('#petteacherModal').data('hpt_seq');
			$.ajax({
				url: `/admin/petteacher_admin_data_forEdit?hpt_seq=` + hpt_seq,
				method: 'PUT',
				contentType: 'application/json',
				data: JSON.stringify(petteacherData),
				success: function() {
					alert('게시물이 성공적으로 수정되었습니다.');
					location.reload();
				},
				error: function(xhr, status, errorThrown) {
					console.error(errorThrown);
					alert('게시물 수정 중 오류가 발생했습니다.');
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
				// 모달에 기존 게시물 정보 표시
				document.getElementById('hpt_title').value = petteacherList.hpt_title;
				document.getElementById('hpt_exp').value = petteacherList.hpt_exp;
				document.getElementById('hpt_yt_videoid').value = petteacherList.hpt_yt_videoid;
				document.getElementById('hpt_channal').value = petteacherList.hpt_channal;
				document.querySelector(`select[name="hpt_pettype"] option[value="${petteacherList.hpt_pettype}"]`).selected = true;
				document.querySelector(`select[name="hpt_category"] option[value="${petteacherList.hpt_category}"]`).selected = true;
				document.getElementById('hpt_content').value = petteacherList.hpt_content;
			},

			error: function(xhr, status, error) {
				console.error('Error: ', error)
			}
		});
	}

	// 게시물 삭제
	function deleteData(hpt_seq) {
		$.ajax({
			url: `/admin/petteacher_admin_data_forDelete?hpt_seq=` + hpt_seq,
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

	function resetModal() {
		document.getElementById('hpt_category').selectedIndex = 0;
		document.getElementById('hpt_title').value = '';
		document.getElementById('hpt_exp').value = '';
		document.getElementById('hpt_yt_videoid').value = '';
		document.getElementById('hpt_channal').value = '';
		document.getElementById('hpt_pettype').selectedIndex = 0;
		document.getElementById('hpt_content').value = '';
	}


});