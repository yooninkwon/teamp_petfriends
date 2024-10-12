<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫티쳐</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<h1>펫티쳐</h1>

	<a href="/helppetf/find/pet_hospital">주변 동물병원 찾기</a> &nbsp;
	<a href="/helppetf/find/pet_facilities">주변 반려동물 시설 찾기</a> &nbsp;
	<a href="/helppetf/petteacher/petteacher_main">펫티쳐</a> &nbsp;
<hr />
<!-- 임시: admin page 이동 -->
<a href="/admin/admin_petteacher">펫티쳐 어드민 페이지 이동</a>
<br />
	<table border="1" width="750">
		<tr>
			<th>번호</th>
			<th>이름</th>
			<th>제목</th>
			<th>설명</th>
			<th>히트</th>
		</tr>
		<c:forEach items="${ylist }" var="y">
			<tr>
				<td>${y.hpt_seq }</td>
				<td>${y.hpt_exp }</td>
				<td><a href="/helppetf/petteacher/petteacher_detail?hpt_seq=${y.hpt_seq }">
						${y.hpt_title } </a></td>
				<td>${y.hpt_rgedate }</td>
				<td>${y.hpt_hit }</td>
			</tr>
		</c:forEach>
		<tr>
			<td colspan="5"><a href="/youtubeWrite">글쓰기</a></td>
		</tr>
	</table>
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>