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
        <h3>핫토픽</h3>
        <ul>
            <li>
                <a href="#">
                    <img src="/static/Images/community_img/hot_issue1.jpg" alt="핫토픽 1 이미지" />
                    <p>핫토픽 1 제목</p>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="/static/Images/community_img/hot_issue1.jpg" alt="핫토픽 2 이미지" />
                    <p>핫토픽 2 제목</p>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="/static/Images/community_img/hot_issue1.jpg" alt="핫토픽 3 이미지" />
                    <p>핫토픽 3 제목</p>
                </a>
            </li>
        </ul>
    </section>

    <!-- 사이드바 -->
    <aside class="sidebar">
        <h3>사이드바</h3>
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
        <a href="#" class="story-item">
            <img src="/static/Images/community_img/category1.png" alt="스토리 이미지 1" class="story-image">
    	</a>
        <a href="#" class="story-item">
            <img src="/static/Images/community_img/category1.png" alt="스토리 이미지 2" class="story-image">
        </a>
        <a href="#" class="story-item">
            <img src="/static/Images/community_img/category1.png" alt="스토리 이미지 3" class="story-image">
        </a>
        <!-- 필요한 만큼 더 추가 -->
    </div>
</div>

    <!-- 카테고리 섹션 -->
    <section class="categories">
        <h3>카테고리</h3>
        <ul>
            <li><a href="#"><img src="/static/Images/community_img/category1.png" alt="스포츠 아이콘" /> </a></li>
            <li><a href="#"><img src="/static/Images/community_img/category1.png" alt="취미 아이콘" /> </a></li>
            <li><a href="#"><img src="/static/Images/community_img/category1.png" alt="생활 아이콘" /> </a></li>
            <li><a href="#"><img src="/static/Images/community_img/category1.png" alt="기술 아이콘" /> </a></li>
            <li><a href="#"><img src="/static/Images/community_img/category1.png" alt="여행 아이콘" /> </a></li>
            <li><a href="#"><img src="/static/Images/community_img/category1.png" alt="여행 아이콘" /> </a></li>
            <li><a href="#"><img src="/static/Images/community_img/category1.png" alt="여행 아이콘" /> </a></li>
            <li><a href="#"><img src="/static/Images/community_img/category1.png" alt="여행 아이콘" /> </a></li>
            <li><a href="#"><img src="/static/Images/community_img/category1.png" alt="여행 아이콘" /> </a></li>
           
        </ul>
    </section>

    <!-- 포스트 섹션 -->
    <section class="posts">
        <article>
            <a href="#"><img src="post1.jpg" alt="포스트 1 이미지" /></a>
            <h2><a href="#">포스트 제목 1</a></h2>
            <p class="date">2024년 10월 14일</p>
            <p class="summary"><a href="#">포스트 내용 1의 요약...</a></p>
        </article>
        <article>
            <a href="#"><img src="post2.jpg" alt="포스트 2 이미지" /></a>
            <h2><a href="#">포스트 제목 2</a></h2>
            <p class="date">2024년 10월 13일</p>
            <p class="summary"><a href="#">포스트 내용 2의 요약...</a></p>
        </article>
    </section>
</main>

    <jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>