<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	mypage_body
</title>
</head>
<body>
<h2>주문내역</h2>

<c:forEach items="${myorders }" var="myorder">
	${myorder.o_code } <br />
	${myorder.o_payment } <br />
	${myorder.o_amount } <br />
	${myorder.o_saving } <br />
	${myorder.o_resiver } <br />
</c:forEach>

</body>
</html>