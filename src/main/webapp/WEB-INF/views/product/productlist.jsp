<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫프렌즈</title>

<!-- 헤더푸터 css,sc -->
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />

<!-- 상품카테고리+필터메뉴바 css,sc -->
<link rel="stylesheet" href="/static/css/product/ProductList.css" />
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="/static/js/product/ProductList.js"></script>


</head>

<body>
	<!-- 헤더 -->
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<jsp:include page="/WEB-INF/views/include_jsp/product_sub_navbar.jsp" />

	<form class="menubar">
		<!-- 강아지 또는 고양이 선택 -->
		<div class="firsttype">
			<label class="category-btn"> <input type="radio" name="petType" value="dog" checked>강아지</label>
			<label class="category-btn"> <input type="radio" name="petType" value="cat">고양이</label>
			<span id="line">|</span>
		<!-- 사료 / 간식 / 용품 선택 -->
			<label class="category-btn"> <input type="radio" name="proType" value="food" checked >사료</label>
			<label class="category-btn"> <input type="radio" name="proType" value="snack">간식</label>
			<label class="category-btn"> <input type="radio" name="proType" value="goods">용품</label>
		</div>

		<div class="thirdtype">
			<div id="df">
			<label class="category-btn"> <input type="radio" name="dfoodType" value="dfoodtype1" checked>습식사료</label>
			<label class="category-btn"> <input type="radio" name="dfoodType" value="dfoodtype2">소프트사료</label>
			<label class="category-btn"> <input type="radio" name="dfoodType" value="dfoodtype3">건식사료</label>
			</div>
			<div id="ds">
			<label class="category-btn"> <input type="radio" name="dsnackType" value="dsnacktype1" >수제간식</label>
			<label class="category-btn"> <input type="radio" name="dsnackType" value="dsnacktype2">껌</label>
			<label class="category-btn"> <input type="radio" name="dsnackType" value="dsnacktype3">사시미/육포</label>
			</div>
			<div id="dg">
			<label class="category-btn"> <input type="radio" name="dgoodsType" value="dgoodstype1" >배변용품</label>
			<label class="category-btn"> <input type="radio" name="dgoodsType" value="dgoodstype2">장난감</label>
			</div>
			<div id="cf">
			<label class="category-btn"> <input type="radio" name="cfoodType" value="cfoodtype1" >주식캔</label>
			<label class="category-btn"> <input type="radio" name="cfoodType" value="cfoodtype2">파우치</label>
			<label class="category-btn"> <input type="radio" name="cfoodType" value="cfoodtype3">건식사료</label>
			</div>
			<div id="cs">
			<label class="category-btn"> <input type="radio" name="csnackType" value="csnacktype1" >간식캔</label>
			<label class="category-btn"> <input type="radio" name="csnackType" value="csnacktype2">동결건조</label>
			<label class="category-btn"> <input type="radio" name="csnackType" value="csnacktype3">스낵</label>
			</div>
			<div id="cg">
			<label class="category-btn"> <input type="radio" name="cgoodsType" value="cgoodstype1" >낚시대/레이져</label>
			<label class="category-btn"> <input type="radio" name="cgoodsType" value="cgoodstype2">스크래쳐/박스</label>
			</div>
		</div>
		<div class="filterOnOff">
			<img src="/static/Images/ProductImg/ProImg/filterimg.png" alt="" />
			<span>필터로 내새꾸 선물 고르기~</span>
		
		</div>
		
		
		
		<div class="filter" style="display: none;">
			<div id="option_price">
			<span>가격</span>
			<label> <input type="checkbox" name="priceOption" value="priceopt1" >1만원미만</label>
			<label> <input type="checkbox" name="priceOption" value="priceopt2">1~2만원</label>
			<label> <input type="checkbox" name="priceOption" value="priceopt3">2~3만원</label>
			<label> <input type="checkbox" name="priceOption" value="priceopt4">3만원이상</label>
			</div>
			<div id="option_rank">
			<span>펫프랭킹순</span>
			<label> <input type="radio" name="rankOption" value="rankopt0All" checked>기본</label>
			<label> <input type="radio" name="rankOption" value="rankopt1">최신순</label>
			<label> <input type="radio" name="rankOption" value="rankopt2">리뷰많은순</label>
			<label> <input type="radio" name="rankOption" value="rankopt3">낮은가격순</label>
			<label> <input type="radio" name="rankOption" value="rankopt4">높은가격순</label>
			</div>
			<div id="option_dfs1">
			<span>주원료</span>
			<label> <input type="checkbox" name="dfs1option" value="dfsopt11">닭</label>
			<label> <input type="checkbox" name="dfs1option" value="dfsopt12">돼지</label>
			<label> <input type="checkbox" name="dfs1option" value="dfsopt13">소</label>
			</div>
			<div id="option_dfs2">
			<span>기능</span>
			<label> <input type="checkbox" name="dfs2option" value="dfsopt21">면역력</label>
			<label> <input type="checkbox" name="dfs2option" value="dfsopt22">뼈/관절</label>
			<label> <input type="checkbox" name="dfs2option" value="dfsopt23">피부/피모</label>
			</div>
			<div id="option_dg1">
			<span>타입</span>
			<label> <input type="checkbox" name="dg1option" value="dg1opt1">패드</label>
			<label> <input type="checkbox" name="dg1option" value="dg1opt2">배변판</label>
			</div>
			<div id="option_dg2">
			<span>소리</span>
			<label> <input type="checkbox" name="dg2option" value="dg2opt1">삑삑이</label>
			<label> <input type="checkbox" name="dg2option" value="dg2opt2">바스락</label>
			<label> <input type="checkbox" name="dg2option" value="dg2opt3">기타</label>
			</div>
			<div id="option_cfs1">
			<span>주원료</span>
			<label> <input type="checkbox" name="cfs1option" value="cfsopt11">연어</label>
			<label> <input type="checkbox" name="cfs1option" value="cfsopt12">닭</label>
			<label> <input type="checkbox" name="cfs1option" value="cfsopt13">돼지</label>
			</div>
			<div id="option_cfs2">
			<span>기능</span>
			<label> <input type="checkbox" name="cfs2option" value="cfsopt21">체중조절</label>
			<label> <input type="checkbox" name="cfs2option" value="cfsopt22">면역력</label>
			<label> <input type="checkbox" name="cfs2option" value="cfsopt23">피부/피모</label>
			</div>
			<div id="option_cg1">
			<span>타입</span>
			<label> <input type="checkbox" name="cg1option" value="cg1opt1">스틱형</label>
			<label> <input type="checkbox" name="cg1option" value="cg1opt2">낚시줄형</label>
			<label> <input type="checkbox" name="cg1option" value="cg1opt3">와이어형</label>
			</div>
			<div id="option_cg2">
			<span>타입</span>
			<label> <input type="checkbox" name="cg2option" value="cg2opt1">평판형</label>
			<label> <input type="checkbox" name="cg2option" value="cg2opt2">원형</label>
			<label> <input type="checkbox" name="cg2option" value="cg2opt3">수직형</label>
			</div>
		</div>

		
	</form>

	 <div id="product-Count"></div>
    <div id="product-List"></div> <!-- AJAX로 데이터가 표시될 부분 -->
    
    
	<!-- 푸터 -->
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>