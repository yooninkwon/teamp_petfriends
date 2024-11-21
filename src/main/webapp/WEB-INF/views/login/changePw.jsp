<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<script src="/static/js/changePw.js"></script>
</head>
<body style="background-color: #f8f8f8;">
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<div style="background-color: white; width: 50%; height:500px; text-align: center; margin: 0 auto;
		box-shadow: 8px 10px 20px gray; border-radius: 8px; padding: 20px;">
		
		<form action="changePwService" method="post">
			<label style='width: 60%; height: 30px; float: left; margin-top:40px; text-align: left;
				font: bold; font-size: 25px; margin-left:30px;' for="">새 비밀번호</label> <br />
				
			<input style='width: 60%; height: 30px; float: left; margin-top:20px; margin-left:30px; font: bold;
				font-size: 20px; border:1px solid black; border-radius: 8px; padding-left: 10px;'
				id="password" name="password" type="password" placeholder="변경 하실 비밀번호를 입력 해 주세요." oninput="validatePassword()"/>
				
			<p style='width: 35%; float: right; font-size: 20px; margin-top: 25px; font: bold; color: red; display: none;'
				id="passwordError" name="passwordError">변경 불가능한 비밀번호 입니다.</p> <br />
			
			
			<!-- 비밀번호 양식 -->	
			<pre style='font:bold; font-size:15px; float: left; margin-top: 20px; margin-left: -155px;'>
			* 비밀번호는 영문, 숫자, 특수문자 포함 8~20자 이내로 설정 가능합니다.
		   
			</pre> <br />
			
			
			<label style='width: 60%; height: 30px; float: left; margin-top:20px; text-align: left;
				font: bold; font-size: 25px; margin-left:30px;' for="">한번 더!</label> <br />
				
			<input style='width: 60%; height: 30px; float: left; margin-top:20px; margin-left:30px; font: bold;
				font-size: 20px; border:1px solid black; border-radius: 8px; padding-left: 10px;'
				id="confirmPassword" name="confirmPassword" type="password" placeholder="한번 더 입력해 주세요." oninput="checkPasswordMatch()" />
				
			<p style='width: 35%; height:5px; float: right; font-size: 20px; margin-top: 25px; font: bold; color: red; display: none;'
				id="confirmPasswordError" name="confirmPasswordError">비밀번호가 일치하지 않습니다.</p> <br />
			
			<input style='margin-top: 80px; width: 70%; height: 40px; border: none; 
				border-radius: 8px; color: white; background-color: #ff4081; font: bold; font-size: 20px;'
				type="submit" id="submitBtn" name="submitBtn" value="비밀번호 변경하기" disabled />
				
			<input type="hidden" id="email" name="email" value="${userEmail }" />
		</form>	
	</div>
</body>
</html>