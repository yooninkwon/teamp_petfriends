document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const sendCodeBtn = document.getElementById('requestCodeBtn');
    const verificationCodeInput = document.getElementById('verificationCode');
    const submitBtn = document.getElementById('submit-btn-Pw');
    let authCode = ""; // 서버에서 받은 인증번호 저장 변수

    // 입력 필드 값 변경 시 인증 버튼 활성화 여부 판단
    function toggleSendCodeButton() {
        const phoneNumber = phoneNumberInput.value.replace(/\D/g, '');
        const isFormValid = emailInput.value.trim() !== '' && nameInput.value.trim() !== '' && phoneNumber.length === 11;

        sendCodeBtn.disabled = !isFormValid;
        sendCodeBtn.style.cursor = isFormValid ? 'pointer' : 'not-allowed';
        sendCodeBtn.style.backgroundColor = isFormValid ? '#ff4081' : '#ddd';
        sendCodeBtn.style.color = isFormValid ? 'white' : '#999';
    }

    // 폰넘버에서 숫자만 남김
    phoneNumberInput.addEventListener('blur', function () {
        phoneNumberInput.value = phoneNumberInput.value.replace(/\D/g, '');
    });

    // 입력 필드 값 변경 시 이벤트 리스너 추가
    [emailInput, nameInput, phoneNumberInput].forEach(input => input.addEventListener('input', toggleSendCodeButton));

    // 인증 요청 버튼 클릭 이벤트
    sendCodeBtn.addEventListener("click", function(event) {
        event.preventDefault(); // 기본 폼 제출 방지
        const phoneNumber = phoneNumberInput.value;

        // 인증 요청 AJAX 호출
        fetch('/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ 'phoneNumber': phoneNumber })
        })
        .then(response => response.json())
        .then(data => {
            authCode = data.authCode;
            alert("인증번호가 발송되었습니다.");
        })
        .catch(error => console.error("Error:", error));
    });

    // 인증번호 확인 입력 이벤트
    verificationCodeInput.addEventListener("input", function() {
        const enteredCode = verificationCodeInput.value;

        if (enteredCode === authCode) {
            verificationCodeInput.disabled = true;
            alert("인증 완료되었습니다.");
            submitBtn.disabled = false;
        } else if (enteredCode.length === authCode.length) {
            alert("인증번호가 일치하지 않습니다.");
        }
    });

    // 폼 제출 이벤트 리스너 등록
    document.getElementById('findPwForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = nameInput.value;
        const phoneNumber = phoneNumberInput.value;
		const emailInputValue = emailInput.value;

        // 서버로 데이터 전송
        fetch('/find-id', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, phoneNumber: phoneNumber })
        })
        .then(response => response.json())
        .then(data => {
            if (data.userId) {
                if (data.userId === emailInputValue) {
					console.log(data.userId)
					alert('비밀번호 변경 화면으로 이동합니다.');
					document.getElementById('findPwForm').submit(); // 폼 제출
				} else {
					alert('가입하신 이메일과 일치하지 않습니다.');
				}
            } else {
                alert('가입 정보가 없습니다.');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // 초기 설정
    toggleSendCodeButton();
});
