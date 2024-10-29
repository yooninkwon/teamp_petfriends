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

		<h1>수고하셨어요! <br />
		등록하신 [ <span style="font-size: 40px; color: #ff4081;">${petName}</span> ] 정보로 <br /> 맞춤 상품을 추천해 드릴게요
		</h1>
		
		<div style="width: 100%; text-align: right;">
			<a href="/mypage/mypet">
			<input style="width: 20%; height: 30px; font:bold; font-size:15px; border:1px solid gray; border-radius: 8px; background-color: white; cursor: pointer;" 
			type="button" value="마이페이지로 이동" />
			</a>
		</div>
		
		<div style="width: 100%; height:300px; background-color: rgb(235,235,235,100); margin-top:15px; border-radius: 15px;">
		
			<div style="width: 30%; height:300px; float: left;">
				<img style="width: 90%; height: 90%; border-radius: 50%;; margin-top: 15px; " 
				src="<c:url value='/static/Images/pet/${petImg }'/>" alt="Evemt 3">
			</div>
			
			<div style="width: 68%; float: right; text-align: left; margin-top: 50px;">
				<h2>[${petName }] <span style="font-size: 20px;">${petGender }</span></h2>
				<h2>${petDetailType }</h2>
				<h2>생일 : ${petBirth } <span style="font-size: 15px; color: gray;">||</span> 체형 : ${petBodyType }</h2>
				<h4>*입력하신 정보 확인/수정은 마이페이지 에서 가능해요!</h4>
			</div>
		</div>
		
		<div style="width:100%; text-align: right; margin-top: 15px;">
			<a href="/">
			<input style="width: 35%; height: 50px; background-color: #ff4081; font: bold; color: white;
			border:none; border-radius: 8px; cursor:pointer; font-size: 25px;" type="button" value="메인으로 이동" />
			</a>
		</div>
		
	</div>

</body>
</html>