<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>내새꾸 등록</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/mypet/mypetRegist.css" />
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	
	<!-- 팝업 배경 -->
    <div id="popupBackground" style="display:none; position:fixed; top:0; left:0; width:100%;
    height:100%; background-color:rgba(0,0,0,0.5); z-index:999;"></div>
    
	
	<div id="container2">
		<form action="myPetRegistPage3" method="post" enctype="multipart/form-data">
			<h1>함께하는 [ <span style="font-size: 40px; color: #ff4081;">${petName}</span> ] 는
			<span style="font-size: 25px;">(은)</span> 어떤 아이인가요?</h1>
			<div id="photo">
				<div class="upload-container" onclick="document.getElementById('uploadInput').click()" >
				    <input type="file" class="upload-input" name="petImg" accept="image/*" id="uploadInput" style="display:none;" />
				    <input type="hidden" name="petImgFileName" id="petImgFileName" />
				    <img id="preview" alt="" />
				</div>
				<div class="upload-btn" onclick="document.getElementById('uploadInput').click()">
					<img id="plus" src="<c:url value='/static/Images/mypet/plus.png'/>" alt="">
				</div>
			</div>
			<h4>* 이미지는 기본 가로 500px 로 저장됩니다.</h4>
			<div id="bottom2">
				<div id="type">
					<label for="" style="font: bold; font-size: 25px;" >
					<c:choose>
				        <c:when test="${petType eq 'dog'}">견종</c:when>
				        <c:otherwise>묘종</c:otherwise>
				    </c:choose>을 선택 해 주세요</label> <br />
					<input type="text" id="detailType" name="detailType" onclick="openPopup()" readonly />
				</div>
				<div id="birth">
					<label for="" style="font: bold; font-size: 25px;" >생일을 입력 해 주세요</label> <br />
					<input type="date" name="petBirth" id="petBirth" />
				</div> <br />
			</div>
			<div>
				<input style="" type="submit" id="submitBtn" value="다음" />
			</div>
			<input type="hidden" name="petName" value="${petName }" />
			<input type="hidden" name="petType" value="${petType }" />
		</form>
	</div>
	
	<!-- 팝업 HTML -->
    <div id="popupBackground"></div>
    <div id="popup">
        <span class="close-btn" onclick="closePopup()">×</span>
        <h2>
        <c:choose>
	        <c:when test="${petType eq 'dog'}">견종</c:when>
	        <c:otherwise>묘종</c:otherwise>
	    </c:choose>선택
	    </h2>
        <!-- 검색창 추가 -->
        <input type="text" id="searchBreed" placeholder="<c:choose>
	        <c:when test="${petType eq 'dog'}">견종</c:when><c:otherwise>묘종</c:otherwise></c:choose>을 입력하세요"
	        onkeyup="filterBreeds()">
                    
        <ul class="breed-list" id="breedList">
        	<c:if test="${petType eq 'dog'}">
            <li>세상에 하나뿐인 믹스</li>
			<li>고든 세터</li>
			<li>골든 두들</li>
			<li>골든 리트리버</li>
			<li>그레이 하운드</li>
			<li>그레이트 데인</li>
			<li>그레이트 스위스 마운틴 도그</li>
			<li>그레이트 피레니즈</li>
			<li>그린란드 독</li>
			<li>그리폰 브뤼셀</li>
			<li>기슈견</li>
			<li>나폴리탄 마스티프</li>
			<li>노르웨이언 엘크 하운드</li>
			<li>노리치 테리어</li>
			<li>노바 스코샤 덕 톨링 리트리버</li>
			<li>뉴펀들랜드</li>
			<li>닥스훈트</li>
			<li>달마시안</li>
			<li>댄디 딘몬트 테리어</li>
			<li>도베르만 핀셔</li>
			<li>도사견</li>
			<li>동경이</li>
			<li>라사압소</li>
			<li>라브라도 리트리버</li>
			<li>라이카</li>
			<li>래트 테리어</li>
			<li>레온베르거</li>
			<li>말라뮤트</li>
			<li>말티즈</li>
			<li>맨체스터 테리어</li>
			<li>미니어처 슈나우저</li>
			<li>미니어처 핀셔</li>
			<li>바센지</li>
			<li>바셋 하운드</li>
			<li>버니즈 마운틴 도그</li>
			<li>베들링턴 테리어</li>
			<li>벨기에 마리노이즈</li>
			<li>벨기에 셰퍼드 독</li>
			<li>벨지안 그리펀</li>
			<li>보더 콜리</li>
			<li>보르조이</li>
			<li>보스롱</li>
			<li>복서</li>
			<li>볼로네즈</li>
			<li>불 테리어</li>
			<li>불도그</li>
			<li>브뤼셀 그리펀</li>
			<li>브리아드</li>
			<li>블랙 래브라도</li>
			<li>비글</li>
			<li>비숑 프리제</li>
			<li>비어디드 콜리</li>
			<li>빠삐용</li>
			<li>사모예드</li>
			<li>삽살개</li>
			<li>샤페이</li>
			<li>세인트 버나드</li>
			<li>셔틀랜드 쉽독</li>
			<li>슈나우저</li>
			<li>시바견</li>
			<li>시베리안 허스키</li>
			<li>시츄</li>
			<li>아나톨리안 셰퍼드</li>
			<li>아메리칸 불리</li>
			<li>아메리칸 불도그</li>
			<li>아메리칸 스태퍼드셔 테리어</li>
			<li>아메리칸 에스키모</li>
			<li>아이리쉬 세터</li>
			<li>아이리쉬 울프하운드</li>
			<li>아키타</li>
			<li>알래스칸 말라뮤트</li>
			<li>에어데일 테리어</li>
			<li>오스트레일리안 셰퍼드</li>
			<li>오스트레일리안 캐틀 독</li>
			<li>올드 잉글리쉬 불독</li>
			<li>올드 잉글리쉬 시프도그</li>
			<li>와이마라너</li>
			<li>웰시 코기</li>
			<li>요크셔 테리어</li>
			<li>웨스트 하일랜드 화이트 테리어</li>
			<li>울프독</li>
			<li>잉글리쉬 세터</li>
			<li>잉글리쉬 불독</li>
			<li>잭 러셀 테리어</li>
			<li>진돗개</li>
			<li>차우차우</li>
			<li>치와와</li>
			<li>카발리에 킹 찰스 스패니얼</li>
			<li>카네 코르소</li>
			<li>캐벌리어 킹 찰스 스패니얼</li>
			<li>캐틀 도그</li>
			<li>케언 테리어</li>
			<li>케리 블루 테리어</li>
			<li>코커 스패니얼</li>
			<li>콜리</li>
			<li>쿠바견</li>
			<li>크랩스핑어허스키</li>
			<li>클럼버 스패니얼</li>
			<li>티베탄 마스티프</li>
			<li>파라오 하운드</li>
			<li>파푸아견</li>
			<li>퍼그</li>
			<li>펨브로크 웰시 코기</li>
			<li>포인터</li>
			<li>포메라니안</li>
			<li>푸들</li>
			<li>프렌치 불도그</li>
			<li>플랫코티드 리트리버</li>
			<li>피레니언 마스티프</li>
			</c:if>
			
			<c:if test="${petType eq 'cat' }">
			<li>세상에 하나뿐인 믹스</li>
			<li>노르웨이 숲</li>
			<li>데본 렉스</li>
			<li>라가머핀</li>
			<li>라그돌</li>
			<li>러시안 블루</li>
			<li>먼치킨</li>
			<li>메인쿤</li>
			<li>버만</li>
			<li>벵갈</li>
			<li>봄베이</li>
			<li>브리티쉬 숏헤어</li>
			<li>샤르트뢰</li>
			<li>세이셸루아</li>
			<li>셀커크 렉스</li>
			<li>소말리</li>
			<li>스코티시 폴드</li>
			<li>스핑크스</li>
			<li>시베리안</li>
			<li>시암</li>
			<li>싱가퓨라</li>
			<li>아메리칸 쇼트헤어</li>
			<li>아비시니안</li>
			<li>오리엔탈 숏헤어</li>
			<li>이집션 마우</li>
			<li>재패니즈 밥테일</li>
			<li>카니시안 밥테일</li>
			<li>코니시 렉스</li>
			<li>코랏</li>
			<li>킴릭</li>
			<li>페르시안</li>
			<li>픽시밥</li>
			<li>하바나 브라운</li>
			<li>히말라얀</li>
			</c:if>
        </ul>
    </div>
	
	<script>
		// 사진 업로드
	    document.getElementById('uploadInput').addEventListener('change', function(event) {
	        const file = event.target.files[0];
	        if (file) {
	            const fileName = file.name; // 파일 이름 저장
	            document.getElementById('petImgFileName').value = fileName; // 파일 이름을 hidden input에 저장
	            const reader = new FileReader();
	            
	            reader.onload = function(e) {
	                const previewImage = document.getElementById('preview');
	                previewImage.src = e.target.result;
	                previewImage.style.display = 'block'; // 이미지를 보여줌
	                previewImage.style.width = '500px';// 배경 이미지 크기를 500px로 고정
	
	                console.log('파일 이름:', fileName); // 파일 이름을 콘솔에 출력
	            }
	            reader.readAsDataURL(file); // 파일을 데이터 URL로 읽음
	        }
	    });
	    
	    // 팝업 열기
	    function openPopup() {
	        document.getElementById('popupBackground').style.display = 'block';
	        document.getElementById('popup').style.display = 'block';
	    }

	    // 팝업 닫기
	    function closePopup() {
	        document.getElementById('popupBackground').style.display = 'none';
	        document.getElementById('popup').style.display = 'none';
	    }

	    // 견종 선택 시 값 넣기
	    document.querySelectorAll('.breed-list li').forEach(function(item) {
	        item.addEventListener('click', function() {
	            document.getElementById('detailType').value = this.innerText;
	            closePopup(); // 선택 후 팝업 닫기
	            checkFormCompletion(); // 견종 선택 시 유효성 검사 호출
	        });
	    });

	    // 검색 필터 기능
	    function filterBreeds() {
	        const searchInput = document.getElementById('searchBreed').value.toLowerCase();
	        const breeds = document.querySelectorAll('.breed-list li');

	        breeds.forEach(function(breed) {
	            const breedText = breed.textContent.toLowerCase();
	            if (breedText.indexOf(searchInput) > -1) {
	                breed.style.display = "";
	            } else {
	                breed.style.display = "none";
	            }
	        });
	    }
	    
	    // 견종과 생일이 입력되었는지 확인하여 버튼 활성화
	    function checkFormCompletion() {
	        const detailType = document.getElementById('detailType').value;
	        const petBirth = document.getElementById('petBirth').value;
	        const submitBtn = document.getElementById('submitBtn');

	        // detailType과 petBirth가 모두 값이 있을 때만 버튼 활성화
	        submitBtn.disabled = !(detailType && petBirth);
	    }

	    // 페이지 로드 시 및 생일 입력 시 유효성 검사
	    document.addEventListener("DOMContentLoaded", function() {
	        const dateInput = document.getElementById("petBirth");
	        const submitBtn = document.getElementById("submitBtn");
	        submitBtn.disabled = true;
	        // dateInput을 클릭할 때 바로 날짜 선택창 열기
	        dateInput.addEventListener("focus", function() {
	            dateInput.showPicker();  // 날짜 선택창을 바로 표시
	        });
	        
	        // 생일 입력 시 유효성 검사 호출
	        dateInput.addEventListener("input", checkFormCompletion);
	    });
	</script>
</body>
</html>