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
<h2>우리아이 등록</h2>
<form action="/mypage/registPet" method="post" enctype="multipart/form-data" style="width: 60%" onsubmit="gatherMultiSelect()">
	<div id="pet-regist-container1">
        <div class="info">
            <h3><span>어떤 반려동물을 키우고</span> 계신가요?</h3>
            <p>펫프랜즈 고객님들 중 80% 이상이 반려동물을 등록하고 상품을 추천받고 있어요!</p>
        </div>
        
        <div class="pet-selection">
            <label>
                <img src="<c:url value='/static/Images/mypet/dogImg1.png'/>" style="width: 150px;"><br />
                <input type="radio" name="petType" value="D" checked /> 강아지
            </label>
            <label>
                <img src="<c:url value='/static/Images/mypet/catImg1.png'/>" style="width: 161px;"><br />
                <input type="radio" name="petType" value="C" /> 고양이
            </label>
        </div>

        <div class="input-section">
            <label for="petName">이름을 입력해주세요*</label><br />
            <input id="petName" name="petName" type="text" placeholder="1~8 이내로 입력해 주세요" oninput="validatePetName()" />
            <span id="petNameError" class="pet-error-msg">* 한글, 영문, 숫자 혼합 1~8자만 사용 가능합니다.</span>
        </div>

        <button type="button" class="nextBtn" id="nextBtn1" onclick="showNextContainer2()" disabled>다음으로 넘어갈게요</button>
    </div>
    
    <div id="pet-regist-container2" style="display: none;">
        <div class="info">
            <h3><span>함께하는 <span id="nextPetName"></span></span>는(은) 어떤 아이인가요?</h3>
        </div>
        
        <div class="pet-image" style="margin: 0 auto;" onclick="document.getElementById('uploadInput').click()">
        	<img id="previewImg" src="#" style="display: none;" />
 			<i id="cameraIcon" class="fa-solid fa-camera" style="color: #ffffff; font-size: 90px;"></i>
 			<i class="fa-solid fa-arrow-up-from-bracket mark" style="color: #ffffff;"></i>
	    </div>
	    <input type="file" name="petImgFile" accept="image/*" id="uploadInput" style="display:none;" onchange="previewImage(event)" />
		<span style="font-size: 13px">*가로 500px 로 저장됩니다.</span>
		
        <div class="input-section">
            <label for="petBreed"><span id="nextPetType"></span>종을 등록해주세요*</label><br />
            <input id="petBreed" name="petBreed" type="text" placeholder="종을 선택해주세요" onclick="openBreedOption()" oninput="checkAllInputsFilled()" readonly />
        </div>
		
        <div class="input-section">
            <label for="petBirth">생일을 입력해주세요*</label><br />
            <input id="petBirth" name="petBirth" type="date" onchange="checkAllInputsFilled()"/>
        </div>
		
    </div>
    
    <div id="pet-regist-container3" style="display: none;">
    	<div class="info">
            <h3><span><span id="nextnextPetName"></span>는(은) <span id="nextPetBreed"></span></span>이군요!</h3>
            <h3>조금만 더 알려주시겠어요?</h3>
        </div>
        
        <div class="input-section">
            <label for="genderBtn">성별을 선택해주세요*</label><br />
	        <div class="choose-section">
	            <button class="genderBtn selected" onclick="genderOption(this)">남아</button>
	            <button class="genderBtn" onclick="genderOption(this)">여아</button>
	        </div>
	        <input type="hidden" name="petGender" id="petGender" />
        </div>
        
        <div class="input-section">
            <label for="petWeight">몸무게를 입력해주세요*</label><br />
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
            <label for="neutBtn">중성화여부를 선택해주세요*</label><br />
	        <div class="choose-section">
	            <button class="neutBtn selected" onclick="neutOption(this)">중성화 했어요</button>
	            <button class="neutBtn" onclick="neutOption(this)">중성화 안했어요</button>
	        </div>
	        <input type="hidden" name="petNeut" id="petNeut" />
        </div>
        
        <div class="input-section">
            <label for="formBtn">체형을 선택해주세요*</label><br />
	        <div class="choose-section">
	            <button class="formBtn" onclick="formOption(this)">날씬해요</button>
	            <button class="formBtn selected" onclick="formOption(this)">적당해요</button>
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
	            <button class="booleanBtn selected" onclick="booleanOption(this); hideNextContainer4();">아니오, 없어요</button>
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
    
    <input type="submit" id="submitBtn" class="nextBtn" value="모두 작성했어요" style="display: none;"/>
</form>

<script src="/static/js/mypage/petRegist.js"></script>
</body>
</html>