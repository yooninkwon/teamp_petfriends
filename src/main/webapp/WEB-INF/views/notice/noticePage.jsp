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
				<tr>
					<th>번호</th>
					<th>제목</th>
					<th>날짜</th>
					<th>조회수</th>
				</tr>
				<c:forEach var="notice" items="${noticeList}">
					<tr>
						<td>${notice.notice_no }</td>
						<td id="title"><a href="/notice/noticeView">${notice.notice_title }</a></td>
						<td>${notice.notice_date }</td>
						<td>${notice.notice_hit }</td>
					</tr>
				</c:forEach>
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
</body>
</html>