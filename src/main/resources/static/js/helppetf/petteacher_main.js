/**
 * 이 스크립트는 펫티쳐 페이지의 메인 화면과, 상세페이지 화면을 
 * 동적으로 생성하여 표시하고 감춘다.
 * 
 * 펫티쳐 메인 페이지를 로드하면 데이터베이스에 데이터를 요청하여,
 * 필터링이 설정되지 않은 데이터를 서버(Java)에서 JSP로 불러오는 Ajax 코드와,
 * 필터링 선택 후 버튼 클릭 시 설정된 필터 기준으로 데이터를 다시 요청하는 코드로 구성되어 있다.
 * 
 * 데이터가 정상적으로 수신되면, 해당 데이터를 테이블 형식으로 화면에 출력한다.
 * 
 * 동물 종류와 카테고리 필터링이 존재한다.
 * 필터링 선택 후 "검색" 버튼을 클릭할 때, 선택한 필터의 값에 해당하는 정보를 데이터베이스에 요청해 불러온다.
 * 
 * 검색 버튼을 눌러 필터링이 포함된 데이터를 불러온 이후에도 선택된 필터링은 유지된다.
 * 초기화 버튼을 눌러 필터링을 초기화할 수 있다.
 * 
 * 
 * 메인 페이지의 카드레이아웃을 클릭하면, 해당하는 영역에 해당하는 게시글이 표시된다.
 * 메인 페이지 전체가 포함되어 있는 div의 스타일을 display: none으로 만들어 보이지 않게 하고,
 * 상세 페이지 전체가 포함되어 있는 div의 스타일을 display: block으로 만들어 보이게 한다.
 * (목록으로 클릭 시 반대로 적용)
 * 
 * dataset을 이용해 메인 페이지에 카드레이아웃이 배치될 때 각각에 해당하는 글 번호를 저장한다.
 * 카드레이아웃을 눌렀을 때, 해당 카드에 저장되어 있는 글 번호를 추출하여 전송, 상세 내용을 불러온다.
 * 
 * 불러와진 정보들 중 유튜브 Iframe API에 사용할 수 있는 비디오아이디로 iframe을 생성한다.
 * 카드레이아웃을 클릭시 동적으로 div를 생성하여 iframe을 생성한다.
 * 
 * 유저의 열람이 끝난 뒤, 목록으로 버튼을 누르면 생성된 iframe을 제거하고, 메인 페이지로 복귀된다.
 * 
 */

$(document).ready(function() {
	
	// 메인 nav, 서브 nav '선택됨' 클래스 설정
	document.getElementById(main_navbar_id).classList.add('selected');
	document.getElementById(sub_navbar_id).classList.add('selected');
	/* 
	
	펫티쳐 메인
	
	*/
	const itemsPerPage = 8; // 페이지 당 item 수 = 6
	let currentPage = 1; // 현재 표시되는 페이지
	let totalItems = 0; // 총 item 수 초기화
	let petteacherList; // ArrayList를 담을 변수
	let currPageGroup = 1; // 현재 페이지 그룹
	let totalPages = 0; // 총 페이지 수
	let preEndPage = 0; // 이전 페이지의 마지막 페이지 번호
	let formParam = ''; // form (필터) 의 파라미터값

	fetchData(currentPage, currPageGroup, formParam); // 페이지 로드 시 호출 (formParam은 공백: 필터가 없으므로)

	function fetchData(currentPage, currPageGroup, formParam) {
		$.ajax({
			url: '/helppetf/petteacher/petteacher_data?' + formParam, // pageNo에 맞는 데이터 요청-필터링된 API 호출 
			method: 'GET',
			dataType: 'json',
			headers: {
				'Cache-Control': 'no-cache' // 캐시 없음 설정
			},
			success: function(data) {
				petteacherList = data; // 변수에 데이터 대입
				totalItems = petteacherList.length; // 받아온 데이터 총 갯수 계산
				totalPages = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수 계산

				displayItemsForMain(currentPage); // 아이템 표시
				setupPagination(currentPage, currPageGroup); // 페이지네이션 설정
			},
			error: function(xhr, status, error) {
				console.error('Error fetching data:', error);
			}
		});
	}

	// 아이템을 페이지에 맞게 출력
	function displayItemsForMain(currentPage) {

		if (currentPage <= 10) {
			// 현재 페이지가 10이하인 경우 == 페이지그룹이 1인 경우
			var start = (currentPage - 1) * itemsPerPage;
		} else {
			// 그 외 == 페이지그룹이 2이상인 경우
			// start = (현재페이지 - 이전마지막페이지 - 1) * itemsPerPage(6)
			var start = ((currentPage - preEndPage) - 1) * itemsPerPage;
		}
		
		let cards = '';
		if(totalItems === 0) {
			// 필터링 또는 표시 결과가 없을 경우
			alert('요청하신 필터의 결과가 존재하지 않습니다.');
			// 새로고침
			location.href = location.href;
		} else {
			// end = 시작 인덱스번호 + itemsPerPage(6)
			const end = start + itemsPerPage;
			const sliceList = petteacherList.slice(start, end);
			// .slice(start, end)는 배열에서 start부터 end 이전까지의 아이템들을 추출
			// start가 0이고 end가 6이라면 인덱스 [0] ~ [5] 을 출력
	
			// 데이터를 테이블로 출력
			
			$.each(sliceList, function(index, ylist) {
				cards += '<div class="video-card" data-hphseq="' + ylist.hpt_seq + '">';
				cards += '<img src="https://i.ytimg.com/vi/' + ylist.hpt_yt_videoid + '/hqdefault.jpg" alt="비디오 썸네일" class="video-thumbnail">';
				cards += '<div class="content">';
				cards += '<h3 class="info">' + ylist.hpt_title + '</h3>';
				cards += '<div><div><span>' + ylist.hpt_channal + '</span></div>';
				cards += '<div class="video_desc">' + ylist.hpt_exp + '</div></div>';
				cards += '<div class="flex"><div><span>등록일 </span>' + ylist.hpt_rgedate + '</div>';
				cards += '<div class="views-date"><span>조회수 </span>' + ylist.hpt_hit + '회</div></div>';
				cards += '</div>';
				cards += '</a></div>';
			});
	
		}
		
		$('#videoContainer').html(cards);
	
	}

	// 페이지네이션 설정
	function setupPagination() {
		const maxPagesToShow = 10; // 한 번에 보여줄 페이지 수
		const startPage = (currPageGroup - 1) * maxPagesToShow + 1; // 현재 그룹의 첫 페이지 계산
		const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages); // 마지막 페이지 계산

		let paginationHtml = '';

		// 이전 버튼 추가 (현재 페이지 그룹이 1보다 크면 표시)
		if (currPageGroup > 1) {
			paginationHtml += '<a href="#" id="prev-group">&laquo; 이전</a>';
		}

		// 페이지 번호 생성
		for (let i = startPage; i <= endPage; i++) {
			paginationHtml += '<a href="#" id="i" class="' + (i === currentPage ? 'active' : '') + '" data-page="' + i + '">' + i + '</a>';
		}

		// 다음 버튼 추가
		if (endPage < totalPages) {
			paginationHtml += '<a href="#" id="next-group">다음 &raquo;</a>';
		}
		$('#pagination').html(paginationHtml);

		// 페이지 클릭 이벤트 핸들러
		$('#pagination a').on('click', function(event) {
			event.preventDefault();
			pageScroll(0); // 페이지 스크롤 함수
			if ($(this).attr('id') === 'prev-group') {
				// 이전 그룹으로 이동
				currPageGroup--;
				currentPage = (currPageGroup - 1) * maxPagesToShow + 1; // 이전 그룹의 첫 페이지
			} else if ($(this).attr('id') === 'next-group') {
				// 다음 그룹으로 이동
				currPageGroup++;
				currentPage = (currPageGroup - 1) * maxPagesToShow + 1; // 다음 그룹의 첫 페이지
			} else {
				// 클릭한 페이지로 이동
				currentPage = $(this).data('page');
			}

			// 페이지 번호와 그룹에 맞게 데이터 다시 로드
			displayItemsForMain(currentPage);
			setupPagination();
		});
	}

	// 필터 선택 후 filterSubmit 클릭 시 호출
	$('#filterSubmit').on('click', function(event) {
		event.preventDefault(); // 기본 form 제출 동작 방지 (기본 링크를 이것으로 대체함)
		formParam = $('#filter_form form').serialize(); // form 데이터 시리얼라이즈
		currentPage = 1; // 필터링 시 페이지를 1로 리셋
		fetchData(currentPage, currPageGroup, formParam); // 필터 데이터를 포함해서 fetchData 호출
	});

	// 필터 선택 후 filterReset 클릭 시 호출 - 필터 선택 리셋
	$('#filterReset').on('click', function() {
		$("#petType option:eq(0)").prop("selected", true);
		$("#category option:eq(0)").prop("selected", true);
		formParam = '';
		fetchData(currentPage, currPageGroup, formParam); // 필터 데이터를 포함해서 fetchData 호출
	});

	/* 
	
	펫티쳐 상세페이지 
	
	*/
	
	// iframe 플레이어 변수
	let player;
	
	
	// 상세 페이지의 목록으로 버튼 클릭시
	$(document).on('click', '.back_list_btn', function() {
		pageScroll(0);
		
		// 펫티쳐 메인, 상세 페이지 각각의 전체를 감싸는 div에 클래스를 변경
		// CSS 스타일시트에 'on' 클래스는 display: block; , 'off' 클래스는 display: none; 이다.
		$('#petteacher-main').removeClass().addClass('on');
		$('#petteacher-detail').removeClass().addClass('off');
		
		// 생성되어 있는 iframe이 있다면 삭제한다.
		const deleteIframe = document.getElementById('player');
		if (deleteIframe != null) {
			deleteIframe.remove();
		}
	});
	
	// 상세 페이지 div 클릭시
	$(document).on('click', '.video-card', function() {
		pageScroll(0);

		// 펫티쳐 메인, 상세 페이지 각각의 전체를 감싸는 div에 클래스를 변경
		// CSS 스타일시트에 'on' 클래스는 display: block; , 'off' 클래스는 display: none; 이다.
		$('#petteacher-main').removeClass().addClass('off');
		$('#petteacher-detail').removeClass().addClass('on');

		// 이미 생성되어 있는 iframe이 있다면 삭제한다.
		const deleteIframe = document.getElementById('player');
		if (deleteIframe != null) {
			deleteIframe.remove();
		}

		// id가 player인 div를 생성한다.
		const newPlayerDiv = document.createElement('div');
		newPlayerDiv.setAttribute('id', 'player');

		// content_video라는 이름을 가진 클래스의 첫번째 element를 불러온다.
		const content_video = document.getElementsByClassName('content_video')[0];

		// content_video div에 id가 player인 div 삽입
		content_video.appendChild(newPlayerDiv);

		// 클릭된 div의 dataset을 저장, 이 데이터는 클릭된 영역에 해당하는 비디오 번호이다.
		let hpt_seq = $(this).data('hphseq');

		// GET방식으로 전송하여 데이터베이스 요청
		fetch('/helppetf/petteacher/petteacher_detail_data?hpt_seq=' + hpt_seq, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				if (response.ok) {
					// 요청이 성공적으로 완료되면, 데이터를 json형식으로 반환
					return response.json();
				} else {
					console.error('Failed to load data');
				}
			})
			.then(data => {
				// 반환받은 데이터를 상세페이지 화면을 구성하는 함수로 전송
				displayItemsForDetail(data);
			})
			.catch(error => {
				console.error('error: ', error);
			});
	});

	// 상세페이지 화면을 구성하는 함수
	function displayItemsForDetail(data) {
		
		// 글 번호, 제목, 조회수를 html 태그와 함께 저장하여 배치
		let title_wrap = '';
		title_wrap += '<div class="content_num">No.' + data.hpt_seq + '</div>';
		title_wrap += '<div class="content_title">' + data.hpt_title + '</div>';
		title_wrap += '<div class="content_view">' + data.hpt_hit + ' views</div>';
		$('.title_wrap').html(title_wrap);
		
		// 동물종류, 카테고리, 게시일자를  html 태그와 함께 저장하여 배치
		let tag_wrap = '';
		tag_wrap += '<div class="categorie">#<span>' + data.hpt_pettype + ' </span>';
		tag_wrap += '#<span>' + data.hpt_category + ' </span>';
		tag_wrap += '</div><div class="content_date">' + data.hpt_rgedate + '</div>';
		$('.tag_wrap').html(tag_wrap);
		
		// 본문 내용을 html 태그와 함께 저장하여 배치
		let content_desc = '<div>' + data.hpt_content + '</div>';
		$('.content_desc').html(content_desc);
		
		// 비디오 아이디 첨부하여 유튜브 iframe 생성 함수호출 
		buildVideo(data.hpt_yt_videoid);

	}

	// 유튜브 iframe 생성 함수호출 
	function buildVideo(hpt_yt_videoid) {

		// iframe 플레이어가 null이 아니라면, 제거 후 새로 생성
		if (player != null) {
			player.distroy();
			onYouTubeIframeAPIReady(player, hpt_yt_videoid);
		} else {
			onYouTubeIframeAPIReady(player, hpt_yt_videoid);
		}

		function onYouTubeIframeAPIReady(player, hpt_yt_videoid) {
			// iframe 플레이어 객체 생성
			player = new YT.Player('player', {
				height: '450', // 영상 높이
				width: '800', // 영상 너비
				videoId: hpt_yt_videoid, // 비디오 ID
				playerVars: {
					'rel': 0, // 연관동영상 표시여부(0:표시안함)
					'controls': 1, // 플레이어 컨트롤러 표시여부(0:표시안함)
					//'autoplay' : 1, // 자동재생 여부(1:자동재생 함, mute와 함께 설정)
					//'mute' : 1, // 음소거여부(1:음소거 함)
					'loop': 0, // 반복재생여부(1:반복재생 함)
					'playsinline': 1 // iOS환경에서 전체화면으로 재생하지 않게
				}
			});
		}
	}

	function pageScroll(y) {
		// 함수 호출시 파라미터의 값(Y좌표)으로 스크롤
		window.scrollTo({
			top: y,
			behavior: 'smooth'
		});
	}
});