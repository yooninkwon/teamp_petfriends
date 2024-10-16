<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://kit.fontawesome.com/6c32a5aaaa.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="/static/css/mypage.css">
<title>
	<tiles:insertAttribute name="mypage_title" />
</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
</head>
<body>
<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

<div id="container">
	<div id="main">
        <aside id="sidebar-left">
            <tiles:insertAttribute name="mypage_side" />
        </aside>
        <section id="content">
            <tiles:insertAttribute name="mypage_body" />
        </section>
    </div>
</div>
	
<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>