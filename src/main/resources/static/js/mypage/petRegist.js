//전역 변수 추가
let petName = "";
let petType = "";
let petBreed = "";

// 다음 버튼 클릭시 container2 노출 및 자동 스크롤
function showNextContainer2() {
	// container1 입력값 전달
	petName = document.getElementById("petName").value;
    petType = document.querySelector("input[name='petType']:checked").value;
	
    document.getElementById("nextPetName").innerText = petName;
    document.getElementById("nextPetType").innerText = petType === 'D' ? '견' : '묘';

    document.getElementById("pet-regist-container2").style.display = "block";
    document.getElementById("pet-regist-container2").scrollIntoView({ behavior: 'smooth' });
}

// container3 노출 및 자동 스크롤
function checkAllInputsFilled() {
    petBreed = document.getElementById("petBreed").value;
    const petBirth = document.getElementById("petBirth").value;
	
    if (petBreed && petBirth) {
	    document.getElementById("nextnextPetName").innerText = petName;
	    document.getElementById("nextPetBreed").innerText = petBreed;
		
	    document.getElementById("pet-regist-container3").style.display = "block";
	    document.getElementById("submitBtn").style.display = "block";
	    document.getElementById("pet-regist-container3").scrollIntoView({ behavior: "smooth" });
    }
}

// 펫 이름 검사
function validatePetName() {
    const petName = document.getElementById("petName").value;
    const petNameError = document.getElementById("petNameError");
    const nextBtn1 = document.getElementById("nextBtn1");
    const validPattern = /^[가-힣a-zA-Z0-9]{1,8}$/;

    if (validPattern.test(petName)) {
        petNameError.style.display = "none";
        nextBtn1.disabled = false;
    } else {
        petNameError.style.display = "block";
        nextBtn1.disabled = true;
    }
}

//펫 이미지 업로드시 사진 미리보기
function previewImage(event) {
    const preview = document.getElementById("previewImg");
    const cameraIcon = document.getElementById("cameraIcon");

    const file = event.target.files[0];
    if (file) {
		preview.src = URL.createObjectURL(file);
        preview.style.display = "block"; // 미리 보기 이미지 표시
        cameraIcon.style.display = "none"; // 카메라 아이콘 숨김
    }
}

// 종 옵션 열기
function openBreedOption() {
    const petType = document.querySelector('input[name="petType"]:checked').value;
	
	const popupWidth = 400;
    const popupHeight = 600;
    const popupX = (window.screen.width / 2) - (popupWidth / 2);
    const popupY = (window.screen.height / 2) - (popupHeight / 2);

    window.open(`/mypage/register/breedOption?petType=${petType}`, 'breedOption', `width=${popupWidth},height=${popupHeight},left=${popupX},top=${popupY},resizable=no`);
}

// 종 키워드 검색
function filterBreeds() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const breeds = document.querySelectorAll('.breed-item');

    breeds.forEach(breed => {
        if (breed.textContent.toLowerCase().includes(searchInput)) {
            breed.style.display = 'block';
        } else {
            breed.style.display = 'none';
        }
    });
}

// 종 선택
function selectBreed(breed) {
    opener.document.getElementById("petBreed").value = breed;
    window.close();
}

// 초기 기본값 설정
document.getElementById("petGender").value = "M";
document.getElementById("petNeut").value = "Y";
document.getElementById("petForm").value = "적당해요";

// 성별 선택
function genderOption(element) {
	event.preventDefault(); // 클릭 시 스크롤 방지
    document.querySelectorAll(".genderBtn").forEach(btn => {
        btn.classList.remove("selected");
    });
    element.classList.add("selected");
	document.getElementById("petGender").value = element.innerText === "남아" ? "M" : "F";
}

// 중성화 선택
function neutOption(element) {
	event.preventDefault(); // 클릭 시 스크롤 방지
    document.querySelectorAll(".neutBtn").forEach(btn => {
        btn.classList.remove("selected");
    });
    element.classList.add("selected");
	document.getElementById("petNeut").value = element.innerText === "했어요" ? "Y" : "N";
}

// 체형 선택
function formOption(element) {
	event.preventDefault(); // 클릭 시 스크롤 방지
    document.querySelectorAll(".formBtn").forEach(btn => {
        btn.classList.remove("selected");
    });
    element.classList.add("selected");
	document.getElementById("petForm").value = element.innerText
}

// 관심사 선택
function careOption(element) {
	event.preventDefault(); // 클릭 시 스크롤 방지
    element.classList.toggle("selected");
}

// 알러지 여부 선택
function booleanOption(element) {
	event.preventDefault(); // 클릭 시 스크롤 방지
    document.querySelectorAll(".booleanBtn").forEach(btn => {
        btn.classList.remove("selected");
    });
    element.classList.add("selected");
}

// 알러지 여부 선택 시 컨테이너 표시/숨기기
function showNextContainer4(show) {
    const container4 = document.getElementById("pet-regist-container4");
    if (show) {
        container4.style.display = "block";
        container4.scrollIntoView({ behavior: 'smooth' });
    } else {
        container4.style.display = "none";
    }
}
function hideNextContainer4() {
    showNextContainer4(false);
}

// 알러지 선택
function allergyOption(element) {
	event.preventDefault(); // 클릭 시 스크롤 방지
    element.classList.toggle("selected");
}

// 직접 작성하기 입력 후 Enter 키를 누르면 Btn 추가
document.getElementById("careInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const value = this.value.trim();
        if (value) {
            const newBtn = document.createElement("button");
            newBtn.className = "careBtn selected";
            newBtn.innerText = value;
            newBtn.onclick = () => careOption(newBtn);
            this.before(newBtn);
            this.value = "";
        }
    }
});
document.getElementById("allergyInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const value = this.value.trim();
        if (value) {
            const newBtn = document.createElement("button");
            newBtn.className = "allergyBtn selected";
            newBtn.innerText = value;
            newBtn.onclick = () => allergyOption(newBtn);
            this.before(newBtn);
            this.value = "";
        }
    }
});

// 관심사와 알러지 값을 수집하여 숨겨진 필드에 넣는 함수
function gatherMultiSelect() {
    const selectedCare = Array.from(document.querySelectorAll(".careBtn.selected"))
        .map(btn => btn.innerText)
        .filter(Boolean);
    const careInput = document.getElementById("careInput").value.trim();
    if (careInput) selectedCare.push(careInput);

    const selectedAllergy = Array.from(document.querySelectorAll(".allergyBtn.selected"))
        .map(btn => btn.innerText)
        .filter(Boolean);
    const allergyInput = document.getElementById("allergyInput").value.trim();
    if (allergyInput) selectedAllergy.push(allergyInput);

    document.getElementById("petCare").value = selectedCare.join(',');
    document.getElementById("petAllergy").value = selectedAllergy.join(',');
}