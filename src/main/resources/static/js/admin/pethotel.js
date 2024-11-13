/**
 * 이 스크립트는 펫호텔의 소개글과 이용안내글을 
 * 관리자페이지에서 열람하고 수정 할 수 있는 스크립트이다.
 * 
 * 각 탭의 내용을 페이지를 fetch를 이용하여
 * redirect 없이 이동할 수 있고
 * 수정 버튼을 눌러 수정이 가능하다.
 * 
 * 각 칼럼의 내용을 개별적으로 수정할 수 있으며
 * 수정을 완료한 뒤 오브젝트 형식으로 서버에 전송하여
 * 데이터베이스에 데이터를 전송한다.
 * 
 * 데이터베이스에 전송된 내용이 반영된 뒤,
 * 펫호텔 view 페이지에서도 수정된 내용이 보여진다.
 * 
 */

$(document).ready(function() {

	//탭 전환 기능 - 탭에 있는 dataset(data-tab)을 통해
	// 클릭한 탭의 "tab" 데이터를 변수에 저장한다.
	// data-tab의 값은 각 탭에 해당하는 div의 id값과 동일하다.
	// 클릭한 탭의 data-tab과 동일한 id의 div를 보이게 한다.
	document.querySelectorAll('.tab-btn').forEach(function(tabBtn) {
		tabBtn.addEventListener('click', function() {
			
			// 모든 탭에서 'active' 클래스를 제거 (탭에 대한 active 클래스 css 초기화)
			document.querySelectorAll('.tab-btn').forEach(function(btn) {
				btn.classList.remove('active');
			});
			// 클릭한 탭에 'active' 클래스 추가 (active 클래스에 대한 css를 하기 위함)
			this.classList.add('active');

			// 탭에 해당하는 div들을 모두 보이지 않게 함
			// 보이게 되는 div를 설정하기 이전에 모두 보이지 않게 해 초기화함 (중복으로 보여지는 것을 방지)
			document.querySelectorAll('.tab-content').forEach(function(content) {
				content.style.display = 'none';
			});

			// 클릭한 탭의 data-tab 해당하는 id값을 가진 div를 보이게 함
			const tabId = this.getAttribute('data-tab');
			document.getElementById(tabId).style.display = 'block';
		});
	});

	// 페이지 로드 시 기본적으로 첫 탭의 데이터를 불러옴
	loadIntroData();

	// 탭 전환 시 데이터 로드
	$('button[data-tab="intro"]').on('click', function() {
		loadIntroData();
	});
	// 탭 전환 시 데이터 로드
	$('button[data-tab="info"]').on('click', function() {
		loadInfoData();
	});

	// Introduction 탭 데이터 로드 함수
	function loadIntroData() {
		fetchData();
		// 데이터를 요청하여 DB에 저장된 펫호텔 소개글 데이터 불러옴
		function fetchData() {
			$.ajax({
				url: '/admin/pethotel_admin_intro_data',
				method: 'GET',
				dataType: 'json',
				success: function(data) {
					// 로드된 데이터 화면에 배치
					displayItems(data);
				},
				error: function(xhr, status, error) {
					// 서버에서 데이터를 불러오는 과정에서 발생한 오류를 콘솔에 출력하고,
					// 사용자에게 오류 메시지를 표시한다.
					alert('게시물 로드 중 오류가 발생했습니다.');
					console.error('Error fetching data:', error);
				}
			});
		}
		
		// 로드된 데이터를 화면에 배치
		function displayItems(data) {
			let post = '';

			post += '<div id="intro_edit_button_div"><button id="intro_edit_button">내용 수정하기</button></div>'
			post += '<div class="top-section"><div class="text-content"><h1>펫호텔 서비스를 소개합니다!</h1>';
			post += '<p>' + data.intro_line1 + '<br />' + data.intro_line2 + '<br />' + data.intro_line3 + '</p>';
			post += '<p>반려 동물 호텔, <strong>펫호텔</strong> 서비스는 <br />';
			post += data.intro_line4 + '<br />';
			post += data.intro_line5 + '</p></div>';
			
			post += '<div class="middle-section"><h2>이용안내</h2>'
			post += '<ul><li>' + data.intro_line6 + '</li>'
			post += '<li>' + data.intro_line7 + '<br />'
			post += '<span class="small_text">' + data.intro_line8 + '</span></li>'
			post += '<li>' + data.intro_line9 + '</li></div>'

			$('#intro').html(post);
			// "수정" 버튼 클릭시
			$('#intro_edit_button').on('click', function() {
				// 배치된 데이터를 수정하는 폼으로 변환하기 위한 함수
				displayForIntroEdit(data); 
			});
		}
	}
	
	// Information 탭 클릭시 데이터 로드
	function loadInfoData() {
	
		fetchData();

		function fetchData() {
			$.ajax({
				url: '/admin/pethotel_admin_info_data',
				method: 'GET',
				dataType: 'json',
				success: function(data) {
					displayItems(data);
				},
				error: function(xhr, status, error) {
					// 서버에서 데이터를 불러오는 과정에서 발생한 오류를 콘솔에 출력하고,
					// 사용자에게 오류 메시지를 표시한다.
					alert('게시물 로드 중 오류가 발생했습니다.');
					console.error('Error fetching data:', error);
				}
			});
		}
		
		// 로드된 데이터 화면에 배치
		function displayItems(data) {
			let post = '';

			post += '<div id="info_edit_button_div"><button id="info_edit_button">내용 수정하기</button></div>'
			post += '<div class="content-section"><h3 style="margin-top: -45px">공통사항</h3>';
			post += '<p>' + data.info_line1;
			post += '<br />' + data.info_line2 + '</p><h3>반려견 공통사항, 예약과 입퇴실</h3><ul>';
			post += '<li>' + data.info_line3 + '</li>';
			post += '<li>' + data.info_line4 + '</li>';
			post += '<li>' + data.info_line5 + '</li>';
			post += '<li>' + data.info_line6 + '</li></ul>';
			post += '<h3>입실 불가능 아이</h3><ul><li>' + data.info_line7 + '</li>';
			post += '<li>' + data.info_line8 + '</li>';
			post += '<li>' + data.info_line9 + '</li>';
			post += '<li>' + data.info_line10 + '</li></ul>';
			post += '<h3>반려묘 공통사항, 예약과 입퇴실</h3><ul><li>' + data.info_line11 + '</li>';
			post += '<li>' + data.info_line12 + '</li>';
			post += '<li>' + data.info_line13 + '</li>';
			post += '<li>' + data.info_line14 + '</li></ul>';
			post += '<h3>입실 불가능 아이</h3><ul><li>' + data.info_line15 + '</li>';
			post += '<li>' + data.info_line16 + '</li><ul></div>';

			$('#info').html(post);
			// "수정" 버튼 클릭시
			$('#info_edit_button').on('click', function() {
				// 배치된 데이터를 수정하는 폼으로 변환하기 위한 함수
				infoEditButton(data);
			});
		}
	}
	
	// 로드한 데이터를 수정하는 폼으로 변환하기 위한 함수
	function infoEditButton(data) {

		let post = '';
		// input 태그로 변환
		post += '<div id="info_edit_button_div"><button id="info_edit_submit_button">수정완료</button></div>'
		post += '<div class="content-section"><h3 style="margin-top: -45px">공통사항</h3>';
		post += '<p><input type="text" id="info_line1" value="' + data.info_line1 + '" />';
		post += '<br /><input type="text" id="info_line2" value="' + data.info_line2 + '" /></p><h3>반려견 공통사항, 예약과 입퇴실</h3><ul>';
		post += '<li><input type="text" id="info_line3" value="' + data.info_line3 + '" /></li>';
		post += '<li><input type="text" id="info_line4" value="' + data.info_line4 + '" /></li>';
		post += '<li><input type="text" id="info_line5" value="' + data.info_line5 + '" /></li>';
		post += '<li><input type="text" id="info_line6" value="' + data.info_line6 + '" /></li></ul>';
		post += '<h3>입실 불가능 아이</h3><ul><li><input type="text" id="info_line7" value="' + data.info_line7 + '" /></li>';
		post += '<li><input type="text" id="info_line8" value="' + data.info_line8 + '" /></li>';
		post += '<li><input type="text" id="info_line9" value="' + data.info_line9 + '" /></li>';
		post += '<li><input type="text" id="info_line10" value="' + data.info_line10 + '" /></li></ul>';
		post += '<h3>반려묘 공통사항, 예약과 입퇴실</h3><ul><li><input type="text" id="info_line11" value="' + data.info_line11 + '" /></li>';
		post += '<li><input type="text" id="info_line12" value="' + data.info_line12 + '" /></li>';
		post += '<li><input type="text" id="info_line13" value="' + data.info_line13 + '" /></li>';
		post += '<li><input type="text" id="info_line14" value="' + data.info_line14 + '" /></li></ul>';
		post += '<h3>입실 불가능 아이</h3><ul><li><input type="text" id="info_line15" value="' + data.info_line15 + '" /></li>';
		post += '<li><input type="text" id="info_line16" value="' + data.info_line16 + '" /></li><ul></div>';

		$('#info').html(post);
		
		// 수정완료 버튼 클릭시
		$('#info_edit_submit_button').on('click', function() {
			infoEditSubmitButton(data);
		});
	}
	
	// 로드한 데이터를 수정하는 폼으로 변환하기 위한 함수
	function displayForIntroEdit(data) {

			let post = '';
			// input 태그로 변환
			post += '<div id="intro_edit_button_div"><button id="intro_edit_submit_button">수정 완료</button></div>'
			post += '<div class="top-section"><div class="text-content"><h1>펫호텔 서비스를 소개합니다!</h1><p>';
			post += '<input type="text" id="intro_line1" value="' + data.intro_line1 + '" /><br /> ';
			post += '<input type="text" id="intro_line2" value="' + data.intro_line2 + '" /> <br />';
			post += '<input type="text" id="intro_line3" value="' + data.intro_line3 + '" /></p><p>반려 동물 호텔, <strong>펫호텔</strong> 서비스는 <br />';
			post += '<input type="text" id="intro_line4" value="' + data.intro_line4 + '" /><br />';
			post += '<input type="text" id="intro_line5" value="' + data.intro_line5 + '" /></p></div>';
			post += '<div class="middle-section"><h2>이용안내</h2><ul><li>'
			post += '<input type="text" id="intro_line6" value="' + data.intro_line6 + '" /></li><li>'
			post += '<input type="text" id="intro_line7" value="' + data.intro_line7 + '" /><br /><span class="small_text">'
			post += '<input type="text" id="intro_line8" value="' + data.intro_line8 + '" /></span></li><li>'
			post += '<input type="text" id="intro_line9" value="' + data.intro_line9 + '" /></li></div>'

			$('#intro').html(post);
			
			// 수정완료 버튼 클릭시
			$('#intro_edit_submit_button').on('click', function() {
				introEditSubmitButton(data);
			});
		}
	
	// intro 수정 완료 버튼 클릭시
	// object에 각 라인의 value값을 저장한다
	function introEditSubmitButton() {
		const pethotelIntroData = {
			intro_line1: document.getElementById('intro_line1').value,
			intro_line2: document.getElementById('intro_line2').value,
			intro_line3: document.getElementById('intro_line3').value,
			intro_line4: document.getElementById('intro_line4').value,
			intro_line5: document.getElementById('intro_line5').value,
			intro_line6: document.getElementById('intro_line6').value,
			intro_line7: document.getElementById('intro_line7').value,
			intro_line8: document.getElementById('intro_line8').value,
			intro_line9: document.getElementById('intro_line9').value			
		}
		
		$.ajax({
			url: `/admin/pethotel_admin_intro_dataForEdit`,
			method: "PUT",
			contentType: 'application/json',
			data: JSON.stringify(pethotelIntroData), // object를 전송하여 DB 수정 요청
			success: function() {
				alert('게시물이 성공적으로 수정되었습니다.');
				// 수정 후 화면을 다시 로드
				loadIntroData();
			},
			error: function(){
				// 서버에서 데이터를 불러오는 과정에서 발생한 오류를 콘솔에 출력하고,
				// 사용자에게 오류 메시지를 표시한다.
				alert('게시물 수정 중 오류가 발생했습니다.');
				console.error('Error: ',error)
			}
		});		
	}
	
	// info 수정 완료 버튼 클릭시
	// object에 각 라인의 value값을 저장한다
	function infoEditSubmitButton() {
		const pethotelIntroData = {
			info_line1: document.getElementById('info_line1').value,
			info_line2: document.getElementById('info_line2').value,
			info_line3: document.getElementById('info_line3').value,
			info_line4: document.getElementById('info_line4').value,
			info_line5: document.getElementById('info_line5').value,
			info_line6: document.getElementById('info_line6').value,
			info_line7: document.getElementById('info_line7').value,
			info_line8: document.getElementById('info_line8').value,
			info_line9: document.getElementById('info_line9').value,			
			info_line10: document.getElementById('info_line10').value,			
			info_line11: document.getElementById('info_line11').value,			
			info_line12: document.getElementById('info_line12').value,			
			info_line13: document.getElementById('info_line13').value,			
			info_line14: document.getElementById('info_line14').value,			
			info_line15: document.getElementById('info_line15').value,			
			info_line16: document.getElementById('info_line16').value,			
		}

		$.ajax({
			url: `/admin/pethotel_admin_info_dataForEdit`,
			method: "PUT",
			contentType: 'application/json',
			data: JSON.stringify(pethotelIntroData), // object를 전송하여 DB 수정 요청
			success: function() {
				alert('게시물이 성공적으로 수정되었습니다.');
				// 수정 후 화면을 다시 로드
				loadInfoData();
			},
			error: function(){
				// 서버에서 데이터를 불러오는 과정에서 발생한 오류를 콘솔에 출력하고,
				// 사용자에게 오류 메시지를 표시한다.
				alert('게시물 수정 중 오류가 발생했습니다.');
				console.error('Error: ',error)
			}
		});
	}




});