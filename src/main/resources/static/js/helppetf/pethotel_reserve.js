/**
 * 
 */
// 팝업 열기 및 닫기

document.addEventListener('DOMContentLoaded', () => {

	const addPetButton = document.querySelector('.add-pet-button'); // .add-pet-button의 태그를 찾아 반환해줌
	const closeAddPetButton = document.querySelector('.close-add-pet-button'); // .add-pet-button의 태그를 찾아 반환해줌
	const popupForm = document.getElementById('popup-form'); // popup-form의 태그를 찾아 반환해줌
	const savePetButton = document.getElementById('save-pet'); // save-pet의 태그를 찾아 반환해줌
	const backButton = document.querySelector('.back-button');
	const registerButton = document.querySelector('.register-button');
	const formDataObj = [];

	backButton.addEventListener('click', () => {
		window.location.href = '/helppetf/pethotel/pethotel_main';
	});

		addPetButton.addEventListener('click', () => {
		popupForm.style.display = 'flex'; // 팝업을 중앙에 표시
	});

	closeAddPetButton.addEventListener('click', () => {
		popupForm.style.display = 'none'; // 팝업 닫기
		document.getElementById('pet-form').reset(); // form 초기화
	});

	// 반려동물 form 저장 버튼 클릭시
	savePetButton.addEventListener('click', () => {
		let petHiddenVal = document.getElementById('pet-form-no').value; // form의 히든값을 저장
		const petName = document.getElementById('pet-name').value; // form의 동물이름을 저장
		const petType = document.getElementById('pet-type').value; // form의 동물타입을 저장
		const petBirth = document.getElementById('pet-birth-date').value; // form의 동물생일을 저장
		const petGender = document.getElementById('pet-gender').value; // form의 동물생일을 저장
		const petWeight = document.getElementById('pet-weight').value; // form의 동물무게를 저장
		const petNeutered = document.getElementById('pet-neutered').value; // form의 동물중성화 여부를 저장
		const petMessage = document.getElementById('pet-message').value; // form의 전달사항을 저장

		if (petName) {
			const petSection = document.querySelector('.pet-wrapper'); // .pet-wrapper의 태그를 찾아 반환해줌
			const newPet = document.createElement('div'); // newPet 변수 생성, 변수에 div element 생성
			newPet.classList.add('registered-pet-circle'); // newPet element에 클래스 추가 --> <div class="어쩌구"></div>

			// petHiddenVal값에 대한 인덱스 생성
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
			formDataObj[petHiddenVal].hphp_pet_comment = petMessage;

			console.log(formDataObj);
			petHiddenVal = Number(petHiddenVal) + 1;
			document.getElementById('pet-form-no').value = petHiddenVal;
			//		var form_data = $("#pet-form form").serialize();	
			//
			//		console.log(form_data)

			// newPet element의 내부에 (현재로서는 div 태그 안쪽)			
			// ` <span class="pet-name">${저장해둔 동물 이름}</span>
			//	 <button class="delete-button">X</button> ` 를 삽입
			newPet.innerHTML = `
            <span class="pet-name">${petName}</span>
            <button class="delete-button">X</button>
			<input type="hidden" id="objIndexNo" value="${petHiddenVal}" />`;

			petSection.insertBefore(newPet, addPetButton); // petSection(.pet-wrapper) 속의 addPetButton 앞에 newPet을 삽입
			popupForm.style.display = 'none'; // 팝업 닫음
			document.getElementById('pet-form').reset(); // form 리셋

			// 삭제 버튼 이벤트 추가
			const deleteButton = newPet.querySelector('.delete-button'); // 삭제버튼이 클릭되면 해당하는 newPet의 div 가져옴
			deleteButton.addEventListener('click', () => {
				console.log('삭제전', formDataObj);
				const petHiddenVal = document.getElementById('objIndexNo').value;
				delete formDataObj[petHiddenVal];
				console.log('삭제후', formDataObj);
				newPet.remove(); // 해당 div 삭제
			});
		}
	});
	
	//"register-pet"클릭시
	registerButton.addEventListener('click', () => {
		clickRegisterButton();
	});

	function clickRegisterButton() {
		var form_data = $('#start-end-date').serialize();

		fetch('/helppetf/pothotel/pethotel_reserve_data?' + form_data, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formDataObj)
		})
		.then(response => {
		    if (response.ok) {
		        // 서버에 데이터 전송 성공 후 간단히 콘솔에 로그 출력
		        console.log('Data successfully sent to server');
				window.location.href = '/helppetf/pethotel/pethotel_reserve_done'; // 리다이렉트	
		    } else {
		        console.error('Failed to send data');
		    }
		})
		.catch(error => {
		    console.error('Error occurred:', error);
		});

	}


});