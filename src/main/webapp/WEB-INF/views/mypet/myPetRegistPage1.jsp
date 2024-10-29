<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>내새꾸 등록</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<link rel="stylesheet" href="/static/css/mypet/mypetRegist.css" />
</head>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById("submitBtn");
    const petNameInput = document.getElementById("petName");
    
    // 초기에는 비활성화
    submitBtn.disabled = true;

    // 이름 입력란에 입력이 있을 때마다 유효성 검사
    petNameInput.addEventListener('input', function() {
        const nameLength = petNameInput.value.length;
        // 이름 길이가 1~8 사이면 버튼 활성화, 아니면 비활성화
        submitBtn.disabled = nameLength < 1 || nameLength > 8;
    });

    const dogImg = document.getElementById('dogImg');
    const catImg = document.getElementById('catImg');
    const dogRadio = document.querySelector('input[value="dog"]');
    const catRadio = document.querySelector('input[value="cat"]');
    
    // 강아지 이미지를 클릭하면 강아지 라디오 버튼 선택
    dogImg.addEventListener('click', function() {
        dogRadio.checked = true;
    });

    // 고양이 이미지를 클릭하면 고양이 라디오 버튼 선택
    catImg.addEventListener('click', function() {
        catRadio.checked = true;
    });
});
</script>
<body>
	<c:if test="${not empty fromJoin }">
		<script>
            alert("${fromJoin}");
        </script>
	</c:if>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	
	<div id="container">
		<div id="top">
			<h1>반가워요 <span style='color: #ff4081; font-size: 45px;'>${sessionScope.loginUser.mem_nick }</span> 님!</h1>
			<h2>우리아이를 등록하시면 상품 추천이 80% 더 정확해져요!</h2>
		</div>
		<form action="myPetRegistPage2" method="post">
			<div id="bottom">
				<div id="left">
					<h2>어떤 반려동물과 함께하고 계신가요?</h2>
					<div id="dogDiv">
						<img id="dogImg" src="<c:url value='/static/Images/mypet/dogImg1.png'/>" alt=""> <br />
						<input type="radio" name="petType" value="dog" checked />강아지
					</div>
					<div id="catDiv">
						<img id="catImg" src="<c:url value='/static/Images/mypet/catImg1.png'/>" alt=""> <br />
						<input type="radio" name="petType" value="cat" />고양이
					</div>
				</div>
				<div id="right">
					<h2>이름을 입력해 주세요</h2> <br />
					<input id="petName" name="petName" type="text" placeholder="1~8 이내로 입력해 주세요"/> <br />
					<input type="submit" id="submitBtn" name="submitBtn" value="다음" /> <br /> <br />
					<a style="margin-left: 360px; color: gray; font-size: 18px;" href="/">건너뛰기</a>
				</div>
			</div>
		</form>
	</div>	
</body>
</html>