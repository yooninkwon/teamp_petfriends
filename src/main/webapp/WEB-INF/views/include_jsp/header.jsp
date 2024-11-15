<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<p>
	<script>
	    var userName = "${sessionScope.loginUser.mem_name}";
	</script>
	<script src="/static/js/Main.js"></script>
	
	<div id="menu">
	    <a href="/"><img src="<c:url value='/static/Images/MainImg/LOGO_white.png'/>" id="top_logo" alt=""></a>
	    <div class="menu_icons">
	        <a href="javascript:void(0);" onclick="toggleSearchDropdown()" id="search_icontag">
	        	<img src="<c:url value='/static/Images/MainImg/search_icon.png'/>" id="search_icon" alt="">
	        </a>
	        
	        <!-- 로그인 아이콘 -->
	        <div class="user-icon-wrapper">
	            <img src="<c:url value='/static/Images/MainImg/user_icon.png'/>" id="user_icon" alt="">
	            <c:if test="${sessionScope.loginUser ne null}">
	                <div class="dropdown-menu">
	                    <p>
	                        <a href="/mypage/grade">
		                        <strong>${sessionScope.loginUser.mem_name}</strong>님과 펫프의<br />
		                        하트시그널은 <strong style="color: #11abb1;">${sessionScope.userGrade.g_name}</strong>
	                        </a>
	                    </p>
	                    <hr>
	                    <p><a href="/mypage/mypet">마이펫프</a></p>
	                    <p><a href="/mypage/cart">장바구니</a></p>
						<p><a href="/community/main">나의 집사생활</a></p>
	                    <hr>
	                    <p><a href="https://petfriends.notion.site/FAQ-0d3f18312bf24878a0095423ddbc3691">자주 묻는 질문(FAQ)</a></p>
	                    <p><a href="/mypage/cscenter">고객센터</a></p>
	                    <hr>
	                    <p><a href="/mypage/logout">로그아웃</a></p>
	                </div>
	            </c:if>
	        </div>
	        
	        <!-- 어드민 페이지 아이콘 -->
	        <c:if test="${sessionScope.loginUser.mem_name eq '관리자'}">
	    		<a href="<c:url value='/admin/sales' />">
	        	<img src="<c:url value='/static/Images/MainImg/admin_icon.png'/>" id="admin_icon" alt="관리자 아이콘">
	   			</a>
			</c:if>
			
			<!-- 관리자아이콘 보이기 추가 : 민석 -->
	        <c:if test="${sessionScope.loginUser.mem_nick eq 'dpoowa'}">
	    		<a href="<c:url value='/admin/sales' />">
	        	<img src="<c:url value='/static/Images/MainImg/admin_icon.png'/>" id="admin_icon" alt="관리자 아이콘">
	   			</a>
			</c:if>
	    </div>
	</div><br>
	
	<!-- 드롭다운 형태로 표시할 검색 영역 -->
	<div id="searchDropdown" style="display: none;"></div>
	
	<div id="main_nav">
	    <ul>
	        <li><a id="proClick" href="/product/productlist">PRODUCT</a></li>
	        <li><a id="notice" href="/notice/noticePage">NOTICE</a></li>
	        <li><a id="community" href="/community/main">COMMUNITY</a></li>
	        <li><a id="helppetf" href="/helppetf/find/pet_hospital">HELP PETF!</a></li>   

	        <c:if test="${sessionScope.loginUser.mem_name ne null }">
	        	<h3 id="welcome">${sessionScope.loginUser.mem_name}님 환영합니다.</h3>
	        </c:if>
	        
	    </ul>
	</div>
</p>
<div id="brbrbr"></div>
<div id="wrapper">
