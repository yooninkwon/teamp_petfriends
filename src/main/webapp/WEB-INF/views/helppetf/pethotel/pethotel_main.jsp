<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫호텔</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<script src="https://kit.fontawesome.com/6c32a5aaaa.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="/static/css/helppetf/pethotel_main.css" />
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<jsp:include page="/WEB-INF/views/include_jsp/helppetf_sub_navbar.jsp" />
	<script>
		let mem_login = `${sessionScope.loginUser.mem_nick }`;
		let main_navbar_id = `${main_navbar_id }`;
		let sub_navbar_id = `${sub_navbar_id }`;
	</script>
	
	<!-- 펫호텔 메인 페이지 -->
	<div id="information" class="on">
		<div class="container">
			<div class="top-section">
				<div id="text_content" class="text-content">
					<!-- 펫호텔 서비스를 소개합니다! -->
				</div>
				<img src="/static/images/helppetf/pethotel/pet_hotel.png" alt="펫호텔 로고" class="pethotel_img">
			</div>
	
			<div id="middle_section" class="middle-section">
				<!-- 간략한 이용안내 -->

			</div>
			<div class="more_info">
				<a class="show-more-info" href="#">자세히보기 &gt;</a>
			</div>
	
			<div class="bottom-section">
				<a href="#" class="button" id="left" onclick="return false;">펫캠 보기</a> 
				<a href="#" class="button" id="right">예약하러 가기</a>
			</div>
		</div>
	</div>
	<!-- 펫호텔 이용안내 페이지 -->
	<div id="introduction" class="off">
 	   <div class="container">
	        <!-- 상단 섹션 -->
	        <div class="top-section">
	        	<div class="back_link">
	            	<a href="#" class="back-link">&lt; 돌아가기</a>
	            </div>
	            <h1>펫호텔 서비스를 소개합니다!</h1>
	        </div>
	
	        <!-- 이용 안내 섹션 -->
	        <div id="content_section" class="content-section">
				<!-- 이용안내 정보 -->
				<!-- 공통 사항 -->
				<!-- 반려견 공통사항, 예약과 입퇴실 -->
				<!-- 반려묘 공통사항, 예약과 입퇴실 -->
	        </div>
	
	        <!-- 하단 버튼 -->
	        <div class="bottom-section">
	            <a href="#" id="right-2" class="button">예약하러 가기</a>
	        </div>
	    	<div class="back_link">
	          	<a href="#" class="back-link">&lt; 돌아가기</a>
	        </div>
	    </div>
	</div>
	
	<!-- 펫호텔 예약 페이지 -->
	<div id="pethotel_reserve" class="off">
		<div class="container" id="c-ontainer">
			<!-- 상단 버튼 -->
			<div class="top-buttons">
				<button class="back-link-reserve">돌아가기</button>
				<button class="register-button">예약 등록</button>
			</div>
	
			<!-- 예약 안내 및 기간 선택 -->
			<h1>펫호텔 예약 등록 하기</h1>
			<div class="reservation-form">
				<p>
					<strong>${sessionScope.loginUser.mem_name }</strong>님, 안녕하세요.
				</p>
				<label for="start-date">예약 기간</label>
				<div class="date-selection">
					<div id="start-end-date">
						<input name="start-date" type="date" id="start-date" class="date-input"  max="9999-12-31" required> 부터 &nbsp;
						<input name="end-date" type="date" id="end-date" class="date-input" max="9999-12-31" required> 까지
					</div>
				</div>
	
				<!-- 등록된 동물 표시 및 추가 버튼 -->
				<div class="pet-section">
	
					<div class="pet-wrapper">
						<!-- 동물 등록 -->
						<button class="add-pet-button">+</button>
					</div>
				</div>
			</div>
	
			<!-- 팝업으로 나오는 form -->
			<div id="popup-form" class="off">
				<h2>아이 등록하기</h2>
				<button class="close-add-pet-button">닫기</button>
				<form action="#" id="pet-form">
					<input name="pet-form-no" type="hidden" id="pet-form-no" value="0" required />
					<p id="select_already">펫프렌즈에 등록해 두신 아이가 있으신가요?</p>
					<button id="select-pet-button">아이 선택하기</button> <br />
	
					<span>이름</span>
					<input type="text" name="pet-name" id="pet-name" placeholder="이름 입력" class="text_input" required> 
					<br />
					<span>동물 종류</span>
					<input type="radio" id="pet-type1" name="pet-type" value="고양이" class="radio_button" required> 
					<label for="pet-type1">고양이</label>
					<input type="radio" id="pet-type2" name="pet-type" value="강아지" class="radio_button" required>
					<label for="pet-type2">강아지</label>
					<br />
					<span>생일</span>
					<input name="pet-birth" type="date" id="pet-birth" max="9999-12-31"> 
					<br />
					<span>성별</span> 
					<input type="radio" id="pet-gender1" name="pet-gender" value="M" class="radio_button"> 
					<label for="pet-gender1">M </label>
					<input type="radio" id="pet-gender2" name="pet-gender" value="F" class="radio_button">
					<label for="pet-gender2">F </label> 
					<br />
					<span>체중</span>
					<input name="pet-weight" type="text" id="pet-weight" placeholder="Kg"> 
					<br />
					<span>중성화</span> 
					<input type="radio" id="pet-neutered1" name="pet-neutered" value="Y" class="radio_button"> 
					<label for="pet-neutered1">Y </label> 
					<input type="radio" id="pet-neutered2" name="pet-neutered" value="N" class="radio_button"> 
					<label for="pet-neutered2">N </label> 
					<br />
					<br />
					<span>전달 사항</span> <br />
					<textarea name="pet-message" id="pet-message"
						placeholder="그 외 전달해주실 사항을 적어주세요. 먹는 약, 알레르기, 좋아하는 것, 싫어하는 것 등 많을 수록 좋아요!"></textarea>
					<button type="button" id="save-pet">저장</button>
				</form>
			</div>
		</div>
	</div>
	
	<!-- 펫호텔 예약 완료 페이지 -->
	<div id="pethotel_reserve_done" class="off">
		<!-- 예약 완료 정보 테이블 -->
		
	</div>
	
	<!-- 등록된 반려동물 선택 모달창 -->
	<div id="select-pet-modal" class="off">
		<div class="modal-content">
			<span class="modal-close-btn"><i class="fa-solid fa-xmark"></i></span>
			<table>
				<thead>
					<tr>
						<th class="modal-img">사진</th>
						<th class="modal-name">이름</th>
						<th class="modal-type">동물종류</th>
						<th class="modal-birth">생일</th>
						<th class="modal-gender">성별</th>
						<th class="modal-weight">체중</th>
						<th class="modal-neut">중성화</th>
					</tr>
				</thead>
				<tbody id="selectPetsTbody">
					<!-- 등록된 반려동물 리스트 -->
				</tbody>
			</table>
		</div>
	</div>
	
	<div id="pet-cam-div" class="off">
		
		<div id="pet-cam-view">
		</div>
	</div>
	
	<!-- 로그인이 필요합니다 팝업 -->
	<div id="loginPopup" class="off">
		<div class="popup-content-login">
			<p>로그인이 필요해요</p>
			<button id="loginBtn" class="popup-btn">로그인 하러가기</button>
			<button id="closeBtn" class="popup-btn">닫기</button>
		</div>
	</div>
	<script src="/static/js/helppetf/pethotel_main.js"></script>
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>