<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>주소 검색</title>
   	<link rel="stylesheet" href="/static/css/join/addressMap.css" />
    <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApi }&libraries=services"></script>
</head>
<body>
    <div id="container">
    	<h2>주소 검색 결과</h2>
        <div id="map"></div> <!-- 지도 영역 -->
        <input type="button" id="submitBtn" value="이 주소가 확실해요!" />
    </div>

    <script>
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(37.537187, 127.005476), // 기본 지도 좌표 (수정 가능)
                level: 5 // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성

        var geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체

        var marker = new kakao.maps.Marker({ // 마커 생성
            map: map
        });

        var address = new URLSearchParams(window.location.search).get('address'); // 전달된 주소

        // 전달된 주소로 좌표를 검색
        geocoder.addressSearch(address, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                map.setCenter(coords); // 지도 중심을 검색된 좌표로 이동
                marker.setPosition(coords); // 마커 위치 설정
            }
        });
        
     	// '이 주소가 확실해요!' 버튼 클릭 이벤트
        document.getElementById('submitBtn').addEventListener('click', function() {
            // 부모 창에 선택된 주소를 전달
            window.opener.document.getElementById('address').value = address;

            // 팝업 창 닫기
            window.close();
        });
        
    </script>
</body>
</html>
