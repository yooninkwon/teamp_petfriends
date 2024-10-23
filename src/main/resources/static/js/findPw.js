

// JavaScript 코드 추가
window.addEventListener('DOMContentLoaded', function () {
	const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const sendCodeBtn = document.querySelector('#requestCodeBtn');

    // 입력 필드의 값이 변경될 때마다 호출되는 함수
    function toggleSendCodeButton() {
        const phoneNumber = phoneNumberInput.value.replace(/\D/g, ''); // 숫자만 남김
        if (emailInput.value.trim() !== '' && nameInput.value.trim() !== '' && phoneNumber.length === 11) {
            sendCodeBtn.disabled = false;
            sendCodeBtn.style.cursor = 'pointer';
            sendCodeBtn.style.color = 'white';
            sendCodeBtn.style.backgroundColor = '#ff4081';
        } else {
            sendCodeBtn.disabled = true;
            sendCodeBtn.style.cursor = 'not-allowed';
            sendCodeBtn.style.color = '#999';
            sendCodeBtn.style.backgroundColor = '#ddd';
        }
    }

    // 폰넘버에 포커스 아웃될 때 숫자만 남기기
    phoneNumberInput.addEventListener('blur', function () {
        phoneNumberInput.value = phoneNumberInput.value.replace(/\D/g, ''); // 숫자만 남김
    });

    // 초기 상태 설정
    toggleSendCodeButton();

    // 입력 필드 값 변경 시 이벤트 리스너 추가
	emailInput.addEventListener('input', toggleSendCodeButton);
    nameInput.addEventListener('input', toggleSendCodeButton);
    phoneNumberInput.addEventListener('input', toggleSendCodeButton);
});


// 인증번호
document.addEventListener("DOMContentLoaded", function() {
    let authCode = ""; // 서버에서 받은 인증번호를 저장할 변수

    // 인증 요청 버튼 클릭 이벤트
    document.getElementById("requestCodeBtn").addEventListener("click", function(event) {
        event.preventDefault(); // 폼 제출 방지

        const phoneNumber = document.getElementById("phoneNumber").value;
        console.log("입력된 휴대폰 번호:", phoneNumber);  // 디버깅용 로그

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
            alert("인증번호가 발송되었습니다.");
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });

    // 인증번호 확인 버튼 클릭 이벤트
    document.getElementById("verificationCode").addEventListener("input", function() {
        const enteredCode = document.getElementById("verificationCode").value;
		const submitBtn = document.getElementById("submit-btn-Pw");

        if (enteredCode === authCode) {
            document.getElementById("verificationCode").disabled = true; // 인증번호 입력 수정 불가능하게 설정
            alert("인증 완료되었습니다.");
			submitBtn.disabled = false;
			
        } else if (enteredCode.length === authCode.length && enteredCode !== authCode) {
            alert("인증번호가 일치하지 않습니다.");
        }
    });
});

