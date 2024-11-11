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
<h2>펫호텔 예약내역</h2>
<div class="coupon-container">
 
	<div class="form-col">
	    <h3>전체 예약 내역</h3>
	</div>
    
    <table class="pethotel-table" style="text-align: center;">
        <thead>
            <tr>
                <th>예약번호</th>
                <th>마리 수</th>
                <th>예약시작일</th>
                <th>예약종료일</th>
                <th>예약등록일</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody>
        	<c:choose>
		    	<c:when test="${pethotelMemDto.size() == 0}">
		    		<tr>
		    			<td colspan="6">
			    			<div id="empty-list">
						        <div><strong>예약 내역이 없습니다.</strong></div>
						        <a href="/helppetf/pethotel/pethotel_main" class="emptyBtn">예약하러 가기</a>
						    </div>
		    			</td>
		    		</tr>
		    	</c:when>
		    	<c:otherwise>
		    		<c:forEach var="item" items="${pethotelMemDto}">
		                <tr>
		                    <td>
		                        <div class="reserve-no">${item.hph_reserve_no}</div>
		                    </td>
		                    <td>
		                    	<div>
		                    		<span class="numofpet">${item.hph_numof_pet}</span>
		                    	</div>
		                    </td>
		                    <td>
		                    	${item.hph_start_date} 부터
	                    	</td>
		                    <td>
		                    	${item.hph_end_date} 까지
		                    </td>
		                    <td>
		                        ${item.hph_rge_date}
		                    </td>
		                    <td class="status"> 
		                        ${item.hph_status}
		                    </td>
		                </tr>
		            </c:forEach>
		    	</c:otherwise>
		    </c:choose>
        </tbody>
    </table>
   	<div class="button-container">
 		<button class="orderAllItem" onclick="location.href='/helppetf/pethotel/pethotel_main'">예약하러 가기</button>
	</div>
</div>

<script src="/static/js/mypage/mypage_pethotel.js"></script>
</body>
</html>