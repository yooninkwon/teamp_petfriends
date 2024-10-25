<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>어드민 헬프펫프 펫티쳐</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/admin/petteacher.css" />
</head>
<body>
<!--  -->


<div class="title"><h3>펫티쳐 게시글 관리</h3></div>

<!-- 게시글 등록 -->
<div id="couponRegister" class="tab-content">
	<!-- 필터링 영역 -->
	<div class="filter-section-1" id="status-filter">
	    <div class="radio-group">
	        <div class="filter-title">동물 종류</div>
	        <label><input type="radio" name="pet-type-filter" value="all" checked> all</label>
	        <label><input type="radio" name="pet-type-filter" value="cat"> 고양이</label>
	        <label><input type="radio" name="pet-type-filter" value="dog"> 강아지</label>
	        <label><input type="radio" name="pet-type-filter" value="etc"> 기타 동물</label>
	    </div>
	    <div class="radio-group" id="category-filter">
	        <div class="filter-title">카테고리</div>
			<select name="category-filter" id="category">
				<option value="0">all</option>
				<option value="1">훈련</option>
				<option value="2">건강</option>
				<option value="3">습관</option>
				<option value="4">관찰</option>
				<option value="5">케어</option>
				<option value="6">생활</option>
			</select>
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
	    <button id="new-coupon-btn" class="btn-style">신규등록</button>
	</div>
	
	<!-- 리스트 영역 -->
	<div class="coupon-list-container">
		<table class="coupon-list">
		    <thead class="thead">
		        <tr>
		            <th>번호</th>
		            <th>카테고리</th>
					<th>제목</th>
					<th>설명</th>
		            <th>등록일</th>
		            <th>조회수</th>
		            <th>수정 / 삭제</th>
		        </tr>
		    </thead>
		    <tbody id="coupon-table-body">
		        <!-- 전체 쿠폰 데이터 출력 -->
		    </tbody>
		</table>
		
		<div id="pagination">
			<!-- 페이징 -->
		</div>
	</div>
</div>


<!-- 쿠폰 등록 모달창 -->
<div id="couponModal" class="modal" style="display: none;">
    <div class="modal-content">
        <span class="close-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></span>
        
        <!-- 쿠폰 정보 입력 -->
        <div class="input-group">
            <label for="cpName">제목</label>
            <input type="text" id="cpName">
        </div>
        
        <div class="input-group">
            <label for="cpKeyword">설명</label>
            <input type="text" id="cpKeyword">
        </div>
        
        <!-- 일반 쿠폰/등급 쿠폰 라디오 버튼 -->
        <div class="cpType-group">
           	<label for="petType">동물종류</label> <!-- 폰트, css조정 -->
            <select id="petType" name="petType">
				<option disabled selected>동물종류</option>
				<option value="cat">고양이</option>
				<option value="dog">강아지</option>
				<option value="etc">기타 동물</option>
        	</select>
        </div>
        
        <!-- 발급 시작일, 종료일, 만료 예정일 입력 -->
        <div id="periodSelect">
	        <div class="input-group">
	            <label for="hpt_content">내용</label>
	            <textarea name="hpt_content" cols="30" rows="10"></textarea>
	        </div>
	
	        <div class="input-group">
	            <label for="endDate">발급 종료일</label>
	            <input type="date" id="endDate">
	        </div>
	
	        <div class="input-group">
	            <label for="deadDate">https://www.youtube.com/watch?v=</label>
	            <input type="text" id="deadDate">
	        </div>
        </div>

        <button id="registerCouponBtn" onclick="submitCoupon()">등록완료</button>
    </div>
</div>

<script src="/static/js/admin/petteacher.js"></script>






<!-- 
<a href="/helppetf/petteacher/petteacher_main">헬프펫프로 이동</a><br />
<a href="/admin/petteacher_form">글작성</a>
<table border="1" width="1000" style="text-align: center;">
	<tr>
		<th>선택</th>
		<th>제목</th>
		<th>설명</th>
		<th>등록일</th>
		<th>조회수</th>
	</tr>
	<c:forEach items="${ylist }" var="y">
			<tr>
				<td>${y.hpt_seq }</td>
				<td>${y.hpt_exp }</td>
				<td><a href="/admin/petteacher_detail?hpt_seq=${y.hpt_seq }">
						${y.hpt_title } </a></td>
				<td>${y.hpt_rgedate }</td>
				<td>${y.hpt_hit }</td>
			</tr>
		</c:forEach>
</table>

 -->
</body>
</html>