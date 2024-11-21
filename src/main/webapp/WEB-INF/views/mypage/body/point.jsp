<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	mypage_body
</title>
</head>
<body>
<h2 style="margin-bottom: 0">현재 심쿵포인트</h2>
<h2 class="point"><fmt:formatNumber value="${loginUser.mem_point }"  type="number" groupingUsed="true" />원</h2>
<div class="ex-point">적립 예정 포인트 <span style="color: black; font-size: 17px;"><fmt:formatNumber value="${ex_saving }"  type="number" groupingUsed="true" />원</span></div>

<div class="info-container">
	<h3>사용내역</h3>
	<hr />
	<c:forEach items="${pointLogs }" var="pointLog">
	    <div class="point-list">
	        <div style="display: flex; align-items: center;">
	        	<div style="width: 100px; text-align: center;">
		        	<c:choose>
	                    <c:when test="${pointLog.point_info eq '사용'}">
				            <div class="point-info">${pointLog.point_info }</div>
	                    </c:when>
	                    <c:otherwise>
				            <div class="point-info plus">${pointLog.point_info }</div>
	                    </c:otherwise>
	                </c:choose>
	        	</div>
	            <div style="margin-left: 20px;">
	                <div class="point-date">${pointLog.point_date }</div>
	                <div class="point-title">${pointLog.point_memo }</div>
	                <div class="point-code">${pointLog.o_code }</div>
	            </div>
	        </div>
	        <div class="point-amount">
	            <div>${pointLog.point_type }</div>
	            <div><fmt:formatNumber value="${pointLog.points }" type="number" groupingUsed="true" />원</div>
	        </div>
	    </div>
	</c:forEach>
</div>
</body>
</html>