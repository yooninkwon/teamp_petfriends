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


