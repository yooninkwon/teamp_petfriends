$(document).ready(function () {
    let itemsPerPage = 5;
    let currentPage = 1;
    let totalItems = 0;
    let currPageGroup = 1;
    let totalPages = 0;
    let petList = [];
    let filteredList = [];
	let memberMap = {};

	// 초기 데이터 로드
    loadMemberData().then(() => {
        loadPetData();
    });
	
	// 1. 회원 정보를 불러와 매핑 (닉네임과 전화번호 포함)
    function loadMemberData() {
        return fetch('/admin/customer_list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
        .then(data => {
            data.forEach(member => {
                memberMap[member.mem_code] = {
                    name: member.mem_name,
                    nick: member.mem_nick,
                    phone: member.mem_tell
                }; // mem_code를 키로 회원 정보 매핑
            });
        })
        .catch(error => console.error('Fetch error (member data):', error));
    }	
	
    // 펫 정보 불러오기
    function loadPetData() {
        fetch('/admin/pet_list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
        .then(data => {
            petList = data;
            filteredList = data; // 초기 데이터를 그대로 필터링 리스트에 할당
            totalItems = petList.length;
            totalPages = Math.ceil(totalItems / itemsPerPage);
            displayPetList(currentPage);
            setupPagination(currentPage, currPageGroup);
        })
        .catch(error => console.error('Fetch error:', error));
    }

    // 검색 버튼 이벤트
    $('#searchBtn').on('click', function () {
        applyFilters();
    });

	function applyFilters() {
	    const searchKey = $('#sk').val(); // 펫 정보 검색 키
	    const searchValue = $('#titleSearch').val().toLowerCase().trim(); // 입력된 검색 값

	    const memberSearchKey = $('#memberSk').val(); // 회원 정보 검색 키
	    const memberSearchValue = $('#memberSearch').val().toLowerCase().trim(); // 입력된 검색 값 (회원 정보용)

	    const selectedPetWeight = $('#petWeight').val(); // 몸무게 필터
	    const selectedPetType = $('input[name="type"]:checked').val(); // 펫 타입 필터
	    const selectedBirth = $('#birth').val(); // 등록 날짜 필터
	    const selectedMainPet = $('input[name="main"]:checked').val(); // 대표 펫 여부 필터
	    const selectedPetGender = $('input[name="gender"]:checked').val(); // 성별 필터
	    const selectedBreed = $('#detailType').val().toLowerCase(); // 견종/묘종 필터

	    filteredList = petList.filter(item => {
	        // 펫 정보 기본 검색 (이름, 펫코드, 관심정보, 알러지에 대한 검색)
	        let matchesSearch = true;
	        if (searchKey && searchValue) {
	            switch (searchKey) {
	                case '이름':
	                    matchesSearch = item.pet_name && item.pet_name.toLowerCase().includes(searchValue);
	                    break;
	                case '펫코드':
	                    matchesSearch = item.pet_code && item.pet_code.toLowerCase().includes(searchValue);
	                    break;
	                case '관심정보':
	                    matchesSearch = item.pet_care && item.pet_care.toLowerCase().includes(searchValue);
	                    break;
	                case '알러지':
	                    matchesSearch = item.pet_allergy && item.pet_allergy.toLowerCase().includes(searchValue);
	                    break;
	            }
	        }

	        // 회원 정보 기본 검색 (이름, 닉네임, 전화번호)
	        let matchesMemberSearch = true;
	        if (memberSearchKey && memberSearchValue) {
	            const memberInfo = memberMap[item.mem_code] || { name: '', nick: '', phone: '' }; // mem_code를 키로 회원 정보 가져옴
	            switch (memberSearchKey) {
	                case '이름':
	                    matchesMemberSearch = memberInfo.name && memberInfo.name.toLowerCase().includes(memberSearchValue);
	                    break;
	                case '닉네임':
	                    matchesMemberSearch = memberInfo.nick && memberInfo.nick.toLowerCase().includes(memberSearchValue);
	                    break;
	                case '전화번호':
	                    matchesMemberSearch = memberInfo.phone && memberInfo.phone.toLowerCase().includes(memberSearchValue);
	                    break;
	            }
	        }

	        // 몸무게 필터링
	        let matchesWeight = selectedPetWeight === "전체" || (item.pet_weight && matchWeightRange(item.pet_weight, selectedPetWeight));

	        // 펫 타입 필터링
	        let matchesType = selectedPetType === "전체" || (item.pet_type && item.pet_type === selectedPetType);

	        // 등록 날짜 필터링
	        let matchesRegDate = !selectedBirth || (item.pet_birth && item.pet_birth.startsWith(selectedBirth));

	        // 대표 펫 여부 필터링
	        let matchesMainPet = selectedMainPet === "전체" || (item.pet_main && item.pet_main === selectedMainPet);

	        // 성별 필터링
	        let matchesGender = selectedPetGender === "전체" || (item.pet_gender && item.pet_gender === selectedPetGender);

	        // 견종/묘종 필터링
	        let matchesBreed = !selectedBreed || (item.pet_breed && item.pet_breed.toLowerCase().includes(selectedBreed));

	        // 모든 필터 조건을 만족하는 경우만 남김
	        return matchesSearch && matchesMemberSearch && matchesWeight && matchesType && matchesRegDate && matchesMainPet && matchesGender && matchesBreed;
	    });

	    totalItems = filteredList.length;
	    totalPages = Math.ceil(totalItems / itemsPerPage);
	    displayPetList(currentPage);
	    setupPagination(currentPage, currPageGroup);
	}

    // 몸무게 범위 매칭 함수
    function matchWeightRange(weight, range) {
        const weightNumber = parseFloat(weight);
        const rangeParts = range.match(/(\d+(\.\d+)?)/g);

        if (!rangeParts || rangeParts.length < 1) {
            return false;
        }

        const minWeight = parseFloat(rangeParts[0]);
        const maxWeight = rangeParts.length > 1 ? parseFloat(rangeParts[1]) : Infinity;

        return weightNumber >= minWeight && weightNumber < maxWeight;
    }

    // 펫 목록 표시
    function displayPetList(currentPage) {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const sliceList = filteredList.slice(start, end); // 현재 페이지에 맞는 데이터만 표시

        let pet = '<tbody>';

		let pet_care = ''
		let pet_allergy = ''
		
        sliceList.forEach(item => {
			const memberInfo = memberMap[item.mem_code] || { name: '알 수 없음', nick: '알 수 없음', phone: '알 수 없음' };
			
			if(item.pet_care == null) {pet_care = 'x'} else {pet_care = item.pet_care}
			if(item.pet_allergy == null) {pet_allergy = 'x'} else {pet_allergy = item.pet_allergy}		
				
            pet += `
                <tr>
                    <td><input type="checkbox" name="checkboxPet" class="pet-checkbox" value='${item.pet_code}' /></td>
                    <td>${item.pet_type}</td>
                    <td>${memberInfo.nick}</td>
					<td style="padding: 0px;">
					    <img src="/static/Images/pet/${item.pet_img ? item.pet_img : 'noPetImg.jpg'}" alt="" style="width: 100%; height:100px" />
					</td>
                    <td>${item.pet_name}</td>
                    <td>${item.pet_breed}</td>
                    <td>${item.pet_birth}</td>
                    <td>${item.pet_weight}</td>
                    <td>${item.pet_gender}</td>
                    <td>${item.pet_neut}</td>
                    <td>${item.pet_form}</td>
                    <td>${pet_care}</td>
                    <td>${pet_allergy}</td>
                    <td>${item.pet_main}</td>
                </tr>
            `;
        });

        pet += '</tbody>';

        $('.pet-list tbody').remove();
        $('.pet-list').append(pet);

        // 모두 선택 기능
        $('.selectAll').on('click', function () {
            const checkboxes = document.querySelectorAll('.pet-checkbox');
            const isChecked = $(this).prop('checked');
            checkboxes.forEach(checkbox => checkbox.checked = isChecked);
        });
    }

    // 페이징 처리
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

        $('.page-link').on('click', function (event) {
            event.preventDefault();

            $('.selectAll').prop('checked', false);

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

            displayPetList(currentPage);
            setupPagination(currentPage, currPageGroup);
        });
    }

    loadPetData(); // 데이터 불러오기 호출
	
	$('#resetBtn').on('click', function () {
	        $("#detailType").val('');
	   });
	   
   document.getElementById('deleteImg').addEventListener('click', function () {
       // 선택된 펫 체크박스 수집
       const selectedCheckboxes = document.querySelectorAll('.pet-checkbox:checked');
       if (selectedCheckboxes.length === 0) {
           alert('이미지를 삭제할 펫을 선택하세요.');
           return;
       }

       // 선택된 펫의 pet_code 수집
       const petCodes = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);

       // 이미지 삭제 요청 전송
       fetch('/admin/deletePetImages', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ petCodes: petCodes })
       })
       .then(response => response.ok ? response.text() : Promise.reject('이미지 삭제 실패'))
       .then(() => {
           alert('이미지가 성공적으로 삭제되었습니다.');
           // 필요시 UI 갱신 로직 추가 (예: 펫 리스트 재로딩)
           loadPetData();
       })
       .catch(error => {
           console.error('Error:', error);
           alert('이미지 삭제 중 오류가 발생했습니다.');
       });
   });
});
