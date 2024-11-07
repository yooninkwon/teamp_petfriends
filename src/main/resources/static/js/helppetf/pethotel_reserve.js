/**
 * 이 스크립트는 로그인 된 유저(로그인 하여야 해당 페이지에 접속할 수 있다.)의 정보와
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

// 팝업 열기 및 닫기
document.addEventListener('DOMContentLoaded', () => {

	// 메인 nav, 서브 nav '선택됨' 클래스 설정
	document.getElementById(main_navbar_id).classList.add('selected');
	document.getElementById(sub_navbar_id).classList.add('selected');
	
	// element들을 각각 저장
	const addPetButton = document.querySelector('.add-pet-button'); // .add-pet-button의 태그를 찾아 반환해줌
	const closeAddPetButton = document.querySelector('.close-add-pet-button'); // .add-pet-button의 태그를 찾아 반환해줌
	const popupForm = document.getElementById('popup-form'); // popup-form의 태그를 찾아 반환해줌
	const savePetButton = document.getElementById('save-pet'); // save-pet의 태그를 찾아 반환해줌
	const backButton = document.querySelector('.back-button'); // .back-button의 태그를 찾아 반환해줌
	const registerButton = document.querySelector('.register-button'); // .register-button의 태그를 찾아 반환해줌
	const selectPetButton = document.getElementById('select-pet-button'); // select-pet-button의 태그를 찾아 반환해줌
	const formDataObj = [];

	// 돌아가기 버튼 클릭시 펫호텔 메인으로 이동
	backButton.addEventListener('click', () => {
		window.location.href = '/helppetf/pethotel/pethotel_main';
	});

	// + (추가) 버튼 클릭시 form을 띄우고 페이지 스크롤
	addPetButton.addEventListener('click', () => {
		popupForm.style.display = 'flex'; // 팝업 폼을 중앙에 표시
		pageScroll(420);
	});

	// 펫추가의 닫기 버튼 클릭시 팝업 폼을 보이지 않게 하고, form 내부 내용을 초기화
	closeAddPetButton.addEventListener('click', () => {
		pageScroll(0);
		popupForm.style.display = 'none'; // 팝업 닫기
		document.getElementById('pet-form').reset(); // form 초기화
	});

	// 예약 시작일을 오늘부터 시작
	const today = new Date().toISOString().split('T')[0]; // 현재 날짜를 YYYY-MM-DD 형식으로 변환
	$('input[name="start-date"]').attr('min', today);
	$('input[name="end-date"]').attr('min', today);

	// 아이 선택하기 모달창의 x버튼(닫기)를 클릭시
	$('.close-btn').on('click', function() {
		closeModal();
	});

	// 반려동물 form 저장 버튼 클릭시
	savePetButton.addEventListener('click', () => {

		// form의 각 내용을 변수에 저장
		let petHiddenVal = document.getElementById('pet-form-no').value; // form의 히든값을 저장 (각각 등록한 순서의 번호)
		const petName = document.getElementById('pet-name').value; // form의 동물이름을 저장
		const petType = document.querySelector('[name="pet-type"]').value; // form의 동물타입을 저장
		const petBirth = document.getElementById('pet-birth').value; // form의 동물생일을 저장
		const petGender = document.querySelector('[name="pet-gender"]').value; // form의 동물성별을 저장
		const petWeight = document.getElementById('pet-weight').value; // form의 동물무게를 저장
		const petNeutered = document.querySelector('[name="pet-neutered"]').value; // form의 동물중성화 여부를 저장
		const petMessage = document.getElementById('pet-message').value; // form의 전달사항을 저장

		// 폼의 모든 칸이 채워진 경우
		if (petName && petType && petBirth && petGender && petWeight && petNeutered && petMessage) {
			const petSection = document.querySelector('.pet-wrapper'); // .pet-wrapper의 태그를 찾아 반환해줌
			const newPet = document.createElement('div'); // newPet 변수 생성, 변수에 div element 생성
			newPet.classList.add('registered-pet-circle'); // newPet element에 클래스 추가 --> <div class="어쩌구"></div>

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
			petHiddenVal = Number(petHiddenVal) + 1;
			document.getElementById('pet-form-no').value = petHiddenVal;

			// newPet element의 내부에 (현재로서는 div 태그 안쪽)			
			// ` <span class="pet-name">${저장해둔 동물 이름}</span>
			//	 <button class="delete-button">X</button> ` 를 삽입
			newPet.innerHTML = `
            <span class="pet-name">${petName}</span>
            <button class="delete-button" style="padding: 1px 1px 1px 1px;">X</button>
			<input type="hidden" class="objIndexNo" value="${petHiddenVal}" />`;

			petSection.insertBefore(newPet, addPetButton); // petSection(.pet-wrapper) 속의 addPetButton 앞에 newPet을 삽입
			popupForm.style.display = 'none'; // 팝업 폼의 스타일을 none으로 만들어 보이지 않게 함
			document.getElementById('pet-form').reset(); // form 리셋

			// 삭제 버튼 이벤트 추가
			const deleteButton = newPet.querySelector('.delete-button'); // 삭제버튼이 클릭되면 해당하는 newPet의 div 가져옴
			deleteButton.addEventListener('click', () => {
				const petHiddenVal = document.querySelector('.objIndexNo').value; // 삭제 버튼을 누른 div의 objIndexNo의 값을 저장
				delete formDataObj[petHiddenVal]; // 오브젝트 객체의 저장해 둔 index를 삭제
				newPet.remove(); // 해당 div 삭제
			});

			// 페이지 스크롤
			pageScroll(0);

			// 비어있는 input란이 있는 경우
		} else {
			alert('정보를 모두 채워 주세요.')
		}
	});

	// 예약 등록 버튼 클릭시
	registerButton.addEventListener('click', () => {
		clickRegisterButton();
	});

	function clickRegisterButton() {
		let startDate = $('input[name="start-date"]').val();
		let endDate = $('input[name="end-date"]').val();
		
		// start-date, end-date가 모두 채워졌을 경우
		// 그리고 컨트롤러에 전달할 오브젝트의 길이가 0이 아닌 경우 (펫 예약을 1마리 이상 한 경우)에 컨트롤러로 데이터 전달
		if (startDate && endDate && formDataObj.length != 0) {
			// 예약기간 (시작, 종료 날짜)폼을 시리얼라이즈해서 파라미터로 첨부
			var form_data = $('#start-end-date').serialize();

			fetch('/helppetf/pothotel/pethotel_reserve_data?' + form_data, {
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
					}
				})
				.then(data => {
					showReserveDonePage(data); // 페이지를 재구성하고 예약 완료 정보를 표시
				})
				.catch(error => {
					console.error('There was a problem with the fetch operation:', error);
				});
		} else {
			alert('정보를 모두 채워 주세요.');
		}
	}

	// 페이지를 재구성하고 예약 완료 정보를 표시하는 함수
	function showReserveDonePage(data) {
		// 기존 예약 div를 보이지 않게, 예약완료 div를 보이게 설정
		document.getElementById('c-ontainer').style.display = 'none';
		document.getElementById('reserve-done').style.display = 'block';

		let post = '';

		// 예약기간, 예약번호, 마리 수 등의 정보
		post += '<table border="1" width="800" style="text-align: center;">'
		post += '<tr><td>' + data.mem_Dto.hph_reserve_no + '</td><td>' + data.mem_Dto.mem_nick;
		post += '</td><td>' + data.mem_Dto.hph_numof_pet + '</td><td>' + data.mem_Dto.hph_start_date + '</td><td>' + data.mem_Dto.hph_end_date + '</td></tr>';

		// 예약 완료된 여러 마리의 펫 정보 출력 (반복문)
		data.nrFormList.forEach(function(pet) {
			post += '<tr><th>번호</th><th>이름</th><th>종류</th><th>생일</th><th>성별</th><th>체중</th><th>중성화</th><th>전달사항</th></tr>';
			post += '<tr><td>' + pet.hphp_reserve_pet_no + '</td><td>' + pet.hphp_pet_name + '</td><td>' + pet.hphp_pet_type;
			post += '</td><td>' + pet.hphp_pet_birth + '</td><td>' + pet.hphp_pet_gender + '</td><td>' + pet.hphp_pet_weight;
			post += '</td><td>' + pet.hphp_pet_neut + '</td><td>' + pet.hphp_comment + '</td>';
			post += '</tr>';
		});

		post += '</table>';

		$('#reserve-done').html(post);
	}

	// 팝업 폼의 아이 선택하기 버튼 클릭시
	selectPetButton.addEventListener('click', function(event) {
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
					console.log('Data successfully sent to server');
					return response.json(); // 성공시 json형식으로 리턴
				} else {
					console.error('Failed to send data');
				}
			})
			.then(data => {
				// 펫 선택 모달 배치
				displaySelectModal(data);
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});

		// 펫 선택 모달 배치
		function displaySelectModal(data) {

			// 모달창 보이도록 설정 (on 클래스에 대한 css 존재함)
			document.getElementById('select-pet-modal').classList.add('on');
			let petType = '';
			let post = '';

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
					post += '<tr data-index="' + index + '"><td><div style="height: 100%; width:50%;">';
					post += '<img height="100%" width="100%" src="/static/Images/pet/' + pets.pet_img;
					post += '" alt="저장된 펫 이미지" width=20% height=20% /></div>';
					post += '<td>' + pets.pet_name + '</td>';
					post += '<td>' + petType + '</td>';
					post += '<td>' + pets.pet_birth + '</td>';
					post += '<td>' + pets.pet_gender + '</td>';
					post += '<td>' + pets.pet_weight + '</td>';
					post += '<td>' + pets.pet_neut + '</td></tr>';
				});

				// 받아온 데이터의 길이가 0 이라면 (데이터가 존재하지 않는다면)
			} else {
				post += '<tr><td colspan="7">펫프렌즈에 등록된 아이가 없어요..</td></tr>';
				post += '<tr><td colspan="7">';
				post += '<button onclick="location.href=\'/mypage/mypet\'">아이 등록하러 가기</button>';
				post += '</td></tr>';
			}

			document.getElementById('selectPetsTbody').innerHTML = post;

			// 출력된 테이블의 'tr'이 클릭 될 때
			$('.modal-content tbody').on('click', 'tr', function() {
				// 클릭된 'tr'의 dataset 값을 불러옴
				// 이 값은 반복문의 index값임
				const index = $(this).data('index');

				var petType = '';
				// DB에 'C', 'D'로 저장되어 있기 때문에 팝업 폼의 형식에 알맞게 변환
				if (data[index] === 'C') {
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

	function pageScroll(y) {
		// 함수 호출시 파라미터의 값(Y좌표)으로 스크롤
		window.scrollTo({ 
			top: y,
			behavior: 'smooth'
		 });
	}

	function closeModal() {
		// 모달의 클래스 'on'을 제거하여 보이지 않도록 변경
		$('#select-pet-modal').removeClass('on');
	}

});