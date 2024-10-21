<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Insert title here</title>
    <link rel="stylesheet" href="/static/css/community/community_main.css">
    <jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
</head>

<body>
  <div class="container">
    <jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

 <main>
    
    
    <!-- 핫토픽 섹션 -->
    <section class="hot-topics">
        <h3>오늘의 핫이슈!</h3>
       
<ul>
    <li>
        <a href="/community/contentView">
            <div class="image-container">
                <img src="/static/Images/community_img/hot_issue1.jpg" alt="핫토픽 1 이미지" />
                <div class="overlay">
                    <p>언박싱이 언제나 최고야! 짜릿해</p>
                </div>
            </div>
        </a>
    </li>
    <li>
        <a href="#">
            <div class="image-container">
                <img src="/static/Images/community_img/hot_issue2.jpg" alt="핫토픽 2 이미지" />
                <div class="overlay">
                    <p>설레는 기념품 언박싱 하기!</p>
                </div>
            </div>
        </a>
    </li>
    <li>
        <a href="#">
            <div class="image-container">
                <img src="/static/Images/community_img/hot_issue3.jpg" alt="핫토픽 3 이미지" />
                <div class="overlay">
                    <p>아빠랑 딸이랑 자전거 언박싱~</p>
                </div>
            </div>
        </a>
    </li>
</ul>
    </section>

	    <!-- 사이드바 -->
   
   
   <div class="sidebar">
   		<div class="ad-banner">
		   <a href=""> <img src="/static/Images/community_img/ad1.jpg" alt="광고 배너" /> </a>
		</div>
   
   <div class="post-header">
    <div class="profile-info">
       <img src="<c:url value='/static/Images/pet/${pets.pet_img }' />" alt="Profile Image" class="profile-image">
        <span class="user-name">${sessionScope.loginUser.mem_nick}</span>
   	<a href="#" class="login-button">로그아웃</a>
    </div>
</div>
   
   
  
  
    <ul class="sidebar-menu">
        <li><a href="#">내 피드</a></li>
        <li><a href="/community/writeView">글쓰기</a></li>
        <li><a href="#">내 소식</a></li>
        <li><a href="#">내 활동</a></li>
        <li><a href="#">이웃 목록</a></li>
    </ul>
    <div class="sidebar-notice">
        <h3>소식상자</h3>
        <p>새로운 소식이 없습니다새로운 소식이 없습니다새로운 소식이 없습니다
        새로운 소식이 없습니다새로운 소식이 없습니다새로운 소식이 없습니다.
        새로운 소식이 없습니다새로운 소식이 없습니다새로운 소식이 없습니다
        새로운 소식이 없습니다새로운 소식이 없습니다새로운 소식이 없습니다
        새로운 소식이 없습니다새로운 소식이 없습니다새로운 소식이 없습니다</p>
    </div>
    <div class="sidebar-from">
        <h4>From. 블로그씨</h4>
        <p>블로그씨는 최근 다녀온 몽골여행 기록으로 브이로그를 만들었어요.</p>
        <p>나의 특별한 여행지에서의 영상도 보여드릴게요!</p>
    </div>
    <div class="ad-banner">
        <a href=""> <img src="/static/Images/community_img/ad1.jpg" alt="광고 배너" /> </a>
    </div>
</div>
	

   
	
	<!-- 펫프렌즈는 지금 뭐할까? -->
<div class="container-box">
    <div class="container-header"><span class="header-text">펫프렌즈는 지금 뭐할까?</span>
	 <form class="search-form" action="/search" method="GET">
        <input type="text" name="query" placeholder="검색어를 입력하세요" class="search-input">
        <button type="submit" class="search-button">🔍</button>
    </form>
    </div>
	
	
	<div class="story-container">
		
		    <li class="story-item">
		            <a href="#">
		                <img src="/static/Images/community_img/story1.jpeg" alt="스토리 이미지 1" class="story-image"/>
		                <p>살구언니</p>
		            </a>
		        </li>
		        <li class="story-item">
		            <a href="#">
		                <img src="/static/Images/community_img/story2.jpeg" alt="스토리 이미지 2" class="story-image"/>
		                <p>코댕이네</p>
		            </a>
		        </li>
		        <li class="story-item">
		            <a href="#">
		                <img src="/static/Images/community_img/story3.jpeg" alt="스토리 이미지 3" class="story-image"/>
		                <p>버디언니</p>
		            </a>
		        </li>
		        <li class="story-item">
		            <a href="#">
		                <img src="/static/Images/community_img/story4.jpeg" alt="스토리 이미지 4" class="story-image"/>
		                <p>토리누나</p>
		            </a>
		        </li>
		  
		</div>
</div>

    <!-- 카테고리 섹션 -->
	<section class="categories">
	    
	    <ul>
	        
	        <li>
	            <a href="#">
	                <img src="/static/Images/community_img/category0.png" alt="" />
	                <p>전체</p>
	            </a>
	        </li>      
	        
	        <li>
	            <a href="#">
	                <img src="/static/Images/community_img/category1.png" alt="" />
	                <p>육아꿀팁</p>
	            </a>
	        </li>
	        <li>
	            <a href="#">
	                <img src="/static/Images/community_img/category2.png" alt="" />
	                <p>내새꾸자랑</p>
	            </a>
	        </li>
	        <li>
	            <a href="#">
	                <img src="/static/Images/community_img/category3.png" alt="" />
	                <p>펫테리어</p>
	            </a>
	        </li>
	        <li>
	            <a href="#">
	                <img src="/static/Images/community_img/category4.png" alt="" />
	                <p>펫션쇼</p>
	            </a>
	        </li>
	        <li>
	            <a href="#">
	                <img src="/static/Images/community_img/category5.png" alt="" />
	                <p>집사일기</p>
	            </a>
	        </li>
			<li>
			    <a href="#">
			        <img src="/static/Images/community_img/category6.png" alt="" />
			        <p>육아질문</p>
			    </a>
			</li>   
			<li>
			    <a href="#">
			        <img src="/static/Images/community_img/category7.png" alt="" />
			        <p>수의사상담</p>
			    </a>
			</li>		
			
		 </ul>
	
	<script type="text/javascript"></script>
	


<!-- 포스트 -->

   <c:forEach items="${postList }" var="post" >
    <article class="post-card">
        <div class="post-header">
             <a href="/community/contentView?board_no=${post.board_no}" class="profile-link">
           		<div class="profile-info"> 
           		  <img src="/static/Images/community_img/story1.jpeg" alt="프로필 이미지 1" class="profile-image"/>               
           		  <span class="user-name">${post.user_id }</span>
       		 </a>
           	<span class="post-time">${post.board_created}</span>
            </div >
            
            <h2 class="post-title">
            <a href="/community/contentView?board_no=${post.board_no}">${post.board_title}</h2>
           <div class="post-content">  
            ${fn:substringBefore(post.board_content, '<img') }      
       		</div>
        </div>
       
        <img src="${pageContext.request.contextPath}/static/images/community_img/${post.cchgfile}" alt="포스트 1 이미지" class="post-image"/>
      		</a>
        <div class="post-footer">
            <span class="like-button">❤️ ${post.board_likes}</span>
            <span class="comment-button">💬 ${post.board_comment_count}</span>
        </div>
    </article>
   </c:forEach>
    

</section>

</main>

</div>
</body>
    <jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</html>