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
                    <img src="/static/Images/community_img/hot_issue1.jpg" alt="핫토픽 1 이미지" />
                    <p>핫토픽 1 제목</p>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="/static/Images/community_img/hot_issue2.jpg" alt="핫토픽 2 이미지" />
                    <p>핫토픽 2 제목</p>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="/static/Images/community_img/hot_issue3.jpg" alt="핫토픽 3 이미지" />
                    <p>핫토픽 3 제목</p>
                </a>
            </li>
        </ul>
    </section>

    <!-- 사이드바 -->
    <aside class="sidebar">
       
		<div class="ad-banner">
		    <img src="/static/Images/community_img/ad1.jpg" alt="광고 배너" />
		</div>
		<ul>
            <li><a href="#">인기 포스트 1</a></li>
            <li><a href="#">인기 포스트 2</a></li>
            <li><a href="#">인기 포스트 3</a></li>
        </ul>
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
	    <h3>카테고리</h3>
	    <ul>
	        <li>
	            <a href="#">
	                <img src="/static/Images/community_img/category1.png" alt="육아 아이콘" />
	                <p>육아꿀팁</p>
	            </a>
	        </li>
	        <li>
	            <a href="#">
	                <img src="/static/Images/community_img/category2.png" alt="취미 아이콘" />
	                <p>내새꾸자랑</p>
	            </a>
	        </li>
	        <li>
	            <a href="#">
	                <img src="/static/Images/community_img/category3.png" alt="생활 아이콘" />
	                <p>펫테리어</p>
	            </a>
	        </li>
	        <li>
	            <a href="#">
	                <img src="/static/Images/community_img/category4.png" alt="기술 아이콘" />
	                <p>펫션쇼</p>
	            </a>
	        </li>
	        <li>
	            <a href="#">
	                <img src="/static/Images/community_img/category5.png" alt="여행 아이콘" />
	                <p>집사일기</p>
	            </a>
	        </li>
			<li>
			    <a href="#">
			        <img src="/static/Images/community_img/category6.png" alt="여행 아이콘" />
			        <p>육아질문</p>
			    </a>
			</li>   
			<li>
			    <a href="#">
			        <img src="/static/Images/community_img/category7.png" alt="여행 아이콘" />
			        <p>수의사상담</p>
			    </a>
			</li>		
			
		 </ul>
	</section>

    <!-- 포스트 섹션 -->
    <section class="posts">
        <article>
            <a href="#"><img src="" alt="포스트 1 이미지" /></a>
            <h2><a href="#">포스트 제목 1</a></h2>
            <p class="date">2024년 10월 14일</p>
            <p class="summary"><a href="#">포스트 내용 1의 요약...</a></p>
        </article>
        <article>
            <a href="#"><img src="" alt="포스트 2 이미지" /></a>
            <h2><a href="#">포스트 제목 2</a></h2>
            <p class="date">2024년 10월 13일</p>
            <p class="summary"><a href="#">포스트 내용 2의 요약...</a></p>
        </article>
    </section>
</main>

    <jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>