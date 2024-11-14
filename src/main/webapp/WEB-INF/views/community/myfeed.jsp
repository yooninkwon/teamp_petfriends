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
	var currentRoomId = null;
	var socket;
	// 페이지 로드 시 채팅방 목록을 불러오기
	   document.addEventListener('DOMContentLoaded', function() {
	       fetchChatRooms(sender);  // 로그인 여부와 상관없이 채팅방 목록을 불러옴
	       document.getElementById("chatContainer").style.display = "none"; // 채팅 창 숨기기
	   });

	   // 메시지 버튼 클릭 시 채팅창 열기
	   function openMessageBox() {
	       document.getElementById("chatContainer").style.display = "flex"; // 채팅창 표시
	       var roomId = generateRoomId(sender, receiver);
	       openChat(roomId, receiver); // 새로운 채팅방 열기
	   }

	   // 채팅방 ID를 생성하는 함수
	   function generateRoomId(sender, receiver) {
	       return sender < receiver ? sender + '_' + receiver : receiver + '_' + sender;
	   }

	   // 채팅 창을 여는 함수
	   function openChat(roomId, receiver) {
	       document.getElementById("chatBox").style.display = "block"; // 채팅창 본문 표시
	       if (socket) {
	           socket.close(); // 기존 소켓 연결을 닫음
	       }
	       currentRoomId = roomId;  // 현재 채팅방 ID 저장
	       socket = new WebSocket("ws://localhost:9002/ws/chat/" + roomId); // WebSocket 연결

	       socket.onmessage = function(event) {
	           var chatMessages = document.getElementById("chatMessages");
	           var messageData = JSON.parse(event.data);
	           var newMessage = document.createElement("div");
	           newMessage.innerText = messageData.sender + " : " + messageData.message_content;
	           chatMessages.appendChild(newMessage);
	       };

	       loadChatHistory(roomId);  // 채팅 히스토리 불러오기
	   }

	   // 메시지를 전송하는 함수
	   function sendMessage(event) {
	       if (event.key === "Enter" && socket && currentRoomId) {
	           var message = document.getElementById("chatInput").value;
	           socket.send(JSON.stringify({
	               sender: sender,
	               receiver: receiver,
	               message_content: message,
	               roomId: currentRoomId
	           }));
	           document.getElementById("chatInput").value = "";
	       }
	   }

	   // 채팅 창을 닫는 함수
	   function closeChat() {
	       document.getElementById("chatContainer").style.display = "none";  // 채팅 창 숨기기
	       document.getElementById("chatBox").style.display = "none";  // 채팅창 본문 숨기기
	       if (socket) {
	           socket.close();
	       }
	   }

	   // 채팅 히스토리를 불러오는 함수
	   function loadChatHistory(roomId) {
	       $.ajax({
	           url: '/community/getChatHistory',
	           type: 'GET',
	           data: { roomId: roomId },
	           success: function(messages) {
	               var chatMessages = document.getElementById("chatMessages");
	               chatMessages.innerHTML = ""; // 기존 메시지 초기화
	               messages.forEach(function(message) {
	                   var newMessage = document.createElement("div");
	                   newMessage.innerText = message.sender + " : " + message.message_content;
	                   chatMessages.appendChild(newMessage);
	               });
	           }
	       });
	   }

	   // 채팅방 목록을 불러오는 함수
	   function fetchChatRooms(sender) {
	        fetch(`/community/getChatRooms?sender=${sender}&receiver=\${receiver}`)
		   	   .then(response => response.json())
	           .then(data => {
	               var chatRoomsList = document.getElementById("chatRoomsList");
	               chatRoomsList.innerHTML = '';  // 기존 채팅방 목록 초기화

	           console.log("sender",sender);
	           console.log("receiver",receiver);
	               data.forEach(chatRoom => {
	                   var roomLink = document.createElement("a");
	                  
	                   roomLink.innerText = chatRoom.room_id;
	                   roomLink.onclick = function() {
	                       openChat(chatRoom.room_id, chatRoom.receiver);  // 클릭 시 채팅방 열기
	                       document.getElementById("chatContainer").style.display = "flex"; // 채팅창 표시
	                   };
	                   var roomItem = document.createElement("div");
	                   roomItem.appendChild(roomLink);
	                   chatRoomsList.appendChild(roomItem);
	               });

	               // 첫 번째 채팅방 자동 연결 (옵션)
	               if (data.length > 0) {
	                   openChat(data[0].room_id, data[0].receiver);
	               }
	           })
	           .catch(error => console.error('Error fetching chat rooms:', error));
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

			<a href="javascript:void(0);" onclick="openMessageBox(); return false;">메시지</a>

			<!-- 이웃 목록 버튼 -->
			<a href="javascript:void(0);"
				onclick="fetchNeighborList('${mem_code}', '${myFeedName.mem_nick}'); return false;">이웃
				목록</a>
		</div>
	</div>





	<!-- 채팅창 전체 컨테이너 (기본적으로 숨겨짐) -->
	<div id="chatContainer" class="chat-container" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; width: 60%; height: 70%; border: 1px solid #ccc; border-radius: 10px; background-color: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); z-index: 9999;">

	    <!-- 왼쪽: 채팅방 목록 -->
	    <div id="chatRooms" class="chat-rooms" style="flex: 1; padding: 10px; border-right: 1px solid #ccc; overflow-y: auto;">
	        <h3 class="chat-title" style="text-align: center;">채팅방 목록</h3>
	        <div id="chatRoomsList"></div> <!-- 채팅방 목록 표시 -->
	    </div>

	    <!-- 오른쪽: 채팅창 -->
	    <div id="chatBox" class="chat-box" style="flex: 2; display: flex; flex-direction: column; padding: 10px; position: relative;">
	        <h3 class="chat-title" style="text-align: center;">채팅창</h3>
	        <div id="chatMessages" class="chat-messages" style="flex: 1; overflow-y: auto; margin-bottom: 10px;"></div>
	        
	        <!-- 메시지 입력창 -->
	        <input type="text" id="chatInput" class="chat-input" placeholder="메시지 입력..." onkeypress="sendMessage(event)" style="padding: 10px; width: calc(100% - 20px); border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box;">
	        
	        <!-- 오른쪽 상단에 닫기 버튼 (X 표시) -->
	        <button onclick="closeChat()" class="chat-close-btn" style="position: absolute; top: 10px; right: 10px; padding: 5px 10px; font-size: 18px; background-color: transparent; border: none; color: #f44336; cursor: pointer; font-weight: bold;">&times;</button>
	        
	        <div class="resize-handle" style="height: 10px; background-color: #ccc; cursor: row-resize; margin-top: 10px;"></div> <!-- 크기 조정 핸들 -->
	    </div>

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