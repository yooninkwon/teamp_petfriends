<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
content


<h1>입양 상세 정보</h1>
<p>종류: ${selectedAnimal.kindCd}</p>
<p>발견 장소: ${selectedAnimal.happenPlace}</p>
<p>성별: ${selectedAnimal.sexCd}</p>
<p>발견 날짜: ${selectedAnimal.happenDt}</p>
<p>특징: ${selectedAnimal.specialMark}</p>
</body>
</html>