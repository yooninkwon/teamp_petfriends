$(document).ready(function() {
    let itemsPerPage = 10;
    let currentPage = 1;
    let totalItems = 0;
    let currPageGroup = 1;
    let totalPages = 0;
    let customerList = [];
    let filteredList = [];
	let selectedMembers = []; 
	let memberPointsData = [];
	
    loadCustomerData();

	$.ajax({
	    url: '/admin/points_list', // 모든 데이터를 가져오는 엔드포인트
	    method: 'GET',
	    dataType: 'json',
	    success: function(response) {
	        memberPointsData = response; // 전체 데이터를 저장
	    },
	    error: function() {
	        alert('적립금 데이터를 불러오는 중 오류가 발생했습니다.');
	    }
	});
	
	
    // 회원정보 불러오기
    function loadCustomerData() {
        fetch('/admin/customer_list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
        .then(data => {
            customerList = data;
            filteredList = data;
            totalItems = customerList.length;
            totalPages = Math.ceil(totalItems / itemsPerPage);
            displayCustomerList(currentPage);
            setupPagination(currentPage, currPageGroup);
        })
        .catch(error => console.error('Fetch error:', error));
    }
	
	// 정렬 기능
   $('#sort-order').on('change', function () {
       const selectedOrder = $(this).val();
       sortAndDisplayList(selectedOrder);
   });

   function sortAndDisplayList(order) {
       switch (order) {
           case '가입날짜':
               filteredList.sort((a, b) => new Date(b.mem_regdate) - new Date(a.mem_regdate)); // 최신순
               break;
           case '접속날짜':
               filteredList.sort((a, b) => new Date(b.mem_logdate) - new Date(a.mem_logdate)); // 최신순
               break;
           case '구매금액':
               filteredList.sort((a, b) => b.mem_pay_amount - a.mem_pay_amount); // 내림차순 (기본적으로 큰 금액부터)
               break;
       }
       displayCustomerList(currentPage);
   }

    // 검색 버튼 이벤트
    $('#searchBtn').on('click', function() {
        applyFilters();
    });

	// 검색 필터
	function applyFilters() {
	    const searchKey = $('#sk').val(); // 선택된 검색 키
	    const searchValue = $('#titleSearch').val().toLowerCase().trim(); // 입력된 검색 값
	    const selectedGrade = $('#grade').val(); // 회원 등급
	    const selectedType = $('input[name="type"]:checked').val(); // 회원 유형
	    const selectedRegDate = $('#regdate').val(); // 가입 날짜
	    const selectedLogDate = $('#logdate').val(); // 접속 날짜
	    const selectedGender = $('input[name="gender"]:checked').val(); // 성별
	    const selectedPayAmount = $('#payAmount').val(); // 구매금액 필터

	    filteredList = customerList.filter(item => {
	        // 기본 검색 (이름, 닉네임, 회원코드, 이메일, 전화번호에 대한 검색)
	        let matchesSearch = true;
	        if (searchKey && searchValue) {
	            switch (searchKey) {
	                case '이름':
	                    matchesSearch = item.mem_name && item.mem_name.toLowerCase().includes(searchValue);
	                    break;
	                case '닉네임':
	                    matchesSearch = item.mem_nick && item.mem_nick.toLowerCase().includes(searchValue);
	                    break;
	                case '회원코드':
	                    matchesSearch = item.mem_code && item.mem_code.toLowerCase().includes(searchValue);
	                    break;
	                case '이메일':
	                    matchesSearch = item.mem_email && item.mem_email.toLowerCase().includes(searchValue);
	                    break;
	                case '전화번호':
	                    matchesSearch = item.mem_tell && item.mem_tell.toLowerCase().includes(searchValue);
	                    break;
	            }
	        }

	        // 회원 등급 필터링
	        let matchesGrade = selectedGrade === "0" || (item.g_no && item.g_no.toString() === selectedGrade);

	        // 회원 유형 필터링
	        let matchesType = selectedType === "전체" || (item.mem_type && item.mem_type === selectedType);

	        // 가입 날짜 필터링
	        let matchesRegDate = !selectedRegDate || (item.mem_regdate && item.mem_regdate.startsWith(selectedRegDate));

	        // 접속 날짜 필터링
	        let matchesLogDate = !selectedLogDate || (item.mem_logdate && item.mem_logdate.startsWith(selectedLogDate));

	        // 성별 필터링
	        let matchesGender = !selectedGender || (item.mem_gender && item.mem_gender === selectedGender);

	        // 구매금액 필터링
	        let matchesPayAmount = true;
	        if (selectedPayAmount) {
	            const payAmount = item.mem_pay_amount || 0; // 구매금액이 null인 경우 기본값 0
	            switch (selectedPayAmount) {
	                case "~10만원":
	                    matchesPayAmount = payAmount <= 100000;
	                    break;
	                case "~100만원":
	                    matchesPayAmount = payAmount > 100000 && payAmount <= 1000000; // 100만 원
	                    break;
	                case "~500만원":
	                    matchesPayAmount = payAmount > 1000000 && payAmount <= 5000000; // 500만 원
	                    break;
	                case "~1000만원":
	                    matchesPayAmount = payAmount > 5000000 && payAmount <= 10000000; // 1000만 원
	                    break;
	                case "1000만원~":
	                    matchesPayAmount = payAmount > 10000000; // 1000만 원 초과
	                    break;
	            }
	        }

	        return matchesSearch && matchesGrade && matchesType && matchesRegDate && matchesLogDate && matchesGender && matchesPayAmount;
	    });

	    totalItems = filteredList.length;
	    totalPages = Math.ceil(totalItems / itemsPerPage);
	    displayCustomerList(currentPage);
	    setupPagination(currentPage, currPageGroup);
	}

	// 회원정보 보여주기
	function displayCustomerList(currentPage) {
	    const start = (currentPage - 1) * itemsPerPage;
	    const end = start + itemsPerPage;
	    const sliceList = filteredList.slice(start, end); // 현재 페이지에 맞는 데이터만 표시

	    let member = '<tbody>';

	    sliceList.forEach(item => {
	        // 날짜 포맷 변경
	        const memRegDate = formatDate(item.mem_regdate);
	        const memLogDate = formatDate(item.mem_logdate);
	        const memGrade = formatGrade(item.g_no);

	        // 구매 금액 포맷 변경 (3자리마다 쉼표 추가 + "원" 붙이기)
	        const formattedPayAmount = item.mem_pay_amount.toLocaleString('ko-KR') + '원';

	        // 객체를 JSON 문자열로 변환하여 value에 저장
	        const memberData = JSON.stringify(item);

	        member += `
	            <tr>
	                <td><input type="checkbox" name="checkboxCustomer" class="customer-checkbox" value='${memberData}' /></td>
	                <td>${memRegDate}</td>
	                <td>${memLogDate}</td>
	                <td>${item.mem_code}</td>
	                <td>${item.mem_name}</td>
	                <td>${item.mem_nick}</td>
	                <td>${memGrade}</td>
	                <td>${formattedPayAmount} <button class="btn" style="float: right; " data-memcode="${item.mem_code}">적립내역</button> </td>
	                <td>${item.mem_tell}</td>
	                <td>${item.mem_email}</td>
	                <td>${item.mem_gender}</td>
	                <td>${item.mem_type}</td>
	            </tr>
	        `;
	    });
		
		$(document).on('click', '.btn', function () {
		    const memcode = $(this).data('memcode');
			console.log(memcode);
		    // 고객 정보 필터링
		    const customerData = customerList.find(customer => customer.mem_code === memcode);

		    // 적립금 정보 필터링
		    const filteredPoints = memberPointsData.filter(point => point.mem_code === memcode);

		    // 고객 정보가 있는 경우에만 업데이트
		    if (customerData) {
		        // 고객 정보 표시
		        $('#customer-info #nameLabel').text(`회원 이름 : ${customerData.mem_name || 'N/A'}`);
		        $('#customer-info #codeLabel').text(`회원 코드 : ${memcode}`);
		        $('#customer-info #amountLabel').text(`누적 구매금액 : ${customerData.mem_pay_amount?.toLocaleString('ko-KR') || '0원'}`);
		        $('#customer-info #pointLabel').text(`사용 가능 적립금 : ${customerData.mem_point?.toLocaleString('ko-KR') || '0원'}`);
		    } 

		    // 적립금 테이블 업데이트
		    const pointTable = $('#point_table');
		    pointTable.find('tr:gt(0)').remove(); // 헤더를 제외한 기존 행 삭제

		    if (filteredPoints.length > 0) {
		        // 적립금 내역이 있는 경우
		        filteredPoints.forEach(point => {
		            const row = `
		                <tr>
		                    <td>${point.point_date}</td>
		                    <td>${point.mem_code}</td>
		                    <td>${point.o_code}</td>
		                    <td>${point.point_type}</td>
		                    <td>${point.points.toLocaleString('ko-KR')}원</td>
		                    <td>${point.point_info}</td>
		                </tr>
		            `;
		            pointTable.append(row);
		        });
		    } else {
		        // 적립금 내역이 없는 경우
		        const noDataRow = `
		            <tr>
		                <td colspan="6">해당 회원의 적립금 내역이 없습니다.</td>
		            </tr>
		        `;
		        pointTable.append(noDataRow);
		    }

		    // 팝업 보이기
		    $('#pointsList').css('display', 'flex');
		});
		
		// 팝업 외부를 클릭했을 때 닫기
		window.addEventListener('click', function(event) {
		    const popup = document.getElementById('pointsList');
		    if (popup && event.target === popup) {
		        closePointsList();
		    }
		});

		// 팝업 닫기 함수
		function closePointsList() {
		    document.getElementById('pointsList').style.display = 'none';
		}
		

	    member += '</tbody>';

	    $('#customer-list-container .customer-list tbody').remove();
	    $('#customer-list-container .customer-list').append(member);

	    // 모두 선택 기능
	    $('.selectAll').on('click', function () {
	        const checkboxes = document.querySelectorAll('.customer-checkbox');
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

        $('.page-link').on('click', function(event) {
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

            displayCustomerList(currentPage);
            setupPagination(currentPage, currPageGroup);
        });
    }

    // 날짜 포맷팅 함수
    function formatDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString; // 유효하지 않은 날짜라면 원래 문자열을 반환
        }
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }
	
	// 회원등급 as
	function formatGrade(g_no) {
	    const gradeMap = {
	        1: '설렘시작',
	        2: '몽글몽글',
	        3: '두근두근',
	        4: '콩닥콩닥',
	        5: '심쿵주의',
	        6: '평생연분'
	    };

	    return gradeMap[g_no] || '알 수 없음'; // 매핑되지 않은 값일 경우 기본 메시지를 반환
	}
	
	document.getElementById('updateType').addEventListener('click', function() {
	    // 선택된 회원들의 JSON 데이터 가져오기
	    const selectedCheckboxes = document.querySelectorAll('.customer-checkbox:checked');
	    selectedMembers = Array.from(selectedCheckboxes).map(checkbox => JSON.parse(checkbox.value)); // 전역 변수에 할당

	    if (selectedMembers.length > 0) {
	        // 선택된 회원들이 있으면 팝업 열기
	        openMemberTypePopup(selectedMembers);
	    } else {
	        alert('변경할 회원을 선택하세요.');
	    }
	});

	// 회원 유형 변경 버튼 클릭 시 팝업 열기
	function openMemberTypePopup(selectedMembers) {
	    // 선택된 회원 정보를 가져와 표시
	    const memberContainer = document.getElementById('selectedMembersContainer');
	    memberContainer.innerHTML = ''; // 기존 내용을 비움
	    selectedMembers.forEach(member => {
	        const memberInfo = document.createElement('div');
	        memberInfo.innerHTML = `닉네임: ${member.mem_nick}`; // 닉네임 표시
	        memberContainer.appendChild(memberInfo);
	    });

	    // 팝업 열기
	    document.getElementById('memberTypePopup').style.display = 'flex';
	}

	// 팝업 닫기 기능
	function closePopup() {
	    document.getElementById('memberTypePopup').style.display = 'none';
	}

	// 팝업 외부를 클릭했을 때 닫기
	window.addEventListener('click', function(event) {
	    const popup = document.getElementById('memberTypePopup');
	    if (event.target === popup) {
	        closePopup();
	    }
	});

	// 회원 유형 변경 기능
	document.getElementById('updateMemberTypeBtn').addEventListener('click', function() {
	    const newType = document.getElementById('newMemberType').value;

	    if (selectedMembers && selectedMembers.length > 0) {
	        const memberIds = selectedMembers.map(member => member.mem_code);
	        fetch('/admin/updateCustomerType', {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify({
	                ids: memberIds,
	                newType: newType
	            })
	        })
	        .then(response => {
	            if (!response.ok) {
	                throw new Error('요청이 실패했습니다. 상태 코드: ' + response.status);
	            }
	            return response.json(); // 응답이 JSON이라면 유지, 텍스트라면 response.text() 사용
	        })
	        .then(() => {
	            alert('회원 유형이 변경되었습니다.');
	            closePopup();
	            loadCustomerData(); // 필요시 UI 갱신 로직 호출
	        })
	        .catch(error => {
	            console.error('Error:', error);

	            // 에러 메시지가 존재하지 않는 경우 기본 메시지를 사용합니다.
	            const errorMessage = error.message ? error.message : '알 수 없는 오류가 발생했습니다.';
	            alert('오류가 발생했습니다. ' + errorMessage);
	        });
	    } else {
	        alert('선택된 회원이 없습니다.');
	    }
	});
	
	
	// 문자 보내기 버튼 클릭 시 팝업 열기 (선택된 회원이 있는 경우에만)
	document.getElementById('send-sms').addEventListener('click', function() {
	    const selectedCheckboxes = document.querySelectorAll('.customer-checkbox:checked');
	    if (selectedCheckboxes.length === 0) {
	        alert('문자를 보낼 회원을 선택하세요.');
	        return;
	    }
	    openSmsPopup(); // 선택된 회원이 있을 때만 팝업 열기
	});

	function openSmsPopup() {
	    document.getElementById('smsPopup').style.display = 'flex';
	}

	// 팝업 외부를 클릭했을 때 닫기
	window.addEventListener('click', function(event) {
	    const popup = document.getElementById('smsPopup');
	    if (popup && event.target === popup) {
	        closeSmsPopup();
	    }
	});

	// 팝업 닫기 함수
	function closeSmsPopup() {
	    document.getElementById('smsPopup').style.display = 'none';
	}

	// 문자 전송 버튼 클릭 시
	document.getElementById('sendSmsBtn').addEventListener('click', function() {
	    const smsContent = document.getElementById('smsContent').value.trim();

	    if (!smsContent) {
	        alert('문자 내용을 입력하세요.');
	        return;
	    }

	    // 선택된 회원들의 전화번호 가져오기 (예시)
		const selectedCheckboxes = document.querySelectorAll('.customer-checkbox:checked');
		const phoneNumbers = Array.from(selectedCheckboxes).map(checkbox => {
		    const member = JSON.parse(checkbox.value); // value를 JSON 객체로 변환
		    return member.mem_tell; // 전화번호(mem_tell) 추출
		});

	    // 서버로 문자 전송 요청
	    fetch('/send-sms-admin', {
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json'
	        },
	        body: JSON.stringify({
	            phoneNumbers: phoneNumbers,
	            message: smsContent
	        })
	    })
	    .then(response => response.ok ? response.json() : Promise.reject('문자 전송 실패'))
	    .then(() => {
	        alert('문자가 성공적으로 전송되었습니다.');
	        closeSmsPopup();
	    })
	    .catch(error => {
	        console.error('Error:', error);
	        alert('문자 전송 중 오류가 발생했습니다.');
	    });
	});
});
