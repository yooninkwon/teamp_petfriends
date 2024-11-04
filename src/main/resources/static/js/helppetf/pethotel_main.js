/**
 * 
 */


var loginPopup = document.getElementById("loginPopup");
var loginBtn = document.getElementById("loginBtn");
var closeBtn = document.getElementById("closeBtn");

$('#right').on('click', function(event){
	event.preventDefault();
	
//	alert('asd',mem_login)
	if (mem_login === '') {
//		alert(mem_login)
		// 팝업 표시
		loginPopup.style.display = "flex";
		// 로그인 버튼 클릭 시
		loginBtn.addEventListener("click", function() {
			window.location.href = '/login/loginPage'; // 로그인 페이지로 이동
			loginPopup.style.display = "none"; // 팝업 닫기
		});
		// 닫기 버튼 클릭 시
		closeBtn.addEventListener("click", function() {
			loginPopup.style.display = "none"; // 팝업 닫기
		});
		return;
	} else {
		window.location.href = '/helppetf/pethotel/pethotel_reserve';
	}
});