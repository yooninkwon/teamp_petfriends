<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫프렌즈</title>

<!-- 헤더푸터 css,sc -->
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />

<!-- 상품카테고리+필터메뉴바 css,sc -->
<link rel="stylesheet" href="/static/css/ProductList.css" />
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="/static/js/ProductList.js"></script>

</head>

<body>

	<!-- 헤더 -->
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

	<!-- 펫 및 상품타입 -->
	<div class="category">
		<button type="button" class="filter1" id="강아지">강아지</button>
		<button type="button" class="filter1" id="고양이">고양이</button>
		<span class="separator">|</span>
		<button type="button" class="filter2" id="사료">사료</button>
		<button type="button" class="filter2" id="간식">간식</button>
		<button type="button" class="filter2" id="용품">용품</button>
	</div>

	<!-- 상품타입별 카테고리 -->
	<div class="category2" id="category2">
		<!-- 세부버튼 여기에 추가됨 -->
	</div>

	<!-- 필터기능 초기화부분 -->
	<div class="reset">
		<img src="/static/Images/ProductImg/ProImg/filterimg.png" alt="" /> <span>필터로
			내새꾸 선물 찾기</span>
		<button type="button" class="resetbtn" id="resetbtn">초기화◁</button>
	</div>

	<form id="filterform" method="get" action="/product/productlist.jsp">
		<div id="filteroption">
		
		
			<div class="filter-category" id="dogoption1-filter">
				<button type="button" class="filter-button">주원료</button>
				<div class="filter-options">
					<label><input type="checkbox" name="강주원료" value="닭">닭</label>
					<label><input type="checkbox" name="강주원료" value="돼지">돼지</label>
					<label><input type="checkbox" name="강주원료" value="소">소</label>
				</div>
			</div>
			
			<div class="filter-category" id="dogoption2-filter">
				<button type="button" class="filter-button">기능</button>
				<div class="filter-options">
					<label><input type="checkbox" name="강기능" value="면역력">면역력</label>
					<label><input type="checkbox" name="강기능" value="뼈관절">뼈관절</label>
					<label><input type="checkbox" name="강기능" value="피부/피모">피부/피모</label>
				</div>
			</div>
			
			<div class="filter-category" id="dogitem-filter">
				<button type="button" class="filter-button">타입</button>
				<div class="filter-options">
					<label><input type="checkbox" name="강아이템" value="패드">패드</label>
					<label><input type="checkbox" name="강아이템" value="배변판">배변판</label>
				</div>
			</div>
			
			<div class="filter-category" id="dogsound-filter">
				<button type="button" class="filter-button">소리</button>
				<div class="filter-options">
					<label><input type="checkbox" name="강소리" value="삑삑이">삑삑이</label>
					<label><input type="checkbox" name="강소리" value="바스락">바스락</label>
					<label><input type="checkbox" name="강소리" value="기타">기타</label>
				</div>
			</div>
			
			<div class="filter-category" id="catoption1-filter">
				<button type="button" class="filter-button">주원료</button>
				<div class="filter-options">
					<label><input type="checkbox" name="고주원료" value="닭">닭</label>
					<label><input type="checkbox" name="고주원료" value="돼지">돼지</label>
					<label><input type="checkbox" name="고주원료" value="연어">연어</label>
				</div>
			</div>
			
			<div class="filter-category" id="catoption2-filter">
				<button type="button" class="filter-button">기능</button>
				<div class="filter-options">
					<label><input type="checkbox" name="고기능" value="체중조절">체중조절</label>
					<label><input type="checkbox" name="고기능" value="면역력">면역력</label>
					<label><input type="checkbox" name="고기능" value="피부/피모">피부/피모</label>
				</div>
			</div>
			
			<div class="filter-category" id="cattoy-filter">
				<button type="button" class="filter-button">타입</button>
				<div class="filter-options">
					<label><input type="checkbox" name="고장난감" value="스틱형">스틱형</label>
					<label><input type="checkbox" name="고장난감" value="낚시줄형">낚시줄형</label>
					<label><input type="checkbox" name="고장난감" value="와이어형">와이어형</label>
				</div>
			</div>
			
			<div class="filter-category" id="catbox-filter">
				<button type="button" class="filter-button">타입</button>
				<div class="filter-options">
					<label><input type="checkbox" name="고박스" value="평판형">평판형</label>
					<label><input type="checkbox" name="고박스" value="원형">원형</label>
					<label><input type="checkbox" name="고박스" value="수직형">수직형</label>
				</div>
			</div>
			
			<div class="filter-category" id="price-filter">
				<button type="button" class="filter-button">가격</button>
				<div class="filter-options">
					<label><input type="checkbox" name="가격" value="1만원미만">1만원미만</label>
					<label><input type="checkbox" name="가격" value="1~2만원">1~2만원</label>
					<label><input type="checkbox" name="가격" value="2~3만원">2~3만원</label>
					<label><input type="checkbox" name="가격" value="3만원이상">3만원이상</label>
				</div>
			</div>

			<div class="filter-category" id="ranking-filter">
				<button type="button" class="filter-button">펫프랭킹순</button>
				<div class="filter-options">
					<label><input type="radio" name="펫프랭킹" value="최신순">최신순</label>
					<label><input type="radio" name="펫프랭킹" value="리뷰많은순">리뷰많은순</label>
					<label><input type="radio" name="펫프랭킹" value="낮은가격순">낮은가격순</label>
					<label><input type="radio" name="펫프랭킹" value="높은가격순">높은가격순</label>
				</div>
			</div>
			
			
		</div>
	</form>


	<!-- 푸터 -->
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>