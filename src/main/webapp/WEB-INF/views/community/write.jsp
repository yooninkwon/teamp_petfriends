
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>community_write</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
 <link rel="stylesheet" href="/static/css/community/community_write.css">
</head>
<body>
<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
<h3>community_write</h3>
<table width="500" border="1">

<form action="write" method="post">
	<tr>
		<td>이름</td>
		<td><input type="text" name="bname" size="50" /></td>
	</tr>

	<tr>
		<td>제목</td>
		<td><input type="text" name="btitle" size="50" /></td>
	</tr>

	<tr>
		<td>내용</td>
		<td><textarea name="" id="" cols="30" rows="10">content</textarea></td>
	</tr>

	<tr>
		<td colspan="2"><input type="submit" value="write"/>제출</td>
	
	</tr>
</form>

 </table>

</body>
  <jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</html>