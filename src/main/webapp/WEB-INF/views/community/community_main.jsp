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
    <aside class="sidebar">
       
		<div class="ad-banner">
		   <a href=""> <img src="/static/Images/community_img/ad1.jpg" alt="광고 배너" /> </a>
		</div>
	
    </aside>
	<!-- 펫프렌즈는 지금 뭐할까? -->
<div class="container-box">
    <div class="container-header"><span class="header-text">펫프렌즈는 지금 뭐할까?</span></div>
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
		    </ul>
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
	</section>


<!-- 포스트 섹션 -->
<section class="posts">
    <article class="post-card">
        <div class="post-header">
            <img src="/static/Images/community_img/story1.jpeg" alt="프로필 이미지 1" class="profile-image"/>
            <h2 class="post-title"><a href="#">이 장난감 너무 좋네요~^^</a></h2>
        </div>
        <p class="summary post-content"><a href="#">우리 강아지는 어렸을때 부터 이걸 좋아했...</a></p>
        <img src="/static/Images/community_img/hot_issue1.jpg" alt="포스트 1 이미지" class="post-image"/>
        <div class="post-footer">
            <span class="like-button">❤️ 20</span>
            <span class="comment-button">💬 5</span>
        </div>
    </article>
    <article class="post-card">
        <div class="post-header">
            <img src="/static/Images/community_img/story2.jpeg" alt="프로필 이미지 2" class="profile-image"/>
            <h2 class="post-title"><a href="#">포스트 제목 2</a></h2>
        </div>
        <p class="summary post-content"><a href="#">포스트 내용 2의 요약...</a></p>
        <img src="/static/Images/community_img/post_image2.jpg" alt="포스트 2 이미지" class="post-image"/>
        <div class="post-footer">
            <span class="like-button">❤️ 15</span>
            <span class="comment-button">💬 2</span>
        </div>
    </article>
    <!-- 추가 포스트 -->
    <article class="post-card">
        <div class="post-header">
            <img src="/static/Images/community_img/story3.jpeg" alt="프로필 이미지 3" class="profile-image"/>
            <h2 class="post-title"><a href="#">포스트 제목 3</a></h2>
        </div>
        <p class="summary post-content"><a href="#">포스트 내용 3의 요약...</a></p>
        <img src="/static/Images/community_img/post_image3.jpg" alt="포스트 3 이미지" class="post-image"/>
        <div class="post-footer">
            <span class="like-button">❤️ 30</span>
            <span class="comment-button">💬 8</span>
        </div>
    </article>
</section>

</main>

    <jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>