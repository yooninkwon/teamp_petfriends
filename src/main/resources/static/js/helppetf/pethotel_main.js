/**
 * 이 스크립트는 로그인 정보가 없는 유저가 "예약하러 가기" 버튼을 클릭하였을 경우
 * 로그인이 필요하다는 메세지, 로그인 페이지로 이동할 수 있는 버튼을 표시하는
 * 모달창을 띄워주는 스크립트이다.
 * 
 * 펫호텔 페이지의 메인 화면과, 예약화면 등을 
 * 동적으로 생성하여 표시하고 감춘다.
 * 
 * 컨트롤러에서 멤버 로그인 정보를 전달받아 사용한다.
 * 
 * 예약하러가기 버튼을 눌렀을 때 로그인 정보가 없는 경우,
 * 스타일설정을 통해 모달창을 보이게 만든다.
 * 모달창에 있는 로그인 하러 가기 버튼을 누르면 로그인 페이지로 이동한다.
 * 
 * 예약하러 가기 버튼을 눌러 이동하는 펫호텔 예약페이지는 
 * 로그인 된 유저(로그인 하여야 해당 페이지에 접속할 수 있다.)의 정보와
 * 유저가 입력한 펫의 정보를 데이터베이스에 저장할 수 있는 스크립트이다.
 * 
 * 예약기간(오늘 부터 선택 가능, 어제는 선택 불가)을 설정하고,
 * 펫 추가 버튼 (+버튼)을 클릭하면 팝업 폼을 표시한다.
 * 
 * 펫 추가 팝업 폼에 예약 등록할 펫의 정보를 전부 입력했을 경우 오브젝트에 저장해둔다.
 * 기존 펫 추가 버튼 (+버튼)의 좌측에 입력한 펫의 이름이 적힌 div가 생기고, 
 * 추가로 펫을 더 등록할 수 있게 한다.
 * 
 * 오브젝트에 여러마리의 펫을 저장하기 때문에 여러 개의 폼 데이터를
 * 동시에 데이터베이스에 전송할 수 있다.
 * 
 * 펫 추가 팝업 폼 내부의 아이 선택하기 버튼을 클릭하면 
 * 유저가 데이터베이스에 등록해 둔 반려동물들을 불러와 목록으로 나타낸다.
 * 저장된 펫 목록의 'tr'에 해당하는 곳을 클릭하면, 그에 해당하는 펫의 정보를 input 태그에 배치할 수 있다.
 * 
 * 최종적으로 "예약 등록" 버튼을 클릭할 때 Java의 컨트롤러로 전송하여 데이터베이스에 정보를 저장한다.
 */


$(document).ready(function(){
	
	pageScroll(0);
	
	// 메인 nav, 서브 nav '선택됨' 클래스 설정
	document.getElementById(main_navbar_id).classList.add('selected');
	document.getElementById(sub_navbar_id).classList.add('selected');
	
	loadPethotelPostData();

	// 데이터베이스에 저장된 펫호텔 소개글, 이용안내글 불러오는 함수
	function loadPethotelPostData() {
		fetch("/helppetf/pethotel/pethotel_post_data", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			} else {
				console.error('ERROR', error);
			}
		})
		.then(data => {
			// 펫호텔 메인의 소개글, 이용안내 배치하는 함수
			displayData(data);
		})
		.catch(error => {
			console.error('ERROR:', error);
		});
	}
	
	// 펫호텔 메인의 소개글, 이용안내 배치하는 함수
	function displayData(data) {
		// 각각 알맞은 위치에 데이터를 추가하여 html에 배치
		let text_content = '';
		text_content += '<h1>펫호텔 서비스를 소개합니다!</h1><p>' + data.introDto.intro_line1;
		text_content += '<br> ' + data.introDto.intro_line2 + '<br>' + data.introDto.intro_line3 + '</p>';
		text_content += '<p>반려 동물 호텔, <strong>펫호텔</strong> 서비스는<br> ';
		text_content += data.introDto.intro_line4 + '<br>' + data.introDto.intro_line5 + '</p>';
		$('#text_content').html(text_content);
		
		let middle_section = '';
		middle_section += '<h2>이용안내</h2><ul><li>' + data.introDto.intro_line6 + '</li>';
		middle_section += '<li>' + data.introDto.intro_line7 + '<br /><span class="small-text">' + data.introDto.intro_line8;
		middle_section += '</span></li><li>' + data.introDto.intro_line9 + '</li></ul>';
		$('#middle_section').html(middle_section);
		
		let content_section = '';
		content_section += '<h2>이용안내</h2><h3>공통사항</h3>';
		content_section += '<p>' + data.infoDto.info_line1 + '<br />' + data.infoDto.info_line2 + '</p>';
        content_section += '<h3>반려견 공통사항, 예약과 입퇴실</h3><ul><li>' + data.infoDto.info_line3 + '</li>';
        content_section += '<li>' + data.infoDto.info_line4 + '</li><li>' + data.infoDto.info_line5 + '</li>';
        content_section += '<li>' + data.infoDto.info_line6 + '</li></ul>';
        content_section += '<h3>입실 불가능 아이</h3><ul>';
        content_section += '<li>' + data.infoDto.info_line7 + '</li><li>' + data.infoDto.info_line8 + '</li>';
        content_section += '<li>' + data.infoDto.info_line9 + '</li><li>' + data.infoDto.info_line10 + '</li></ul>';
        content_section += '<h3>반려묘 공통사항, 예약과 입퇴실</h3><ul>';
        content_section += '<li>' + data.infoDto.info_line11 + '</li><li>' + data.infoDto.info_line12 + '</li>';
        content_section += '<li>' + data.infoDto.info_line13 + '</li><li>' + data.infoDto.info_line14 + '</li></ul>';
        content_section += '<h3>입실 불가능 아이</h3><ul><li>' + data.infoDto.info_line15 + '</li><li>' + data.infoDto.info_line16 + '</li></ul>';
		$('#content_section').html(content_section);
	}
	
	// 메인 페이지에서 자세히보기 버튼 클릭시
	$('.show-more-info').on('click', function(event){
		event.preventDefault();
		pageScroll(0);
		// 이용안내 페이지 제외 모두 보이지 않게 설정
		$('#information').removeClass().addClass('off');
		$('#introduction').removeClass().addClass('on');
		$('#pethotel_reserve').removeClass().addClass('off');
		$('#pethotel_reserve_done').removeClass().addClass('off');
		$('#start-end-date')[0].reset();
		$('#pet-form')[0].reset();
	});
	
	// 이용안내 페이지에서 돌아가기 버튼 클릭시
	$('.back-link').on('click', function(event){
		event.preventDefault();
		pageScroll(0);
		// 메인페이지 제외 모두 보이지 않게 설정
		$('#information').removeClass().addClass('on');
		$('#introduction').removeClass().addClass('off');
		$('#pethotel_reserve').removeClass().addClass('off');
		$('#pethotel_reserve_done').removeClass().addClass('off');
		$('#start-end-date')[0].reset();
		$('#pet-form')[0].reset();
	});
	
	var loginPopup = document.getElementById("loginPopup"); // 아이디가 loginPopup인 엘리먼트 저장
	var loginBtn = document.getElementById("loginBtn"); // 아이디가 loginBtn인 엘리먼트 저장
	var closeBtn = document.getElementById("closeBtn"); // 아이디가 closeBtn인 엘리먼트 저장
	
	// #right는 "예약하러 가기"버튼이다. 버튼이 눌린 경우
	$('#right').on('click', function(event){
		event.preventDefault();
		pageScroll(0);
		// 컨트롤러에서 받아온 로그인 정보가 공백일 경우
		if (mem_login === '') {
			// 로그인이 필요하다는 모달창 표시
			loginPopup.style.display = "flex";
			// 모달창 내부의 로그인 버튼 클릭 시
			loginBtn.addEventListener("click", function() {
				loginPopup.style.display = "none"; // 모달창 보이지 않게 하기
				window.location.href = '/login/loginPage'; // 로그인 페이지로 이동
			});
			// 닫기 버튼 클릭 시
			closeBtn.addEventListener("click", function() {
				loginPopup.style.display = "none"; // 모달창 보이지 않게 하기
			});
			
		// 컨트롤러에서 받아온 로그인 정보가 공백이 아닌 경우
		// 로그인 정보가 존재하는 경우
		} else {
			// 펫호텔 예약 페이지를 표시
			$('#information').removeClass().addClass('off');
			$('#introduction').removeClass().addClass('off');
			$('#pethotel_reserve').removeClass().addClass('on');
			$('#pethotel_reserve_done').removeClass().addClass('off');
		}
	});

	// 반려동물 폼의 데이터를 저장할 오브젝트 초기화
	const formDataObj = []; 

	// + (추가) 버튼 클릭시 form을 띄우고 페이지 스크롤
	$('.add-pet-button').on('click', function(){
		pageScroll(420);
		$('#popup-form').removeClass().addClass('flex');
		$('#pet-form')[0].reset();
	});
	
	// 펫추가의 닫기 버튼 클릭시 팝업 폼을 보이지 않게 하고, form 내부 내용을 초기화
	$('.close-add-pet-button').on('click', function() {
		pageScroll(0);
		$('#popup-form').removeClass().addClass('off');
		$('#pet-form')[0].reset();
	})

	// 예약 시작일을 오늘부터 시작
	const today = new Date().toISOString().split('T')[0]; // 현재 날짜를 YYYY-MM-DD 형식으로 변환
	$('input[name="start-date"]').attr('min', today);
	$('input[name="end-date"]').attr('min', today);
	
	// 아이 선택하기 모달창의 x버튼(닫기)를 클릭시
	$('.modal-close-btn').on('click', function() {
		closeModal();
	});
	
	$('#save-pet').on('click', function(){
		// 각 form 의 input에 대한 데이터를 변수에 저장
		let petHiddenVal = $('#pet-form-no').val(); 
		let petName = $('#pet-name').val();
		let petType = $('input[name="pet-type"]').val();
		let petBirth = $('#pet-birth').val();
		let petGender = $('input[name="pet-gender"]').val();
		let petWeight = $('#pet-weight').val();
		let petNeutered = $('input[name="pet-neutered"]').val();
		let petMessage = $('#pet-message').val();
		
		// 폼의 모든 칸이 채워진 경우
		if (petName && petType && petBirth && petGender && petWeight && petNeutered && petMessage) {
			const petSection = $('.pet-wrapper'); // .pet-wrapper의 태그를 찾아 저장
			
			const newPet = $('<div>'); // newPet 변수 생성, 변수에 div element 생성
			newPet.addClass('registered-pet-circle'); // newPet element에 클래스 추가 --> <div class="어쩌구"></div>
			
			// petHiddenVal 값을 배열의 인덱스로 사용하여 각 펫의 정보를 저장함
			// 배열의 petHiddenVal의 값에 해당하는 index가 없다면,
			// 해당 값의 index를 생성하여 새로운 펫 정보를 저장함.
			if (!formDataObj[Number(petHiddenVal)]) {
				formDataObj[Number(petHiddenVal)] = {};
			}
			
			// formDataObj의 [input-hidden의 value]에 { key : value } 삽입
			formDataObj[petHiddenVal].hphp_reserve_pet_no = petHiddenVal;
			formDataObj[petHiddenVal].hphp_pet_name = petName;
			formDataObj[petHiddenVal].hphp_pet_type = petType;
			formDataObj[petHiddenVal].hphp_pet_birth = petBirth;
			formDataObj[petHiddenVal].hphp_pet_gender = petGender;
			formDataObj[petHiddenVal].hphp_pet_weight = petWeight;
			formDataObj[petHiddenVal].hphp_pet_neut = petNeutered;
			formDataObj[petHiddenVal].hphp_comment = petMessage;
			
			// 등록한 순서 +1 해서 폼 넘버의 id값 변경
			$('#pet-form-no').val(Number(petHiddenVal) + 1)
			
			// newPet element의 내부에 (현재로서는 div 태그 안쪽)			
			// ` <span class="pet-name">${저장해둔 동물 이름}</span>
			//	 <button class="delete-button">X</button> ` 를 삽입
			newPet.html(`
	            <span class="pet-name">${petName}</span>
	            <button class="delete-button" style="padding: 1px 1px 1px 1px;">X</button>
				<input type="hidden" class="objIndexNo" value="${petHiddenVal}" />
			`);
			
			// petSection(.pet-wrapper) 속의 addPetButton 앞에 newPet을 삽입
			petSection.append(newPet, $('.add-pet-button'));
			
			pageScroll(0);
			
			// 팝업 폼의 스타일을 none으로 만들어 보이지 않게 함
			$('#popup-form').removeClass().addClass('off');
			$('#pet-form')[0].reset(); // form 리셋
			

			
		} else {
			alert('정보를 모두 채워 주세요.')
		}
	});
	
	// 예약 등록 버튼 클릭시
	$('.register-button').on('click', function(){
		// form의 데이터들을 DB에 전송하는 함수 호출
		clickRegisterButton();
	});
	
	// form의 데이터들을 DB에 전송하는 함수 
	function clickRegisterButton() {
		// 예약 폼의 시작, 종료일 저장
		let startDate = $('input[name="start-date"]').val();
		let endDate = $('input[name="end-date"]').val();

		// start-date, end-date가 모두 채워졌을 경우
		// 그리고 컨트롤러에 전달할 오브젝트의 길이가 0이 아닌 경우 
		// (펫 예약을 1마리 이상 한 경우)에 컨트롤러로 데이터 전달
		if (startDate && endDate && formDataObj.length != 0) {
			// 예약기간 (시작, 종료 날짜)폼을 시리얼라이즈해서 파라미터로 첨부
			let form_data = $('#start-end-date').serialize();
	
			fetch('/helppetf/pethotel/pethotel_reserve_data?' + form_data, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formDataObj) // 저장해 둔 오브젝트 (저장된 여러 마리의 펫)을 json으로 변환해 전달
			})
				.then(response => {
					if (response.ok) { // DB에 등록 성공시
						// 서버에 데이터 전송 성공 후 간단히 콘솔에 로그 출력
						console.log('Data successfully sent to server');
						return response.json(); // DB에 등록된 값을 다시 전달받음 (예약완료, 예약정보 확인 페이지를 위해)
					} else {
						console.error('Failed to send data');
						alert('예약에 실패하였습니다. 다시 시도해 주세요.');
						location.href = location.href;
					}
				})
				.then(data => {
					showReserveDonePage(data); // 페이지를 재구성하고 예약 완료 정보를 표시
				})
				.catch(error => {
					console.error('fetch failed:', error);
				});
		} else {
			alert('정보를 모두 채워 주세요.');
		}
	}
	
	// 페이지를 재구성하고 예약 완료 정보를 표시하는 함수
	function showReserveDonePage(data) {
		
		// 기존 예약 div를 보이지 않게, 예약완료 div를 보이게 설정
		$('#information').removeClass().addClass('off');
		$('#introduction').removeClass().addClass('off');
		$('#pethotel_reserve').removeClass().addClass('off');
		$('#pethotel_reserve_done').removeClass().addClass('on');
		
		let table = '';
		// 예약기간, 예약번호, 마리 수 등의 정보
		table += '<table border="1" width="800" style="text-align: center;">'
		table += '<tr><td>' + data.mem_Dto.hph_reserve_no + '</td><td>' + data.mem_Dto.mem_nick;
		table += '</td><td>' + data.mem_Dto.hph_numof_pet + '</td><td>' + data.mem_Dto.hph_start_date + '</td><td>' + data.mem_Dto.hph_end_date + '</td></tr>';

		// 예약 완료된 여러 마리의 펫 정보 출력 (반복문)
		data.nrFormList.forEach(function(pet) {
			table += '<tr><th>번호</th><th>이름</th><th>종류</th><th>생일</th><th>성별</th><th>체중</th><th>중성화</th><th>전달사항</th></tr>';
			table += '<tr><td>' + pet.hphp_reserve_pet_no + '</td><td>' + pet.hphp_pet_name + '</td><td>' + pet.hphp_pet_type;
			table += '</td><td>' + pet.hphp_pet_birth + '</td><td>' + pet.hphp_pet_gender + '</td><td>' + pet.hphp_pet_weight;
			table += '</td><td>' + pet.hphp_pet_neut + '</td><td>' + pet.hphp_comment + '</td>';
			table += '</tr>';
		});

		table += '</table>';

		$('#pethotel_reserve_done').html(table);
	}
	
	
	// 팝업 폼의 아이 선택하기 버튼 클릭시
	$('#select-pet-button').on('click', function(event){
		event.preventDefault();

		// DB 요청 보냄 - 로그인된 사용자의 mem_code를 이용하여 저장된 반려동물들 데이터 불러옴
		fetch('/helppetf/pethotel/pethotel_select_pet', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				if (response.ok) {
					console.log('Data successfully load to server');
					return response.json(); // 성공시 json형식으로 리턴
				} else {
					console.error('Failed to load data');
				}
			})
			.then(data => {
				console.log(data);
				// 펫 선택 모달 배치
				displaySelectModal(data);
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});
			
		// 펫 선택 모달 배치
		function displaySelectModal(data) {
			$('#select-pet-modal').removeClass().addClass('on');
			let petType = '';
			let table = '';
			
			// 받아온 데이터의 길이가 0이 아니라면 (데이터가 존재한다면)
			if (data.length != 0) {
				data.forEach(function(pets, index) {
					// DB에 'C', 'D'로 저장되어 있기 때문에 팝업 폼의 형식에 알맞게 변환
					if (pets.pet_type === 'C') {
						petType = '고양이';
					} else {
						petType = '강아지';
					}
					// 테이블 생성
					table += '<tr data-index="' + index + '"><td><div style="height: 100%; width:50%;">';
					table += '<img height="100%" width="100%" src="/static/Images/pet/' + pets.pet_img;
					table += '" alt="저장된 펫 이미지" width=20% height=20% /></div>';
					table += '<td>' + pets.pet_name + '</td>';
					table += '<td>' + petType + '</td>';
					table += '<td>' + pets.pet_birth + '</td>';
					table += '<td>' + pets.pet_gender + '</td>';
					table += '<td>' + pets.pet_weight + '</td>';
					table += '<td>' + pets.pet_neut + '</td></tr>';
				});

				// 받아온 데이터의 길이가 0 이라면 (데이터가 존재하지 않는다면)
			} else {
				table += '<tr><td colspan="7">펫프렌즈에 등록된 아이가 없어요..</td></tr>';
				table += '<tr><td colspan="7">';
				table += '<button onclick="location.href=\'/mypage/mypet\'">아이 등록하러 가기</button>';
				table += '</td></tr>';
			}
			
			$('#selectPetsTbody').html(table);
			
			// 출력된 테이블의 'tr'이 클릭 될 때
			$('.modal-content tbody').on('click', 'tr', function() {
				// 클릭된 'tr'의 dataset 값을 불러옴
				// 이 값은 반복문의 index값임
				const index = $(this).data('index');

				var petType = '';
				// DB에 'C', 'D'로 저장되어 있기 때문에 팝업 폼의 형식에 알맞게 변환
				if (data[index].pet_type === 'C') {
					petType = '고양이';
				} else {
					petType = '강아지';
				}

				// 클릭된 index넘버의 'tr'에 알맞는 데이터를 팝업 폼의 input에 배치
				// data 오브젝트의 index와 반복문의 index를 맞춰서 배치하였기 때문에
				// 반복문의 index넘버를 사용해도 알맞게 배치된다.
				$('input[name="pet-name"]').val(data[index].pet_name);
				$('input[name="pet-birth"]').val(data[index].pet_birth);
				$('input[name="pet-weight"]').val(data[index].pet_weight);
				$('input[name="pet-type"][value="' + petType + '"]').attr('checked', true);
				$('input[name="pet-neutered"][value="' + data[index].pet_neut + '"]').attr('checked', true);
				$('input[name="pet-gender"][value="' + data[index].pet_gender + '"]').attr('checked', true);

				// input에 값 배치 후 모달 닫기
				closeModal();
			});
		}
	});
	
	function closeModal() {
		// 모달의 클래스 'on'을 제거하여 보이지 않도록 변경
		$('#select-pet-modal').removeClass().addClass('off');
	}
	
	// 등록한 펫 div의 X(삭제) 버튼 클릭시 이벤트 추가
	// 삭제버튼이 클릭되면 해당하는 newPet의 div 가져옴
	$(document).on('click', '.delete-button', function(){
		let parentDiv = $(this).parent();
		const petHiddenVal  = parentDiv.find('.objIndexNo').val();
		console.log(petHiddenVal);
	});
	
	function pageScroll(y) {
		// 함수 호출시 파라미터의 값(Y좌표)으로 스크롤
		window.scrollTo({ 
			top: y,
			behavior: 'smooth'
		 });
	}
});