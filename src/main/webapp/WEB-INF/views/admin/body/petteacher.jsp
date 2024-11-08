<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>어드민 헬프펫프 펫티쳐</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/admin/petteacher.css" />
</head>
<body>
	<div class="title">
		<h3>펫티쳐 게시글 관리</h3>
	</div>

	<!-- 게시글 등록 -->
	<div id="petteacherRegister" class="tab-content">
		<!-- 필터링 영역 -->
		<div id="filters">
			<div class="filter-section-1" id="petteacher-filter">
				<div class="radio-group">
					<div class="filter-title">동물 종류</div>
					<label><input type="radio" name="pet-type-filter"
						value="전체" checked> 전체</label> <label><input type="radio"
						name="pet-type-filter" value="고양이"> 고양이</label> <label><input
						type="radio" name="pet-type-filter" value="강아지"> 강아지</label> <label><input
						type="radio" name="pet-type-filter" value="기타 동물"> 기타 동물</label>
				</div>
				<div class="radio-group" id="category-filter">
					<div class="filter-title" id="category">카테고리</div>
					<label><input type="radio" name="category-filter"
						value="전체" checked> 전체</label> <label><input type="radio"
						name="category-filter" value="훈련"> 훈련</label> <label><input
						type="radio" name="category-filter" value="건강"> 건강</label> <label><input
						type="radio" name="category-filter" value="습관"> 습관</label> <label><input
						type="radio" name="category-filter" value="관찰"> 관찰</label> <label><input
						type="radio" name="category-filter" value="케어"> 케어</label> <label><input
						type="radio" name="category-filter" value="생활"> 생활</label>
				</div>
			</div>

			<div class="array-section">
				<!-- 정렬 드롭다운 -->
				<select id="sort-order">
					<option value="최신순">최신순</option>
					<option value="사용액순">오래된순</option>
					<option value="조회수순">조회수순</option>
				</select>
				<!-- 신규등록 버튼 -->
				<button id="new-petteacher-btn" class="btn-style">신규등록</button>
			</div>
		</div>
		<!-- 리스트 영역 -->
		<div class="petteacher-list-container">
			<table class="petteacher-list">
				<thead class="thead">
					<tr>
						<th>번호</th>
						<th>카테고리</th>
						<th>제목</th>
						<th>채널명</th>
						<th>동물종류</th>
						<th>설명</th>
						<th>등록일</th>
						<th>조회수</th>
						<th>수정 / 삭제</th>
					</tr>
				</thead>
				<tbody id="petteacher-table-body">
					<!-- 전체 쿠폰 데이터 출력 -->
				</tbody>
			</table>
			<br />
			<br /> <br />
			<br />
			<div id="pagination">
				<!-- 페이징 -->
			</div>
		</div>
	</div>


	<!-- 게시글 등록 모달창 -->
	<div id="petteacherModal" class="modal" style="display: none;">
		<div class="modal-content">
			<span class="close-btn"><i class="fa-solid fa-xmark"></i></span>

			<!-- 정보 입력 -->
			<div class="input-group">
				<label for="hpt_title">제목</label> <input type="text" id="hpt_title">
			</div>

			<div class="input-group">
				<label for="hpt_exp">설명</label> <input type="text" id="hpt_exp">
			</div>

			<div class="input-group">
				<label for="hpt_yt_videoid">비디오 아이디</label> <input type="text"
					id="hpt_yt_videoid">
			</div>

			<div class="input-group">
				<label for="hpt_channal">채널명</label> <input type="text"
					id="hpt_channal">
			</div>
			<div class="input-group">
				<div class="hpt_pettype">
					<label for="hpt_pettype">동물종류</label>
					<!-- 폰트, css조정 -->
					<select id="hpt_pettype" name="hpt_pettype">
						<option disabled selected>동물종류</option>
						<option value="고양이">고양이</option>
						<option value="강아지">강아지</option>
						<option value="기타 동물">기타 동물</option>
					</select>
				</div>
			</div>
			<div class="input-group">
				<div class="hpt_category">
					<label for="hpt_category">카테고리</label>
					<!-- 폰트, css조정 -->
					<select id="hpt_category" name="hpt_category">
						<option disabled selected>카테고리</option>
						<option value="훈련">훈련</option>
						<option value="건강">건강</option>
						<option value="습관">습관</option>
						<option value="관찰">관찰</option>
						<option value="케어">케어</option>
						<option value="생활">생활</option>
					</select>
				</div>
			</div>

			<!-- 발급 시작일, 종료일, 만료 예정일 입력 -->
			<div id="periodSelect">
				<div class="input-group">
					<label for="hpt_content">내용</label> <br />
					<textarea id="hpt_content" name="hpt_content" cols="30" rows="10"></textarea>
				</div>
			</div>

			<button id="registerPetteacherBtn">등록완료</button>
		</div>
	</div>

	<script src="/static/js/admin/petteacher.js"></script>

</body>
</html>