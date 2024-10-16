<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	admin_side
</title>
</head>
<body>
    <div id="sidebar-left">
        <ul>
            <li class="menu-item" id="home">홈</li>
            <li class="menu-item">
                주문
                <ul class="submenu">
                    <li><a href="order" id="order">주문 현황</a></li>
                    <li><a href="coupon" id="coupon">쿠폰 관리</a></li>
                </ul>
            </li>
            <li class="menu-item">
                상품
                <ul class="submenu">
                    <li><a href="product" id="product">상품 관리</a></li>
                </ul>
            </li>
            <li class="menu-item">
                고객
                <ul class="submenu">
                    <li><a href="customer_status" id="customer_status">회원 현황</a></li>
                    <li><a href="customer_info" id="customer_info">회원 정보 조회</a></li>
                </ul>
            </li>
            <li class="menu-item">
                게시판
                <ul class="submenu">
                    <li><a href="community" id="community">커뮤니티</a></li>
                    <li><a href="petture" id="petture">펫 티쳐</a></li>
                    <li><a href="notice" id="notice">공지사항/이벤트</a></li>
                </ul>
            </li>
            <li class="menu-item">
                통계
                <ul class="submenu">
                    <li><a href="sales" id="sales">매출 통계</a></li>
                    <li><a href="customer" id="customer">회원 통계</a></li>
                </ul>
            </li>
        </ul>
    </div>

	<script>
		document.addEventListener('DOMContentLoaded', function () {
		    var menuItems = document.querySelectorAll('.menu-item');
	
		    menuItems.forEach(function (item) {
		        item.addEventListener('click', function () {
		            // 현재 클릭된 메뉴의 서브 메뉴를 찾는다
		            var submenu = item.querySelector('.submenu');
		            
		            // 다른 메뉴의 서브메뉴가 열려있다면 닫는다
		            var openMenus = document.querySelectorAll('.submenu.open');
		            openMenus.forEach(function (menu) {
		                if (menu !== submenu) {
		                    menu.classList.remove('open');
		                    menu.style.maxHeight = null; // 서브메뉴 높이를 초기화
		                    menu.parentNode.classList.remove('active'); // 이전 클릭된 메뉴 색상 초기화
		                }
		            });
	
		            // 현재 클릭된 메뉴의 서브메뉴 토글
		            if (submenu) {
		                submenu.classList.toggle('open');
		                if (submenu.classList.contains('open')) {
		                    submenu.style.maxHeight = submenu.scrollHeight + 'px'; // 서브메뉴 높이를 콘텐츠 크기에 맞춤
		                    item.classList.add('active'); // 클릭된 메뉴의 텍스트를 검정색으로 변경
		                } else {
		                    submenu.style.maxHeight = null;
		                    item.classList.remove('active'); // 닫혔을 때 원래 색으로 복원
		                }
		            }
		        });
		    });
		});
		
		document.addEventListener('DOMContentLoaded', function () {
		    // 현재 페이지 URL의 마지막 부분을 가져온다 (예: "order")
		    var currentPage = window.location.pathname.split('/').pop(); 

		    // 모든 메뉴 항목에서 active 클래스 제거
		    var allMenuItems = document.querySelectorAll('#sidebar-left ul li');
		    allMenuItems.forEach(function (item) {
		        item.classList.remove('active');
		    });
			
		    // 홈 메뉴 처리: 홈 메뉴를 클릭하거나 현재 페이지가 home인 경우
		    var homeMenuItem = document.getElementById('home');
		    if (currentPage === 'home' || window.location.pathname === '/' || window.location.pathname === '') {
		        homeMenuItem.classList.add('active');
		    }
		    
		    // 홈 메뉴 클릭 시 href="home"으로 이동하고 active 클래스 추가
		    homeMenuItem.addEventListener('click', function () {
		        window.location.href = 'home'; // 홈 페이지로 이동
		        homeMenuItem.classList.add('active'); // active 클래스 추가
		    });
		    
		    // 현재 페이지와 일치하는 서브메뉴를 찾는다
		    var activeSubmenuItem = document.querySelector('a[href="' + currentPage + '"]');

		    // 일치하는 서브메뉴가 있으면, 상위 메인메뉴에 active 및 서브메뉴에 open 클래스 추가
		    if (activeSubmenuItem) {
		        var parentMenuItem = activeSubmenuItem.closest('.menu-item'); // 상위 메인메뉴를 찾는다
		        parentMenuItem.classList.add('active'); // 상위 메인메뉴에 active 클래스 추가

		        var submenu = parentMenuItem.querySelector('.submenu'); // 해당 메인메뉴의 서브메뉴 찾기
		        if (submenu) {
		            submenu.classList.add('open'); // 서브메뉴에 open 클래스 추가
		            submenu.style.maxHeight = submenu.scrollHeight + 'px'; // 서브메뉴 높이를 콘텐츠 크기에 맞춤
		        }
		    }
		});
	</script>
</body>
</html>