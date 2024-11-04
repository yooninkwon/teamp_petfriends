

$(document).ready(function() {
    loadNoticeData();
    
    // 탭 전환 기능
    document.querySelectorAll('.tab-btn').forEach(function(tabBtn) {
        tabBtn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // 모든 콘텐츠 숨김
            document.querySelectorAll('.tab-content').forEach(function(content) {
                content.style.display = 'none';
            });

            // 클릭한 탭에 해당하는 콘텐츠만 표시
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).style.display = 'block';
            
            // 탭이 "notice-list-container"일 때 공지사항 데이터 로드
            if (tabId === 'notice-list-container') {
                loadNoticeData();
            }
            if (tabId === 'event-list-container') { // 오타 수정
                loadEventData();
            }
        });
    });
    
    // 공지사항 리스트 호출 및 화면에 표시
    function loadNoticeData() {
        fetch('/admin/notice_notice_list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            displayNoticeList(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    
    // 공지사항 데이터를 테이블에 표시하는 함수
    function displayNoticeList(data) {
        let post = '<tbody>';
        
        data.forEach(item => {
            post += `
                <tr>
                    <td><input type="checkbox" class="notice-checkbox" value="${item.notice_no}" /></td>
                    <td>${item.notice_no}</td>
                    <td><a href="/notice/noticeView">${item.notice_title}</a></td>
                    <td>${item.notice_date}</td>
                    <td>${item.notice_hit}</td>
                    <td>${item.notice_show}</td>
                    <td>
                        <input type="button" value="수정" onclick="location.href='/admin/notice_edit?id=${item.notice_no}'" />
                        <input type="button" class="deleteBtn" data-id="${item.notice_no}" value="삭제" />
                    </td>
                </tr>
            `;
        });
        
        post += '</tbody>';
        
        $('#notice-list-container .notice-list tbody').remove();
        $('#notice-list-container .notice-list').append(post);
		
		// 공지사항 삭제
	 	$('.deleteBtn').on('click', function() {
			const notice_no = this.getAttribute('data-id');
			console.log(notice_no)
			deleteNotice(notice_no)
		});
    }
	
	$('.selectAll').on('click', function() {
	    const checkboxes = document.querySelectorAll('.notice-checkbox');
	    const isChecked = $(this).prop('checked'); // 체크 상태 가져오기
	    
	    checkboxes.forEach(checkbox => {
	        checkbox.checked = isChecked;
	    });
	});
	
	
	
	
	function deleteNotice(notice_no) {
	      if (confirm("정말 삭제하시겠습니까?")) {
	         fetch(`/deleteNotice?id=${notice_no}`, {
	            method: "DELETE",
	            headers: {
	               "Content-Type": "application/json"
	            }
	         })
	            .then(response => {
	               if (response.ok) {
	                  alert("삭제되었습니다.");
	                  location.reload(); // 페이지 새로고침하여 리스트 갱신
	               } else {
	                  alert("삭제에 실패했습니다.");
	               }
	            })
	            .catch(error => {
	               console.error("Error:", error);
	               alert("오류가 발생했습니다.");
	            });
	      }
	   }

	
	
    // 이벤트 리스트 호출
    function loadEventData() {
        fetch('/admin/notice_event_list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            displayEventList(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    
    // 이벤트 데이터를 테이블에 표시하는 함수
    function displayEventList(data) {
        let post = '<tbody>';
        
        data.forEach(item => {
            post += `
                <tr>
                    <td><input type="checkbox" class="event-checkbox" value="${item.event_no}" /></td>
                    <td>${item.event_no}</td>
                    <td><a href="/event/eventView">${item.event_title}</a></td>
                    <td>${item.event_startdate}</td>
                    <td>${item.event_enddate}</td>
                    <td>${item.event_legdate}</td>
                    <td>${item.event_thumbnail}</td>
                    <td>${item.event_hit}</td>
                    <td>${item.event_show}</td>
                    <td>
                        <input type="button" value="수정" onclick="location.href='/admin/event_edit?id=${item.event_no}'" />
                        <input type="button" value="삭제" onclick="deleteEvent(${item.event_no})" />
                    </td>
                </tr>
            `;
        });
        
        post += '</tbody>';
        
        $('#event-list-container .event-list tbody').remove(); // 이벤트 전용 컨테이너로 변경
        $('#event-list-container .event-list').append(post);   // 새로운 tbody 추가
    }	

	




	// 페이지 로드 시 초기화
	document.addEventListener("DOMContentLoaded", function() {
		toggleNoticeList();
	});

});