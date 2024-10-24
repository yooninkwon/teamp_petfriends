<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	<tiles:insertAttribute name="mypage_title" />
</title>
<script src="https://kit.fontawesome.com/6c32a5aaaa.js" crossorigin="anonymous"></script>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/mypage.css">
</head>
<body>
<div id="container">
    <section id="header">
        <tiles:insertAttribute name="mypage_header" />
    </section>
	<div id="main">
        <aside id="sidebar-left">
            <tiles:insertAttribute name="mypage_side" />
        </aside>
        <section id="content">
            <tiles:insertAttribute name="mypage_body" />
        </section>
    </div>
    <section>
        <tiles:insertAttribute name="mypage_footer" />
    </section>
</div>
</body>
</html>