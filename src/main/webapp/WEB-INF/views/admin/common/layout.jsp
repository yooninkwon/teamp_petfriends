<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://kit.fontawesome.com/6c32a5aaaa.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="/static/css/admin.css">
<title>
	<tiles:insertAttribute name="title" />
</title>
</head>
<body>
<div id="container">
	<div>
		<tiles:insertAttribute name="header" />
	</div>
	<div>
		<tiles:insertAttribute name="side" />
	</div>
	<div id="content">
		<tiles:insertAttribute name="body" />
	</div>
</div>
</body>
</html>