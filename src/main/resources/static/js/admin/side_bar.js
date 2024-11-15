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
		
		
		    // 현재 페이지 URL의 마지막 부분을 가져온다 (예: "order")
		    var currentPage = window.location.pathname.split('/').pop(); 

		    // 모든 메뉴 항목에서 active 클래스 제거
		    var allMenuItems = document.querySelectorAll('#sidebar-left ul li');
		    allMenuItems.forEach(function (item) {
		        item.classList.remove('active');
		    });
					    
		    // 현재 페이지와 일치하는 서브메뉴를 찾는다
		    var activeSubmenuItem = document.querySelector(`#sidebar-left a[href="${currentPage}"]`);

		    // 일치하는 서브메뉴가 있으면, 상위 메인메뉴에 active 및 서브메뉴에 open 클래스 추가
		    if (activeSubmenuItem) {
		        var parentMenuItem = activeSubmenuItem.closest('.menu-item'); // 상위 메인메뉴를 찾는다
		        parentMenuItem.classList.add('active'); // 상위 메인메뉴에 active 클래스 추가
				
				// a태그의 상위 중 가장 가까운 li를 찾는다.
				let subMenuLi = activeSubmenuItem.closest('li')
				subMenuLi.classList.add('active-sub'); // 클래스 부여
				
		        var submenu = parentMenuItem.querySelector('.submenu'); // 해당 메인메뉴의 서브메뉴 찾기
		        if (submenu) {
		            submenu.classList.add('open'); // 서브메뉴에 open 클래스 추가
		            submenu.style.maxHeight = submenu.scrollHeight + 'px'; // 서브메뉴 높이를 콘텐츠 크기에 맞춤
		        }
		    }
		});