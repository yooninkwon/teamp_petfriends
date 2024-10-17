<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>입양 센터</title>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
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
	<br /><
	<br />
	<br />
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

<%-- 		<c:forEach begin="1" end="10" var="i">

		</c:forEach> --%>

	</div>
	<script>
        const itemsPerPage = 8; // 페이지 당 item 수 = 8
        let currentPage = 1; // 페이지 기본값 = 1
        let totalItems = 0; // 총 item 수 초기화
        let adoptionItems = []; // item들을 담을 배열
// JSON 요청
        $(document).ready(function() {
            fetchData(currentPage); // <- 페이지가 로드되면 호출: fetchData(currentPage);
            var i = 0;
            function fetchData(page) {
                $.ajax({
                    url: '/helppetf/adoption/getJson', // api 불러오는 mapping
//                    url: '/helppetf/adoption/getJson_test', // api 불러오는 mapping (test)
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
            
			/* // 테스트:: test_result에 adoptionItems(오브젝트)중 desertionNo가 "어쩌구"인 오브젝트를 반환
			const test_result = adoptionItems.find(obj => obj.desertionNo === "447513202401236");
        	console.log(test_result); */
        	
            function displayItems(page) {
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const visibleItems = adoptionItems.slice(start, end);
                                                // console.log(start+'123'+index)
// item 객체의 정보를 테이블로 출력
                let cards = '';
                $.each(visibleItems, function(index, item) {
/* 오브젝트를 직접 전달? */ 
			 		cards += '<div class="adoption-card"><a href="#" class="adoption-link" data-index="'+ (start + index) +'">';
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
                    
        			/* 테스트:: test_result에 adoptionItems(오브젝트)중 desertionNo가 "어쩌3구"인 오브젝트를 반환
        			const test_result = adoptionItems.find(obj => obj.desertionNo === "447513202401236");
                	console.log(test_result); */
                	
                    i++;
                });

                $('#adoptionContainer').html(cards);
            }
            
            
           // 테스트: Object를 Json으로 변환해서 자바로 보내기 
          
			$(document).on('click', '.adoption-link', function(event) {
			    event.preventDefault();
			    const index = $(this).data('index'); // 클릭한 요소의 인덱스 값을 가져옴
			    const selectedItem = adoptionItems[index]; // adoptionItems 배열에서 해당하는 객체 가져오기
				    $.ajax({
			        url: '/helppetf/adoption/adoption_data', // 전송할 URL
			        method: 'POST',
			        contentType: 'application/json',
			        data: JSON.stringify(selectedItem), // 객체를 JSON으로 변환하여 전송
			        success: function(response) {
			            console.log('Success:', response);
			            // 서버 응답에 따라 페이지 이동 또는 다른 작업 수행
			            window.location.href = '/helppetf/adoption/adoption_content_view'; // 페이지 이동 예시
			        },
			        error: function(xhr, status, error) {
			            window.location.href = '/helppetf/adoption/adoption_content_view'; // 페이지 이동 예시
			            console.error('Error:', error);
			        }
			    }); 
			}); 
            /* 
			 document.addEventListener('DOMContentLoaded', function() {
			    // .adoption-link 클릭 이벤트 리스너 추가
			    document.querySelectorAll('.adoption-link').forEach(function(link, index) {
			        link.addEventListener('click', function(event) {
			            event.preventDefault(); // 기본 링크 클릭 동작 방지
			            
			            // 선택된 항목 가져오기
			            const selectedItem = adoptionItems[index]; // adoptionItems 배열에서 선택된 객체
			            
			            //여기부터@ POST 요청 보내기
			            fetch('/helppetf/adoption/adoption_data', {
			                method: 'POST',
			                headers: {
			                    'Content-Type': 'application/json'
			                },
			                body: JSON.stringify(selectedItem) // 선택된 객체를 JSON으로 변환
			            })
			            .then(response => {
			                if (!response.ok) {
			                    throw new Error('Network response was not ok');
			                }
			                return response.json(); // 응답을 JSON으로 변환
			            })
			            .then(data => {
			                console.log('Success:', data);
			                // 서버 응답에 따라 추가 작업 수행
			                window.location.href = '/helppetf/adoption/adoption_content_view'; // 리다이렉트
			            })
			            .catch(error => {
			                console.error('Error:', error);
			            }); //여기까지
			        });
			    });
			});
			  */
            
			// 페이징 은 자바로 다시 할 예정
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