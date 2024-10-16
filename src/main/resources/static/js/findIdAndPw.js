// JavaScript 코드 추가
   window.addEventListener('DOMContentLoaded', function () {
       const nameInput = document.getElementById('name');
       const phoneNumberInput = document.getElementById('phoneNumber');
       const sendCodeBtn = document.querySelector('.send-code-btn');

       // 입력 필드의 값이 변경될 때마다 호출되는 함수
       function toggleSendCodeButton() {
           if (nameInput.value.trim() !== '' && phoneNumberInput.value.trim() !== '') {
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

       // 초기 상태 설정
       toggleSendCodeButton();

       // 입력 필드 값 변경 시 이벤트 리스너 추가
       nameInput.addEventListener('input', toggleSendCodeButton);
       phoneNumberInput.addEventListener('input', toggleSendCodeButton);
   });