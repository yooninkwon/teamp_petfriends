window.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const sendCodeBtn = document.querySelector('#requestCodeBtn');
    let authCode = ""; // 서버에서 받은 인증번호를 저장할 변수
    const verificationCodeInput = document.getElementById('verificationCode');
    const submitBtn = document.getElementById('submit-btn-Id');
    const findIdForm = document.getElementById('findIdForm');
    const popup = document.getElementById('popup');
    const closeButton = document.getElementById('popup-close');
    const popupBackground = document.getElementById('popupBackground');
    const userEmailDisplay = document.getElementById('userEmail');

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

    // 인증 요청 버튼 클릭 이벤트
    sendCodeBtn.addEventListener("click", function(event) {
        event.preventDefault(); // 폼 제출 방지
        const phoneNumber = phoneNumberInput.value;

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

    // 인증번호 확인 입력 이벤트
    verificationCodeInput.addEventListener("input", function() {
        const enteredCode = verificationCodeInput.value;

        if (enteredCode === authCode) {
            verificationCodeInput.disabled = true; // 인증번호 입력 수정 불가능하게 설정
            alert("인증 완료되었습니다.");
            submitBtn.disabled = false;
        } else if (enteredCode.length === authCode.length && enteredCode !== authCode) {
            alert("인증번호가 일치하지 않습니다.");
        }
    });

    // 폼 제출 이벤트 리스너 등록
    findIdForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 기본 폼 제출을 막음

        const name = nameInput.value;
        const phoneNumber = phoneNumberInput.value;

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
            if (data.userId) {
                popup.style.display = 'block';
                popupBackground.style.display = 'block';
                userEmailDisplay.innerText = data.userId;
            } else {
                alert('가입 정보가 없습니다.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    // 팝업 닫기 버튼 클릭 이벤트
    closeButton.addEventListener('click', function () {
        popupBackground.style.display = 'none'; 
        popup.style.display = 'none'; // 팝업 숨기기
    });
});

window.addEventListener('DOMContentLoaded', function() {
  const findPwBtn = document.getElementById('findPwBtn');
  
  if (findPwBtn) {
    findPwBtn.addEventListener('click', function() {
      const userEmail = document.getElementById('userEmail').innerText;
      if (userEmail) {
        const url = `/login/findPw?email=${encodeURIComponent(userEmail)}`;
        window.location.href = url;
      } else {
        alert('이메일을 확인할 수 없습니다.');
      }
    });
  } else {
    console.error('findPwBtn 버튼을 찾을 수 없습니다.');
  }
});