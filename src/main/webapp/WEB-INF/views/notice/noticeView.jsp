<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/notice/noticeView.css" />
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

	<div id="top">
		<div id="top_top">
			<div id="left">
				<p>제목</p>
			</div>
			<div id="right">
				<p>추석연휴 배송안내</p>
			</div>
		</div>
		<div id="top_bottom">
			<div id="left">
				<p>작성일 2021-09-01</p>
			</div>
			<div id="right2">
				<p>조회수 605</p>
			</div>
		</div>
		
	</div>
	<div id="container">
		<div id="content">
			<p>공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 
			공지사항 공지사항 공지사항 공지사항 공지사항 공지사항 공지사항</p>
		</div>
		<div id="bottom_top">
			<input type="button" value="목록" />
		</div>
		<div id="bottom_bottom">
			<a href="">설 연휴 배송 지연 안내</a> <br />
			<a href="">크리스마스 이벤트 안내</a>
		</div>
	</div>



</body>
</html>