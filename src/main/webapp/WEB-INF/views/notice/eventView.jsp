<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/notice/eventView.css" />
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<jsp:include page="/WEB-INF/views/include_jsp/notice_sub_navbar.jsp" />
	<script>
		$(document).ready(
				function() {
					document.getElementById('${main_navbar_id }').classList
							.add('selected');
					document.getElementById('${sub_navbar_id }').classList
							.add('selected');
				});
	</script>

	<div id="top">
		<div id="top_top">
			<h2>${event.event_title }</h2>
			<h4 style="color: gray;">${event.event_startdate } ~ ${event.event_enddate }</h4>
		</div>
		<div id="top_bottom">
			<h4>조회수 <span style="font: bold; font-size: 15px; color: gray;">${event.event_hit }</span>
				| 등록일 <span style="font: bold; font-size: 15px; color: gray;">${event.event_legdate }</span>
			</h4>
		</div>

	</div>
	<div id="container">
		<div id="content">
			<p>${event.event_content }</p>
		</div>
		<div id="bottom_top">
			<a href="/notice/eventPage"><input type="button" class="listBtn" value="목록" /></a>
		</div>
		<div id="bottom_bottom">

		</div>
	</div>


<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>