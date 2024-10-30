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

		let petType = $('input[name="pet-filter"]:checked').val();
		let proType = $('input[name="pro-filter"]:checked').val();
		let detailType = $('input[name="type-DF"]:checked, input[name="type-DS"]:checked, input[name="type-DG"]:checked, input[name="type-CF"]:checked, input[name="type-CS"]:checked, input[name="type-CG"]:checked').val() || null;
		let searchType = $('#search-filter').val() || null;



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
				                  <button type="button" class="btn-style" data-product-code="${pro.pro_code}">상세보기</button>
				                 
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


	// 신규등록 모달 열기/닫기
	$('#new-pro-btn').on('click', function() {
		//resetModal();
		$('#registerProductBtn').text('등록하기');
		document.getElementById('productModal').style.display = 'block';
	});


	$('.close-btn').on('click', function() {
		$('#productModal').hide();
	});


	//대표,상세이미지 미리보기
	function setupImagePreview(inputElement, previewContainer, maxFiles) {
		inputElement.addEventListener('change', function() {
			const files = inputElement.files;

			// 파일 개수 제한 확인
			if (files.length > maxFiles) {
				alert(`최대 ${maxFiles}장을 선택할 수 있습니다.`);
				inputElement.value = ''; // 입력값 초기화
				previewContainer.innerHTML = ''; // 미리보기 초기화
				return;
			}

			previewContainer.innerHTML = ''; // 이전 미리보기 초기화

			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const reader = new FileReader();

				reader.onload = function(e) {
					const img = document.createElement('img');
					img.src = e.target.result; // 파일의 데이터 URL
					img.classList.add('preview-image'); // CSS 클래스 추가 (스타일링 용)
					img.style.width = '30px'; // 썸네일 크기 설정
					img.style.margin = '0 5px'; // 위아래는 0, 좌우는 5px 간격 설정
					previewContainer.appendChild(img); // 미리보기 컨테이너에 추가
				}

				reader.readAsDataURL(file); // 파일을 데이터 URL로 변환
			}
		});
	}
	
	// HTML 요소를 설정하는 부분
	const proMainImagesInput = document.getElementById('proMainImages'); // 대표 이미지 input 요소 ID
	const mainImagePreview = document.getElementById('mainImagePreview'); // 대표 이미지 미리보기 컨테이너 ID
	setupImagePreview(proMainImagesInput, mainImagePreview, 5); // 최대 파일 개수 5

	const proDesImagesInput = document.getElementById('proDesImages'); // 상세 이미지 input 요소 ID
	const desImagePreview = document.getElementById('desImagePreview'); // 상세 이미지 미리보기 컨테이너 ID
	setupImagePreview(proDesImagesInput, desImagePreview, 10); // 최대 파일 개수 10

	//상품옵션 +/-

	const optionContainer = document.getElementById('option-container');

	optionContainer.addEventListener('click', function(event) {
		if (event.target.classList.contains('add-option')) {
			addOptionLine();
		} else if (event.target.classList.contains('remove-option')) {
			removeOptionLine(event.target);
		}
	});

	function addOptionLine() {
		const optionGroup = document.querySelector('.input-group2');
		const newOptionGroup = optionGroup.cloneNode(true);

		newOptionGroup.querySelectorAll('input').forEach(input => input.value = "");

		const removeButton = newOptionGroup.querySelector('.remove-option');
		removeButton.style.display = 'inline-block'; // 새 줄의 삭제 버튼 보이기

		optionContainer.appendChild(newOptionGroup);
		newOptionGroup.querySelector('label').innerText = ''; // 레이블을 빈칸으로 설정

		updateButtons();
	}

	function removeOptionLine(button) {
		const optionGroup = button.closest('.input-group2');
		if (optionGroup !== optionContainer.firstElementChild) {
			optionContainer.removeChild(optionGroup);
		}
		updateButtons();
	}

	function updateButtons() {
		const optionGroups = optionContainer.querySelectorAll('.input-group2');

		optionGroups.forEach((group, index) => {
			const removeButton = group.querySelector('.remove-option');

			if (index === 0) {
				// 첫 번째 줄의 삭제 버튼은 숨김
				removeButton.style.display = 'none';
			} else {
				removeButton.style.display = 'inline-block'; // 그 외 줄은 삭제 버튼 보이기
			}
		});
	}



	// 옵션 값을 가져오는 함수
	function getOptionValues() {
		const optionGroups = optionContainer.querySelectorAll('.input-group2');
		const options = [];

		optionGroups.forEach(group => {
			const name = group.querySelector('#optName').value;
			const price = group.querySelector('#optPrice').value;
			const count = group.querySelector('#optCnt').value;

			options.push({
				name: name,
				price: price,
				count: count
			});
		});

		console.log(options); // 옵션 값 확인
		return options;
	}

	//상품등록하기 버튼 ajax 데이터 이동
	$('#registerProductBtn').on('click', function() {

		// FormData 객체 생성
		const formData = new FormData();

		// 대표 이미지 파일 가져오기
		const mainImages = document.getElementById('proMainImages').files;
		for (let i = 0; i < mainImages.length; i++) {
			formData.append('mainImages', mainImages[i]); // 대표 이미지 파일 추가
		}

		// 상세 이미지 파일 가져오기
		const desImages = document.getElementById('proDesImages').files;
		for (let i = 0; i < desImages.length; i++) {
			formData.append('desImages', desImages[i]); // 상세 이미지 파일 추가
		}

		// 각 입력 필드의 값을 가져오기
		let petType = document.getElementById("petType") ? document.getElementById("petType").value : '';
		let proType = document.getElementById("proType") ? document.getElementById("proType").value : '';
		let proDetailType = document.getElementById("proDetailType") ? document.getElementById("proDetailType").value : '';
		let filterType1 = document.getElementById("filterType1") ? document.getElementById("filterType1").value : '';
		let filterType2 = document.getElementById("filterType2") ? document.getElementById("filterType2").value : '';
		let proName = document.getElementById("proName") ? document.getElementById("proName").value : '';
		let proDiscount= document.getElementById("proDiscount") ? document.getElementById("proDiscount").value : '';
		let productStatus = document.querySelector('input[name="productStatus"]:checked').value; // 선택된 라디오 버튼 값
		const options = getOptionValues();
		
		console.log(options);
		
		if(petType === "" || proType === "" || proDetailType === "" || proName === "" || proDiscount === "" || options.some(opt => opt.price === "" || opt.count === "")){
			alert('상품등록 필수 항목을 채워주세요.\n(펫타입, 상품종류, 상품타입, 상품명, 할인율, 옵션최소 1개)');
			return;
		}

		
		// FormData에 추가
		// 옵션 값을 가져와서 FormData에 추가
		// options 배열을 JSON 문자열로 변환하여 추가
		formData.append('options', JSON.stringify(options));

		formData.append('petType', petType);
		formData.append('proType', proType);
		formData.append('proDetailType', proDetailType);
		formData.append('filterType1', filterType1);
		formData.append('filterType2', filterType2);
		formData.append('proName', proName);
		formData.append('proDiscount', proDiscount);
		formData.append('productStatus', productStatus);

		// AJAX 요청
		$.ajax({
			url: '/admin/product/add', // 등록할 URL
			method: 'POST',
			data: formData,
			contentType: false, // contentType을 false로 설정
			processData: false, // processData를 false로 설정
			success: function(response) {
				// 성공적으로 등록된 경우 처리
				alert('제품이 등록되었습니다.');
				$('#productModal').hide();
			},
			error: function(xhr, status, error) {
				logger.error("상품 등록 중 오류 발생", error);
				console.error('Error registering product:', error);
				alert('제품 등록에 실패했습니다.');
			}
		});
























	});




});