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
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
    }

    h1 {
        text-align: center;
        font-size: 24px;
        margin-top: 30px;
        color: #333;
    }

/* 필터바 전체 스타일 */
#filter_form {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px; /* 필터 사이의 간격 */
	margin-bottom: 20px;
}

/* 공통 Select 스타일 */
#filter_form select {
	padding: 10px 20px; /* 내부 여백을 더 줌 */
	border-radius: 25px; /* 둥글게 설정 */
	border: 1px solid #ddd;
	background-color: #fff;
	color: #333;
	font-size: 14px;
	font-weight: 500;
	appearance: none; /* 기본 드롭다운 화살표 제거 */
	background-image:
		url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23333%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 class=%22feather feather-chevron-down%22%3E%3Cpolyline points=%226 9 12 15 18 9%22/%3E%3C/svg%3E');
	background-repeat: no-repeat;
	background-position: right 15px center; /* 화살표 위치 조정 */
	background-size: 14px; /* 화살표 크기 */
	cursor: pointer;
	width: 160px; /* 선택 박스의 기본 크기 */
	transition: border-color 0.3s ease;
}

/* 선택박스 포커스 시 효과 */
#filter_form select:focus {
	outline: none;
	border-color: #aaa;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

/* 화살표 제거 */
#filter_form select::-ms-expand {
	display: none;
}

/* 검색 버튼 스타일 */
#filter_form button {
	padding: 10px 20px;
	border-radius: 25px;
	border: 1px solid #ddd;
	background-color: #FF4081;
	color: #fff;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

#filter_form button:hover {
	background-color: #FF2972;
}

/* 선택박스 전체 높이와 정렬 */
#filter_form select, .filter-bar button {
	height: 40px;
	display: inline-block;
	vertical-align: middle;
}

    /* 비디오 카드 그리드 */
    .video-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 100px;
        margin: 10px;
    }

    /* 비디오 카드 스타일 */
    .video-card {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        overflow: hidden;
    }

    .video-card:hover {
        transform: scale(1.05);
    }

    .video-thumbnail {
        width: 100%;
        height: 50%;
        object-fit: cover;
    }

    .video-info {
        padding: 15px;
        text-align: left;
    }

    .video-info h3 {
        font-size: 16px;
        margin: 0;
        color: #333;
    }

    .video-info p {
        font-size: 13px;
        color: #777;
        margin: 5px 0;
    }

    .video-info .views-date {
        font-size: 12px;
        color: #aaa;
    }

    /* 페이지네이션 */
    .pagination {
        text-align: center;
        margin: 20px 0;
    }

    .pagination a {
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
        background-color: #ff007f;
        color: white;
    }

    .pagination a.active {
        background-color: #ff007f;
        color: white;
    }

    /* 반응형 디자인 */
    @media (max-width: 768px) {
        .filter-bar {
            flex-direction: column;
            align-items: stretch;
        }

        .filter-bar select, .filter-bar button {
            width: 100%;
            margin-bottom: 10px;
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
<br />
<div id="filter_form">
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

    <button>검색</button>
</div>

<div class="video-grid">
	<c:forEach items="${ylist }" var="y">
	    <div class="video-card" onclick="location.href='/helppetf/petteacher/petteacher_detail?hpt_seq=${y.hpt_seq }'">
        <img src="https://i.ytimg.com/vi/${y.hpt_yt_videoid }/hqdefault.jpg" alt="비디오 썸네일" class="video-thumbnail">
	        <div class="video-info">
	            <h3>${y.hpt_title } </h3>
	            <p>${y.hpt_exp }</p>
	            <p class="views-date">조회수 ${y.hpt_hit }회 ${y.hpt_rgedate }</p>
	        </div>
    	</div>
	</c:forEach>
</div>

<!-- 페이지네이션 -->
<div class="pagination">

</div>
<script src="/static/js/helppetf/petteacher_main.js"></script>

	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>