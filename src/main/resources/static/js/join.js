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