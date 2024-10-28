<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>내새꾸 등록</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/mypet/mypetRegist.css" />
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	
	<div id="container2">

		<h1>마지막이에요! [ <span style="font-size: 40px; color: #ff4081;">${petName}</span> ]에 대해 <br /> 자세히 알려주세요!
		</h1>
		
	
	
		
		<input type="text" name="petName" value="${petName }" />
		<input type="text" name="petType" value="${petType }" />
		<input type="text" name="petImg" value="${petImg }" />
		<input type="text" name="petDetailType" value="${petDetailType }" />
		<input type="text" name="petBrith" value="${petBrith }" />
		<input type="text" name="petGender" value="${petGender }" />
		<input type="text" name="petGender" value="${petNeut }" />
		<input type="text" name="petWeight" value="${petWeight }" />
		<input type="text" name="petBodyType" value="${petBodyType }" />
		<input type="text" name="petInterInfo" value="${petInterInfo }" />
		<input type="text" name="petAllergy" value="${petAllergy }" />
	</div>

</body>
</html>