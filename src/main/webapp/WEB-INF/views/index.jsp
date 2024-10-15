<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫프렌즈</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
</head>
<body>
	<!-- 헤더 인클루드 -->
    <jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
    
    
    <!-- 메인구성 시작--> 
    <!-- 이벤트 -->
    <div class="slider">
        <div class="slides">
            <!-- 각 슬라이드 -->
            <div class="slide"><img src="<c:url value='/static/Images/MainImg/event1.png'/>" alt="Event 1"></div>
            <div class="slide"><img src="<c:url value='/static/Images/MainImg/event2.png'/>" alt="Event 2"></div>
            <div class="slide"><img src="<c:url value='/static/Images/MainImg/event3.png'/>" alt="Evemt 3"></div>
        </div>
        <!-- 화살표버튼 -->
        <button class="prev" onclick="moveSlide(-1)">&#10094;</button>
        <button class="next" onclick="moveSlide(1)">&#10095;</button>
    </div><br>
    
    <!-- 메인 구성 샘플  -->
    <h1 id="best_product">BEST</h1>
    <table id="best_product_table">
    	<c:forEach var="i" begin="1" end="3">
    		<tr>
    			<c:forEach var="i" begin="1" end="5">
    				 <td>
    				 	<img src="<c:url value='/static/Images/MainImg/pro1.jpg'/>" width="300px" alt=""><br>
                		<h3>허니 도넛츄 (치킨/오리)</h3>
                		<p>4,500원</p>
                		<h3>3,400원</h3>
                		<img src="<c:url value='/static/Images/MainImg/fast_deliver.PNG'/>" id="fast" width="100px" alt="">
            		</td>
    			</c:forEach>
        	</tr>
		</c:forEach>
    </table>
    <!-- 메인 구성 끝 -->
    
    <!-- 푸터 인클루드 -->
    <jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>