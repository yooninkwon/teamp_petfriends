/**
 * 
 */

$(document).ready(function() {

	//탭 전환 기능
	document.querySelectorAll('.tab-btn').forEach(function(tabBtn) {
		tabBtn.addEventListener('click', function() {
			// 모든 탭에서 'active' 클래스를 제거
			document.querySelectorAll('.tab-btn').forEach(function(btn) {
				btn.classList.remove('active');
			});

			// 클릭한 탭에 'active' 클래스 추가
			this.classList.add('active');

			// 모든 콘텐츠 숨김
			document.querySelectorAll('.tab-content').forEach(function(content) {
				content.style.display = 'none';
			});

			// 클릭한 탭에 해당하는 콘텐츠만 표시
			const tabId = this.getAttribute('data-tab');
			document.getElementById(tabId).style.display = 'block';
		});
	});

	// 페이지 로드 시 기본적으로 첫 탭의 데이터를 불러오기
	loadIntroData();

	// 탭 전환 시 데이터 로드
	$('button[data-tab="intro"]').on('click', function() {
		loadIntroData();
	});

	// 탭 전환 시 데이터 로드
	$('button[data-tab="info"]').on('click', function() {
		loadInfoData();
	});

	// Intro 탭 데이터 로드 함수
	function loadIntroData() {

		fetchData();

		function fetchData() {
			$.ajax({
				url: '/admin/pethotel_intro_data',
				method: 'GET',
				dataType: 'json',
				success: function(data) {
					displayItems(data);
				},
				error: function(xhr, status, error) {
					console.error('Error fetching data:', error);
				}
			});
		}

		function displayItems(data) {
			let post = '';

			//intro
			post += '<div id="intro_edit_button_div"><button id="intro_edit_button">내용 수정하기</button></div>'
			post += '<div class="top-section"><div class="text-content"><h1>펫호텔 서비스를 소개합니다!</h1>';
			post += '<p>' + data.intro_line1 + '<br />' + data.intro_line2 + '<br />' + data.intro_line3 + '</p>';
			post += '<p>반려 동물 호텔, <strong>펫호텔</strong> 서비스는 <br />';
			post += data.intro_line4 + '<br />';
			post += data.intro_line5 + '</p></div>';
			//info
			post += '<div class="middle-section"><h2>이용안내</h2>'
			post += '<ul><li>' + data.intro_line6 + '</li>'
			post += '<li>' + data.intro_line7 + '<br />'
			post += '<span class="small_text">' + data.intro_line8 + '</span></li>'
			post += '<li>' + data.intro_line9 + '</li></div>'

			$('#intro').html(post);
			// intro edit 버튼 이벤트리스너
			$('#intro_edit_button').on('click', function() {
				introEditButton(data);
			});
		}

	}

	function loadInfoData() {

		fetchData();

		function fetchData() {
			$.ajax({
				url: '/admin/pethotel_info_data',
				method: 'GET',
				dataType: 'json',
				success: function(data) {
					displayItems(data);
				},
				error: function(xhr, status, error) {
					console.error('Error fetching data:', error);
				}
			});
		}

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
			// info edit 버튼 이벤트리스너
			$('#info_edit_button').on('click', function() {
				infoEditButton(data);
			});

		}

	}
	
	// 수정버튼 클릭시 - Intro
	function introEditButton(data) {
		displayForIntroEdit(data);
	}

	function displayForIntroEdit(data) {

		let post = '';
		// input 태그로 변환
		//intro
		post += '<div id="intro_edit_button_div"><button id="intro_edit_submit_button">수정 완료</button></div>'
		post += '<div class="top-section"><div class="text-content"><h1>펫호텔 서비스를 소개합니다!</h1><p>';
		post += '<input type="text" id="intro_line1" value="' + data.intro_line1 + '" /><br /> ';
		post += '<input type="text" id="intro_line2" value="' + data.intro_line2 + '" /> <br />';
		post += '<input type="text" id="intro_line3" value="' + data.intro_line3 + '" /></p><p>반려 동물 호텔, <strong>펫호텔</strong> 서비스는 <br />';
		post += '<input type="text" id="intro_line4" value="' + data.intro_line4 + '" /><br />';
		post += '<input type="text" id="intro_line5" value="' + data.intro_line5 + '" /></p></div>';
		//info
		post += '<div class="middle-section"><h2>이용안내</h2><ul><li>'
		post += '<input type="text" id="intro_line6" value="' + data.intro_line6 + '" /></li><li>'
		post += '<input type="text" id="intro_line7" value="' + data.intro_line7 + '" /><br /><span class="small_text">'
		post += '<input type="text" id="intro_line8" value="' + data.intro_line8 + '" /></span></li><li>'
		post += '<input type="text" id="intro_line9" value="' + data.intro_line9 + '" /></li></div>'

		$('#intro').html(post);
		
		// 수정완료 버튼 이벤트리스너
		$('#intro_edit_submit_button').on('click', function() {
			introEditSubmitButton(data);
		});
	}

	// 수정버튼 클릭시 - Info
	function infoEditButton(data) {
		infoEditButton(data);
	}
	
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
		
		// 수정완료 버튼 이벤트리스너
		$('#info_edit_submit_button').on('click', function() {
			infoEditSubmitButton(data);
		});
	}
	
	// intro 수정 완료 버튼 클릭시
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
			data: JSON.stringify(pethotelIntroData),
			success: function() {
				alert('게시물이 성공적으로 수정되었습니다.');
				loadIntroData();
			},
			error: function(){
				alert('게시물 수정 중 오류가 발생했습니다.');
				console.error('Error: ',error)
			}
		});		
	}
	
	// info 수정 완료 버튼 클릭시
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
			data: JSON.stringify(pethotelIntroData),
			success: function() {
				alert('게시물이 성공적으로 수정되었습니다.');
				loadInfoData();
			},
			error: function(){
				alert('게시물 수정 중 오류가 발생했습니다.');
				console.error('Error: ',error)
			}
		});
	}




});