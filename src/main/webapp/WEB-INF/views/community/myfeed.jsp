<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>myfeed</title>
<link rel="stylesheet" href="/static/css/community/community_myfeed.css">
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />

<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

</head>

<body>

	
<!-- 이벤트 이미지 -->
<div class="event-image">
    <img src="<c:url value='/static/Images/MainImg/event1.png'/>" alt="Event 1">
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
        <a href="#">+ 친구 추가</a>
        <a href="#">메세지</a>
        <a href="#">이웃</a>
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
						<img src="/static/Images/pet/${getpetimg.pet_img}"
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

				<!--<c:if test="${sessionScope.loginUser ne null}">-->
				<!--</c:if>
	  					<c:if test="${sessionScope.loginUser eq null}">
	  					    <li><a href="/community/myfeed" onclick="alert('로그인이 필요합니다'); return false;">내 피드</a></li>
	  					</c:if>-->

				<li><a href="/community/myfeed/">내 피드</a></li>
				<c:if test="${sessionScope.loginUser ne null}">
					<!-- 로그인이 되어 있을 때 글쓰기 페이지로 이동 -->
					<li><a href="/community/writeView">글쓰기</a></li>
				</c:if>

				<c:if test="${sessionScope.loginUser eq null}">
					<!-- 로그인이 되어 있지 않을 때 알림창을 띄움 -->
					<li><a href="/community/writeView"
						onclick="alert('로그인이 필요합니다'); return false;">글쓰기</a></li>
				</c:if>
				<li><a href="#">내 소식</a></li>
				<li><a href="#">내 활동</a></li>
				<li><a href="#">이웃 목록</a></li>
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