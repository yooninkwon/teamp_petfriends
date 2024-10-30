<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫호텔</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/helppetf/pethotel_reserve.css">
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<jsp:include page="/WEB-INF/views/include_jsp/helppetf_sub_navbar.jsp" />
	<script>
		$(document).ready(
				function() {
					document.getElementById('${main_navbar_id }').classList
							.add('selected');
					document.getElementById('${sub_navbar_id }').classList
							.add('selected');
				});
	</script>
	<div class="container" class="tab" id="c-ontainer">
		<!-- 상단 버튼 -->
		<div class="top-buttons">
			<button class="back-button">돌아가기</button>
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
				<form action="#" id="start-end-date">
					<!-- @@@ 이 곳에 input type hidden으로 필요한 유저 정보들 담아 받아오기 -->
					<!-- 유저정보도 같이 넘기는 것에 DTO 사용 고려해 볼 것 -->
					<!-- 날짜 최소 최대 설정하기 (스크립트) -->
					<input name="start-date" type="date" id="start-date"
						class="date-input"> 부터 <input name="end-date" type="date"
						id="end-date" class="date-input"> 까지
					<!-- 날짜제한 메모: <input type="" min=""/> <!-- 장기 투숙일 수도 있으니 끝나는날짜는 제한 x -->
				</form>
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
		<div class="popup-form" id="popup-form" style="display: none;">
			<h2>아이 등록하기</h2>
			<button class="close-add-pet-button">닫기</button>
			<form id="pet-form">
				<input name="pet-form-no" type="hidden" id="pet-form-no" value="0" />
				<p id="select_already">펫프렌즈에 등록해 두신 아이가 있으신가요?</p>
				<button class="select-pet-button">아이 선택하기</button>

				<label for="pet-name">이름</label> <input type="text" name="pet-name"
					id="pet-name" placeholder="이름 입력" class="text_input"> <label>종</label>
				<input type="radio" id="pet-type" name="pet-type" value="고양이"
					class="radio_button"> 고양이 <input type="radio" id="pet-type"
					name="pet-type" value="강아지" class="radio_button"> 강아지 <label
					for="birth-date">생일</label> <input name="pet-birth-date"
					type="date" id="pet-birth-date"> <label>성별</label> <input
					type="radio" id="pet-gender" name="pet-gender" value="M"
					class="radio_button"> M <input type="radio" id="pet-gender"
					name="pet-gender" value="F" class="radio_button"> F <label
					for="weight">체중</label> <input name="pet-weight" type="number"
					id="pet-weight" placeholder="Kg"> <label>중성화</label> <input
					type="radio" id="pet-neutered" name="pet-neutered" value="Y"
					class="radio_button"> Y <input type="radio"
					id="pet-neutered" name="pet-neutered" value="N"
					class="radio_button"> N <label for="message">전달 사항</label>
				<textarea name="pet-message" id="pet-message"
					placeholder="그 외 전달해주실 사항을 적어주세요. 먹는 약, 알레르기, 좋아하는 것, 싫어하는 것 등 많을 수록 좋아요!"></textarea>
				<button type="button" id="save-pet">저장</button>
			</form>
		</div>
	</div>
	<div id="reserve-done" style="display: none;" class="tab">
		
	</div>
	<script src="/static/js/helppetf/pethotel_reserve.js"></script>
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>
