// 이메일 형식 확인 및 중복 검사 함수
function validateEmail() {
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("emailError");
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (!emailPattern.test(email)) {
        emailError.innerText = "올바른 이메일 형식을 입력해주세요.";
        emailError.style.display = "block";
        return;
    } else {
        emailError.style.display = "none";
        fetch(`/check-email?email=${encodeURIComponent(email)}`)
            .then(response => response.json())
            .then(data => {
                emailError.innerText = data.isDuplicate ? "이미 사용 중인 이메일입니다." : "";
                emailError.style.display = data.isDuplicate ? "block" : "none";
            });
    }
}

// 닉네임 형식 확인, 중복검사 확인 함수
function checkNickname() {
    const nickname = document.getElementById("nickname").value;
    const nicknameError = document.getElementById("nicknameError");

    if (nickname.length < 2 || nickname.length > 16) {
        nicknameError.innerText = "2~16자 이내로 입력해주세요.";
        nicknameError.style.display = "block";
        return;
    }
    
    fetch(`/check-nickname?nickname=${encodeURIComponent(nickname)}`)
        .then(response => response.json())
        .then(data => {
            nicknameError.innerText = data.isDuplicate ? "이미 사용 중인 닉네임입니다." : "";
            nicknameError.style.display = data.isDuplicate ? "block" : "none";
        });
}

// 생년월일 확인 함수	
function validateBirthDate() {
    const birthField = document.getElementById("birth");
    const birthError = document.getElementById("birthError");

    // 숫자 외의 문자를 제거하여 숫자만 남김
    birthField.value = birthField.value.replace(/\D/g, "");

    birthError.style.display = birthField.value.length === 8 ? "none" : "block";
}

// 휴대폰 번호 변경 팝업 창 열기
function openPhoneNumberChange() { 
    const popupWidth = 500;
    const popupHeight = 300;
    const popupX = (window.screen.width / 2) - (popupWidth / 2);
    const popupY = (window.screen.height / 2) - (popupHeight / 2);
    
    window.open('/mypage/setting/tellChange', 'tellChange', `width=${popupWidth},height=${popupHeight},left=${popupX},top=${popupY},resizable=no`);
}

// 휴대폰 인증
let authCode = ""; // 전역 변수
async function requestCode() {
    const phoneNumber = document.getElementById("phoneNumber").value;
    const phoneNumberError = document.getElementById("phoneNumberError");
    const isPhoneNumberValid = /^\d{11}$/.test(phoneNumber);

    if (!isPhoneNumberValid) {
        phoneNumberError.innerText = "올바른 번호를 입력해주세요.";
        phoneNumberError.style.display = "block";
        return;
    }
    
    const res = await fetch(`/check-tell?tell=${phoneNumber}`);
    const { isDuplicate } = await res.json();
    if (isDuplicate) {
        phoneNumberError.innerText = "이미 사용 중인 전화번호입니다.";
        phoneNumberError.style.display = "block";
        return;
    }
    
    phoneNumberError.style.display = "none";
    const smsRes = await fetch('/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'phoneNumber': phoneNumber })
    });
    const data = await smsRes.json();
	authCode = data.authCode;
    alert("인증번호가 발송되었습니다.");
    console.log(authCode);

    document.getElementById("phoneNumber").disabled = true;
    document.getElementById("Code").style.display = "block";
    document.getElementById("checkCodeBtn").style.display = "block";
}

// 인증번호 확인 버튼 클릭 이벤트
function checkCode() {
    const enteredCode = document.getElementById("Code").value;
    const codeError = document.getElementById("codeError");

    if (enteredCode === authCode) {
        codeError.style.display = "none"; // 인증 성공 시 에러 숨김
        alert("인증이 완료되었습니다.");
        document.getElementById("Code").disabled = true;
        document.getElementById("modifyBtn").disabled = false; // 변경하기 버튼 활성화
    } else {
        codeError.style.display = "block"; // 인증 실패 시 에러 표시
    }
}

// 주소 변경 팝업 창 열기
function openAddressChange() { 
    const popupWidth = 600;
    const popupHeight = 700;
    const popupX = (window.screen.width / 2) - (popupWidth / 2);
    const popupY = (window.screen.height / 2) - (popupHeight / 2);
    
    window.open('/mypage/setting/addressChange', 'addressChange', `width=${popupWidth},height=${popupHeight},left=${popupX},top=${popupY},resizable=no`);
}

// 기본 주소지로 설정
function setMainAddress(addrCode) {
    if (confirm("기본 주소지로 변경하시겠습니까?")) {
        $.ajax({
            type: "POST",
            url: "/mypage/setting/setMainAddress",
            data: { addrCode: addrCode },
            success: function() {
                location.reload(); // 변경 후 페이지 새로고침
            },
            error: function() {
                alert("기본 주소 설정 중 오류가 발생했습니다.");
            }
        });
    }
}

// 주소 삭제
function deleteAddress(addrCode) {
    if (confirm("이 주소를 삭제할까요?")) {
        $.ajax({
            type: "POST",
            url: "/mypage/setting/deleteAddress",
            data: { addrCode: addrCode },
            success: function() {
                location.reload(); // 삭제 후 페이지 새로고침
            },
            error: function() {
                alert("주소 삭제 중 오류가 발생했습니다.");
            }
        });
    }
}

// 주소 검색
function openAddressSearch() {
	const popupWidth = 600;
    const popupHeight = 700;
    const popupX = (window.screen.width / 2) - (popupWidth / 2); // 화면 중앙에 위치
    const popupY = (window.screen.height / 2) - (popupHeight / 2); // 화면 중앙에 위치

	
	document.getElementById('layer').style.display = 'block';
	
    new daum.Postcode({
        oncomplete: function(data) {
            var roadAddr = data.roadAddress; // 선택한 주소(도로명)
            var jibunAddr = data.jibunAddress; // 선택한 주소(지번)
            var postcode = data.zonecode; // 우편번호

            document.getElementById('layer').style.display = 'none';
			
			// 주소 정보와 우편번호를 새로운 팝업에 전달
            window.open(`/mypage/setting/addressCheck?roadAddr=${encodeURIComponent(roadAddr)}&jibunAddr=${encodeURIComponent(jibunAddr)}&postcode=${postcode}`,
						'addressCheck',
						`width=${popupWidth},height=${popupHeight},left=${popupX},top=${popupY},resizable=no`);
        },
        width : '100%',
        height : '100%',
        maxSuggestItems : 5
    }).embed(document.getElementById('layer'));
}

function closeSearch() {
    document.getElementById('layer').style.display = 'none';
}

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성
var geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체
var marker = new kakao.maps.Marker({map: map}); // 마커 생성
var roadAddr = new URLSearchParams(window.location.search).get('roadAddr'); // 전달된 주소

// 전달된 주소로 좌표를 검색
geocoder.addressSearch(roadAddr, function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
		map.relayout();
        map.setCenter(coords); // 지도 중심을 검색된 좌표로 이동
        marker.setPosition(coords); // 마커 위치 설정
    }
});

function submitForm(event) {
	event.preventDefault();
    const errors = document.querySelectorAll(".error-msg");
    for (let error of errors) {
        if (error.style.display === "block") {
            error.previousElementSibling.focus();
            return;
        }
    }
    document.querySelector(".memberinfo").submit();
}