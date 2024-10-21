
// 이메일 형식 확인 함수
function validateEmail() {
    var email = document.getElementById("email").value;
    var emailError = document.getElementById("emailError");
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (emailPattern.test(email)) {
        emailError.style.display = "none";  // 이메일 형식이 맞으면 메시지 숨김
    } else {
        emailError.style.display = "block"; // 이메일 형식이 틀리면 메시지 표시
    }
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
}

// 휴대폰 번호 형식, 하이폰 추가 함수
// 포커스를 벗어났을 때 번호 형식을 010-XXXX-XXXX로 변경
function formatPhoneNumber() {
    const phoneNumberInput = document.getElementById("phoneNumber");
    let phoneNumber = phoneNumberInput.value;

    // 숫자만 남기기
    phoneNumber = phoneNumber.replace(/\D/g, "");

    // 휴대폰 번호가 11자리인 경우에만 하이픈 추가
    if (phoneNumber.length === 11) {
        phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        document.getElementById("phoneNumberError").style.display = "none";
    } else {
        document.getElementById("phoneNumberError").style.display = "block"; // 잘못된 형식 경고
    }

    phoneNumberInput.value = phoneNumber;
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
}
	
	
