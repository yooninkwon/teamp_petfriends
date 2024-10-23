// JavaScript 코드 추가
window.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const sendCodeBtn = document.querySelector('#requestCodeBtn');

    // 입력 필드의 값이 변경될 때마다 호출되는 함수
    function toggleSendCodeButton() {
        const phoneNumber = phoneNumberInput.value.replace(/\D/g, ''); // 숫자만 남김
        if (nameInput.value.trim() !== '' && phoneNumber.length === 11) {
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
    nameInput.addEventListener('input', toggleSendCodeButton);
    phoneNumberInput.addEventListener('input', toggleSendCodeButton);
});


// 인증
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
		const submitBtn = document.getElementById("submit-btn-Id");

        if (enteredCode === authCode) {
            document.getElementById("verificationCode").disabled = true; // 인증번호 입력 수정 불가능하게 설정
            alert("인증 완료되었습니다.");
			submitBtn.disabled = false;
			
        } else if (enteredCode.length === authCode.length && enteredCode !== authCode) {
            alert("인증번호가 일치하지 않습니다.");
        }
    });
});



window.addEventListener('DOMContentLoaded', function() {
    // 폼 제출 이벤트 리스너 등록
    document.getElementById('findIdForm').addEventListener('submit', function(event) {
        // 기본 폼 제출을 막음
        event.preventDefault();

        // 폼이 제출되지 않았다는 콘솔 로그 출력
        console.log('폼 제출이 막혔습니다.');

        // 여기에 데이터 전송 로직 추가 (예: fetch 호출)
        const name = document.getElementById('name').value;
        const phoneNumber = document.getElementById('phoneNumber').value;

        // 서버로 데이터 전송
        fetch('/find-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                phoneNumber: phoneNumber,
            }),
        })
        .then(response => response.json())
        .then(data => {
			console.log(data);
            if (data.userId) {
                // 팝업을 띄우고, 아이디를 표시
                document.getElementById('popup').style.display = 'block';
				document.getElementById('popupBackground').style.display = 'block';
                document.getElementById('userEmail').innerText = data.userId;
            } else {
                alert('가입 정보가 없습니다.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

// DOMContentLoaded 이벤트가 발생하면 실행
window.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    const closeButton = document.getElementById('popup-close');

    // 'X' 버튼 클릭 시 팝업 숨기기
    closeButton.addEventListener('click', function () {
		document.getElementById('popupBackground').style.display = 'none'; 
        popup.style.display = 'none'; // 팝업 숨기기
    });
});

