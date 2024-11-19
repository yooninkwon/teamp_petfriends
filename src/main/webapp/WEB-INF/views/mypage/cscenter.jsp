<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫프렌즈 : 고객센터</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/mypage/mypage2.css">
</head>
<body>
<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

<h2>고객센터</h2>
<h2><a href="https://petfriends.notion.site/FAQ-0d3f18312bf24878a0095423ddbc3691" class="go-faq">자주묻는 질문 확인하기</a></h2>

<div class="container">
    <!-- 탭 메뉴 -->
    <div class="tab-section">
      <button class="tab-btn active" data-tab="contact">1:1 문의하기</button>
      <button class="tab-btn" data-tab="myHistory">내 문의 내역</button>
    </div>

    <!-- 탭별 내용 -->
    <div id="contact" class="tab-content">
    	<form class="cs-form">
	       <input type="hidden" name="mem_code" value="${sessionScope.loginUser.mem_code}">
	       <input type="hidden" name="cs_no" id="cs_no" value="">
	        
	        <div class="cs_caregory">
		        <label for="cs_caregory" class="cs_title">제목</label>
		        <select id="cs_caregory" name="cs_caregory" required>
		            <option value="배송">[배송] 배송관련 문의</option>
	                <option value="주문취소">[주문취소] 주문취소 문의</option>
	                <option value="주소변경">[주소변경] 주소변경 문의</option>
	                <option value="반품/환불">[반품/환불] 반품/환불 문의</option>
	                <option value="기타">[기타] 기타 문의</option>
		        </select>
	        </div>
	
	        <textarea name="cs_contect" class="cs_contect" placeholder="문의사항을 작성해 주세요." required></textarea>
	        
	        <input type="submit" value="등록" class="submit-btn">
	    </form>
    </div>
    
    
    <div id="myHistory" class="tab-content">
	    <table class="cs-list">
		    <thead class="thead">
		        <tr style="border-bottom: 2px solid #cdcdcd;">
		            <th>번호</th>
		            <th>제목</th>
		            <th>작성자</th>
		            <th>작성일</th>
		            <th>처리상태</th>
		        </tr>
		    </thead>
		    
		    <!-- 리스트 영역 -->
		    <tbody id="myHistory-list" class="tbody"></tbody>
		</table>
		
		<!-- 페이징 -->
	    <div id="myHistory-pagination" class="pagination"></div>
    </div>
    
    <div id="myHistoryDetail" class="tab-content">
    	<input type="hidden" id="csNo" value="">
    	<table class="cs-detail">
    		<tr><th class="cs-detail-title">제목</th><th id="detailCategory"></th></tr>
    		<tr><th class="cs-detail-title">작성자</th><th id="detailName"></th></tr>
    		<tr><th class="cs-detail-title">작성일</th><th id="detailDate"></th></tr>
    		<tr><th colspan="2" id="detailContent"></th></tr>
    	</table>
    	
    	<div class="cs-btn-group">
	        <button onclick="goBackToHistory()">목록</button>
	        <div>
		        <button onclick="deleteCS()">삭제</button>
		        <button onclick="goToEdit()">수정</button>
	        </div>
    	</div>
    	
    	<div class="cs-answer">
	    	<strong>문의 답변</strong>
	    	<div id="detailAnswer"></div>
    	</div>
    </div>
</div>

<script src="/static/js/mypage/cscenter.js"></script>
<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>