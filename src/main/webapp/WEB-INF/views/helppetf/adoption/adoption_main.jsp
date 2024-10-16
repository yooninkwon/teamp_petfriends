<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>입양 센터</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<h1>입양 센터</h1>

	<a href="/helppetf/find/pet_hospital">주변 동물병원 찾기</a> &nbsp;
	<a href="/helppetf/find/pet_facilities">주변 반려동물 시설 찾기</a> &nbsp;
	<a href="/helppetf/adoption/adoption_main">입양 센터</a> &nbsp;
	<a href="/helppetf/petteacher/petteacher_main">펫티쳐</a> &nbsp;

    <h1>Adoption Data</h1>
    <table id="adoptionTable" border="1">
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
            <!-- 데이터가 채워지는 곳 -->
        </tbody>
    </table>

    <script>
        $(document).ready(function() {
            // Ajax 
            $.ajax({
                url: '/helppetf/adoption/getJson',  // API호출 URL
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    var adoptionItems = data.item; // JSON 구조
                    var rows = '';
                    $.each(adoptionItems, function(index, item) {
                        rows += '<tr>';
                        rows += '<td>' + item.desertionNo + '</td>';
                        rows += '<td><img src="' + item.filename + '" alt="Pet Image" width="100" /></td>'; // 이미지 추가
                        rows += '<td>' + item.happenDt + '</td>';
                        rows += '<td>' + item.happenPlace + '</td>';
                        rows += '<td>' + item.kindCd + '</td>';
                        rows += '<td>' + item.colorCd + '</td>';
                        rows += '<td>' + item.age + '</td>';
                        rows += '<td>' + item.weight + '</td>';
                        rows += '<td>' + item.noticeNo + '</td>';
                        rows += '<td>' + item.noticeSdt + '</td>';
                        rows += '<td>' + item.noticeEdt + '</td>';
                        rows += '<td>' + item.processState + '</td>';
                        rows += '<td>' + item.sexCd + '</td>';
                        rows += '<td>' + item.neuterYn + '</td>';
                        rows += '<td>' + item.specialMark + '</td>';
                        rows += '<td>' + item.careNm + '</td>';
                        rows += '<td>' + item.careTel + '</td>';
                        rows += '<td>' + item.careAddr + '</td>';
                        rows += '<td>' + item.orgNm + '</td>';
                        rows += '<td>' + item.chargeNm + '</td>';
                        rows += '<td>' + item.officetel + '</td>';
                        rows += '</tr>';
                    });
                    $('#adoptionTable tbody').html(rows); // 테이블에 행 추가
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching data:', error);
                }
            });
        });
    </script>
<!-- @ TODO: 페이징, 필터링, 상세 페이지 등 -->
</body>
</html>