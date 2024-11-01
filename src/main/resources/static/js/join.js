
// 이메일 형식 확인 및 중복 검사 함수
function validateEmail() {
    var email = document.getElementById("email").value;
    var emailError = document.getElementById("emailError");
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // 이메일 형식이 맞는지 확인
    if (!emailPattern.test(email)) {
        emailError.innerText = "올바른 이메일 형식을 입력해주세요.";
        emailError.style.display = "block";  // 이메일 형식이 틀리면 오류 메시지 표시
        return;
    } else {
        emailError.style.display = "none";  // 형식이 맞으면 오류 메시지 숨김
    }

    // 이메일 중복 검사
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/check-email?email=${encodeURIComponent(email)}`, true); // 서버에 AJAX 요청
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.isDuplicate) {
                emailError.innerText = "이미 사용 중인 이메일입니다.";
                emailError.style.display = "block"; // 중복된 이메일이면 오류 메시지 표시
            } else {
                emailError.style.display = "none"; // 중복되지 않으면 오류 메시지 숨김
            }
        }
    };
    xhr.send(); // 요청 보내기

    validateForm(); // 폼 유효성 검사 업데이트
}

// 비밀번호 형식 확인 함수
function validatePassword() {
    const passwordInput = document.getElementById("password").value;
    const passwordError = document.getElementById("passwordError");
    
    // 비밀번호 정규 표현식 (영문/숫자/특수문자 포함 8~20자)
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W]).{8,20}$/;
    
    if (!passwordPattern.test(passwordInput)) {
        passwordError.style.display = "block"; // 조건에 맞지 않으면 오류 메시지 표시
    } else {
        passwordError.style.display = "none"; // 조건에 맞으면 오류 메시지 숨김
    }
	validateForm();
}

// 비밀번호 확인 일치 확인 함수
function checkPasswordMatch() {
    const passwordInput = document.getElementById("password").value;
    const confirmPasswordInput = document.getElementById("confirmPassword").value;
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    if (passwordInput !== confirmPasswordInput) {
        confirmPasswordError.style.display = "block"; // 비밀번호가 일치하지 않으면 오류 메시지 표시
    } else {
        confirmPasswordError.style.display = "none"; // 비밀번호가 일치하면 오류 메시지 숨김
    }
	validateForm();
}

// 닉네임 형식 확인, 중복검사 확인 함수
function checkNickname() {
    const nickname = document.getElementById("nickname").value;
    const nicknameError = document.getElementById("nicknameError");

    if (nickname.length < 2 || nickname.length > 16) {
        // 닉네임 길이가 2~16자 이내가 아닐 경우 오류 메시지 표시
        nicknameError.innerText = "2~16자 이내로 입력해주세요.";
        nicknameError.style.display = "block";
        return;
    }

    // AJAX를 사용하여 서버에 중복 확인 요청
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/check-nickname?nickname=${encodeURIComponent(nickname)}`, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.isDuplicate) {
                nicknameError.innerText = "중복된 닉네임입니다.";
                nicknameError.style.display = "block";
            } else {
                nicknameError.style.display = "none";
            }
        }
    };
    xhr.send();
	validateForm();
}

// 휴대폰 번호 형식, 하이폰 추가 함수
// 포커스를 벗어났을 때 번호 형식을 010-XXXX-XXXX로 변경
function formatPhoneNumber() {
    const phoneNumberInput = document.getElementById("phoneNumberDisabled");
    let phoneNumber = phoneNumberInput.value;

    // 숫자만 남기기
    phoneNumber = phoneNumber.replace(/\D/g, "");

    // 휴대폰 번호가 11자리인 경우에만 하이픈 추가
    if (phoneNumber.length === 11) {
        // phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        document.getElementById("phoneNumberError").style.display = "none";
    } else {
        document.getElementById("phoneNumberError").style.display = "block"; // 잘못된 형식 경고
    }

    phoneNumberInput.value = phoneNumber;
	validateForm();
}

// 생년 월일 확인 함수	
function validateBirthDate() {
    let birthInput = document.getElementById("birth").value;  // 'let'으로 변경
    const birthError = document.getElementById("birthError");
    
    birthInput = birthInput.replace(/\D/g, "");  // 숫자만 남기기
    
    // 생년월일이 8자리인 경우에만 정규식 체크
    if (birthInput.length === 8) {
        const birthPattern = /^\d{8}$/;
        if (!birthPattern.test(birthInput)) {
            birthError.style.display = "block"; // 정규식에 맞지 않으면 오류 메시지 표시
        } else {
            birthError.style.display = "none"; // 정규식에 맞으면 오류 메시지 숨김
        }
    } else {
        birthError.style.display = "block"; // 입력한 숫자가 8자리가 아닐 때 오류 메시지 표시
    }
	validateForm();
}
	
// 휴대폰 인증
document.addEventListener("DOMContentLoaded", function() {
    let authCode = ""; // 서버에서 받은 인증번호를 저장할 변수

    // 인증 요청 버튼 클릭 이벤트
    document.getElementById("requestCodeBtn").addEventListener("click", function(event) {
        event.preventDefault(); // 폼 제출 방지

        const phoneNumber = document.getElementById("phoneNumberDisabled").value;
        console.log("입력된 휴대폰 번호:", phoneNumber);  // 디버깅용 로그

        if (phoneNumber.length !== 11) {
            document.getElementById("phoneNumberError").style.display = "block";
            return;
        } else {
            document.getElementById("phoneNumberError").style.display = "none";
        }

        // 인증 요청 AJAX 호출
        fetch('/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'phoneNumber': phoneNumber
            })
        })
        .then(response => response.json())
        .then(data => {
            authCode = data.authCode; // 인증번호 저장
			console.log(authCode);
            alert("인증번호가 발송되었습니다.");
            document.getElementById("phoneNumberDisabled").disabled = true; // 번호 입력 수정 불가능하게 설정
            document.getElementById("codelabel").hidden = false; // 숨기기 취소
            document.getElementById("verificationCode").hidden = false; // 숨기기 취소
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });

    // 인증번호 확인 버튼 클릭 이벤트
    document.getElementById("verificationCode").addEventListener("input", function() {
        const enteredCode = document.getElementById("verificationCode").value;

        if (enteredCode === authCode) {
            document.getElementById("verificationCode").disabled = true; // 인증번호 입력 수정 불가능하게 설정
			validateForm()
            alert("인증 완료되었습니다.");
			
        } else if (enteredCode.length === authCode.length && enteredCode !== authCode) {
            alert("인증번호가 일치하지 않습니다.");
        }
    });
	validateForm()	
});

// 휴대폰 번호 히든으로 복사
function syncPhoneNumber() {
            // disabled 필드의 값을 hidden 필드에 복사
            var phoneNumber = document.getElementById("phoneNumberDisabled").value;
            document.getElementById("hiddenPhoneNumber").value = phoneNumber;
}



// 주소 검색
function openAddressSearch() {
    const popupWidth = 600;
    const popupHeight = 700;
    const popupX = (window.screen.width / 2) - (popupWidth / 2); // 화면 중앙에 위치
    const popupY = (window.screen.height / 2.5) - (popupHeight / 2); // 화면 중앙에 위치

    new daum.Postcode({
        width: popupWidth,  // 팝업 가로 크기
        height: popupHeight, // 팝업 세로 크기
        top: popupY,
        left: popupX,
        oncomplete: function(data) {
            // 선택한 주소와 우편번호 값을 새 창에 전달하여 새 팝업 창을 엽니다.
            const addr = data.address; // 선택한 주소
            const extraAddr = data.extraAddress ? ` (${data.extraAddress})` : ""; // 상세 주소
            const postcode = data.zonecode; // 우편번호

            // 주소 정보와 우편번호를 새로운 팝업에 전달
            window.open(`/join/addressMap?address=${encodeURIComponent(addr + extraAddr)}&postcode=${postcode}`, "주소 상세 정보", 
                        `width=${popupWidth},height=${popupHeight},left=${popupX},top=${popupY},resizable=no`);
        }
    }).open({
        popupName: 'postcodePopup' // 팝업 이름 지정 (팝업이 여러 번 뜨지 않도록 제어 가능)
    });
}

// 동의하고 가입하기 버튼
// 모든 필드가 유효한지 확인하여 버튼 활성화
function validateForm() {
    // 각 입력 필드의 값과 에러 메시지 상태 확인
    const emailError = document.getElementById("emailError").style.display === "none";
    const passwordError = document.getElementById("passwordError").style.display === "none";
    const confirmPasswordMatch = document.getElementById("confirmPassword").value === document.getElementById("password").value;
    const confirmPasswordError = document.getElementById("confirmPasswordError").style.display === "none";
    const nicknameError = document.getElementById("nicknameError").style.display === "none";
    const phoneNumberError = document.getElementById("phoneNumberError").style.display === "none";
    const birthError = document.getElementById("birthError").style.display === "none";
	const verificationCodeError = document.getElementById("verificationCode").disabled == true;

    // 각 필드의 값 확인
    const emailValue = document.getElementById("email").value !== "";
    const passwordValue = document.getElementById("password").value !== "";
    const confirmPasswordValue = document.getElementById("confirmPassword").value !== "";
    const nicknameValue = document.getElementById("nickname").value !== "";
    const phoneNumberValue = document.getElementById("phoneNumberDisabled").value !== "";
    const birthValue = document.getElementById("birth").value !== "";
	const addressValue = document.getElementById("address").value !== "";
	const detailAddressValue = document.getElementById("detailAddress").value !== "";
	

    // 폼의 모든 필드가 유효한지 확인
    const isFormValid = emailError && passwordError && confirmPasswordMatch && confirmPasswordError &&
        nicknameError && phoneNumberError && birthError && verificationCodeError &&
        emailValue && passwordValue && confirmPasswordValue && 
        nicknameValue && phoneNumberValue && birthValue && addressValue && detailAddressValue;

    const submitBtn = document.getElementById("submitBtn");
    if (isFormValid) {
        submitBtn.disabled = false;  // 모든 필드가 유효하면 버튼 활성화
    } else {
        submitBtn.disabled = true;   // 유효하지 않으면 버튼 비활성화
    }
}

// 초기 상태에서 버튼 비활성화
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submitBtn").disabled = true;
});


