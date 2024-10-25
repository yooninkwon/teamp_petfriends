<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫호텔</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/helppetf/pethotel_info.css" />
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
    <div class="container">
    <!-- DB 데이터 불러오는것으로 바꾸기 -->
        <!-- 상단 섹션 -->
        <div class="top-section">
        	<div class="back_link">
            	<a href="/helppetf/pethotel/pethotel_main" class="back-link">&lt; 돌아가기</a>
            </div>
            <h1>펫호텔 서비스를 소개합니다!</h1>
        </div>

        <!-- 이용 안내 섹션 -->
        <div class="content-section">
            <h2>이용안내</h2>

            <!-- 공동 사항 -->
            <h3>공통사항</h3>
            <p>아이가 사용했던 모든 물품은 다 챙겨주셔야 해요.<br>
               (간식, 사료는 물론 배변패드, 식기류까지 보관공간에서 가리는 친구들이 있어요.)</p>

            <!-- 반려견 공통사항, 예약과 입퇴실 -->
            <h3>반려견 공통사항, 예약과 입퇴실</h3>
            <ul>
                <li>24시간 초과 시 시간당 1일 호텔비의 10% 추가</li>
                <li>책임, 입실, 마킹, 비중성화 아이는 각 1박당 5천원 추가</li>
                <li>예약된 퇴실 가능시간에 입퇴실이 가능합니다.</li>
                <li>입실 후 스케줄에 따라 다른 예약을 받지 못하므로 중도 퇴실시 환불되지 않습니다.</li>
            </ul>

            <!-- 입실 불가능 아이 -->
            <h3>입실 불가능 아이</h3>
            <ul>
                <li>최근 1년 이내 종합접종이 완료 안된 아이</li>
                <li>전염성 질병이 있는 아이</li>
                <li>공격성/입질이 있는 아이</li>
                <li>8개월 이상의 미중성화 남아는 지정에 따라 입실불가 또는 비용추가</li>
            </ul>

            <!-- 반려묘 공통사항, 예약과 입퇴실 -->
            <h3>반려묘 공통사항, 예약과 입퇴실</h3>
            <ul>
                <li>24시간 초과 시 시간당 10% 추가</li>
                <li>중성화 안된 10개월 이상 아이는 1박당 5천원 추가</li>
                <li>임신중인 아이는 1박당 5천원 추가</li>
                <li>예약된 퇴실 가능시간에 입퇴실이 가능합니다.</li>
            </ul>

            <!-- 입실 불가능 아이 (반려묘) -->
            <h3>입실 불가능 아이</h3>
            <ul>
                <li>최근 1년 이내 종합접종이 완료 안된 아이</li>
                <li>전염성 질병이 있는 아이</li>
            </ul>
        </div>

        <!-- 하단 버튼 -->
        <div class="bottom-section">
            <a href="/helppetf/pethotel/pethotel_reserve" class="button">예약하러 가기</a>
        </div>
    	<div class="back_link">
          	<a href="/helppetf/pethotel/pethotel_main" class="back-link">&lt; 돌아가기</a>
        </div>
    </div>
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>