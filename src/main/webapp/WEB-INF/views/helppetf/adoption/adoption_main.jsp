<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>입양 센터</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<style>
        body {
            font-family: Arial, sans-serif;
        }
		a {
			text-decoration: none;
		}
        .adoption-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            max-width: 1200px;
            margin: 0 auto;
        }

        .adoption-card {
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px;
            width: calc(25% - 40px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }

        .adoption-card:hover {
            transform: scale(1.05);
        }

        .adoption-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .adoption-card .content {
            padding: 15px;
        }

        .adoption-card h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
        }

        .adoption-card p {
            margin: 8px 0;
            font-size: 14px;
            color: #666;
        }

        .adoption-card .info {
            font-weight: bold;
            font-size: 12px;
            color: #888;
        }

        /* Pagination styles */
        .pagination {
            display: flex;
            justify-content: center;
            margin: 20px 0;
        }

        .pagination a {
            padding: 8px 16px;
            margin: 0 4px;
            background-color: #f1f1f1;
            border-radius: 4px;
            text-decoration: none;
            color: #333;
        }

        .pagination a.active {
            background-color: #FF4081;
            color: white;
        }
    </style>
</head>
<body>
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />
	<br /><<br /> <br />
	<h1>입양 센터</h1>

	<a href="/helppetf/find/pet_hospital">주변 동물병원 찾기</a> &nbsp;
	<a href="/helppetf/find/pet_facilities">주변 반려동물 시설 찾기</a> &nbsp;
	<a href="/helppetf/adoption/adoption_main">입양 센터</a> &nbsp;
	<a href="/helppetf/petteacher/petteacher_main">펫티쳐</a> &nbsp;

	<div class="adoption-container" id="adoptionContainer">
        <!-- 데이터가 채워지는 곳 -->
    </div>

    <div class="pagination" id="pagination">
        <!-- 페이지네이션 -->
        
        <c:forEach begin="1" end="10" var="i">
        	
        </c:forEach>
        
    </div>
 <script>
        const itemsPerPage = 8; // 페이지 당 item 수 = 8
        let currentPage = 1; // 페이지 기본값 = 1
        let totalItems = 0; // 총 item 수 초기화
        let adoptionItems = []; // item들을 담을 배열
		
        $(document).ready(function() {
            fetchData(currentPage); // <- 페이지가 로드되면 호출: fetchData(currentPage);
			
            function fetchData(page) {
                $.ajax({
//                    url: '/helppetf/adoption/getJson', // api 불러오는 mapping
                    url: '/helppetf/adoption/getJson_test', // api 불러오는 mapping (test)
                    method: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        adoptionItems = data.item; 
                        totalItems = adoptionItems.length; // adoptionItems의 길이로 total갯수 계산
                        displayItems(page); // displayItems함수 호출 
                        setupPagination(); // 성공시 페이징도 설정
                    },
                    error: function(xhr, status, error) {
                        console.error('Error fetching data:', error);
                    }
                });
            }

            function displayItems(page) {
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const visibleItems = adoptionItems.slice(start, end);
                console.log(adoptionItems[7])
                console.log(adoptionItems[7].desertionNo)
                
				// item 객체의 정보를 출력
                let cards = '';
                $.each(visibleItems, function(index, item) {
                    cards += '<div class="adoption-card"><a href="/helppetf/adoption/content?desertionNo=' + item.desertionNo + '">';
                    cards += '<img src="' + item.popfile + '" alt="Pet Image" />';
                    cards += '<div class="content">';
                    cards += '<h3>' + item.kindCd + '</h3>';
                    cards += '<p class="info">공고번호: ' + item.desertionNo + '</p>';
                    cards += '<p><strong>발견 장소:</strong> ' + item.happenPlace + '</p>';
                    cards += '<p><strong>성별:</strong> ' + item.sexCd + '</p>';
                    cards += '<p><strong>발견 날짜:</strong> ' + item.happenDt + '</p>';
                    cards += '<p><strong>특징:</strong> ' + item.specialMark + '</p>';
                    cards += '</div>';
                    cards += '</a></div>';
                });

                $('#adoptionContainer').html(cards);
            }
			// 페이징
            function setupPagination() {
                const totalPages = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수 계산 -> 총 아이템 갯수 / 페이지당 출력 수
                let paginationHtml = '';

                for (let i = 1; i <= totalPages; i++) {
                    paginationHtml += '<a href="#" class="' + (i === currentPage ? 'active' : '') + '" data-page="' + i + '">' + i + '</a>';
                } // "현재 페이지"일 때 class="active" 부여, page 번호, 링크는 i로 대입

                $('#pagination').html(paginationHtml);

                $('#pagination a').on('click', function(event) { // a태그가 클릭되었을 시 이벤트
                    event.preventDefault();
                    const page = $(this).data('page'); 
                    if (page !== currentPage) { // 현재페이지와 클릭한 페이지가 같지 않을 때
                        currentPage = page; // 현재 페이지에 클릭한 페이지를 대입
                        displayItems(currentPage); // displayItems(page)에 대입한 페이지 넣어 호출
                        setupPagination();
                    }
                });
            }
        });
    </script>
    
<!-- @ TODO: 페이징, 필터링, 상세 페이지 등 -->
</body>
</html>