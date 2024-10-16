<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <link rel="stylesheet" href="/static/css/community_main.css">
    <jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
</head>

<body>
    <jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

 <main>
    
    
    <!-- 핫토픽 섹션 -->
    <section class="hot-topics">
        <h3>오늘의 핫이슈!</h3>
       
<ul>
    <li>
        <a href="#">
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
        <img src="/static/Images/community_img/story1.jpeg" alt="Profile Image" class="profile-image">
        <span class="user-name">살구엄마</span>
   	<a href="#" class="login-button">로그아웃</a>
    </div>
</div>
   
   
  
  
    <ul class="sidebar-menu">
        <li><a href="#">내 피드</a></li>
        <li><a href="#">글쓰기</a></li>
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
	


<!-- 포스트 -->

    <article class="post-card">
        <div class="post-header">
             <a href="#" class="profile-link">
           		<div class="profile-info"> 
           		  <img src="/static/Images/community_img/story1.jpeg" alt="프로필 이미지 1" class="profile-image"/>               
           		  <span class="user-name">살구언니</span>
       		 </a>
           	<span class="post-time">2 시간 전</span>
            </div>
            <h2 class="post-title"><a href="#">이 장난감 너무 좋네요~^^ 아이들이 너무 좋아해 (내돈내산)</h2>
            <p class="summary post-content">우리 강아지는 어렸을때 부터 이걸 좋아했어요!
            이제 진짜 너무 좋아서 우리 강아지들이 너무 사랑하고 아끼는거랍니다 아무한테나 정말 안알려주는데
            특별히 우리 펫프렌즈 분들에게 알려드릴게요! 자이게 뭐냐면 </a></p>
        </div>
        <img src="/static/Images/community_img/hot_issue1.jpg" alt="포스트 1 이미지" class="post-image"/>
        <div class="post-footer">
            <span class="like-button">❤️ 20</span>
            <span class="comment-button">💬 5</span>
        </div>
    </article>
    
    <article class="post-card">
        <div class="post-header">
             <a href="#" class="profile-link">
           		<div class="profile-info"> 
           		  <img src="/static/Images/community_img/story2.jpeg" alt="프로필 이미지 1" class="profile-image"/>               
           		  <span class="user-name">살구언니</span>
       		 </a>
           	<span class="post-time">2 시간 전</span>
            </div>
            <h2 class="post-title"><a href="#">이 장난감 너무 좋네요~^^ 아이들이 너무 좋아해 (내돈내산)</h2>
            <p class="summary post-content">우리 강아지는 어렸을때 부터 이걸 좋아했어요!
            이제 진짜 너무 좋아서 우리 강아지들이 너무 사랑하고 아끼는거랍니다 아무한테나 정말 안알려주는데
            특별히 우리 펫프렌즈 분들에게 알려드릴게요! 자이게 뭐냐면 </a></p>
        </div>
        <img src="/static/Images/community_img/hot_issue2.jpg" alt="포스트 1 이미지" class="post-image"/>
        <div class="post-footer">
            <span class="like-button">❤️ 20</span>
            <span class="comment-button">💬 5</span>
        </div>
    </article>
    
    <article class="post-card">
        <div class="post-header">
             <a href="#" class="profile-link">
           		<div class="profile-info"> 
           		  <img src="/static/Images/community_img/story3.jpeg" alt="프로필 이미지 1" class="profile-image"/>               
           		  <span class="user-name">살구언니</span>
       		 </a>
           	<span class="post-time">2 시간 전</span>
            </div>
            <h2 class="post-title"><a href="#">이 장난감 너무 좋네요~^^ 아이들이 너무 좋아해 (내돈내산)</h2>
            <p class="summary post-content">우리 강아지는 어렸을때 부터 이걸 좋아했어요!
            이제 진짜 너무 좋아서 우리 강아지들이 너무 사랑하고 아끼는거랍니다 아무한테나 정말 안알려주는데
            특별히 우리 펫프렌즈 분들에게 알려드릴게요! 자이게 뭐냐면 </a></p>
        </div>
        <img src="/static/Images/community_img/hot_issue3.jpg" alt="포스트 1 이미지" class="post-image"/>
        <div class="post-footer">
            <span class="like-button">❤️ 20</span>
            <span class="comment-button">💬 5</span>
        </div>
    </article>


 <article class="post-card">
        <div class="post-header">
             <a href="#" class="profile-link">
           		<div class="profile-info"> 
           		  <img src="/static/Images/community_img/story1.jpeg" alt="프로필 이미지 1" class="profile-image"/>               
           		  <span class="user-name">살구언니</span>
       		 </a>
           	<span class="post-time">2 시간 전</span>
            </div>
            <h2 class="post-title"><a href="#">이 장난감 너무 좋네요~^^ 아이들이 너무 좋아해 (내돈내산)</h2>
            <p class="summary post-content">우리 강아지는 어렸을때 부터 이걸 좋아했어요!
            이제 진짜 너무 좋아서 우리 강아지들이 너무 사랑하고 아끼는거랍니다 아무한테나 정말 안알려주는데
            특별히 우리 펫프렌즈 분들에게 알려드릴게요! 자이게 뭐냐면 </a></p>
        </div>
        <img src="/static/Images/community_img/hot_issue1.jpg" alt="포스트 1 이미지" class="post-image"/>
        <div class="post-footer">
            <span class="like-button">❤️ 20</span>
            <span class="comment-button">💬 5</span>
        </div>
    </article>

</section>

</main>

    <jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>