<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	mypage_body
</title>
</head>
<body>
<h2>우리아이 정보 수정</h2>
<form action="/mypage/modifyPet?petCode=${info.pet_code }" method="post" enctype="multipart/form-data" style="width: 60%" onsubmit="gatherMultiSelect()">
	<div id="pet-modify-container">
        <div class="pet-image" style="margin: 0 auto;" onclick="document.getElementById('uploadInput').click()">
 			<c:choose>
	    		<c:when test="${info.pet_img ne null }">
			        <img id="previewImg" src="<c:url value='/static/Images/pet/${info.pet_img }' />" />
	    		</c:when>
	    		<c:when test="${info.pet_img eq null }">
	    			<i class="fa-solid fa-camera" style="color: #ffffff; font-size: 90px"></i>
	    		</c:when>
	    	</c:choose>
 			<i class="fa-solid fa-arrow-up-from-bracket mark" style="color: #ffffff;"></i>
	    </div>
	    <input type="file" name="petImgFile" accept="image/*" id="uploadInput" style="display:none;" onchange="previewImage(event)" />
		
		<div class="input-section">
            <input id="petName" name="petName" type="text" value="${info.pet_name }" placeholder="1~8 이내로 입력해 주세요" oninput="validatePetName()" />
            <span id="petNameError" class="pet-error-msg">* 한글, 영문, 숫자 혼합 1~8자만 사용 가능합니다.</span>
        </div>
		
        <div class="input-section">
            <input type="text" value="${info.pet_breed }" disabled />
        </div>
		
        <div class="input-section">
            <input type="text" value="${info.pet_birth }" disabled />
        </div>

        <div class="input-section">
	        <div class="choose-section">
	            <button class="genderBtn" onclick="genderOption(this)">남아</button>
	            <button class="genderBtn" onclick="genderOption(this)">여아</button>
	        </div>
	        <input type="hidden" name="petGender" id="petGender" />
        </div>
        
        <div class="input-section">
            <select id="petWeight" name="petWeight">
	            <option value="- 모름 -">- 모름 -</option>
	            <option value="0kg 이상 ~ 1kg 미만">0kg 이상 ~ 1kg 미만</option>
	            <option value="1kg 이상 ~ 2kg 미만">1kg 이상 ~ 2kg 미만</option>
	            <option value="2kg 이상 ~ 3kg 미만">2kg 이상 ~ 3kg 미만</option>
	            <option value="3kg 이상 ~ 4kg 미만">3kg 이상 ~ 4kg 미만</option>
	            <option value="4kg 이상 ~ 5kg 미만">4kg 이상 ~ 5kg 미만</option>
	            <option value="5kg 이상 ~ 7kg 미만">5kg 이상 ~ 7kg 미만</option>
	            <option value="7kg 이상 ~ 9kg 미만">7kg 이상 ~ 9kg 미만</option>
	            <option value="9kg 이상 ~ 11kg 미만">9kg 이상 ~ 11kg 미만</option>
	            <option value="11kg 이상 ~ 14kg 미만">11kg 이상 ~ 14kg 미만</option>
	            <option value="14kg 이상 ~ 17kg 미만">14kg 이상 ~ 17kg 미만</option>
	            <option value="17kg 이상 ~ 20kg 미만">17kg 이상 ~ 20kg 미만</option>
	            <option value="20kg 이상 ~ 24kg 미만">20kg 이상 ~ 24kg 미만</option>
	            <option value="24kg 이상 ~ 28kg 미만">24kg 이상 ~ 28kg 미만</option>
	            <option value="28kg 이상 ~ 32kg 미만">28kg 이상 ~ 32kg 미만</option>
	            <option value="32kg 이상 ~ 37kg 미만">32kg 이상 ~ 37kg 미만</option>
	            <option value="37kg 이상 ~ 42kg 미만">37kg 이상 ~ 42kg 미만</option>
	            <option value="42kg 이상 ~ 47kg 미만">42kg 이상 ~ 47kg 미만</option>
	            <option value="47kg 이상 ~ 52kg 미만">47kg 이상 ~ 52kg 미만</option>
	            <option value="52kg 이상">52kg 이상</option>
        	</select>
        </div>
        
        <div class="input-section">
	        <div class="choose-section">
	            <button class="neutBtn" onclick="neutOption(this)">중성화 했어요</button>
	            <button class="neutBtn" onclick="neutOption(this)">중성화 안했어요</button>
	        </div>
	        <input type="hidden" name="petNeut" id="petNeut" />
        </div>
        
        <div class="input-section">
	        <div class="choose-section">
	            <button class="formBtn" onclick="formOption(this)">날씬해요</button>
	            <button class="formBtn" onclick="formOption(this)">적당해요</button>
	            <button class="formBtn" onclick="formOption(this)">통통해요</button>
	        </div>
	        <input type="hidden" name="petForm" id="petForm" />
        </div>
        
        <div class="input-section">
            <label for="careBtn">[선택] 아이의 어떤 건강에 관심이 있으신가요?</label><br />
	        <div class="choose-section">
	            <button class="careBtn" onclick="careOption(this)">관절</button>
	            <button class="careBtn" onclick="careOption(this)">모질</button>
	            <button class="careBtn" onclick="careOption(this)">소화기</button>
	            <button class="careBtn" onclick="careOption(this)">눈</button>
	            <button class="careBtn" onclick="careOption(this)">눈물</button>
	            <button class="careBtn" onclick="careOption(this)">체중</button>
	            <button class="careBtn" onclick="careOption(this)">치아</button>
	            <button class="careBtn" onclick="careOption(this)">피부</button>
	            <button class="careBtn" onclick="careOption(this)">신장</button>
	            <button class="careBtn" onclick="careOption(this)">귀</button>
	            <button class="careBtn" onclick="careOption(this)">심장</button>
	            <button class="careBtn" onclick="careOption(this)">호흡기</button>
	            <input id="careInput" type="text" placeholder="직접 작성하기">
	        </div>
	        <input type="hidden" name="petCare" id="petCare" />
        </div>
        
        <div class="input-section">
            <label for="booleanBtn">[선택] 아이가 혹시 알러지가 있나요?</label><br />
	        <div class="choose-section">
	            <button class="booleanBtn" onclick="booleanOption(this); showNextContainer4(true);">네, 있어요</button>
	            <button class="booleanBtn" onclick="booleanOption(this); hideNextContainer4();">아니오, 없어요</button>
	        </div>
        </div>
    </div>
    
    <div id="pet-regist-container4" style="display: none;">
    	<div class="input-section">
            <label>어떤 알러지가 있나요?</label><br />
            
            <label>주 단백질원</label><br />
	        <div class="choose-section">
	            <button class="allergyBtn" onclick="allergyOption(this)">소</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">돼지</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">양</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">오리</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">닭</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">칠면조</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">연어</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">참치</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">삼치</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">캥거루</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">흑염소</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">사슴</button>
	        </div>
            
            <label>보조 단백질원</label><br />
	        <div class="choose-section">
	            <button class="allergyBtn" onclick="allergyOption(this)">계란</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">뼈간식</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">멸치</button>
	            <button class="allergyBtn" onclick="allergyOption(this)" style="padding: 5px">우유<br />(펫밀크제외)</button>
	            <button class="allergyBtn" onclick="allergyOption(this)" style="padding: 5px">우유<br />(펫밀크포함)</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">치즈</button>
	        </div>
            
            <label>기타</label><br />
	        <div class="choose-section">
	            <button class="allergyBtn" onclick="allergyOption(this)">콩</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">옥수수</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">귀리</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">밀가루</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">고구마</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">감자</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">단호박</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">양배추</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">브로콜리</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">사과</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">바나나</button>
	            <button class="allergyBtn" onclick="allergyOption(this)">크렌베리</button>
	            <input id="allergyInput" type="text" placeholder="직접 작성하기">
	        </div>
	        <input type="hidden" name="petAllergy" id="petAllergy" />
        </div>
    </div>
    
    <div class="button-col">
	    <input type="submit" id="submitBtn" class="nextBtn" value="저장하기"/>
        <a href="/mypage/deletePet?petCode=${info.pet_code }" style="text-decoration: underline;">데이터 삭제하기</a>
    </div>
</form>

<script>
window.onload = function() {
    // 각 옵션별 기본 정보 반영
    document.getElementById("petGender").value = "${info.pet_gender}";
    if("${info.pet_gender}" === "M") {
        document.querySelectorAll(".genderBtn")[0].classList.add("selected");
    } else {
        document.querySelectorAll(".genderBtn")[1].classList.add("selected");
    }

    document.getElementById("petWeight").value = "${info.pet_weight}";
    
    document.getElementById("petNeut").value = "${info.pet_neut}";
    if("${info.pet_neut}" === "Y") {
        document.querySelectorAll(".neutBtn")[0].classList.add("selected");
    } else {
        document.querySelectorAll(".neutBtn")[1].classList.add("selected");
    }
    
    document.getElementById("petForm").value = "${info.pet_form}";
    document.querySelectorAll(".formBtn").forEach((btn) => {
        if (btn.innerText === "${info.pet_form}") {
            btn.classList.add("selected");
        }
    });
    
    if("${info.pet_allergy}" !== "") {
        document.querySelectorAll(".booleanBtn")[0].classList.add("selected");
        showNextContainer4(true);
    } else {
        document.querySelectorAll(".booleanBtn")[1].classList.add("selected");
    }
    
    selectCareButtons("${info.pet_care}");
    selectAllergyButtons("${info.pet_allergy}");
};

//관심사 기본 정보 반영
function selectCareButtons(careData) {
    if (!careData) return; // 빈값일 경우 함수 종료

    const careItems = careData.split(',');
    const careContainer = document.querySelector("#careInput").parentNode;

    careItems.forEach(item => {
        let button = Array.from(careContainer.querySelectorAll(".careBtn")).find(btn => btn.innerText === item);
        if (!button) {
            button = document.createElement("button");
            button.classList.add("careBtn", "selected");
            button.innerText = item;
            button.setAttribute("onclick", "careOption(this)");
            careContainer.insertBefore(button, document.getElementById("careInput"));
        } else {
            button.classList.add("selected");
        }
    });
}

// 알러지 기본 정보 반영
function selectAllergyButtons(allergyData) {
    if (!allergyData) return; // 빈값일 경우 함수 종료

    const allergyItems = allergyData.split(',');
    const allergySections = document.querySelectorAll(".choose-section");

    allergyItems.forEach(item => {
        let found = false;
        allergySections.forEach(section => {
            let button = Array.from(section.querySelectorAll(".allergyBtn")).find(btn => btn.innerText === item);
            if (button) {
                button.classList.add("selected");
                found = true;
            }
        });

        if (!found) {
            let newButton = document.createElement("button");
            newButton.classList.add("allergyBtn", "selected");
            newButton.innerText = item;
            newButton.setAttribute("onclick", "allergyOption(this)");
            document.querySelector("#allergyInput").parentNode.insertBefore(newButton, document.getElementById("allergyInput"));
        }
    });
}
</script>
<script src="/static/js/mypage/petRegist.js"></script>
</body>
</html>