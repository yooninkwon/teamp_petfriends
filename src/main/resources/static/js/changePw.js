
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("submitBtn").style.backgroundColor = '#ddd';
	document.getElementById("submitBtn").style.cursor = 'not-allowed';
	document.getElementById("submitBtn").disabled = true;

	});
	
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



	function validateForm() {
		const submit = document.getElementById("submitBtn")

		const emailError = document.getElementById("passwordError").style.display === "none";
		const passwordError = document.getElementById("confirmPasswordError").style.display === "none";
		const emailValue = document.getElementById("password").value !== "";
		const passwordValue = document.getElementById("confirmPassword").value !== "";

		if (emailError && passwordError && emailValue && passwordValue) {
			submit.disabled = false;
			if (submit.disabled === false) {
				submit.style.backgroundColor = '#ff4081';  // 활성화 상태일 때 배경색
				submit.style.color = 'white';  // 활성화 상태일 때 텍스트 색상	
				submit.style.cursor = 'pointer';
			}
		} else {
			submit.disabled = true;
			if (submit.disabled === true) {
				submit.style.backgroundColor = '#ddd';  // 비활성화 상태일 때 배경색 변경
				submit.style.color = '#999';  // 비활성화 상태일 때 텍스트 색상 변경
				submit.style.cursor = 'not-allowed';
			}
		}

	}




