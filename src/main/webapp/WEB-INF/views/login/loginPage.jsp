<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>로그인</title>
	<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
	<jsp:include page="/WEB-INF/views/login/login_css_js.jsp" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    
</head>
<body>
    <!-- 헤더 인클루드 -->
    <jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
    <!--  -->
    <div id="login">
        <div id="login1">
            <img src="<c:url value='/static/Images/MainImg/login_text.PNG'/>" id="login_text" alt=""> <br>
            <label for="#">EMAIL</label> <br>
            <input type="text" id="email" placeholder="이메일"> <br>
            <label for="#">PASSWORD</label> <br>
            <input type="password" id="password" placeholder="비밀번호"> <br>
            <input type="checkbox" id="remember"> Remember Me
            <a href="#">Forgot Password</a>
            <input type="submit" id="signin" value="Sign In"> <br>
            <div id="login1_bottom">
                <h4>아직 펫프렌즈 회원이 아니신가요?
                <a href="#">여기를 눌러 회원가입</a></h4> 
            </div>
        </div>
        <div class="login_slider">
            <div class="login_slides">
                <!-- 각 슬라이드 -->
                <div class="login_slide"><img src="<c:url value='/static/Images/MainImg/login_slide1.png'/>" alt=""></div>
                <div class="login_slide"><img src="<c:url value='/static/Images/MainImg/login_slide2.png'/>" alt=""></div>
                <div class="login_slide"><img src="<c:url value='/static/Images/MainImg/login_slide3.png'/>" alt=""></div>      
            </div>
        </div>
    </div>
</body>
</html>