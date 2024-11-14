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
<script src="/static/js/community/community_myfeed.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<script>
var isLoggedIn = "${sessionScope.loginUser != null ? 'true' : 'false'}";

var sender = "${sessionScope.loginUser.mem_nick}";
var receiver = "${myFeedName.mem_nick}";
var socket;

function openChat(receiver) {
    document.getElementById("chatBox").style.display = "block";
    socket = new WebSocket("ws://25.0.125.242:9002/ws/chat");
    console.log("done")
    socket.onmessage = function(event) {
        var chatMessages = document.getElementById("chatMessages");
        
        var messageData = JSON.parse(event.data);
        
        var newMessage = document.createElement("div");
        newMessage.innerText =  messageData.sender + " : " + messageData.message_content;
        
        chatMessages.appendChild(newMessage);
    };
}

function sendMessage(event) {
    if (event.key === "Enter") {
        var message = document.getElementById("chatInput").value;
        socket.send(JSON.stringify({    	
            sender: sender,           // JSP에서 받은 sender 값
            receiver: receiver,       // JSP에서 받은 receiver 값
            message_content: message  // 입력된 메시지 내용
        }));
         	console.log("sender",sender);
         	console.log("receiver",receiver);
         	console.log("message_content",message);
        document.getElementById("chatInput").value = "";
    }
}

function closeChat() {
    document.getElementById("chatBox").style.display = "none";
    socket.close();
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
		<img
			src="<c:url value='/static/Images/communityorign_img/myfeed.jpg'/>"
			alt="Event 1">
	</div>

	<!-- 상단 프로필 영역 -->
	<div class="profile-section">
		<div class="profile-info">
			<c:choose>
				<c:when test="${empty getpetimg.pet_img}">
					<img src="/static/Images/pet/noPetImg.jpg" alt="프로필 이미지"
						class="main-profile-image">
				</c:when>
				<c:otherwise>
					<img src="/static/Images/pet/${getpetimg.pet_img}" alt="프로필 이미지"
						class="main-profile-image">
				</c:otherwise>
			</c:choose>
			<h2>${myFeedName.mem_nick}</h2>
		</div>
		<div class="profile-menu">

			<c:if
				test="${myFeedName.mem_nick eq sessionScope.loginUser.mem_nick}">
				<a href="">내 피드</a>
			</c:if>

			<c:if
				test="${isFriendBool == 1 && myFeedName.mem_nick ne sessionScope.loginUser.mem_nick}">
				<a
					href="<c:url value='/community/addFriend/${mem_code}'/>?mem_nick=${myFeedName.mem_nick}"
					onclick="return checkDelFriend('${sessionScope.loginUser}');">친구
					삭제</a>
			</c:if>

			<c:if
				test="${(isFriendBool == 0 || isFriendBool == null) && myFeedName.mem_nick ne sessionScope.loginUser.mem_nick}">
				<a
					href="<c:url value='/community/addFriend/${mem_code}'/>?mem_nick=${myFeedName.mem_nick}"
					onclick="return checkAddFriend('${sessionScope.loginUser}');">+
					친구 추가</a>
				<!-- 친구가 아닐 때 -->
			</c:if>

			<a href="#" onclick="openChat('${myFeedName.mem_nick}'); return false;">메시지</a>

			<!-- 이웃 목록 버튼 -->
			<a href="#"
				onclick="fetchNeighborList('${mem_code}', '${myFeedName.mem_nick}'); return false;">이웃
				목록</a>
		</div>
	</div>

	<!-- 채팅 창 HTML -->
	<div id="chatBox" style="display:none; position:fixed; bottom:10px; right:10px; width:300px; border:1px solid #ccc; padding:10px; background-color:white;">
	    <h3>채팅 - ${myFeedName.mem_nick}</h3>
	    <div id="chatMessages" style="height:200px; overflow-y:auto;"></div>
	    <input type="text" id="chatInput" placeholder="메시지 입력..." onkeypress="sendMessage(event)">
	    <button onclick="closeChat()">닫기</button>
	</div>

	
	<!-- 컨테이너 시작 -->
	<div class="container">
		<!-- 메인 영역 -->
		<div class="my_feed">
			<div class="profile"></div>
			<br>

			<div class="feed-images">
				<c:forEach items="${myFeedList}" var="myFeedList">

					<div class="feed-item">
						<!-- 이미지와 정보를 감싸는 div 추가 -->
						<a
							href="<c:url value='/community/contentView/?board_no=${myFeedList.board_no}'/>">
							<!-- 이미지 클릭 시 이동할 링크 추가 --> <img
							src="/static/images/community_img/${myFeedList.chrepfile}" alt="">
						</a>
						<div class="feed-info">
							<!-- 제목과 날짜를 감싸는 div 추가 -->
							<a
								href="<c:url value='/community/contentView/?board_no=${myFeedList.board_no}'/>"
								class="post-title">${myFeedList.board_title}</a>
							<!-- 제목 클릭 시 이동할 링크 추가 -->
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
						<img
							src="<c:choose>
				                <c:when test="${empty logingetpetimg.pet_img}">
				                    /static/Images/pet/noPetImg.jpg
				                </c:when>
				                <c:otherwise>
				                    /static/Images/pet/${logingetpetimg.pet_img}
				                </c:otherwise>
				              </c:choose>"
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
					<li><a
						href="/community/myfeed/${sessionScope.loginUser.mem_code}">내
							피드</a></li>
					<li><a href="/community/writeView">글쓰기</a></li>
					<li><a href="javascript:void(0);" onclick="fetchUserActivity()">내 소식</a></li>
					<li><a href="javascript:void(0);" onclick="fetchMyActivity()">내 활동</a></li>
					<a href="#"
						onclick="fetchMyNeighborList('${mem_code}'); return false;">내
						이웃 목록</a>
				</c:if>



			</ul>
			<div class="sidebar-notice">
				<h3>소식상자</h3>
				<p></p>
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