<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Adoption Detail</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/helppetf/adoption_detail.css" />
</head>
<body>

<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

<!-- 안내 텍스트 -->
<br />
<div id="infoText">
    ${selectedAnimal.orgNm }에 있는 ${selectedAnimal.careNm }에서 보호중인 동물이에요.
</div>

<!-- 동물 이미지 섹션 -->
<div id="animalImages">
    <img src="${selectedAnimal.filename }" alt="Animal Image 1" />
    <img src="${selectedAnimal.popfile }" alt="Animal Image 3" />
</div>

<!-- 상세 정보 테이블 -->
<table>
    <tr>
        <th>공고번호</th>
        <td>${selectedAnimal.noticeNo }</td>
        <th>접수일</th>
        <td>${selectedAnimal.happenDt }</td>
    </tr>
    <tr>
        <th>동물등록번호</th>
        <td>${selectedAnimal.desertionNo }</td>
        <th>발견장소</th>
        <td>${selectedAnimal.happenPlace }</td>
    </tr>
    <tr>
        <th>품종</th>
        <td>${selectedAnimal.kindCd }</td>
        <th>색상</th>
        <td>${selectedAnimal.colorCd }</td>
    </tr>
    <tr>
        <th>성별</th>
        <td>${selectedAnimal.sexCd }</td>
        <th>중성화 여부</th>
        <td>${selectedAnimal.neuterYn }</td>
    </tr>
    <tr>
        <th>나이/체중</th>
        <td>${selectedAnimal.age } / ${selectedAnimal.weight }</td>
        <th>구조시 특징</th>
        <td>${selectedAnimal.specialMark }</td>
    </tr>
    <tr>
        <th>보호소명</th>
        <td>${selectedAnimal.careNm }</td>
        <th>보호소 전화번호</th>
        <td>${selectedAnimal.careTel }</td>
    </tr>
    <tr>
        <th>관할기관</th>
        <td>${selectedAnimal.orgNm }</td>
        <th>담당자</th>
        <td>${selectedAnimal.chargeNm }</td>
    </tr>
    <tr>
        <th>보호소 주소</th>
        <td colspan="3">${selectedAnimal.careAddr }</td>
    </tr>
    <tr>
        <th>담당자 연락처</th>
        <td colspan="3">${selectedAnimal.officetel }</td>
    </tr>
</table>

<!-- 목록 버튼 -->
<button type="button" id="goMain" onclick="location.href='/helppetf/adoption/adoption_main'">목록</button>
<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>