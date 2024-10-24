<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫호텔</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<jsp:include page="/WEB-INF/views/include_jsp/helppetf_sub_navbar.jsp" />
	<script>
		$(document).ready(function() {
			document.getElementById('${main_navbar_id }').classList.add('selected');
			document.getElementById('${sub_navbar_id }').classList.add('selected');
		});
	</script>
	PETHOTEL INFO
	이용안내
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>