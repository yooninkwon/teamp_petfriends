/**
 * 이 스크립트는 입양센터 메인 페이지를 로드하면 공공데이터포털에 데이터를 요청하여,
 * 필터링이 설정되지 않은 Json 데이터를 서버(Java)로 전송하는 Ajax 코드와,
 * 필터링 선택 후 버튼 클릭 시 설정된 필터 기준으로 데이터를 다시 요청하는 코드로 구성되어 있다.
 * 
 * 데이터가 정상적으로 수신되면, 해당 데이터를 테이블 형식으로 화면에 출력한다.
 * 
 * 또한, 각 도시 코드에 대한 시/군/구 코드와 각 동물 종류에 따른 품종 코드를 
 * Object 형태로 저장한다. 사용자가 필터에서 대분류(도시, 동물 종류)를 선택하면,
 * 선택된 대분류 값에 맞춰 소분류(시/군/구, 동물 품종)가 동적으로 업데이트된다.
 */

$(document).ready(function() {

	const itemsPerPage = 8; // 페이지 당 item 수 = 8
	let currentPage = 1; // 현재 표시되는 페이지
	let totalItems = 0; // 총 item 수 초기화
	let totalPages = 0; // 총 페이지 수
	let adoptionItems = []; // item들을 담을 배열
	let currPageGroup = 1; // 현재 페이지 그룹

	fetchData(currentPage, currPageGroup); // 페이지 로드 시 기본 페이지 호출

	function fetchData(page, currPageGroup) {
		$.ajax({
			url: '/helppetf/adoption/getJson?pageNo=' + currPageGroup, // pageNo에 맞는 데이터 요청
			method: 'GET',
			dataType: 'json',
			headers: {
				'Cache-Control': 'no-cache'
			},
			success: function(data) {
				adoptionItems = data.item;
				totalItems = adoptionItems.length; // 받아온 데이터에서 총 item 수 계산
				totalPages = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수 계산
				displayItems(page); // 아이템 표시
				setupPagination(); // 페이지네이션 설정
			},
			error: function(xhr, status, error) {
				console.error('Error fetching data:', error);
			}
		});
	}

	// 필터링 후 검색 버튼을 누를 때의 API 호출
	$('#filterSubmit').on('click', function() {
		const formParam = $('#filter_form form').serialize();
		filterData(currentPage);

		function filterData(page) {
			$.ajax({
				url: '/helppetf/adoption/getFilterJson?pageNo=' + currPageGroup + '&' + formParam, // 필터링된 API 호출
				method: 'GET',
				dataType: 'json',
				headers: {
					'Cache-Control': 'no-cache',
				},
				success: function(data) {
					adoptionItems = data.item;
					totalItems = adoptionItems.length;
					displayItems(page);
					setupPagination();
				},
				error: function(xhr, status, error) {
					console.error('Error fetching data:', error);
				},
			});
		}
	});

	// 아이템을 페이지에 맞게 출력
	function displayItems(page) {
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		const visibleItems = adoptionItems.slice(start, end);

		// item 객체의 정보를 테이블로 출력
		let cards = '';
		$.each(visibleItems, function(index, item) {
			cards += '<div class="adoption-card"><a href="#" class="adoption-link" data-index="' + (start + index) + '">';
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

	// 클릭한 곳의 동물 상세페이지
	$(document).on('click', '.adoption-link', function(event) {
		event.preventDefault(); // 기본 링크 클릭 동작 방지
		const index = $(this).data('index'); // 클릭한 요소의 인덱스 값을 가져옴
		const selectedItem = adoptionItems[index]; // 선택된 항목 가져오기

		// POST 요청 보내기
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
				window.location.href = '/helppetf/adoption/adoption_detail'; // 리다이렉트
			})
			.catch(error => {
				console.error('Error:', error);
			});
	});
	
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
	        paginationHtml += '<a href="#" class="' + (i === currentPage ? 'active' : '') + '" data-page="' + i + '">' + i + '</a>';
	    }

	    // 다음 버튼 추가 (전체 페이지 수가 현재 페이지 그룹의 마지막 페이지보다 클 경우 표시)
	    //if (endPage < totalPages) {
	        paginationHtml += '<a href="#" id="next-group">다음 &raquo;</a>';
	    //}

	    $('#pagination').html(paginationHtml);

	    // 페이지 클릭 이벤트 핸들러
	    $('#pagination a').on('click', function(event) {
	        event.preventDefault();

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
	        fetchData(currentPage, currPageGroup);
	    });
	}
	

	/** @ 필터링
	 * 오브젝트 : 지역, 품종 데이터 저장
	 * */

	// 동물
	const kindOptions = {
		417000: [ // 강아지
			{ value: "any", text: "강아지" },
			{ value: "000054", text: "골든 리트리버" },
			{ value: "000056", text: "그레이 하운드" },
			{ value: "000055", text: "그레이트 덴" },
			{ value: "000118", text: "그레이트 피레니즈" },
			{ value: "000115", text: "기타" },
			{ value: "000037", text: "꼬똥 드 뚤레아" },
			{ value: "000081", text: "네오폴리탄 마스티프" },
			{ value: "000204", text: "노르포크 테리어" },
			{ value: "000083", text: "노리치 테리어" },
			{ value: "00216", text: "노퍽 테리어" },
			{ value: "000082", text: "뉴펀들랜드" },
			{ value: "000038", text: "닥스훈트" },
			{ value: "000039", text: "달마시안" },
			{ value: "000040", text: "댄디 딘몬트 테리어" },
			{ value: "000043", text: "도고 까니리오" },
			{ value: "000042", text: "도고 아르젠티노" },
			{ value: "000153", text: "도고 아르젠티노" },
			{ value: "000041", text: "도베르만" },
			{ value: "000120", text: "도사" },
			{ value: "000219", text: "도사 믹스견" },
			{ value: "000155", text: "동경견" },
			{ value: "000069", text: "라브라도 리트리버" },
			{ value: "000071", text: "라사 압소" },
			{ value: "000142", text: "라이카" },
			{ value: "000093", text: "래빗 닥스훈드" },
			{ value: "000167", text: "랫 테리어" },
			{ value: "000070", text: "레이크랜드 테리어" },
			{ value: "000166", text: "로디지안 리즈백" },
			{ value: "000094", text: "로트와일러" },
			{ value: "000121", text: "로트와일러" },
			{ value: "000223", text: "로트와일러 믹스견" },
			{ value: "000152", text: "마리노이즈" },
			{ value: "000073", text: "마스티프" },
			{ value: "000146", text: "말라뮤트" },
			{ value: "000072", text: "말티즈" },
			{ value: "000159", text: "맨체스터테리어" },
			{ value: "000076", text: "미니어쳐 닥스훈트" },
			{ value: "000075", text: "미니어쳐 불 테리어" },
			{ value: "000079", text: "미니어쳐 슈나우저" },
			{ value: "000078", text: "미니어쳐 푸들" },
			{ value: "000077", text: "미니어쳐 핀셔" },
			{ value: "000074", text: "미디엄 푸들" },
			{ value: "000080", text: "미텔 스피츠" },
			{ value: "000114", text: "믹스견" },
			{ value: "000133", text: "바센지" },
			{ value: "000012", text: "바셋 하운드" },
			{ value: "000017", text: "버니즈 마운틴 독" },
			{ value: "000015", text: "베들링턴 테리어" },
			{ value: "000164", text: "벨기에 그로넨달" },
			{ value: "000157", text: "벨기에 쉽독" },
			{ value: "000148", text: "벨기에 테뷰런" },
			{ value: "000016", text: "벨지안 셰퍼드 독" },
			{ value: "000020", text: "보더 콜리" },
			{ value: "000021", text: "보르조이" },
			{ value: "000022", text: "보스턴 테리어" },
			{ value: "000024", text: "복서" },
			{ value: "000208", text: "볼로네즈" },
			{ value: "000023", text: "부비에 데 플랑드르" },
			{ value: "000026", text: "불 테리어" },
			{ value: "000027", text: "불독" },
			{ value: "000169", text: "브뤼셀그리펀" },
			{ value: "000025", text: "브리타니 스파니엘" },
			{ value: "000019", text: "블랙 테리어" },
			{ value: "000013", text: "비글" },
			{ value: "000018", text: "비숑 프리제" },
			{ value: "000014", text: "비어디드 콜리" },
			{ value: "000162", text: "비즐라" },
			{ value: "000085", text: "빠삐용" },
			{ value: "000096", text: "사모예드" },
			{ value: "000095", text: "살루키" },
			{ value: "000001", text: "삽살개" },
			{ value: "000034", text: "샤페이" },
			{ value: "000104", text: "세인트 버나드" },
			{ value: "000031", text: "센트럴 아시안 오브차카" },
			{ value: "000099", text: "셔틀랜드 쉽독" },
			{ value: "000122", text: "셰퍼드" },
			{ value: "000123", text: "슈나우져" },
			{ value: "000097", text: "스코티쉬 테리어" },
			{ value: "000132", text: "스코티시 디어하운드" },
			{ value: "000154", text: "스태퍼드셔 불 테리어" },
			{ value: "000222", text: "스태퍼드셔 불 테리어 믹스견" },
			{ value: "000105", text: "스탠다드 푸들" },
			{ value: "000124", text: "스피츠" },
			{ value: "000100", text: "시바" },
			{ value: "000103", text: "시베리안 허스키" },
			{ value: "000151", text: "시베리안라이카" },
			{ value: "000139", text: "시잉프랑세즈" },
			{ value: "000101", text: "시츄" },
			{ value: "000102", text: "시코쿠" },
			{ value: "000098", text: "실리햄 테리어" },
			{ value: "000136", text: "실키테리어" },
			{ value: "000202", text: "아나톨리안 셰퍼드" },
			{ value: "000160", text: "아메리칸 불독" },
			{ value: "000203", text: "아메리칸 스태퍼드셔 테리어" },
			{ value: "000221", text: "아메리칸 스태퍼드셔 테리어 믹스견" },
			{ value: "000008", text: "아메리칸 아키다" },
			{ value: "000131", text: "아메리칸 에스키모" },
			{ value: "000009", text: "아메리칸 코카 스파니엘" },
			{ value: "000119", text: "아메리칸 핏불 테리어" },
			{ value: "000220", text: "아메리칸 핏불 테리어 믹스견" },
			{ value: "000150", text: "아메리칸불리" },
			{ value: "000210", text: "아메리칸토이테리어" },
			{ value: "000011", text: "아프간 하운드" },
			{ value: "000010", text: "아키다" },
			{ value: "000106", text: "아이리쉬 세터" },
			{ value: "000035", text: "아이리쉬 울프 하운드" },
			{ value: "000030", text: "아이리쉬테리어" },
			{ value: "000033", text: "아펜핀셔" },
			{ value: "000004", text: "알라스칸 맬러뮤트" },
			{ value: "000229", text: "알래스칸 클리카이" },
			{ value: "000002", text: "애프가니탄 하운드" },
			{ value: "000164", text: "앵글로" },
			{ value: "000005", text: "에어데일 테리어" },
			{ value: "000228", text: "에스트렐라 마운틴 독" },
			{ value: "000168", text: "에스키모" },
			{ value: "000006", text: "에스파뇨레" },
			{ value: "000003", text: "엉글리쉬 불 테리어" },
			{ value: "000029", text: "엉글리쉬 콕 스파니엘" },
			{ value: "000137", text: "엉글리쉬 불도그" },
			{ value: "000141", text: "엉글리쉬시각" },
			{ value: "000007", text: "와이머리너" },
			{ value: "000148", text: "와이어 폭스 테리어" },
			{ value: "000028", text: "와이어헤어 테리어" },
			{ value: "000058", text: "웨스트 하일랜드 테리어" },
			{ value: "000067", text: "웨일스 스프링어 스파니엘" },
			{ value: "000107", text: "웨스트 하일랜드 화이트 테리어" },
			{ value: "000032", text: "웰시코기" },
			{ value: "000059", text: "웰시테리어" },
			{ value: "000061", text: "웰시스프링어 스파니엘" },
			{ value: "000056", text: "요크셔 테리어" },
			{ value: "000011", text: "유로피안 트레이닝 셰퍼드" },
			{ value: "000061", text: "이탈리안 그레이 하운드" },
			{ value: "000154", text: "잉글리쉬 불 테리어" },
			{ value: "000001", text: "잉글리쉬 마스티프" },
			{ value: "000028", text: "잉글리쉬 코커 스파니엘" },
			{ value: "000045", text: "잉글리쉬 포인터" },
			{ value: "000053", text: "자이언트 슈나우져" },
			{ value: "000062", text: "재패니즈 스피츠" },
			{ value: "000061", text: "잭 러셀 테리어" },
			{ value: "000052", text: "저먼 셰퍼드 독" },
			{ value: "000165", text: "저먼 와이어헤어드 포인터" },
			{ value: "000051", text: "저먼 포인터" },
			{ value: "215", text: "저먼 헌팅 테리어" },
			{ value: "000156", text: "제주개" },
			{ value: "000129", text: "제페니즈칭" },
			{ value: "000067", text: "진도견" },
			{ value: "000035", text: "차우차우" },
			{ value: "000033", text: "차이니즈 크레스티드 독" },
			{ value: "000032", text: "치와와" },
			{ value: "000028", text: "카네 코르소" },
			{ value: "000158", text: "카레리안 베어독" },
			{ value: "000144", text: "카이훗" },
			{ value: "000030", text: "캐벌리어 킹 찰스 스파니엘" },
			{ value: "000029", text: "케니스펜더" },
			{ value: "000064", text: "케리 블루 테리어" },
			{ value: "000207", text: "케언 테리어" },
			{ value: "000002", text: "코리아 트라이 하운드" },
			{ value: "000068", text: "코리안 마스티프" },
			{ value: "000125", text: "코카 스파니엘" },
			{ value: "000141", text: "코카 푸" },
			{ value: "000145", text: "코카시안오브차카" },
			{ value: "000036", text: "콜리" },
			{ value: "000066", text: "클라인스피츠" },
			{ value: "000065", text: "키슈" },
			{ value: "000063", text: "키스 훈드" },
			{ value: "000140", text: "토이 맨체스터 테리어" },
			{ value: "000107", text: "토이 푸들" },
			{ value: "000106", text: "티베탄 마스티프" },
			{ value: "000209", text: "파라오 하운드" },
			{ value: "000086", text: "파슨 러셀 테리어" },
			{ value: "000088", text: "팔렌" },
			{ value: "000090", text: "퍼그" },
			{ value: "000087", text: "페키니즈" },
			{ value: "000138", text: "페터데일테리어" },
			{ value: "000089", text: "포메라니안" },
			{ value: "000126", text: "포인터" },
			{ value: "000127", text: "폭스테리어" },
			{ value: "000128", text: "푸들" },
			{ value: "000091", text: "풀리" },
			{ value: "000003", text: "풍산견" },
			{ value: "000161", text: "프레사까나리오" },
			{ value: "000050", text: "프렌치 불독" },
			{ value: "000168", text: "프렌치 브리타니" },
			{ value: "000049", text: "플랫 코티드 리트리버" },
			{ value: "000147", text: "플롯하운드" },
			{ value: "000092", text: "피레니안 마운틴 독" },
			{ value: "000048", text: "필라 브라질레이로" },
			{ value: "000135", text: "핏불테리어" },
			{ value: "000224", text: "핏불테리어 믹스견" },
			{ value: "000206", text: "허배너스" },
			{ value: "000130", text: "화이트리트리버" },
			{ value: "000134", text: "화이트테리어" },
			{ value: "000111", text: "휘펫" }],
		422400: [ // 고양이
			// 동물 종류는 422400(고양이), any(품종에 대한 파라피터 전송 없음)으로
			// 데이터 요청을 보내면 이상하게 강아지에 대한 데이터가 섞여 들어온다.
			// (동물종류 "강아지" 선택시에는 문제없음)
			// 왜인지는 모르겠으나 문제가 있으니 "any"를 주석처리 해두고
			// 기본 선택값을 "한국 고양이"로 만들어 두었다.
			// { value: "any", text: "고양이" }, 
			{ value: "000200", text: "한국 고양이" },
			{ value: "000201", text: "고양이" },
			{ value: "000201", text: "기타" },
			{ value: "000170", text: "노르웨이 숲" },
			{ value: "000218", text: "니벨룽" },
			{ value: "000171", text: "데본 렉스" },
			{ value: "000172", text: "러시안 블루" },
			{ value: "00213", text: "레그돌" },
			{ value: "000173", text: "레그돌-라가머핀" },
			{ value: "000174", text: "맹크스" },
			{ value: "000175", text: "먼치킨" },
			{ value: "000176", text: "메인쿤" },
			{ value: "000212", text: "믹스묘" },
			{ value: "000177", text: "발리네즈" },
			{ value: "000178", text: "버만" },
			{ value: "000179", text: "벵갈" },
			{ value: "000180", text: "봄베이" },
			{ value: "000216", text: "브리티쉬롱헤어" },
			{ value: "000181", text: "브리티시 쇼트헤어" },
			{ value: "000182", text: "사바나캣" },
			{ value: "000183", text: "샤트룩스" },
			{ value: "000184", text: "샴" },
			{ value: "000185", text: "셀커크 렉스" },
			{ value: "000186", text: "소말리" },
			{ value: "000187", text: "스노우 슈" },
			{ value: "000188", text: "스코티시폴드" },
			{ value: "000189", text: "스핑크스" },
			{ value: "000190", text: "시베리안 포레스트" },
			{ value: "000191", text: "싱가퓨라" },
			{ value: "000192", text: "아메리칸 쇼트헤어" },
			{ value: "000193", text: "아비시니안" },
			{ value: "000194", text: "재패니즈밥테일" },
			{ value: "000195", text: "터키시 앙고라" },
			{ value: "000196", text: "통키니즈" },
			{ value: "00214", text: "페르시안" },
			{ value: "000197", text: "페르시안-페르시안 친칠라" },
			{ value: "000198", text: "하바나 브라운" },
			{ value: "000199", text: "하일랜드 폴드" }],
		429900: [ // 기타
			//{ value: "any", text: "기타 동물" }, 
			// 기타 동물에서 기타 동물이라는 분류가 존재하지만, 하나뿐이라 
			// 기존의 기본 선택(any)를 주석 처리 하고 value가 "000117"인 "기타 동물"을 자동적으로 선택되게 만들었다.
			{ value: "000117", text: "기타 동물" }
		]
	};
	// 지역
	const orgCdOptions = {
		6110000: [ // 서울
			{ value: "any", text: "시, 군, 구" },
			{ value: "3220000", text: "강남구" },
			{ value: "3240000", text: "강동구" },
			{ value: "3080000", text: "강북구" },
			{ value: "3150000", text: "강서구" },
			{ value: "3200000", text: "관악구" },
			{ value: "3040000", text: "광진구" },
			{ value: "3160000", text: "구로구" },
			{ value: "3170000", text: "금천구" },
			{ value: "3100000", text: "노원구" },
			{ value: "3090000", text: "도봉구" },
			{ value: "3050000", text: "동대문구" },
			{ value: "3190000", text: "동작구" },
			{ value: "3130000", text: "마포구" },
			{ value: "3120000", text: "서대문구" },
			{ value: "6119998", text: "서울특별시" },
			{ value: "3210000", text: "서초구" },
			{ value: "3030000", text: "성동구" },
			{ value: "3070000", text: "성북구" },
			{ value: "3230000", text: "송파구" },
			{ value: "3140000", text: "양천구" },
			{ value: "3180000", text: "영등포구" },
			{ value: "3020000", text: "용산구" },
			{ value: "3110000", text: "은평구" },
			{ value: "3000000", text: "종로구" },
			{ value: "3010000", text: "중구" },
			{ value: "3060000", text: "중랑구" }
		],
		6260000: [ // 부산
			{ value: "any", text: "시, 군, 구" },
			{ value: "3360000", text: "강서구" },
			{ value: "3350000", text: "금정구" },
			{ value: "3400000", text: "기장군" },
			{ value: "3310000", text: "남구" },
			{ value: "3270000", text: "동구" },
			{ value: "3300000", text: "동래구" },
			{ value: "3290000", text: "부산진구" },
			{ value: "3320000", text: "북구" },
			{ value: "3390000", text: "사상구" },
			{ value: "3340000", text: "사하구" },
			{ value: "3260000", text: "서구" },
			{ value: "3380000", text: "수영구" },
			{ value: "3370000", text: "연제구" },
			{ value: "3280000", text: "영도구" },
			{ value: "3250000", text: "중구" },
			{ value: "3330000", text: "해운대구" }
		],
		6270000: [ // 대구
			{ value: "any", text: "시, 군, 구" },
			{ value: "5141000", text: "군위군" },
			{ value: "3440000", text: "남구" },
			{ value: "3470000", text: "달서구" },
			{ value: "3480000", text: "달성군" },
			{ value: "3420000", text: "동구" },
			{ value: "3450000", text: "북구" },
			{ value: "3430000", text: "서구" },
			{ value: "3460000", text: "수성구" },
			{ value: "3410000", text: "중구" }
		],
		6280000: [ // 인천
			{ value: "any", text: "시, 군, 구" },
			{ value: "3570000", text: "강화군" },
			{ value: "3550000", text: "계양구" },
			{ value: "3530000", text: "남동구" },
			{ value: "3500000", text: "동구" },
			{ value: "3510500", text: "미추홀구" },
			{ value: "3540000", text: "부평구" },
			{ value: "3560000", text: "서구" },
			{ value: "3520000", text: "연수구" },
			{ value: "3580000", text: "옹진군" },
			{ value: "3490000", text: "중구" }
		],
		6290000: [ // 광주
			{ value: "any", text: "시, 군, 구" },
			{ value: "3630000", text: "광산구" },
			{ value: "6299998", text: "광주광역시" },
			{ value: "3610000", text: "남구" },
			{ value: "3590000", text: "동구" },
			{ value: "3620000", text: "북구" },
			{ value: "3600000", text: "서구" }
		],
		5690000: [ // 세종			
			{ value: "any", text: "시, 군, 구" },
			{ value: "5690000", text: "세종특별자치시" }
		],
		6300000: [ // 대전
			{ value: "any", text: "시, 군, 구" },
			{ value: "3680000", text: "대덕구" },
			{ value: "3640000", text: "동구" },
			{ value: "3660000", text: "서구" },
			{ value: "3670000", text: "유성구" },
			{ value: "3650000", text: "중구" }
		],
		6310000: [ // 울산
			{ value: "any", text: "시, 군, 구" },
			{ value: "3700000", text: "남구" },
			{ value: "3710000", text: "동구" },
			{ value: "3720000", text: "북구" },
			{ value: "3730000", text: "울주군" },
			{ value: "3690000", text: "중구" }
		],
		6410000: [ // 경기
			{ value: "any", text: "시, 군, 구" },
			{ value: "4160000", text: "가평군" },
			{ value: "6419998", text: "경기도" },
			{ value: "3940000", text: "고양시" },
			{ value: "3970000", text: "과천시" },
			{ value: "3900000", text: "광명시" },
			{ value: "5540000", text: "광주시" },
			{ value: "3980000", text: "구리시" },
			{ value: "4020000", text: "군포시" },
			{ value: "4090000", text: "김포시" },
			{ value: "3990000", text: "남양주시" },
			{ value: "3920000", text: "동두천시" },
			{ value: "3860000", text: "부천시" },
			{ value: "3780000", text: "성남시" },
			{ value: "3740000", text: "수원시" },
			{ value: "4010000", text: "시흥시" },
			{ value: "3930000", text: "안산시" },
			{ value: "4080000", text: "안성시" },
			{ value: "3830000", text: "안양시" },
			{ value: "5590000", text: "양주시" },
			{ value: "4170000", text: "양평군" },
			{ value: "5700000", text: "여주시" },
			{ value: "4140000", text: "연천군" },
			{ value: "4000000", text: "오산시" },
			{ value: "4050000", text: "용인시" },
			{ value: "4030000", text: "의왕시" },
			{ value: "3820000", text: "의정부시" },
			{ value: "4070000", text: "이천시" },
			{ value: "4060000", text: "파주시" },
			{ value: "3910000", text: "평택시" },
			{ value: "5600000", text: "포천시" },
			{ value: "4040000", text: "하남시" },
			{ value: "5530000", text: "화성시" }
		],
		6530000: [ // 강원
			{ value: "any", text: "시, 군, 구" },
			{ value: "4201000", text: "강릉시" },
			{ value: "4341000", text: "고성군" },
			{ value: "4211000", text: "동해시" },
			{ value: "4241000", text: "삼척시" },
			{ value: "4231000", text: "속초시" },
			{ value: "4321000", text: "양구군" },
			{ value: "4351000", text: "양양군" },
			{ value: "4271000", text: "영월군" },
			{ value: "4191000", text: "원주시" },
			{ value: "4331000", text: "인제군" },
			{ value: "4291000", text: "정선군" },
			{ value: "4301000", text: "철원군" },
			{ value: "4181000", text: "춘천시" },
			{ value: "4221000", text: "태백시" },
			{ value: "4281000", text: "평창군" },
			{ value: "4251000", text: "홍천군" },
			{ value: "4311000", text: "화천군" },
			{ value: "4261000", text: "횡성군" }
		],
		6430000: [ // 충북
			{ value: "any", text: "시, 군, 구" },
			{ value: "4460000", text: "괴산군" },
			{ value: "4480000", text: "단양군" },
			{ value: "4420000", text: "보은군" },
			{ value: "4440000", text: "영동군" },
			{ value: "4430000", text: "옥천군" },
			{ value: "4470000", text: "음성군" },
			{ value: "4400000", text: "제천시" },
			{ value: "5570000", text: "증평군" },
			{ value: "4450000", text: "진천군" },
			{ value: "5710000", text: "청주시" },
			{ value: "4390000", text: "충주시" },
		],
		6440000: [ // 충남
			{ value: "any", text: "시, 군, 구" },
			{ value: "5580000", text: "계룡시" },
			{ value: "4500000", text: "공주시" },
			{ value: "4550000", text: "금산군" },
			{ value: "4540000", text: "논산시" },
			{ value: "5680000", text: "당진시" },
			{ value: "4510000", text: "보령시" },
			{ value: "4570000", text: "부여군" },
			{ value: "4530000", text: "서산시" },
			{ value: "4580000", text: "서천군" },
			{ value: "4520000", text: "아산시" },
			{ value: "4610000", text: "예산군" },
			{ value: "4490000", text: "천안시" },
			{ value: "4590000", text: "청양군" },
			{ value: "4620000", text: "태안군" },
			{ value: "4600000", text: "홍성군" }
		],
		6540000: [ // 전북
			{ value: "any", text: "시, 군, 구" },
			{ value: "4781000", text: "고창군" },
			{ value: "4671000", text: "군산시" },
			{ value: "4711000", text: "김제시" },
			{ value: "4701000", text: "남원시" },
			{ value: "4741000", text: "무주군" },
			{ value: "4791000", text: "부안군" },
			{ value: "4771000", text: "순창군" },
			{ value: "4721000", text: "완주군" },
			{ value: "4681000", text: "익산시" },
			{ value: "4761000", text: "임실군" },
			{ value: "4751000", text: "장수군" },
			{ value: "4641000", text: "전주시" },
			{ value: "4691000", text: "정읍시" },
			{ value: "4731000", text: "진안군" }
		],
		6460000: [ // 전남
			{ value: "any", text: "시, 군, 구" },
			{ value: "4920000", text: "강진군" },
			{ value: "4880000", text: "고흥군" },
			{ value: "4860000", text: "곡성군" },
			{ value: "4840000", text: "광양시" },
			{ value: "4870000", text: "구례군" },
			{ value: "4830000", text: "나주시" },
			{ value: "4850000", text: "담양군" },
			{ value: "4800000", text: "목포시" },
			{ value: "4950000", text: "무안군" },
			{ value: "4890000", text: "보성군" },
			{ value: "4820000", text: "순천시" },
			{ value: "5010000", text: "신안군" },
			{ value: "4810000", text: "여수시" },
			{ value: "4970000", text: "영광군" },
			{ value: "4940000", text: "영암군" },
			{ value: "4990000", text: "완도군" },
			{ value: "4980000", text: "장성군" },
			{ value: "4910000", text: "장흥군" },
			{ value: "5000000", text: "진도군" },
			{ value: "4960000", text: "함평군" },
			{ value: "4930000", text: "해남군" },
			{ value: "4900000", text: "화순군" }
		],
		6470000: [ // 경북
			{ value: "any", text: "시, 군, 구" },
			{ value: "5130000", text: "경산시" },
			{ value: "6479998", text: "경상북도" },
			{ value: "5050000", text: "경주시" },
			{ value: "5200000", text: "고령군" },
			{ value: "5080000", text: "구미시" },
			{ value: "5060000", text: "김천시" },
			{ value: "5120000", text: "문경시" },
			{ value: "5240000", text: "봉화군" },
			{ value: "5110000", text: "상주시" },
			{ value: "5210000", text: "성주군" },
			{ value: "5070000", text: "안동시" },
			{ value: "5180000", text: "영덕군" },
			{ value: "5170000", text: "영양군" },
			{ value: "5090000", text: "영주시" },
			{ value: "5100000", text: "영천시" },
			{ value: "5230000", text: "예천군" },
			{ value: "5260000", text: "울릉군" },
			{ value: "5250000", text: "울진군" },
			{ value: "5150000", text: "의성군" },
			{ value: "5190000", text: "청도군" },
			{ value: "5160000", text: "청송군" },
			{ value: "5220000", text: "칠곡군" },
			{ value: "5020000", text: "포항시" }
		],
		6480000: [ // 경남
			{ value: "any", text: "시, 군, 구" },
			{ value: "5370000", text: "거제시" },
			{ value: "5470000", text: "거창군" },
			{ value: "5420000", text: "고성군" },
			{ value: "5350000", text: "김해시" },
			{ value: "5430000", text: "남해군" },
			{ value: "5360000", text: "밀양시" },
			{ value: "5340000", text: "사천시" },
			{ value: "5450000", text: "산청군" },
			{ value: "5380000", text: "양산시" },
			{ value: "5390000", text: "의령군" },
			{ value: "5310000", text: "진주시" },
			{ value: "5410000", text: "창녕군" },
			{ value: "5280000", text: "창원 마산합포회원구" },
			{ value: "5670000", text: "창원 의창성산구" },
			{ value: "5320000", text: "창원 진해구" },
			{ value: "5330000", text: "통영시" },
			{ value: "5440000", text: "하동군" },
			{ value: "5400000", text: "함안군" },
			{ value: "5460000", text: "함양군" },
			{ value: "5480000", text: "합천군" }
		],
		6500000: [ // 제주
			{ value: "any", text: "시, 군, 구" },
			{ value: "6520000", text: "서귀포시" },
			{ value: "6510000", text: "제주시" },
			{ value: "6500000", text: "제주특별자치도" }
		]
	};

	$('#upKind').on('change', function() { // id="upKind" 요소의 값이 변경될 때마다 호출

		const selectedKindVal = $(this).val(); // selectedKindVal을 누른 요소의 value로 지정

		$('#kind').empty(); // 내용을 바꿀 select 태그 내용 초기화

		if (kindOptions[selectedKindVal]) { // kindOptions 오브젝트의 [selectedKindVal]에 해당하는 데이터를 찾음 
			kindOptions[selectedKindVal].forEach(option => {
				$('#kind').append(`<option value="${option.value}">${option.text}</option>`);
				/* * 람다식 설명 :
				* forEach: 배열의 각 요소를 순차적으로 처리하는 메서드
				* option => {} : 배열의 각 항목(객체)을 option이라는 변수로 전달
				* 배열의 첫 번째 요소부터 마지막 요소까지 차례로 진행 (forEach)
				* option 객체의 구조는 { value: "어쩌구", text: "저쩌구" } 형태로 각 항목을 처리
				* #kind 요소에 .append()로 <option> 태그를 동적으로 추가
				* ${option.value}, ${option.text}: option 객체의 value와 text 값을 가져와 <option>의 속성과 텍스트로 사용
				*/
			});
		} else {
			$('#kind').append('<option value="any" selected>품종</option>');
		}
	});

	$('#upr_cd').on('change', function() { // id="upr_cd" 요소의 값이 변경될 때마다 호출

		const selectedUprVal = $(this).val(); // selectedUprVal을 누른 요소의 value로 지정

		$('#org_cd').empty(); // 내용을 바꿀 select 태그 내용 초기화

		// 조건문으로 옵션 배치 - 지역
		if (orgCdOptions[selectedUprVal]) {
			orgCdOptions[selectedUprVal].forEach(option => {
				$('#org_cd').append(`<option value="${option.value}">${option.text}</option>`);
				/* * 람다식 설명 :
				* forEach: 배열의 각 요소를 순차적으로 처리하는 메서드
				* option => {} : 배열의 각 항목(객체)을 option이라는 변수로 전달
				* (option은 배열의 각 요소를 참조하는 변수이다.)
				* 배열의 첫 번째 요소부터 마지막 요소까지 차례로 진행 (forEach)
				* option 객체의 구조는 { value: "어쩌구", text: "저쩌구" } 형태로 각 항목을 처리
				* #org_cd 요소에 .append()로 <option> 태그를 동적으로 추가
				* ${option.value}, ${option.text}: option 객체의 value와 text 값을 가져와 <option>의 속성과 텍스트로 사용
				*/
			});
		} else {
			// orgCdOptions[selectedUprVal] 가 아닌 경우: 는 아무래도 오류가 났을 경우이다.
			$('#org_cd').append('<option value="any" selected>시, 군, 구</option>');
		}

	});
});