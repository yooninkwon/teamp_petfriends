<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>myfeed.jsp</title>
<link rel="stylesheet" href="/static/css/community/community_myfeed.css">
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<script>
	function checkAddFriend(loginUser) {
	    var isLoggedIn = "${sessionScope.loginUser != null ? 'true' : 'false'}"; // 로그인 여부 확인

	    if (isLoggedIn === "false") { // 로그인되지 않은 경우
	        alert('로그인이 필요합니다');
	        return false;  // 링크 이동 막기
	    } else {
	        alert('친구가 추가됐습니다');
	        return true;  // 친구 추가 실행
	    }
	}
	
	function checkDelFriend(loginUser) {
	    var isLoggedIn = "${sessionScope.loginUser != null ? 'true' : 'false'}"; // 로그인 여부 확인

	    if (isLoggedIn === "false") { // 로그인되지 않은 경우
	        alert('로그인이 필요합니다');
	        return false;  // 링크 이동 막기
	    } else {
	        alert('친구가 삭제됐습니다');
	        return true;  // 친구 추가 실행
	    }
	}
	function fetchNeighborList(mem_code, mem_nick) {
	    $.ajax({
	        url: '/community/neighborList/' + mem_code,
	        method: 'GET',
	        data: { mem_nick: mem_nick }, // mem_nick 전달
	        success: function(data) {
	            console.log("data:", data);
	            let html = '<h4>' + mem_nick + '의 이웃 목록</h4><ul>';

	            if (data.length === 0) {
	                html += '<li>이웃이 없습니다.</li>'; // 이웃 목록이 없을 경우 메시지 출력
	            } else {
	                // 이웃 목록 데이터 순회
	                data.forEach(neighbor => {
	                    // 이웃의 이름과 프로필 이미지 출력
	                    html += `
	                        <div class="neighbor-item">
	                            <div class="neighbor-pet-img-container">
	                                <a href="/community/myfeed/\${neighbor.friend_mem_code}" target="_blank">
	                                    <img src="/static/Images/pet/\${neighbor.pet_img || 'noPetImg.jpg'}" alt="${neighbor.friend_mem_nick}" class="neighbor-pet-img">
	                                </a>
	                            </div>
	                            <div class="neighbor-name">
	                                <a href="/community/myfeed/\${neighbor.friend_mem_code}" target="_blank">
	                                    \${neighbor.friend_mem_nick}
	                                </a>
	                            </div>
	                        </div>
	                    `;
	                });
	            }

	            html += '</ul>';
	            $('#neighborListContainer').html(html); // 모달에 이웃 목록 삽입

	            // 이웃 모달 열기
	            openNeighborListModal();
	        },
	        error: function(error) {
	            console.log('이웃 목록을 가져오는 중 오류 발생:', error);
	        }
	    });
	}

	function fetchMyNeighborList(mem_code) {
	    $.ajax({
	        url: '/community/myNeighborList/' + mem_code,
	        method: 'GET',
	      
	        success: function(data) {
	            console.log("data:", data);
	            let html = '<h4>내 이웃 목록</h4><ul>';

	            if (data.length === 0) {
	                html += '<li>이웃이 없습니다.</li>'; // 이웃 목록이 없을 경우 메시지 출력
	            } else {
	                // 이웃 목록 데이터 순회
	                data.forEach(Myneighbor => {
	                    // 이웃의 이름과 프로필 이미지 출력
	                    html += `
	                        <div class="neighbor-item">
	                            <div class="neighbor-pet-img-container">
	                                <a href="/community/myfeed/\${Myneighbor.friend_mem_code}" target="_blank">
	                                    <img src="/static/Images/pet/\${Myneighbor.pet_img || 'noPetImg.jpg'}" alt="${Myneighbor.friend_mem_nick}" class="neighbor-pet-img">
	                                </a>
	                            </div>
	                            <div class="neighbor-name">
	                                <a href="/community/myfeed/\${Myneighbor.friend_mem_code}" target="_blank">
	                                    \${Myneighbor.friend_mem_nick}
	                                </a>
	                            </div>
	                        </div>
	                    `;
	                });
	            }

	            html += '</ul>';
	            $('#MyneighborListContainer').html(html); // 모달에 이웃 목록 삽입

	            // 내 이웃 모달 열기
	            openMyNeighborListModal();
	        },
	        error: function(error) {
	            console.log('이웃 목록을 가져오는 중 오류 발생:', error);
	        }
	    });
	}

	function openNeighborListModal() {
	    document.getElementById("neighborListModal").style.display = "block"; // 이웃 목록 모달 열기
	}

	function closeNeighborListModal() {
	    document.getElementById("neighborListModal").style.display = "none"; // 이웃 목록 모달 닫기
	}

	function openMyNeighborListModal() {
	    document.getElementById("myNeighborListModal").style.display = "block"; // 내 이웃 목록 모달 열기
	}

	function closeMyNeighborListModal() {
	    document.getElementById("myNeighborListModal").style.display = "none"; // 내 이웃 목록 모달 닫기
	}
	
	
	
</script>

<body>

	<!-- 이웃 목록 모달 -->
	<div id="neighborListModal" class="modal">
	    <div class="modal-content">
	        <span class="close-btn" onclick="closeNeighborListModal()">&times;</span>
	        <div id="neighborListContainer"></div>
	    </div>
	</div>	

	
	<!-- 내 이웃 목록 모달 -->
	<div id="myNeighborListModal" class="modal">
	    <div class="modal-content">
	        <span class="close-btn" onclick="closeMyNeighborListModal()">&times;</span>
	        <div id="MyneighborListContainer"></div>
	    </div>
	</div>	
	
	
	
	<!-- 이벤트 이미지 -->
<div class="feed-image">
    <img src="<c:url value='/static/Images/communityorign_img/myfeed.jpg'/>" alt="Event 1">
</div>

<!-- 상단 프로필 영역 -->
<div class="profile-section">
    <div class="profile-info">
        <c:choose>
            <c:when test="${empty getpetimg.pet_img}">
                <img src="/static/Images/pet/noPetImg.jpg" alt="프로필 이미지" class="main-profile-image">
            </c:when>
            <c:otherwise>
                <img src="/static/Images/pet/${getpetimg.pet_img}" alt="프로필 이미지" class="main-profile-image">
            </c:otherwise>
        </c:choose>
        <h2>${myFeedName.mem_nick}</h2>
    </div>
    <div class="profile-menu">
		
	
		
		<c:if test="${isFriendBool == 1}">
			<a href="<c:url value='/community/addFriend/${mem_code}'/>?mem_nick=${myFeedName.mem_nick}"
					       onclick="return checkDelFriend('${sessionScope.loginUser}');">친구 삭제</a> 
		</c:if>

		<c:if test="${isFriendBool == 0 || isFriendBool == null}">
		    <a href="<c:url value='/community/addFriend/${mem_code}'/>?mem_nick=${myFeedName.mem_nick}"
		       onclick="return checkAddFriend('${sessionScope.loginUser}');">+ 친구 추가</a> <!-- 친구가 아닐 때 -->
		</c:if>
        
		<a href="#">메세지</a>
        
		<!-- 이웃 목록 버튼 -->
		<a href="#" onclick="fetchNeighborList('${mem_code}', '${myFeedName.mem_nick}'); return false;">이웃 목록</a>
		

	
		

	
	
	</div>
</div>


<!-- 컨테이너 시작 -->
<div class="container">
    <!-- 메인 영역 -->
    <div class="my_feed">
        <div class="profile">
        </div>
        <br>
  
        <div class="feed-images">
            <c:forEach items="${myFeedList}" var="myFeedList">
		  
			<div class="feed-item"> <!-- 이미지와 정보를 감싸는 div 추가 -->
                    <a href="<c:url value='/community/contentView/?board_no=${myFeedList.board_no}'/>"> <!-- 이미지 클릭 시 이동할 링크 추가 -->
                        <img src="/static/images/community_img/${myFeedList.chrepfile}" alt="">
                    </a>
                    <div class="feed-info"> <!-- 제목과 날짜를 감싸는 div 추가 -->
                        <a href="<c:url value='/community/contentView/?board_no=${myFeedList.board_no}'/>" class="post-title">${myFeedList.board_title}</a> <!-- 제목 클릭 시 이동할 링크 추가 -->
                        <span class="post-time">${fn:substring(myFeedList.board_created, 0, 10)}</span>
                    </div>
                </div>
            </c:forEach>
        </div>
    </div>

		<!-- 메인 구성 끝 -->

		<!-- 사이드바 -->
		<div class="sidebar">
			<div class="ad-banner">
				<a href=""> <img src="/static/Images/communityorign_img/ad1.jpg"
					alt="광고 배너" />
				</a>
			</div>

			<div class="post-header">
				<div class="profile-info">

					<c:if test="${sessionScope.loginUser ne null}">
						<img src="/static/Images/pet/${logingetpetimg.pet_img}"
							alt="Profile Image" class="profile-image">
						<span class="user-name">${sessionScope.loginUser.mem_nick}</span>
						<a href="/mypage/logout" class="logout-button">로그아웃</a>
					</c:if>

					<c:if test="${sessionScope.loginUser eq null}">
						<a href="/login/loginPage" class="login-button">로그인</a>
					</c:if>

				</div>
			</div>




			<ul class="sidebar-menu">
				<c:if test="${sessionScope.loginUser ne null}">
				<li><a href="/community/myfeed/${sessionScope.loginUser.mem_code}">내 피드</a></li>			
				<li><a href="/community/writeView">글쓰기</a></li>						
				<li><a href="#">내 소식</a></li>
				<li><a href="#">내 활동</a></li>
				<a href="#" onclick="fetchMyNeighborList('${mem_code}'); return false;">내 이웃 목록</a>
				</c:if>	
		
			
			
				</ul>
			<div class="sidebar-notice">
				<h3>소식상자</h3>
				<p>새로운 소식이 없습니다새로운 소식이 없습니다새로운 소식이 없습니다 새로운 소식이 없습니다새로운 소식이
					없습니다새로운 소식이 없습니다. 새로운 소식이 없습니다새로운 소식이 없습니다새로운 소식이 없습니다 새로운 소식이
					없습니다새로운 소식이 없습니다새로운 소식이 없습니다 새로운 소식이 없습니다새로운 소식이 없습니다새로운 소식이 없습니다</p>
			</div>
			<div class="sidebar-from">
				<h4>From. 블로그씨</h4>
				<p>블로그씨는 최근 다녀온 몽골여행 기록으로 브이로그를 만들었어요.</p>
				<p>나의 특별한 여행지에서의 영상도 보여드릴게요!</p>
			</div>
			<div class="ad-banner">
				<a href=""> <img src="/static/Images/communityorign_img/ad1.jpg"
					alt="광고 배너" />
				</a>
			</div>
		</div>
	</div>
	<!-- 컨테이너 끝 -->
</body>
<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</html>