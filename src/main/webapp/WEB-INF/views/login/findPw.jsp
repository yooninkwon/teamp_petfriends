<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/login/findIdAndPw.css" />
<script src="/static/js/findPw.js"></script>
</head>
<body>
    <jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
    <div class="find-container">
        <div class="find-tabs">
            <a href="findId">
            아이디 찾기
            </a>
            <a href="findPw" class="active" >
            비밀번호 찾기
            </a>
        </div>
        
        <c:if test="${message != null}">
		    <script>
		        alert("${message}");
		    </script>
		</c:if>
        
        <%
	    // URL에서 email 파라미터 가져오기
	    String email = request.getParameter("email");
		%>

        <form action="changePw" method="post" class="find-form" id="findPwForm">       	
        	<div class="form-group">
		        <label for="email">아이디(Email)</label>
		        <input type="email" id="email" name="email" 
		               value="<c:choose>
		                         <c:when test='${not empty mem_email}'>
		                             ${mem_email}
		                         </c:when>
		                         <c:otherwise>
		                             <%= email != null ? email : "" %>
		                         </c:otherwise>
		                      </c:choose>" 
		               placeholder="이메일을 입력해주세요">
		    </div> 
        
            <div class="form-group">
                <label for="name">이름</label>
                <input type="text" id="name" name="name" placeholder="이름 또는 닉네임을 입력해주세요">
            </div>

            <div class="form-group">
                <label for="phoneNumber">휴대폰 번호</label>
                <input type="text" id="phoneNumber" name="phoneNumber" placeholder="'-'를 제외한 숫자만 입력해주세요">
                <button type="button" class="send-code-btn" id="requestCodeBtn" disabled>인증번호 전송</button>
            </div>

            <div class="form-group">
                <label for="verificationCode">인증번호</label>
                <input type="text" id="verificationCode" name="verificationCode" placeholder="인증번호를 입력하세요">
            </div>

            <button type="submit" class="submit-btn-Pw" id="submit-btn-Pw" disabled >확인</button>
        </form>
    </div>
</body>
</html>
