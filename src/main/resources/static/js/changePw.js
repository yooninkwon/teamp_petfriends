
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