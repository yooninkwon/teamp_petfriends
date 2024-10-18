<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<p>
	<script>
	    // JSP에서 sessionScope.name 값을 전역 변수로 선언
	    var userName = "${sessionScope.loginUser.mem_name}";
	</script>
	<script src="/static/js/Main.js"></script>
	<div id="menu">
	    <img src="<c:url value='/static/Images/MainImg/LOGO_white.png'/>" id="top_logo" alt="">
	    <div class="menu_icons">
	        <img src="<c:url value='/static/Images/MainImg/search_icon.png'/>" id="search_icon" alt="">
	        <img src="<c:url value='/static/Images/MainImg/user_icon.png'/>" id="user_icon" alt="">
	        <c:if test="${sessionScope.loginUser.mem_name} == '이창재'}">
	    		<a href="<c:url value='/admin/home' />">
	        	<img src="<c:url value='/static/Images/MainImg/admin_icon.png'/>" id="admin_icon" alt="관리자 아이콘">
	   			</a>
			</c:if>
	    </div>
	</div><br>
	<div id="main_nav">
	    <ul>
	        <li><a href="/product/productlist">PRODUCT</a></li>
	        <li><a href="">NOTICE</a></li>
	        <li><a href="/community/main">COMMUNITY</a></li>
	        <li><a href="/helppetf/find/pet_hospital">HELP PETF!</a></li>
	        
	        <c:if test="${sessionScope.loginUser.mem_name ne null }">
	        	<h3 id="welcome">${sessionScope.loginUser.mem_name}님 환영합니다.</h3>
	        </c:if>
	        
	    </ul>
	</div>
</p>

