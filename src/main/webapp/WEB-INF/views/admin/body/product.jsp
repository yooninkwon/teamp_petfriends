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
	
	<!-- 상품 등록 모달창 -->
	<form id="productModalPg">
<div id="productModal" class="modal" style="display: none;">
    <div class="modal-content">
    <h3 class="modal-title">상품등록</h3>
        <span class="close-btn" > <i class="fa-solid fa-xmark"></i></span>
        <br />
        <!-- 상품 정보 입력 -->
    
        <div class="input-group">
            <label for="petType">펫타입</label>
            <input type="text" id="petType">
            <span class="proEx">ex) 강아지, 고양이 등</span>
        </div>
        <div class="input-group">
            <label for="proType">상품종류</label>
            <input type="text" id="proType">
            <span class="proEx">ex) 사료, 간식 용품 등</span>
        </div>
        <div class="input-group">
            <label for="proDetailType">상품타입</label>
            <input type="text" id="proDetailType">
            <span class="proEx">ex) 건사료, 장난감, 배변패드 등</span>
        </div>
        <div class="input-group">
            <label for="filterType1">주원료</label>
            <input type="text" id="filterType1">
            <span class="proEx">ex) 주원료, 상품재질 등</span>
        </div>
        <div class="input-group">
            <label for="filterType2">기능</label>
            <input type="text" id="filterType2">
            <span class="proEx">ex) 면역력, 장난감 소리(삑삑이) 등</span>
        </div>
        <div class="checkLine">
        
        </div>
        <div class="input-group">
            <label for="proName">상품명</label>
            <input type="text" id="proName">
        </div>
        <div class="input-group">
		    <label>대표이미지 <br /> (최대 5장)</label>
		    <input type="file" id="proMainImages" accept="image/*" multiple >
		    <button class="imgAdd" type="button" onclick="document.getElementById('proMainImages').click()">+</button>
		    <div id="mainImagePreview" class="image-preview"></div>
		</div>
        <div class="input-group">
		    <label></label>
		</div>
        <div class="input-group">
		    <label>상세이미지<br />(최대 10장)</label>
		    <input type="file" id="proDesImages" accept="image/*" multiple style="display:none;">
		    <button class="imgAdd" type="button" onclick="document.getElementById('proDesImages').click()">+</button>
		    <div id="desImagePreview" class="image-preview"></div>
		</div>
        <div class="input-group">
		    <label ></label>
		</div>
      	<div class="input-group">
            <label for="proDiscount">할인율(%)</label>
            <input type="number" id="proDiscount">
            
        </div>
        <div id="option-container">
	        <div class="input-group2">
	            <label id="options">상품옵션</label>
	            <span for="optName">옵션명 <input type="text" id="optName"></span>
	            <span for="optPrice">판매가 <input type="number" id="optPrice">원</span>
	            <span for="optCnt">재고수량 <input type="number" id="optCnt">개</span>
	            <button type="button" class="add-option">+</button>
	            <button type="button" class="remove-option" style="display: none;">-</button> <!-- 기본적으로 삭제 버튼 숨김 -->
	        </div>
       	</div>
          
        <div class="input-group">
       		<label for="productStatus" >판매상태</label>
            <label><input type="radio" name="productStatus" value="판매" checked class="small-radio">판매</label>
            <label><input type="radio" name="productStatus" value="정지" class="small-radio">정지</label>
            <label><input type="radio" name="productStatus" value="품절" class="small-radio">품절</label>
            
        </div>
       
        

       

        <button type="button" id="registerProductBtn" ></button>
    </div>
</div>
</form>

</body>
</html>