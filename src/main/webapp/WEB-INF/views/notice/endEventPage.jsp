<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>이벤트</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/notice/eventPage.css" />
</head>
<body>
<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
<jsp:include page="/WEB-INF/views/include_jsp/notice_sub_navbar.jsp" />
<script>
	$(document).ready(function() {
		document.getElementById('${main_navbar_id }').classList.add('selected');
		document.getElementById('${sub_navbar_id }').classList.add('selected');
	});
</script>

<div id="container">
	<h1>EVENT</h1>
    
    <c:forEach var="event" items="${event }" >
    		<div class="events" onclick="location.href='/notice/eventView?id=${event.event_no }&active=N'">
	    		<div class="thumbnail-ended">
	    			<h2>종료된 이벤트 입니다.</h2>
	    			<img src="/static/Images/thumbnail/${event.event_thumbnail }" alt="" />
	    		</div>
	    		<div class="title">
	    			<h2>${event.event_title }</h2>
	    			<p>${event.event_startdate } ~ ${event.event_enddate }</p>
	    		</div>
	    	</div>
    </c:forEach>  
</div>


<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>