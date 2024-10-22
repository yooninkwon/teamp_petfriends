<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
	
	<h3><strong>${loginUser.mem_name}</strong>님과 펫프의 하트시그널은 <strong style="color: #11abb1;">${userGrade.g_name}</strong>입니다.</h3>
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
    
    <div class="grade-info-container">
	    <h3 style="padding-right: 300px ">펫프 회원 등급 안내</h3>
	    <img src="/static/Images/mypage/grade_info.png" style="width: 500px;" />
	    
	    <div class="grade-box-container">
		    <div class="grade-box <c:if test="${userGrade.g_name eq '설렘시작'}">highlight</c:if>">
			    <div class="grade-row">
	            	<div class="grade-name">
				        <h3 style="margin: 0;">설렘시작</h3>
				        <p class="grade-description">첫 구매 전</p>
				    </div>
		            <div class="divider"></div>
		            <div class="grade-details">
				        <p>0.5% 적립율</p>
				        <p>신규가입 5천원 쿠폰</p>
		            </div>
		        </div>
		    </div>
		    
		    <div class="grade-box <c:if test="${userGrade.g_name eq '몽글몽글'}">highlight</c:if>">
			    <div class="grade-row">
	            	<div class="grade-name">
				        <h3 style="margin: 0;">몽글몽글</h3>
				        <p class="grade-description">7만원 미만</p>
				    </div>
		            <div class="divider"></div>
		            <div class="grade-details">
				        <p>0.5% 적립율</p>
				        <p>몽글몽글 전용 쿠폰팩</p>
		            </div>
		        </div>
		    </div>
		    
		    <div class="grade-box <c:if test="${userGrade.g_name eq '두근두근'}">highlight</c:if>">
			    <div class="grade-row">
	            	<div class="grade-name">
				        <h3 style="margin: 0;">두근두근</h3>
				        <p class="grade-description">7만원 이상 ~ 14만원 미만</p>
				    </div>
		            <div class="divider"></div>
		            <div class="grade-details">
				        <p>1% 적립율</p>
				        <p>두근두근 전용 쿠폰팩</p>
		            </div>
		        </div>
		    </div>
		    
		    <div class="grade-box <c:if test="${userGrade.g_name eq '콩닥콩닥'}">highlight</c:if>">
			    <div class="grade-row">
	            	<div class="grade-name">
				        <h3 style="margin: 0;">콩닥콩닥</h3>
				        <p class="grade-description">14만원 이상 ~ 21만원 미만</p>
				    </div>
		            <div class="divider"></div>
		            <div class="grade-details">
				        <p>1.5% 적립율</p>
				        <p>콩닥콩닥 전용 쿠폰팩</p>
		            </div>
		        </div>
		    </div>
		    
		    <div class="grade-box <c:if test="${userGrade.g_name eq '심쿵주의'}">highlight</c:if>">
			    <div class="grade-row">
	            	<div class="grade-name">
				        <h3 style="margin: 0;">심쿵주의</h3>
				        <p class="grade-description">21만원 이상 ~ 40만원 미만</p>
				    </div>
		            <div class="divider"></div>
		            <div class="grade-details">
				        <p>2% 적립율</p>
				        <p>심쿵주의 전용 쿠폰팩</p>
		            </div>
		        </div>
		    </div>
		    
		    <div class="grade-box <c:if test="${userGrade.g_name eq '평생연분'}">highlight</c:if>">
			    <div class="grade-row">
	            	<div class="grade-name">
				        <h3 style="margin: 0;">평생연분</h3>
				        <p class="grade-description">40만원 이상</p>
				    </div>
		            <div class="divider"></div>
		            <div class="grade-details">
				        <p>2.5% 적립율</p>
				        <p>평생연분 전용 쿠폰팩</p>
		            </div>
		        </div>
		    </div>
		    
		    <div class="grade-info">
		        <h4>하트시그널 (회원 등급) 기준 안내</h4>
		        <p>매월 1일, 이전 3개월간 구매확정금액 기준으로 새로운 회원 등급이 부여됩니다.</p>
		        <p>회원 등급은 매월 1일 오전 2시에 갱신됩니다.</p>
		        <p>예상 등급이란 현재 기준으로 다음 달 1일 변경 예정인 등급이며, 구매확정금액으로 산정하여 구매확정 즉시 반영됩니다.</p>
		        <p>구매확정금액 산정 시 쿠폰 할인액, 적립금 사용액, 배송비는 제외됩니다.</p>
		        <p>회원 등급별 혜택과 기준은 내부 사정에 의해 향후 변경될 수 있습니다.</p>
		    </div>
		</div>
	
	</div>
    
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