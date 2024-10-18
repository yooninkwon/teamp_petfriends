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

<!-- 폼 시작 -->
<form action="/community/write" method="post" enctype="multipart/form-data">
    <table width="500" border="1">
        <tr>
            <td>이름</td>
            <td><input type="text" name="user_id" size="50" /></td> <!-- 필드명 수정 -->
        </tr>
        <tr>
            <td>제목</td>
            <td><input type="text" name="board_title" size="50" /></td> <!-- 필드명 수정 -->
        </tr>
        <tr>
            <td>내용</td>
            <td><textarea name="board_content" cols="30" rows="10"></textarea></td> <!-- 필드명 수정 -->
        </tr>
        <tr>
            <td>파일</td>
            <td><input multiple type="file" name="file" size="50" /></td>
        </tr>
        <tr>
            <td colspan="2"><input type="submit" value="write" /></td>
        </tr>
    </table>
</form>
<!-- 폼 끝 -->

<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>