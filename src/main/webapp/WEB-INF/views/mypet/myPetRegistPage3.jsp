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
	
	<div id="container2">
		<form action="myPetRegistPage4" method="post">
			<h1>[ <span style="font-size: 40px; color: #ff4081;">${petName}</span> ] 는
			<span style="font-size: 25px;">(은)</span>
			[ <span style="font-size: 40px; color: #ff4081;">${petDetailType}</span> ] <br />이군요! 조금만 더 알려주시겠어요?</h1>
			
			<div id="gender-group">
				<h2>성별을 선택해주세요*</h2>
				<input type="button" id="genderBtn" value="남아" onclick="selectGender(this)" />
				<input type="button" id="genderBtn" value="여아" onclick="selectGender(this)" />
				
			</div>
			
			<div id="neut">
				<h2>중성화 여부*</h2>
				<input type="button" name="neutering" id="neutering" value="완료했어요!" onclick="selectNeut(this)" />
				<input type="button" name="neutering" id="neutering" value="안했어요!" onclick="selectNeut(this)" /> 
			</div>
			
			<div id="weight-group">
				<h2>몸무게를 입력해주세요(kg)</h2>
				<input type="number" id="weight" name="weight" placeholder="-모름-" step="0.01" max="99.9"/>
			</div>
			
			<div id="body-group">
				<h2>체형을 선택해주세요*</h2>
				<input type="button" id="bodyBtn" value="날씬해요" onclick="selectBodyType(this)" />
				<input type="button" id="bodyBtn" value="적당해요" onclick="selectBodyType(this)" />
				<input type="button" id="bodyBtn" value="통통해요" onclick="selectBodyType(this)" />
			</div>
			
			<input type="hidden" name="petName" value="${petName }" />
			<input type="hidden" name="petType" value="${petType }" />
			<input type="hidden" name="petImg" value="${petImg }" />
			<input type="hidden" name="petDetailType" value="${petDetailType }" />
			<input type="hidden" name="petBirth" value="${petBirth }" />
			<input type="hidden" id="petGender" name="petGender" value="" />
			<input type="hidden" id="petNeut" name="petNeut" value="" />
			<input type="hidden" id="petBodyType" name=petBodyType value="" />
			
			<input type="submit" id="submitBtn" value="다음" />
		</form>
	</div>
	
	<script>
    function selectGender(selectedButton) {
        const genderButtons = document.querySelectorAll("#gender-group input[type='button']");
        genderButtons.forEach(btn => {
            btn.style.backgroundColor = "white";
            btn.style.color = "gray";
            btn.style.border = "1px solid gray";  
        });

        selectedButton.style.backgroundColor = "#ff4081";
        selectedButton.style.border = "none";
        selectedButton.style.color = "white";
        document.getElementById('petGender').value = selectedButton.value;
        
        checkSelections();  // 선택 체크 함수 호출
    }

    function selectNeut(selectedButton) {
        const NeutButtons = document.querySelectorAll("#neut input[type='button']");
        NeutButtons.forEach(btn => {
            btn.style.backgroundColor = "white";
            btn.style.color = "gray";
            btn.style.border = "1px solid gray";  
        });

        selectedButton.style.backgroundColor = "#ff4081";
        selectedButton.style.border = "none";
        selectedButton.style.color = "white";
        document.getElementById('petNeut').value = selectedButton.value;
        
        checkSelections();  // 선택 체크 함수 호출
    }

    function selectBodyType(selectedButton) {
        const bodyButtons = document.querySelectorAll("#body-group input[type='button']");
        bodyButtons.forEach(btn => {
            btn.style.backgroundColor = "white";
            btn.style.color = "gray";
            btn.style.border = "1px solid gray";  
        });

        selectedButton.style.backgroundColor = "#ff4081";
        selectedButton.style.border = "none";
        selectedButton.style.color = "white";
        document.getElementById('petBodyType').value = selectedButton.value;
        
        checkSelections();  // 선택 체크 함수 호출
    }

    function checkSelections() {
        const genderSelected = document.getElementById('petGender').value !== "";
        const neutSelected = document.getElementById('petNeut').value !== "";
        const bodyTypeSelected = document.getElementById('petBodyType').value !== "";

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = !(genderSelected && neutSelected && bodyTypeSelected);
    }

    // 초기화 시 submit 버튼 비활성화
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('submitBtn').disabled = true;
    });
</script>
</body>
</html>