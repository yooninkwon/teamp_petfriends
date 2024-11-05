/**
 * 이 스크립트는 로그인 정보가 없는 유저가 "예약하러 가기" 버튼을 클릭하였을 경우
 * 로그인이 필요하다는 메세지, 로그인 페이지로 이동할 수 있는 버튼을 표시하는
 * 모달창을 띄워주는 스크립트이다.
 * 
 * 컨트롤러에서 멤버 로그인 정보를 전달받아 사용한다.
 * 
 * 예약하러가기 버튼을 눌렀을 때 로그인 정보가 없는 경우,
 * 스타일설정을 통해 모달창을 보이게 만든다.
 * 모달창에 있는 로그인 하러 가기 버튼을 누르면 로그인 페이지로 이동한다.
 */


var loginPopup = document.getElementById("loginPopup"); // 아이디가 loginPopup인 엘리먼트 저장
var loginBtn = document.getElementById("loginBtn"); // 아이디가 loginBtn인 엘리먼트 저장
var closeBtn = document.getElementById("closeBtn"); // 아이디가 closeBtn인 엘리먼트 저장

// #right는 "예약하러 가기"버튼이다. 버튼이 눌린 경우
$('#right').on('click', function(event){
	event.preventDefault();
	
	// 컨트롤러에서 받아온 로그인 정보가 공백일 경우
	if (mem_login === '') {
		// 로그인이 필요하다는 모달창 표시
		loginPopup.style.display = "flex";
		// 모달창 내부의 로그인 버튼 클릭 시
		loginBtn.addEventListener("click", function() {
			loginPopup.style.display = "none"; // 모달창 보이지 않게 하기
			window.location.href = '/login/loginPage'; // 로그인 페이지로 이동
		});
		// 닫기 버튼 클릭 시
		closeBtn.addEventListener("click", function() {
			loginPopup.style.display = "none"; // 모달창 보이지 않게 하기
		});
		
	// 컨트롤러에서 받아온 로그인 정보가 공백이 아닌 경우
	// 로그인 정보가 존재하는 경우
	} else {
		// 펫호텔 예약 페이지로 이동
		window.location.href = '/helppetf/pethotel/pethotel_reserve';
	}
});