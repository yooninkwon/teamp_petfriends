<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫호텔</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/helppetf/pethotel_reserve.css">
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<jsp:include page="/WEB-INF/views/include_jsp/helppetf_sub_navbar.jsp" />
	<script>
		$(document).ready(
				function() {
					document.getElementById('${main_navbar_id }').classList
							.add('selected');
					document.getElementById('${sub_navbar_id }').classList
							.add('selected');
				});
	</script>
<table border="1" width="800" style="text-align: center;">
	<tr>
		<td>${dm[start_date].value }</td>
	<c:forEach items="${dateMap }" var="dm">
		<td>${dm.key }</td>
		<td>${dm.value }</td>
	</c:forEach>
	</tr>
	<c:forEach items="${formList }" var="fl">
		<tr>
			<th>번호</th>
			<th>이름</th>
			<th>종류</th>
			<th>생일</th>
			<th>성별</th>
			<th>체중</th>
			<th>중성화</th>
			<th>전달사항</th>
		</tr>
		<tr>
 			<td>${fl.hphp_reserve_pet_no }</td>
			<td>${fl.hphp_pet_name }</td>
			<td>${fl.hphp_pet_type }</td>
			<td>${fl.hphp_pet_birth }</td>
			<td>${fl.hphp_pet_gender }</td>
			<td>${fl.hphp_pet_weight }</td>
			<td>${fl.hphp_pet_neut }</td>
			<td>${fl.hphp_pet_comment }</td>
		</tr>
	</c:forEach>
</table>
	
	
	
	
	
	
	
	
	<script src="/static/js/helppetf/pethotel_reserve.js"></script>
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>

<!-- <input type="" min=""/> <!-- 장기 투숙일 수도 있으니 끝나는날짜는 제한 x -->