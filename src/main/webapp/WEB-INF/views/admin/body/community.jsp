<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/admin/community.css">
<script src="/static/js/admin/community.js"></script>
<title>
	community_body
</title>
</head>
<body>
<div class="title"><h3>전체 게시글</h3></div>

	<div id="productRegister" class="tab-content">
		<!-- 필터링 영역 -->
		<div class="filter-section-1" id="status-filter">
	
			        <!-- 조회 기간 필터 -->
		
	        <div class="date-group">
	            <div class="filter-title">작성일</div>	    	       	       
		        </select>
	            <label><input type="date" id="start-date">부터</label>
	            <label><input type="date" id="end-date">까지</label>
	            <button id="reset-date" class="btn-style">전체보기</button>
	        </div>
	    </div>
	

		    <div class="type-group" id="pro-detail-type">
		        <div class="filter-title">카테고리</div>
		        	<select id="search-order">
		            <option value="mc_issue">전체</option>
		            <option value="mc_use">육아꿀팁</option>
		            <option value="mc_dead">내새꾸자랑</option>
		            <option value="mc_dead">펫테리어</option>
		            <option value="mc_dead">펫션쇼</option>
		            <option value="mc_dead">집사일기</option>
		            <option value="mc_dead">육아질문</option>
		            <option value="mc_dead">수의사상담</option> 		       		       		      		       
		        </select>
		    </div>
		
		</div>
		<div class="search-group" >
	      	
	      
	      
	        <div class="filter-title">게시글 찾기</div>
		    
		    <select id="search-order">
	        <option value="mc_issue">전체</option>
	        <option value="mc_issue">제목</option>
	        <option value="mc_issue">작성자</option>
	        <option value="mc_issue">내용</option>       
	       	</select>
	       	
	       	 <label><input type="text" name="search-filter" value="" id="search-filter"> </label>
	        
	        <input type="button" value="검색" class="btn-style" id="searchBtn"/>
	    	</div>
		
		
		
		
		<div class="array-section">


		    <!-- 신규등록 버튼 -->
		    <button id="new-pro-btn" class="btn-style">삭제</button>
		</div>
		<!-- 리스트 영역 -->
		<div class="product-list-container">
		
			<table class="product-list">
			    <thead class="thead">
			        <tr>     
			            <th>번호</th>
			            <th>작성자</th>
			            <th>제목</th>
			            <th>카테고리</th>
			            <th>작성일</th>
			            <th>조회수</th>
			        </tr>
			    </thead>
			    <tbody id="product-table-body">
			        <!-- 전체 쿠폰 데이터 출력 -->
			    </tbody>
			</table>
			
			
			<div id="pagination">
				<!-- 페이징 -->
			</div>
		</div>
		
	


</body>
</html>