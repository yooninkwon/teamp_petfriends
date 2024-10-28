<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/admin/product.css">
<script src="/static/js/admin/product.js"></script>
<title>
	admin_body
</title>
</head>
<body>
<div class="title"><h3>상품 관리</h3></div>

	<div id="productRegister" class="tab-content">
		<!-- 필터링 영역 -->
		<div class="filter-section-1" id="status-filter">
		    <div class="radio-group" id="pet-type">
		        <div class="filter-title">펫타입</div>
		        <label><input type="radio" name="pet-filter" value="전체" checked> 전체</label>
		        <label><input type="radio" name="pet-filter" value="강아지"> 강아지</label>
		        <label><input type="radio" name="pet-filter" value="고양이"> 고양이</label>
		    </div>
		    <div class="radio-group" id="pro-type">
		        <div class="filter-title">상품타입</div>
		        <label><input type="radio" name="pro-filter" value="전체" checked> 전체</label>
		        <label><input type="radio" name="pro-filter" value="사료"> 사료</label>
		        <label><input type="radio" name="pro-filter" value="간식"> 간식</label>
		        <label><input type="radio" name="pro-filter" value="용품"> 용품</label>
		    </div>
		    <div class="radio-group" id="pro-detail-type">
		        <div class="filter-title">상세타입</div>
		        <label><input type="radio" name="type-DF" value="전체" > 전체</label>
		        <label><input type="radio" name="type-DF" value="습식사료"> 습식사료</label>
		        <label><input type="radio" name="type-DF" value="소프트사료"> 소프트사료</label>
		        <label><input type="radio" name="type-DF" value="건식사료" > 건식사료</label>
		        
		        <label><input type="radio" name="type-DS" value="전체" > 전체</label>
		        <label><input type="radio" name="type-DS" value="수제간식"> 수제간식</label>
		        <label><input type="radio" name="type-DS" value="껌"> 껌</label>
		        <label><input type="radio" name="type-DS" value="사시미/육포" > 사시미/육포</label>
		        
		        <label><input type="radio" name="type-DG" value="전체" > 전체</label>
		        <label><input type="radio" name="type-DG" value="배변용품"> 배변용품</label>
		        <label><input type="radio" name="type-DG" value="장난감"> 장난감</label>
		        
		        <label><input type="radio" name="type-CF" value="전체" > 전체</label>
		        <label><input type="radio" name="type-CF" value="주식캔"> 주식캔</label>
		        <label><input type="radio" name="type-CF" value="파우치"> 파우치</label>
		        <label><input type="radio" name="type-CF" value="건식사료"> 건식사료</label>
		        
		        <label><input type="radio" name="type-CS" value="전체" > 전체</label>
		        <label><input type="radio" name="type-CS" value="간식캔"> 간식캔</label>
		        <label><input type="radio" name="type-CS" value="동결건조"> 동결건조</label>
		        <label><input type="radio" name="type-CS" value="스낵"> 스낵</label>
		        
		        <label><input type="radio" name="type-CG" value="전체" > 전체</label>
		        <label><input type="radio" name="type-CG" value="낚시대/레이져"> 낚시대/레이져</label>
		        <label><input type="radio" name="type-CG" value="스크래쳐/박스"> 스크래쳐/박스</label>
		    </div>
		</div>
		<div class="radio-group" >
	        <div class="filter-title">상품명검색</div>
	        <label><input type="text" name="search-filter" value="" id="search-filter"> </label>
	        <input type="button" value="검색" class="btn-style" id="searchBtn"/>
	    </div>
		<div class="array-section">
		    <!-- 신규등록 버튼 -->
		    <button id="new-pro-btn" class="btn-style">상품등록</button>
		</div>
		<!-- 리스트 영역 -->
		<div class="product-list-container">
		
			<table class="product-list">
			    <thead class="thead">
			        <tr>
			            
			            <th>날짜</th>
			            <th>상품코드</th>
			            <th>상품명</th>
			            <th>상품타입</th>
			            <th>판매상태</th>
			            <th>상세보기/편집</th>
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
		
				
		
	</div>


</body>
</html>