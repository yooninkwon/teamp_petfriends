<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>adoption detail</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
</head>
<body>
<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<br /><br /><br />
	<h1>상세보기</h1>
	<table id="selectedAnimal" border="1">
		<thead>
			<tr>
				<th>유기번호</th>
				<th>Image</th>
				<th>접수일</th>
				<th>발견장소</th>
				<th>품종</th>
				<th>색상</th>
				<th>나이</th>
				<th>체중</th>
				<th>공고번호</th>
				<th>공고 시작일</th>
				<th>공고 종료일</th>
				<th>상태</th>
				<th>성별</th>
				<th>중성화 여부</th>
				<th>특징</th>
				<th>보호소 이름</th>
				<th>보호소 연락처</th>
				<th>보호소 주소</th>
				<th>관할기관</th>
				<th>담당자</th>
				<th>담당자 연락처</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>${selectedAnimal.desertionNo }</td>
				<td><img src="${selectedAnimal.filename }" alt="Pet Image" width="100" /></td>
				<td>${selectedAnimal.happenDt }</td>
				<td>${selectedAnimal.happenPlace }</td>
				<td>${selectedAnimal.kindCd }</td>
				<td>${selectedAnimal.colorCd }</td>
				<td>${selectedAnimal.age }</td>
				<td>${selectedAnimal.weight }</td>
				<td>${selectedAnimal.noticeNo }</td>
				<td>${selectedAnimal.noticeSdt }</td>
				<td>${selectedAnimal.noticeEdt }</td>
				<td>${selectedAnimal.processState }</td>
				<td>${selectedAnimal.sexCd }</td>
				<td>${selectedAnimal.neuterYn }</td>
				<td>${selectedAnimal.specialMark }</td>
				<td>${selectedAnimal.careNm }</td>
				<td>${selectedAnimal.careTel }</td>
				<td>${selectedAnimal.careAddr }</td>
				<td>${selectedAnimal.orgNm }</td>
				<td>${selectedAnimal.chargeNm }</td>
				<td>${selectedAnimal.officetel }</td>
			</tr>
		</tbody>
	</table>
	
	
    <jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>