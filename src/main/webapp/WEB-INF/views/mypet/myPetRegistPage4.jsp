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
				<input type="button" value="네, 있어요" onclick="selectAllergy(this)" />
				<input type="button" value="아니요, 없어요" onclick="selectAllergy(this)" />
			</div>
			<input type="text" id="allergyInput" name="allergyInput" placeholder="알러지를 모두 입력 해 주세요" />
			
			<input type="hidden" name="petName" value="${petName }" />
			<input type="hidden" name="petType" value="${petType }" />
			<input type="hidden" name="petImg" value="${petImg }" />
			<input type="hidden" name="petDetailType" value="${petDetailType }" />
			<input type="hidden" name="petBrith" value="${petBrith }" />
			<input type="hidden" name="petGender" value="${petGender }" />
			<input type="hidden" name="petNeut" value="${petNeut }" />
			<input type="hidden" name="petWeight" value="${petWeight }" />
			<input type="hidden" name="petBodyType" value="${petBodyType }" />
			
			<input type="submit" id="submitBtn" value="다음" />
		</form>
	</div>
<script>
let selectedInfos = []; // 선택된 관심사를 저장할 배열

function selectInfo(selectedButton) {
    const infoInput = document.querySelector("input[placeholder='직접 작성하기']");

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

function selectAllergy(selectedButton) {
    const allergyButtons = document.querySelectorAll("#allerge input[type='button']");
    allergyButtons.forEach(btn => {
        btn.style.backgroundColor = "white";
        btn.style.color = "gray";
        btn.style.border = "1px solid gray";  
    });
	
    if (selectedButton.value === "네, 있어요") {
    	document.getElementById('allergyInput').style.display = "block";
    } else {
    	document.getElementById('allergyInput').style.display = "none";
    }
    
    selectedButton.style.backgroundColor = "#ff4081";
    selectedButton.style.border = "none";
    selectedButton.style.color = "white";
}
</script>
</body>
</html>