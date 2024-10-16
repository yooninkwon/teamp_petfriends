<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
	<h1>입양 센터</h1>

	<a href="/helppetf/find/pet_hospital">주변 동물병원 찾기</a> &nbsp;
	<a href="/helppetf/find/pet_facilities">주변 반려동물 시설 찾기</a> &nbsp;
	<a href="/helppetf/adoption/adoption_main">입양 센터</a> &nbsp;
	<a href="/helppetf/petteacher/petteacher_main">펫티쳐</a> &nbsp;

    <h1>Adoption Data</h1>
    
	<div class="adoption-container" id="adoptionContainer">
        <!-- 데이터가 채워지는 곳 -->
    </div>

    <div class="pagination" id="pagination">
        <!-- 페이지네이션 -->
    </div>
 <script>
        const itemsPerPage = 8;
        let currentPage = 1;
        let totalItems = 0;
        let adoptionItems = [];

        $(document).ready(function() {
            fetchData(currentPage);

            function fetchData(page) {
                $.ajax({
                    url: '/helppetf/adoption/getJson',  
                    method: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        adoptionItems = data.item;
                        totalItems = adoptionItems.length;
                        displayItems(page);
                        setupPagination();
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

            function setupPagination() {
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                let paginationHtml = '';

                for (let i = 1; i <= totalPages; i++) {
                    paginationHtml += '<a href="#" class="' + (i === currentPage ? 'active' : '') + '" data-page="' + i + '">' + i + '</a>';
                }

                $('#pagination').html(paginationHtml);

                $('#pagination a').on('click', function(event) {
                    event.preventDefault();
                    const page = $(this).data('page');
                    if (page !== currentPage) {
                        currentPage = page;
                        displayItems(currentPage);
                        setupPagination();
                    }
                });
            }
        });
    </script>
    
<!-- @ TODO: 페이징, 필터링, 상세 페이지 등 -->
</body>
</html>