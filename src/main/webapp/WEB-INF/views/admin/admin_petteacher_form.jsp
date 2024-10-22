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
			<td><select id="petType" name="petType">
				<option disabled selected>동물종류</option>
				<option value="cat">고양이</option>
				<option value="dog">강아지</option>
				<option value="etc">기타 동물</option>
			</select></td>
		</tr>
		<tr>
			<td>카테고리</td>
			<td><select id="category" name="category">
				<option disabled selected>카테고리</option>
				<option value="1">훈련</option>
				<option value="2">건강</option>
				<option value="3">습관</option>
				<option value="4">관찰</option>
				<option value="5">케어</option>
				<option value="6">생활</option>
			</select></td>
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