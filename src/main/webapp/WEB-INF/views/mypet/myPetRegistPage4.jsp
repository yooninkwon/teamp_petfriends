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
		<form action="myPetRegistPage5" method="post">
			<h1>마지막이에요! [ <span style="font-size: 40px; color: #ff4081;">${petName}</span> ]에 대해 <br /> 자세히 알려주세요!
			</h1>
			
			<div id="info">
				<h2>[선택] 아이의 어떤 건강에 관심이 있으신가요?</h2>
				<table class="selectInfo">
					<tr>
						<td><input type="button" value="관절" onclick="selectInfo(this)" /></td>
						<td><input type="button" value="모질" onclick="selectInfo(this)" /></td>
						<td><input type="button" value="소화기" onclick="selectInfo(this)" /></td>
					</tr>
					<tr>
						<td><input type="button" value="눈" onclick="selectInfo(this)" /></td>
						<td><input type="button" value="눈물" onclick="selectInfo(this)" /></td>
						<td><input type="button" value="체중" onclick="selectInfo(this)" /></td>
					</tr>
					<tr>
						<td><input type="button" value="치아" onclick="selectInfo(this)" /></td>
						<td><input type="button" value="피부" onclick="selectInfo(this)" /></td>
						<td><input type="button" value="신장" onclick="selectInfo(this)" /></td>
					</tr>
					<tr>
						<td><input type="button" value="귀" onclick="selectInfo(this)" /></td>
						<td><input type="button" value="심장" onclick="selectInfo(this)" /></td>
						<td><input type="button" value="호흡기" onclick="selectInfo(this)" /></td>
					</tr>
				</table>
				<input type="text" id="petInterInfo" name="petInterInfo" placeholder="직접 작성하기" />
			</div> <br />
			
			<div id="allerge">
				<h2>[선택] 아이가 혹시 알러지가 있나요?</h2>
				<input type="button" value="네, 있어요" onclick="visibleAllergy(this)" />
				<input type="button" value="아니요, 없어요" onclick="visibleAllergy(this)" />
			</div> <br />
			
		    <div id="allerge-input" >
		            <h2>단백질원</h2>
		            <table class="selectAllerge1">
		            	<tr>
							<td><input type="button" value="소" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="돼지" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="양" onclick="selectAllerge(this)" /></td>
						</tr>
						<tr>
							<td><input type="button" value="오리" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="닭" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="칠면조" onclick="selectAllerge(this)" /></td>
						</tr>
						<tr>
							<td><input type="button" value="연어" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="참치" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="삼치" onclick="selectAllerge(this)" /></td>
						</tr>
						<tr>
							<td><input type="button" value="캥거루" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="흑염소" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="사슴" onclick="selectAllerge(this)" /></td>
						</tr>
		            	<tr>
							<td><input type="button" value="계란" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="뼈간식" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="치즈" onclick="selectAllerge(this)" /></td>
						</tr>
						<tr>
							<td><input type="button" value="펫밀크" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="우유" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="치즈" onclick="selectAllerge(this)" /></td>
						</tr>
		            </table>
		            <h2>기타</h2>
		            <table class="selectAllerge1">
		            	<tr>
							<td><input type="button" value="콩" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="옥수수" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="귀리" onclick="selectAllerge(this)" /></td>
						</tr>
						<tr>
							<td><input type="button" value="밀가루" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="고구마" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="감자" onclick="selectAllerge(this)" /></td>
						</tr>
						<tr>
							<td><input type="button" value="단호박" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="양배추" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="브로콜리" onclick="selectAllerge(this)" /></td>
						</tr>
						<tr>
							<td><input type="button" value="사과" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="바나나" onclick="selectAllerge(this)" /></td>
							<td><input type="button" value="크랜베리" onclick="selectAllerge(this)" /></td>
						</tr>
		            </table>
		            <input type="text" id="petInterAllerge" name="petInterAllerge" placeholder="직접 작성하기" />      
		    </div>
			
			<input type="hidden" name="petName" value="${petName }" />
			<input type="hidden" name="petType" value="${petType }" />
			<input type="hidden" name="petImg" value="${petImg }" />
			<input type="hidden" name="petDetailType" value="${petDetailType }" />
			<input type="hidden" name="petBirth" value="${petBirth }" />
			<input type="hidden" name="petGender" value="${petGender }" />
			<input type="hidden" name="petNeut" value="${petNeut }" />
			<input type="hidden" name="petWeight" value="${petWeight }" />
			<input type="hidden" name="petBodyType" value="${petBodyType }" />
			
			<input type="submit" id="submitBtn" style="margin-bottom: 100px;" value="다음" />
		</form>
	</div>
<script>
let selectedInfos = []; // 선택된 관심사를 저장할 배열
let selectedAllerges = []; // 알러지 배열 초기화

function selectInfo(selectedButton) {
    const infoInput = document.getElementById("petInterInfo");

    // 버튼이 이미 선택된 경우, 선택 해제
    if (selectedButton.style.backgroundColor === "rgb(255, 64, 129)") {
        selectedButton.style.backgroundColor = "white";
        selectedButton.style.color = "gray";
        selectedButton.style.border = "1px solid gray";

        // 선택된 관심사 배열에서 해당 항목 제거
        selectedInfos = selectedInfos.filter(info => info !== selectedButton.value);
    } else {
        // 버튼을 선택된 스타일로 변경
        selectedButton.style.backgroundColor = "#ff4081";
        selectedButton.style.border = "none";
        selectedButton.style.color = "white";

        // 선택된 관심사 배열에 추가
        selectedInfos.push(selectedButton.value);
    }

    // 콤마로 구분하여 입력 필드에 표시
    infoInput.value = selectedInfos.join(", ");
}

function selectAllerge(selectedButton) {
    const allergeInput = document.getElementById("petInterAllerge");

    // 버튼이 이미 선택된 경우, 선택 해제
    if (selectedButton.style.backgroundColor === "rgb(255, 64, 129)") {
        selectedButton.style.backgroundColor = "white";
        selectedButton.style.color = "gray";
        selectedButton.style.border = "1px solid gray";

        // 선택된 항목 배열에서 해당 항목 제거
        selectedAllerges = selectedAllerges.filter(info => info !== selectedButton.value);
    } else {
        // 버튼을 선택된 스타일로 변경
        selectedButton.style.backgroundColor = "#ff4081";
        selectedButton.style.border = "none";
        selectedButton.style.color = "white";

        // 선택된 항목 배열에 추가
        selectedAllerges.push(selectedButton.value);
    }

    // 콤마로 구분하여 입력 필드에 표시
    allergeInput.value = selectedAllerges.join(", ");
}

function visibleAllergy(selectedButton) {
    const allergyButtons = document.querySelectorAll("#allerge input[type='button']");
    allergyButtons.forEach(btn => {
        btn.style.backgroundColor = "white";
        btn.style.color = "gray";
        btn.style.border = "1px solid gray";  
    });

    if (selectedButton.value === "네, 있어요") {
        document.getElementById('allerge-input').style.display = "block";
    } else {
        document.getElementById('allerge-input').style.display = "none";
    }

    selectedButton.style.backgroundColor = "#ff4081";
    selectedButton.style.border = "none";
    selectedButton.style.color = "white";
}
window.onload = function() {
    const noButton = document.querySelector("#allerge input[value='아니요, 없어요']");
    if (noButton) {
        visibleAllergy(noButton);
    }
};
</script>
</body>
</html>