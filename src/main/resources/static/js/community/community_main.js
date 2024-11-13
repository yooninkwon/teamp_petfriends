

function fetchMyNeighborList() {
	$.ajax({
		url: '/community/MainNeighborList',
		method: 'GET',
		success: function(data) {
			console.log("data:", data);
			let html = '<h4>내 이웃 목록</h4><ul>';

			if (data.length === 0) {
				html += '<li>이웃이 없습니다.</li>'; // 이웃 목록이 없을 경우 메시지 출력
			} else {
				// 이웃 목록 데이터 순회
				data.forEach(Myneighbor => {
					// 이웃의 이름과 프로필 이미지 출력
					html += `
		                        <div class="neighbor-item">
		                            <div class="neighbor-pet-img-container">
		                                <a href="/community/myfeed/${Myneighbor.friend_mem_code}" target="_blank">
		                                    <img src="/static/Images/pet/${Myneighbor.pet_img || 'noPetImg.jpg'}" alt="${Myneighbor.friend_mem_nick}" class="neighbor-pet-img">
		                                </a>
		                            </div>
		                            <div class="neighbor-name">
		                                <a href="/community/myfeed/${Myneighbor.friend_mem_code}" target="_blank">
		                                    ${Myneighbor.friend_mem_nick}
		                                </a>
		                            </div>
		                        </div>
		                    `;
				});
			}

			html += '</ul>';
			$('#MyneighborListContainer').html(html); // 모달에 이웃 목록 삽입

			// 내 이웃 모달 열기
			openMyNeighborListModal();
		},
		error: function(error) {
			console.log('이웃 목록을 가져오는 중 오류 발생:', error);
		}
	});
}

// 문서가 로드된 후에 다른 이벤트 처리
$(document).ready(function() {
	$('.category-button').click(function(e) {
		e.preventDefault(); // 기본 링크 클릭 이벤트 방지

		var cateNo = $(this).data('cate-no'); // 클릭한 카테고리 번호

		$.ajax({
			url: '/community/getPostsByCategory', // 카테고리별 게시글 조회 URL
			type: 'GET',
			data: {
				b_cate_no: cateNo
			}, // 카테고리 번호 전달
			success: function(data) {
				// postContainer 영역 업데이트
				$('#postContainer').html(data);
			},
			error: function() {
				alert('게시글을 불러오는 데 실패했습니다.');
			}
		});
	});
});

// 내 이웃 목록 모달 열기
function openMyNeighborListModal() {
	document.getElementById("myNeighborListModal").style.display = "block"; // 내 이웃 목록 모달 열기
}

// 내 이웃 목록 모달 닫기
function closeMyNeighborListModal() {
	document.getElementById("myNeighborListModal").style.display = "none"; // 내 이웃 목록 모달 닫기
}

// 이미지 클릭 시 회색으로 처리하는 함수
function applyGrayFilter(storyId) {
	const imageElement = document.querySelector(`#story-img-${storyId}`);
	if (imageElement) {
		imageElement.classList.add("gray-filter"); // 회색 필터 적용

		// 클릭 상태 서버에 저장
		$.ajax({
			url: '/community/updateImageClickStatus',
			type: 'POST',
			data: { storyId: storyId, clicked: true },
			success: function(response) {
				console.log("이미지 클릭 상태가 서버에 저장되었습니다.");
			},
			error: function(error) {
				console.log("이미지 클릭 상태 저장 중 오류 발생:", error);
			}
		});
	}
}

// 클릭 이벤트 리스너 설정
document.addEventListener("DOMContentLoaded", function() {
	document.querySelectorAll(".story-image").forEach(image => {
		image.addEventListener("click", function() {
			const storyId = this.dataset.storyId;
			applyGrayFilter(storyId);
		});
	});
});



function fetchMyActivity() {
	fetch('/community/myActivity', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			console.log("data:", data);
			const activityBox = document.querySelector('.sidebar-notice p');
			activityBox.innerHTML = '';  // 기존 내용을 지우고 새 내용으로 업데이트합니다.

			if (data.length > 0) {
				data.forEach(activity => {
					let activityMessage = ''; // 기본 메시지 변수

				
					if (activity.activity_type === '댓글') {
						// related_user_id가 user_id와 같으면 "나에게"로 변경
						if (activity.related_user_id === activity.user_id) {
							activityMessage = `나에게 댓글을 등록했습니다. <a href="/community/contentView?board_no=${activity.board_no}"><br />(${activity.created_at}) 보기</a>`;
						} else {
							activityMessage = `${activity.related_user_id}님에게 댓글을 등록했습니다. <a href="/community/contentView?board_no=${activity.board_no}"><br />(${activity.created_at}) 보기</a> `;
						}
					} else if (activity.activity_type === '좋아요') {
						if (activity.related_user_id === activity.user_id) {
							activityMessage = `나에게 좋아요♥를 눌렀습니다. <a href="/community/contentView?board_no=${activity.board_no}"><br />(${activity.created_at}) 보기</a>`;
						} else {
							activityMessage = `${activity.related_user_id}님에게 좋아요♥를 눌렀습니다. <a href="/community/contentView?board_no=${activity.board_no}"><br />(${activity.created_at}) 보기</a>`;
						}
					} else if (activity.activity_type === '친구추가') {
						activityMessage = `${activity.related_user_id}님을 친구추가 했습니다. <a href="/community/myfeed/${activity.related_user_mem_code}"> <br />(${activity.created_at}) 보기</a> `;
					}

					// 포맷된 메시지 추가
					activityBox.innerHTML += ` <p>${activityMessage}</p>`;
				});
			} else {
				activityBox.innerHTML = '<p>활동 내역이 없습니다.</p>';
			}
		})
		.catch(error => console.error('Error fetching user activity:', error));
}



// 활동 내역을 가져오는 함수
function fetchUserActivity() {
	fetch('/community/userActivity', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			const activityBox = document.querySelector('.sidebar-notice p');
			activityBox.innerHTML = '';  // 기존 내용을 지우고 새 내용으로 업데이트합니다.


			if (data.length > 0) {
				data.forEach(activity => {
					let activityMessage = ''; // 기본 메시지 변수

					if (activity.related_user_id === activity.user_id) {
						activityMessage = '';
					}
					else {
						if (activity.activity_type === '댓글') {
							activityMessage = `${activity.user_id}님이 댓글을 등록했습니다. <a href="/community/contentView?board_no=${activity.board_no}"><br />(${activity.created_at}) 보기</a> `;
						}
						else if (activity.activity_type === '좋아요') {
							activityMessage = `${activity.user_id}님이 좋아요♥를 눌렀습니다. <a href="/community/contentView?board_no=${activity.board_no}"><br />(${activity.created_at}) 보기</a>`;
						} else if (activity.activite === '친구추가') {

							}else if (activity.activity_type === '친구추가') {
								activityMessage = `${activity.user_id}님이 친구추가를 했습니다. <a href="/community/myfeed/${activity.related_user_mem_code}"> <br />(${activity.created_at}) 보기</a> `;
							}
							
							}// 포맷된 메시지 추가
							
							activityBox.innerHTML += ` <p>${activityMessage}</p>`;
						});
			} else {
				activityBox.innerHTML = '<p>활동 내역이 없습니다.</p>';
			}
		})
		.catch(error => console.error('Error fetching user activity:', error));
}