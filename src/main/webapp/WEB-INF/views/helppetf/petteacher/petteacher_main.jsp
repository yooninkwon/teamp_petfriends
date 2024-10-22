<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫티쳐</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />

<style>
    /* 전체 레이아웃 */
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 20px;
    }

    h1 {
        text-align: center;
        font-size: 24px;
        color: #333;
        font-weight: bold;
    }

    /* 필터 섹션 스타일 */
    .filter-bar {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        padding-left: 20px;
    }

    .filter-bar select {
        padding: 10px 15px;
        border-radius: 25px;
        border: 1px solid #ddd;
        background-color: #fff;
        font-size: 14px;
        appearance: none;
        cursor: pointer;
        position: relative;
    }

    .filter-bar select:focus {
        outline: none;
        border-color: #999;
    }

    .filter-bar button {
        padding: 10px 20px;
        border-radius: 25px;
        border: none;
        background-color: #ff007f;
        color: white;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s ease;
    }

    .filter-bar button:hover {
        background-color: #e60072;
    }

    /* 비디오 카드 그리드 */
    .video-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        padding: 0 20px;
    }

    /* 비디오 카드 스타일 */
    .video-card {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.3s ease;
    }

    .video-card:hover {
        transform: translateY(-5px);
    }

    .video-thumbnail {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }

    .video-info {
        padding: 15px;
        text-align: left;
    }

    .video-info h3 {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        color: #333;
    }

    .video-info p {
        font-size: 12px;
        color: #666;
        margin: 5px 0;
    }

    .video-info .views-date {
        font-size: 12px;
        color: #aaa;
    }

    /* 페이지네이션 */
    .pagination {
        text-align: center;
        margin-top: 30px;
    }

    .pagination a {
        display: inline-block;
        padding: 10px 15px;
        margin: 0 5px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        text-decoration: none;
        color: #333;
        transition: background-color 0.3s ease;
    }

    .pagination a:hover {
        background-color: #007bff;
        color: white;
    }

    .pagination a.active {
        background-color: #007bff;
        color: white;
    }

    /* 반응형 디자인 */
    @media (max-width: 600px) {
        .filter-bar {
            flex-direction: column;
            align-items: flex-start;
        }

        .filter-bar select, .filter-bar button {
            width: 100%;
        }
    }
</style>

</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<h1>펫티쳐</h1>

	<a href="/helppetf/find/pet_hospital">주변 동물병원 찾기</a> &nbsp;
	<a href="/helppetf/find/pet_facilities">주변 반려동물 시설 찾기</a> &nbsp;
	<a href="/helppetf/adoption/adoption_main">입양 센터</a> &nbsp;
	<a href="/helppetf/petteacher/petteacher_main">펫티쳐</a> &nbsp;
<hr />
<!-- 임시: admin page 이동 -->
<a href="/admin/admin_petteacher">임시 링크: 펫티쳐 어드민 페이지 이동</a><br />
<br /><div class="filter-bar">
    <select>
        <option disabled selected>동물종류</option>
        <option>고양이</option>
        <option>강아지</option>
    </select>

    <select>
        <option disabled selected>카테고리</option>
        <option>훈련</option>
        <option>건강</option>
        <option>습관</option>
    </select>

    <button>필터링</button>
</div>

<div class="video-grid">
    <div class="video-card">
        <img src="https://via.placeholder.com/250x140" alt="비디오 썸네일" class="video-thumbnail">
        <div class="video-info">
            <h3>고양이 예방접종, 인터넷 믿지 마세요!</h3>
            <p>미야옹철의 냥냥펀치 - 구독자 NN만</p>
            <p class="views-date">조회수 NN회 YY/MM/DD</p>
        </div>
    </div>

    <div class="video-card">
        <img src="https://via.placeholder.com/250x140" alt="비디오 썸네일" class="video-thumbnail">
        <div class="video-info">
            <h3>고양이 발톱을 자르지 마세요!</h3>
            <p>미야옹철의 냥냥펀치 - 구독자 NN만</p>
            <p class="views-date">조회수 NN회 YY/MM/DD</p>
        </div>
    </div>

    <div class="video-card">
        <img src="https://via.placeholder.com/250x140" alt="비디오 썸네일" class="video-thumbnail">
        <div class="video-info">
            <h3>우리집 고양이는 나를 좋아할까?</h3>
            <p>미야옹철의 냥냥펀치 - 구독자 NN만</p>
            <p class="views-date">조회수 NN회 YY/MM/DD</p>
        </div>
    </div>

    <!-- 추가 비디오 카드들... -->
</div>

<!-- 페이지네이션 -->
<div class="pagination">
    <a href="#">&laquo;</a>
    <a href="#" class="active">1</a>
    <a href="#">2</a>
    <a href="#">3</a>
    <a href="#">4</a>
    <a href="#">5</a>
    <a href="#">&raquo;</a>
</div>

	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>