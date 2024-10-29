<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/admin/pethotel.css">
<meta charset="UTF-8">
<title>
	admin_body
</title>
</head>
<body>
<div class="title"><h3>펫호텔 게시글 관리</h3></div>
<!-- 탭 영역 -->
<div class="tab-section">
    <button class="tab-btn active" data-tab="intro">펫호텔 소개</button>
    <button class="tab-btn" data-tab="info">이용안내</button>
</div>
<!-- 탭 별 내용 -->
<div id="intro" class="tab-content">

</div>

<div id="info" class="tab-content" style="display: none;">

</div>




<script src="/static/js/admin/pethotel.js"></script>
</body>
</html>