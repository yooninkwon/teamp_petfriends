<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>admin petteacher form</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
</head>
<body>
<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
<h1>admin petteacher form</h1>

<form action="/admin/admin_petteacher_write" method="post">
<table width="500" border="1">
		<tr>
			<td>제목</td>
			<td><input type="text" name="hpt_title" /></td>
		</tr>
		<tr>
			<td>설명</td>
			<td><input type="text" name="hpt_exp" /></td>
		</tr>
		<tr>
			<td>내용</td>
			<td><textarea name="hpt_content" cols="30" rows="10"></textarea></td>
		</tr>
		<tr>
			<td>URL</td>
			<td>https://www.youtube.com/watch?v=<input type="text" name="hpt_yt_videoid" /></td>
		</tr>
		<tr>
			<td>펫 타입</td>
			<td><input type="text" name="hpt_pettype" /></td>
		</tr>
		<tr>
			<td>카테고리</td>
			<td><input type="text" name="hpt_category" /></td>
		</tr>
		<tr>
			<td colspan="2">
				<input type="submit" value="작성" />
			</td>
		</tr>
	</table>
</form>
<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>