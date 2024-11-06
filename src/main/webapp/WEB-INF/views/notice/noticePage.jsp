<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/notice/noticePage.css" />
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
		<div id="top">
			<h3>NOTICE</h3>
			<h2>펫프렌즈의 새소식을 알려드립니다.</h2>
		</div>
		<div id="tableDiv">
			<table id="board">
				<thead>
					<tr>
						<th style="width: 5%;">번호</th>
						<th style="width: 60%;">제목</th>
						<th style="width: 25%;">날짜</th>
						<th style="width: 10%;">조회수</th>
					</tr>
				</thead>
				
			</table>
		</div>
		<div id="bottom">
			<div id="searchDiv">
				<form action="">
					<select name="" id="searchType" >
						<option value="title">제목</option>
						<option value="content">내용</option>
						<option value="number">번호</option>
					</select>
					<input type="search" id="searchInput"/>
					<input type="submit" id="submitBtn" value="검색"/>
				</form>
			</div>
			<div class="pagination" id="pagination">
				
			</div>
		</div>
	</div>

<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
<script src="/static/js/notice/noticePage.js"></script>
</body>
</html>