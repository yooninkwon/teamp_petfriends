<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>어드민 헬프펫프 펫티쳐</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
</head>
<body>
<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
<h1>admin petteacher</h1>
<a href="/helppetf/petteacher/petteacher_main">헬프펫프로 이동</a><br />
<a href="/admin/admin_petteacher_form">글작성</a>
<table border="1" width="1000" style="text-align: center;">
	<tr>
		<th>선택</th>
		<th>제목</th>
		<th>설명</th>
		<th>등록일</th>
		<th>조회수</th>
	</tr>
	<c:forEach items="${ylist }" var="y">
			<tr>
				<td>${y.hpt_seq }</td>
				<td>${y.hpt_exp }</td>
				<td><a href="/admin/admin_petteacher_detail?hpt_seq=${y.hpt_seq }">
						${y.hpt_title } </a></td>
				<td>${y.hpt_rgedate }</td>
				<td>${y.hpt_hit }</td>
			</tr>
		</c:forEach>
</table>
<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>