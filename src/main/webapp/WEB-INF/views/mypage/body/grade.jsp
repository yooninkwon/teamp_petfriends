<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	mypage_body
</title>
</head>
<body>
	<h2>하트시그널</h2>
	
	<h3><strong>${loginUser.mem_name}</strong>님과 펫프의 하트시그널은 <strong>${userGrade.g_name}</strong>입니다.</h3>
    <div class="heart-signal-container">
        <div class="heart-signal-bar">
            <div class="heart-signal-fill" id="heartSignalFill"></div>
        </div>
        <div class="heart-signal-labels">
            <span>설렘시작</span>
            <span>몽글몽글</span>
            <span>두근두근</span>
            <span>콩닥콩닥</span>
            <span>심쿵주의</span>
            <span>평생연분</span>
        </div>
    </div>
    <h4 id="gradeText"></h4>
    <img src="/static/Images/mypage/grade_info.png" alt="등급 안내" style="width: 500px;" />
    
    <script>
	    document.addEventListener('DOMContentLoaded', function() {
	        // DB에서 가져온 user_grade 값 (예: '설렘시작')
	        var userGrade = "${userGrade.g_name}"; // 서버에서 값을 채워넣음
	        
	        // 게이지의 채워질 정도를 결정 (각 등급에 따라 %)
	        var gradePercent = {
	            "설렘시작": 10,
	            "몽글몽글": 28,
	            "두근두근": 46,
	            "콩닥콩닥": 64,
	            "심쿵주의": 82,
	            "평생연분": 100
	        };
	
	        // 등급에 따른 설명 텍스트
	        var gradeText = {
	            "설렘시작": "설레는 시작! 이제 막 첫 발을 내딛었어요.",
	            "몽글몽글": "따뜻한 관계가 몽글몽글하게 다가오네요.",
	            "두근두근": "두근두근! 서로의 마음이 더 가까워지고 있어요.",
	            "콩닥콩닥": "콩닥콩닥, 설렘이 점점 더 커지고 있어요!",
	            "심쿵주의": "심쿵! 이제는 그저 함께 있는 것만으로도 행복해요.",
	            "평생연분": "평생 연분! 이제 서로를 떼어놓을 수 없는 소울메이트입니다."
	        };
	
	        // 게이지 바 채우기
	        var heartSignalFill = document.getElementById("heartSignalFill");
	        heartSignalFill.style.width = gradePercent[userGrade] + "%"; // 등급에 맞는 게이지 퍼센트
	
	        // 텍스트 변경
	        var gradeTextElement = document.getElementById("gradeText");
	        gradeTextElement.innerHTML = gradeText[userGrade]; // 등급에 맞는 설명 텍스트
	    });
    </script>
</body>
</html>