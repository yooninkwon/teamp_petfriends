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
<h2>내 새꾸</h2>
<div class="mypet-container">
    <c:forEach items="${pets }" var="pets">
    	<div class="mypet-card">
		    <div class="pet-radio">
		        <input type="radio" id="select-pet" name="pet" />
		        <label for="select-pet">이 아이로 활동하기</label>
		    </div>
		    <div class="pet-image">
		        <img src="<c:url value='/static/Images/Icons/pet_icon_placeholder.png' />" />
		    </div>
		    ${pets.pet_gender}
		    <div class="pet-info">
		        <h2>${pets.pet_name}</h2>
		        <p>[${pets.pet_breed}]</p>
		        <p>${pets.pet_birth} | ${pets.pet_weight}</p>
		    </div>
		    <div class="pet-status">
		        <span class="status-pill">${pets.pet_care}</span>
		        <span class="status-text">에 신경을 쓰고 있어요.</span>
		    </div>
		    <a href="/mypage/mypet/modify" class="edit-button">수정하기</a>
		</div>
	</c:forEach>
	
    <div class="mypet-card">
        <a href="/mypage/mypet/register" class="mypet-card-link">
            <div class="mypet-card-content">
                <div class="mypet-card-icon">
                    <i class="fa-solid fa-circle-plus" style="color: #e8e8e8; font-size: 60px"></i>
                </div>
                <div class="mypet-card-text">
                    <h4>반려동물 등록하기</h4>
                    <p>심쿵팸님과 함께 사는<br />아이는 어떤 친구인가요?🤔</p>
                </div>
            </div>
        </a>
    </div>
</div>
</body>
</html>