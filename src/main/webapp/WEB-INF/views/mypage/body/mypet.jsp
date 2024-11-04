<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
		        <input type="radio" id="select-pet" name="select-pet" value="${pets.pet_code }" <c:if test="${pets.pet_main eq 'Y'}">checked="checked"</c:if> />
		        <label for="select-pet">이 아이로 활동하기</label>
		    </div>
		    <div class="pet-image">
		    	<c:choose>
		    		<c:when test="${pets.pet_img ne null }">
				        <img src="<c:url value='/static/Images/pet/${pets.pet_img }' />" />
		    		</c:when>
		    		<c:when test="${pets.pet_img eq null }">
		    			<i class="fa-solid fa-camera" style="color: #ffffff; font-size: 90px"></i>
		    		</c:when>
		    	</c:choose>
		    </div>
		    <div>
			    <c:choose>
			    	<c:when test="${pets.pet_gender == 'M'}"><i class="fa-solid fa-mars" style="color: #496697;"></i></c:when>
			    	<c:when test="${pets.pet_gender == 'F'}"><i class="fa-solid fa-venus" style="color: #e56f66;"></i></c:when>
			    </c:choose>
		    </div>
		    <div class="pet-info">
		        <h3>${pets.pet_name }</h3>
		        <h5>[${pets.pet_breed }]</h5>
		        <p>${pets.pet_birth } | ${pets.pet_weight }</p>
		    </div>
		    <div class="pet-status">
		    	<c:choose>
			        <c:when test="${not empty pets.pet_care}">
			            <c:set var="careItems" value="${fn:split(pets.pet_care, ',')}" />
			            <c:choose>
			                <c:when test="${fn:length(careItems) > 2}">
			                    <span class="status-pill">${careItems[0]}</span>
			                    <span class="status-pill">${careItems[1]}</span>
			                    <span>등</span>
			                </c:when>
			                <c:otherwise>
			                    <c:forEach var="careItem" items="${careItems}">
			                        <span class="status-pill">${careItem}</span>
			                    </c:forEach>
			                </c:otherwise>
			            </c:choose>
			            <span>에 신경을 쓰고 있어요.</span>
			        </c:when>
			        <c:otherwise>
			            <span class="status-none">관심 정보가 없어요.</span>
			        </c:otherwise>
			    </c:choose>
		    </div>
		    <a href="/mypage/mypet/modify?petCode=${pets.pet_code }" class="edit-button"><h4>수정하기</h4></a>
		</div>
	</c:forEach>
	
    <div class="resist-card">
        <a href="/mypage/mypet/register" class="mypet-card-link">
            <i class="fa-solid fa-circle-plus" style="color: #e8e8e8; font-size: 60px"></i>
            <div class="mypet-card-text">
                <h4>반려동물 등록하기</h4>
                <p>심쿵팸님과 함께 사는<br />아이는 어떤 친구인가요?🤔</p>
            </div>
        </a>
    </div>
</div>

<script>
$(document).ready(function() {
    $('input[name="select-pet"]').on('change', function() {
        var newlyChecked = $(this).val();  // 선택된 펫의 코드

        $.ajax({
            type: "POST",
            url: "/mypage/mypet/setMainPet",
            data: {newlyChecked: newlyChecked},
            success: function() {
                // 성공 시 페이지 새로고침
                location.reload();
            },
            error: function() {
                alert("메인 펫 설정 중 오류가 발생했습니다.");
            }
        });
    });
});
</script>
</body>
</html>