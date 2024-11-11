<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>admin_body</title>
<link rel="stylesheet" href="/static/css/admin/customer.css" />
</head>
<body>
	<div class="title">
		<h3>내새꾸 정보 조회</h3>
	</div>

	<div id="mypet">
		<div class="search-group" style="float: left;">
			<div class="filter-title">회원정보</div>
			<select name="" id="memberSk" style="margin-left: 5px;">
				<option value="이름" >이름</option>
				<option value="닉네임">닉네임</option>
				<option value="전화번호">전화번호</option>
			</select> <input type="search" name="memberSearch" id="memberSearch" />
		</div>
		<div class="search-group" style="float: right;">
			<div class="filter-title">펫 정보</div>
			<select name="" id="sk" style="margin-left: 5px;">
				<option value="이름">이름</option>
				<option value="관심정보">관심정보</option>
				<option value="알러지">알러지</option>
			</select> <input type="search" name="titleSearch" id="titleSearch" />
		</div>
		<div class="search-group" style="float: left;">
			<div class="filter-title">몸무게</div>
			<select name="" id="petWeight" style="margin-left: 5px;">
				<option value="전체">전체</option>
				<option value="0kg 이상 ~ 1kg 미만">0kg 이상 ~ 1kg 미만</option>
				<option value="1kg 이상 ~ 2kg 미만">1kg 이상 ~ 2kg 미만</option>
				<option value="2kg 이상 ~ 3kg 미만">2kg 이상 ~ 3kg 미만</option>
				<option value="3kg 이상 ~ 4kg 미만">3kg 이상 ~ 4kg 미만</option>
				<option value="4kg 이상 ~ 5kg 미만">4kg 이상 ~ 5kg 미만</option>
				<option value="5kg 이상 ~ 7kg 미만">5kg 이상 ~ 7kg 미만</option>
				<option value="7kg 이상 ~ 9kg 미만">7kg 이상 ~ 9kg 미만</option>
				<option value="9kg 이상 ~ 11kg 미만">9kg 이상 ~ 11kg 미만</option>
				<option value="11kg 이상 ~ 14kg 미만">11kg 이상 ~ 14kg 미만</option>
				<option value="14kg 이상 ~ 17kg 미만">14kg 이상 ~ 17kg 미만</option>
				<option value="17kg 이상 ~ 20kg 미만">17kg 이상 ~ 20kg 미만</option>
				<option value="20kg 이상 ~ 24kg 미만">20kg 이상 ~ 24kg 미만</option>
				<option value="24kg 이상 ~ 28kg 미만">24kg 이상 ~ 28kg 미만</option>
				<option value="28kg 이상 ~ 32kg 미만">28kg 이상 ~ 32kg 미만</option>
				<option value="32kg 이상 ~ 37kg 미만">32kg 이상 ~ 37kg 미만</option>
				<option value="37kg 이상 ~ 42kg 미만">37kg 이상 ~ 42kg 미만</option>
				<option value="42kg 이상 ~ 47kg 미만">42kg 이상 ~ 47kg 미만</option>
				<option value="47kg 이상 ~ 52kg 미만">47kg 이상 ~ 52kg 미만</option>
				<option value="52kg 이상">52kg 이상</option>
			</select>
		</div>
		<div class="search-group" style="float: right;">
			<div class="filter-title">펫 타입</div>
			<input type="radio" name="type" value="전체" checked />전체
			<input type="radio" name="type" value="강아지" />강아지 
			<input type="radio" name="type" value="고양이" />고양이
		</div>
		<div class="search-group" style="float: left;">
			<div class="filter-title">생일</div>
			<input type="date" name="birth" id="birth" />
		</div>
		<div class="search-group" style="float: right;">
			<div class="filter-title">대표 펫</div>
			<input type="radio" name="main" value="전체" checked />전체 <input
				type="radio" name="main" value="Y" />대표 펫
		</div>
		<div class="search-group" style="float: right;">
			<div class="filter-title">견종/묘종</div>
			<input type="search" id="detailType" onclick="openPopup()" readonly />
			<input type="button" id="resetBtn" class="btn-style" value="초기화" />
		</div>
		<div class="search-group" style="float: left;">
			<div class="filter-title">펫 성별</div>
			<input type="radio" name="gender" value="전체" checked />전체
			<input type="radio" name="gender" value="M" />남아 
			<input type="radio" name="gender" value="F" />여아
		</div>

		<div class="search-group" style="width: 100%; height: 50px;">
			<button id="searchBtn">검색</button>
		</div>
		<div class="array-section">
			<button id="deleteImg" class="btn-style">이미지 삭제</button>
		</div>
		<!-- 공지사항 리스트 테이블 -->
		<table class="pet-list">
			<thead class="thead">
				<tr>
					<th style="width: 2%;"><input type="checkbox" name="selectAll"
						class="selectAll" /></th>
					<th style="width: 3%;">대분류</th>
					<th style="width: 5%;">회원 닉네임</th>
					<th style="width: 5%;">대표이미지</th>
					<th style="width: 5%;">이름</th>
					<th style="width: 10%;">견종/묘종</th>
					<th style="width: 7%;">생일</th>
					<th style="width: 10%;">몸무게</th>
					<th style="width: 4%;">성별</th>
					<th style="width: 4%;">중성화</th>
					<th style="width: 5%;">체형</th>
					<th style="width: 15%;">관심 정보</th>
					<th style="width: 10%;">알러지</th>
					<th style="width: 5%;">대표 여부</th>
				</tr>
			</thead>
		</table>
	</div>

	<div id="pagination">
		<!-- 페이징 -->
	</div>

	<div id="popupBackground" style="display: none;"></div>
	<div id="popup" style="display: none;">
		<span class="close-btn" onclick="closePopup()">×</span>
		<!-- 검색창 추가 -->
		<input type="text" id="searchBreed" placeholder="견종/묘종을 입력하세요."
			onkeyup="filterBreeds()">

		<ul class="breed-list" id="breedList">
			<li>세상에 하나뿐인 믹스</li>
			<li>고든 세터</li>
			<li>골든 두들</li>
			<li>골든 리트리버</li>
			<li>그레이 하운드</li>
			<li>그레이트 데인</li>
			<li>그레이트 스위스 마운틴 도그</li>
			<li>그레이트 피레니즈</li>
			<li>그린란드 독</li>
			<li>그리폰 브뤼셀</li>
			<li>기슈견</li>
			<li>나폴리탄 마스티프</li>
			<li>노르웨이언 엘크 하운드</li>
			<li>노리치 테리어</li>
			<li>노바 스코샤 덕 톨링 리트리버</li>
			<li>뉴펀들랜드</li>
			<li>닥스훈트</li>
			<li>달마시안</li>
			<li>댄디 딘몬트 테리어</li>
			<li>도베르만 핀셔</li>
			<li>도사견</li>
			<li>동경이</li>
			<li>라사압소</li>
			<li>라브라도 리트리버</li>
			<li>라이카</li>
			<li>래트 테리어</li>
			<li>레온베르거</li>
			<li>말라뮤트</li>
			<li>말티즈</li>
			<li>맨체스터 테리어</li>
			<li>미니어처 슈나우저</li>
			<li>미니어처 핀셔</li>
			<li>바센지</li>
			<li>바셋 하운드</li>
			<li>버니즈 마운틴 도그</li>
			<li>베들링턴 테리어</li>
			<li>벨기에 마리노이즈</li>
			<li>벨기에 셰퍼드 독</li>
			<li>벨지안 그리펀</li>
			<li>보더 콜리</li>
			<li>보르조이</li>
			<li>보스롱</li>
			<li>복서</li>
			<li>볼로네즈</li>
			<li>불 테리어</li>
			<li>불도그</li>
			<li>브뤼셀 그리펀</li>
			<li>브리아드</li>
			<li>블랙 래브라도</li>
			<li>비글</li>
			<li>비숑 프리제</li>
			<li>비어디드 콜리</li>
			<li>빠삐용</li>
			<li>사모예드</li>
			<li>삽살개</li>
			<li>샤페이</li>
			<li>세인트 버나드</li>
			<li>셔틀랜드 쉽독</li>
			<li>슈나우저</li>
			<li>시바견</li>
			<li>시베리안 허스키</li>
			<li>시츄</li>
			<li>아나톨리안 셰퍼드</li>
			<li>아메리칸 불리</li>
			<li>아메리칸 불도그</li>
			<li>아메리칸 스태퍼드셔 테리어</li>
			<li>아메리칸 에스키모</li>
			<li>아이리쉬 세터</li>
			<li>아이리쉬 울프하운드</li>
			<li>아키타</li>
			<li>알래스칸 말라뮤트</li>
			<li>에어데일 테리어</li>
			<li>오스트레일리안 셰퍼드</li>
			<li>오스트레일리안 캐틀 독</li>
			<li>올드 잉글리쉬 불독</li>
			<li>올드 잉글리쉬 시프도그</li>
			<li>와이마라너</li>
			<li>웰시 코기</li>
			<li>요크셔 테리어</li>
			<li>웨스트 하일랜드 화이트 테리어</li>
			<li>울프독</li>
			<li>잉글리쉬 세터</li>
			<li>잉글리쉬 불독</li>
			<li>잭 러셀 테리어</li>
			<li>진돗개</li>
			<li>차우차우</li>
			<li>치와와</li>
			<li>카발리에 킹 찰스 스패니얼</li>
			<li>카네 코르소</li>
			<li>캐벌리어 킹 찰스 스패니얼</li>
			<li>캐틀 도그</li>
			<li>케언 테리어</li>
			<li>케리 블루 테리어</li>
			<li>코커 스패니얼</li>
			<li>콜리</li>
			<li>쿠바견</li>
			<li>크랩스핑어허스키</li>
			<li>클럼버 스패니얼</li>
			<li>티베탄 마스티프</li>
			<li>파라오 하운드</li>
			<li>파푸아견</li>
			<li>퍼그</li>
			<li>펨브로크 웰시 코기</li>
			<li>포인터</li>
			<li>포메라니안</li>
			<li>푸들</li>
			<li>프렌치 불도그</li>
			<li>플랫코티드 리트리버</li>
			<li>피레니언 마스티프</li>
			<li>세상에 하나뿐인 믹스</li>
			<li>노르웨이 숲</li>
			<li>데본 렉스</li>
			<li>라가머핀</li>
			<li>라그돌</li>
			<li>러시안 블루</li>
			<li>먼치킨</li>
			<li>메인쿤</li>
			<li>버만</li>
			<li>벵갈</li>
			<li>봄베이</li>
			<li>브리티쉬 숏헤어</li>
			<li>샤르트뢰</li>
			<li>세이셸루아</li>
			<li>셀커크 렉스</li>
			<li>소말리</li>
			<li>스코티시 폴드</li>
			<li>스핑크스</li>
			<li>시베리안</li>
			<li>시암</li>
			<li>싱가퓨라</li>
			<li>아메리칸 쇼트헤어</li>
			<li>아비시니안</li>
			<li>오리엔탈 숏헤어</li>
			<li>이집션 마우</li>
			<li>재패니즈 밥테일</li>
			<li>카니시안 밥테일</li>
			<li>코니시 렉스</li>
			<li>코랏</li>
			<li>킴릭</li>
			<li>페르시안</li>
			<li>픽시밥</li>
			<li>하바나 브라운</li>
			<li>히말라얀</li>
		</ul>
	</div>

	<script>
		//팝업 열기
		function openPopup() {
			document.getElementById('popupBackground').style.display = 'block';
			document.getElementById('popup').style.display = 'block';
		}
		// 팝업 닫기
		function closePopup() {
			document.getElementById('popupBackground').style.display = 'none';
			document.getElementById('popup').style.display = 'none';
		}
		// 견종 선택 시 값 넣기
		document.querySelectorAll('.breed-list li').forEach(function(item) {
			item.addEventListener('click', function() {
				document.getElementById('detailType').value = this.innerText;
				closePopup(); // 선택 후 팝업 닫기
			});
		});
		// 검색 필터 기능
		function filterBreeds() {
			const searchInput = document.getElementById('searchBreed').value
					.toLowerCase();
			const breeds = document.querySelectorAll('.breed-list li');
			breeds.forEach(function(breed) {
				const breedText = breed.textContent.toLowerCase();
				if (breedText.indexOf(searchInput) > -1) {
					breed.style.display = "";
				} else {
					breed.style.display = "none";
				}
			});
		}
	</script>
	<script src="/static/js/admin/pet-info.js"></script>
	
	
</body>
</html>