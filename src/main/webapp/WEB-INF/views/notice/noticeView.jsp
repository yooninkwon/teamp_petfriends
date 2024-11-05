<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%> 
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
			<div id="left">
				<p>제목</p>
			</div>
			<div id="right">
				<p>${notice.notice_title }</p>
			</div>
		</div>
		<div id="top_bottom">
			<div id="left">
				<p>작성일 ${notice.notice_date }</p>
			</div>
			<div id="right2">
				<p>조회수 ${notice.notice_hit }</p>
			</div>
		</div>

	</div>
	<div id="container">
		<div id="content">
			<p>${notice.notice_content }</p>
		</div>
		<div id="bottom_top">
			<a href="/notice/noticePage"><input type="button" class="listBtn" value="목록" /></a>
		</div>
		<div id="bottom_bottom">
			<c:if test="${nextNotice != null}">
				<a href="/notice/noticeView?id=${nextNotice.notice_no}">다음글 || ${nextNotice.notice_no} ||
					${nextNotice.notice_title}</a>
			</c:if> <br />
			<c:if test="${preNotice != null}">
				<a href="/notice/noticeView?id=${preNotice.notice_no}">이전글 || ${preNotice.notice_no} ||
					${preNotice.notice_title}</a>
			</c:if>
		</div>
	</div>


<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>