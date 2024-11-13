/**
 * 이 스크립트는 입양센터 메인 페이지를 로드하면 공공데이터포털에 데이터를 요청하여,
 * 필터링이 설정되지 않은 Json 데이터를 서버(Java)로 전송하는 Ajax 코드와,
 * 필터링 선택 후 버튼 클릭 시 설정된 필터 기준으로 데이터를 다시 요청하는 코드로 구성되어 있다.
 * 
 * 데이터가 정상적으로 수신되면, 해당 데이터를 테이블 형식으로 화면에 출력한다.
 * 
 * 각 도시 코드에 대한 시/군/구 코드와 각 동물 종류에 따른 품종 코드를 
 * Object 형태로 저장한 파일을 import하여 사용한다. 
 * 유저가 필터에서 대분류(도시, 동물 종류)를 선택하면,
 * 선택된 대분류 값에 맞춰 소분류(시/군/구, 동물 품종)가 동적으로 업데이트된다.
 * 
 * 검색 버튼을 눌러 필터링이 포함된 데이터를 불러온 이후에도 선택된 필터링은 유지된다.
 * 초기화 버튼을 눌러 필터링을 초기화할 수 있다.
 * 
 * 메인 페이지의 카드레이아웃을 클릭하면, 해당하는 영역에 해당하는 게시글이 표시된다.
 * 메인 페이지 전체가 포함되어 있는 div의 스타일을 display: none으로 만들어 보이지 않게 하고,
 * 상세 페이지 전체가 포함되어 있는 div의 스타일을 display: block으로 만들어 보이게 한다.
 * (목록으로 클릭 시 반대로 적용)
 * 상세 페이지 진입 시 해당하는 게시글의 주소를 표시하는 지도를 생성한다.
 * 
 * 
 * dataset을 이용해 메인 페이지에 카드레이아웃이 배치될 때 각각에 해당하는 인덱스 번호를 저장한다.
 * 카드레이아웃을 눌렀을 때, 해당 카드에 저장되어 있는 글 번호를 추출하여 전송, 상세 내용을 불러온다.
 * 
 * 유저의 열람이 끝난 뒤, 목록으로 버튼을 누르면 메인 페이지로 복귀된다.
 * 
 */


import { kindOptions } from '/static/js/helppetf/kind_data.js'; // 품종 데이터 Object import
import { orgCdOptions } from '/static/js/helppetf/org_data.js'; // 지역 데이터 Object import


/*

입양센터 메인페이지

*/

$(document).ready(function() {
	
	// 메인 nav, 서브 nav '선택됨' 클래스 설정
	document.getElementById(main_navbar_id).classList.add('selected');
	document.getElementById(sub_navbar_id).classList.add('selected');
	
	pageScroll(0)
	
	let selectedPetData = null;
	const itemsPerPage = 8; // 페이지 당 item 수 = 8
	let currentPage = 1; // 현재 표시되는 페이지
	let totalItems = 0; // 총 item 수 초기화
	let adoptionItems = []; // item들을 담을 배열
	let currPageGroup = 1; // 현재 페이지 그룹
	let totalPages = 0; // 총 페이지 수
	let preEndPage = 0; // 이전 페이지의 마지막 페이지 번호
	let formParam = ''; // form (필터) 의 파라미터값
	fetchData(currentPage, currPageGroup, formParam); // 페이지 로드 시 호출 (formParam은 공백: 필터가 없으므로)

	function fetchData(currentPage, currPageGroup, formParam) {
		$.ajax({
			url: '/helppetf/adoption/getJson?pageNo=' + currPageGroup + '&' + formParam, // pageNo에 맞는 데이터 요청-필터링된 API 호출 
			method: 'GET',
			dataType: 'json',
			headers: {
				'Cache-Control': 'no-cache' // 캐시 없음 설정
			},
			success: function(data) {
				adoptionItems = data.item; // 배열에 아이템 대입
				totalItems = adoptionItems.length; // 받아온 데이터에서 총 item 수 계산
				totalPages = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수 계산
				displayItems(currentPage); // 아이템 표시
				setupPagination(currentPage, currPageGroup); // 페이지네이션 설정
			},
			error: function(xhr, status, error) {
				console.error('Error fetching data:', error);
			}
		});
	}

	// 아이템을 페이지에 맞게 출력
	function displayItems(currentPage) {

		if (currentPage <= 10) {
			// 현재 페이지가 10이하인 경우 == 페이지그룹이 1인 경우
			var start = (currentPage - 1) * itemsPerPage;
		} else {
			// 그 외 == 페이지그룹이 2이상인 경우
			// start = (현재페이지 - 이전마지막페이지 - 1) * itemsPerPage(8)
			var start = ((currentPage - preEndPage) - 1) * itemsPerPage;
		}

		// end = 시작 인덱스번호 + itemsPerPage(8)
		const end = start + itemsPerPage;
		// .slice(start, end)는 배열에서 start부터 end 이전까지의 아이템들을 추출
		// start가 0이고 end가 8이라면 인덱스 [0] ~ [7] 을 저장
		const visibleItems = adoptionItems.slice(start, end);
		// item 객체의 정보를 테이블로 출력
		let cards = '';

		$.each(visibleItems, function(index, item) {
			// 받아온 정보의 YYYYMMDD를 각각 분리한다.
			let day = item.happenDt.substr(6, 2);
			let month = item.happenDt.substr(4, 2);
			let year = item.happenDt.substr(0, 4);
			// 인덱스가 0~79 이므로 페이지가 넘어가도 인덱스 번호가 정상적으로 불러와지도록 현재 페이지의 시작 인덱스 번호를 더해준다
			cards += '<div class="adoption-card"><a href="#" class="adoption-link" data-index="' + (start + index) + '">';
			cards += '<div class="card_date"><div class="day">' + day ;
			cards += '</div><div class="month">' + year + '-' + month + '</div></div>';
			cards += '<img src="' + item.popfile + '" alt="Pet Image" />';
			cards += '<div class="content">';
			cards += '<h3>' + item.kindCd + '</h3>';
			cards += '<div class="info">공고번호 ' + item.desertionNo + '</div>';
			cards += '<div class="card_list"><div class="card_title">지역</div><div class="card_desc">' + item.orgNm + '</div></div>';
			cards += '<div class="card_list"><div class="card_title">발견 장소</div><div class="card_desc">' + item.happenPlace + '</div></div>';
			cards += '<div class="card_list"><div class="card_title">성별</div><div class="card_desc">' + item.sexCd + '</div></div>';
			cards += '<div class="card_list"><div class="card_title">발견 날짜</div><div class="card_desc">' + item.happenDt + '</div></div>';
			cards += '<div class="card_list"><div class="card_title">특징</div><div class="card_desc">' + item.specialMark + '</div></div>';
			cards += '</div>';
			cards += '</a></div>';
		});
		
		$('#adoptionContainer').html(cards);
	}

	// 페이지네이션 설정
	function setupPagination(currentPage, currPageGroup) {
		const maxPagesToShow = 10; // 한 번에 보여줄 페이지 수
		const startPage = (currPageGroup - 1) * maxPagesToShow + 1; // 현재 그룹의 첫 페이지 계산
		const endPage = startPage + maxPagesToShow - 1; // 마지막 페이지 계산

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
		paginationHtml += '<a href="#" id="next-group">다음 &raquo;</a>';

		$('#pagination').html(paginationHtml);
	
	
	// 페이지 클릭 이벤트 핸들러
	$('#pagination a').on('click', function(event) {
		event.preventDefault();
		pageScroll(0); // 페이지 스크롤 함수
		if ($(this).attr('id') === 'prev-group') {
			// 이전 그룹으로 이동
			currPageGroup--;
			currentPage = (currPageGroup - 1) * maxPagesToShow + 1; // 이전 그룹의 첫 페이지
			preEndPage = endPage - 20;
			fetchData(currentPage, currPageGroup, formParam);
			displayItems(currentPage)
		} else if ($(this).attr('id') === 'next-group') {
			// 다음 그룹으로 이동
			currPageGroup++;
			currentPage = (currPageGroup - 1) * maxPagesToShow + 1; // 다음 그룹의 첫 페이지
			preEndPage = endPage;
			fetchData(currentPage, currPageGroup, formParam);
			displayItems(currentPage)
		} else /* if ($(this).attr('id') === $(this).data('page')) */ {
			// 클릭한 페이지로 이동
			currentPage = $(this).data('page');
			displayItems(currentPage)
			setupPagination(currentPage, currPageGroup)
		}
	});
}

	// 필터링
	// 오브젝트 : 지역, 품종 데이터 저장 되어 있음
	$('#upKind').on('change', function() { // id="upKind" 요소의 값이 변경될 때마다 호출

		const selectedKindVal = $(this).val(); // selectedKindVal을 누른 요소의 value로 지정

		$('#kind').empty(); // 내용을 바꿀 select 태그 내용 초기화

		if (kindOptions[selectedKindVal]) { // kindOptions 오브젝트의 [selectedKindVal]에 해당하는 데이터를 찾음 
			kindOptions[selectedKindVal].forEach(option => {
				$('#kind').append(`<option value="${option.value}">${option.text}</option>`);
				/** 람다식 설명 :
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
				/** 람다식 설명 :
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

	// 필터 선택 후 filterSubmit 클릭 시 호출
	$('#filterSubmit').on('click', function(event) {
		event.preventDefault(); // 기본 form 제출 동작 방지 (기본 링크를 이것으로 대체함)
		formParam = $('#filter_form form').serialize(); // form 데이터 시리얼라이즈
		currentPage = 1; // 필터링 시 페이지를 1로 리셋
		fetchData(currentPage, currPageGroup, formParam); // 필터 데이터를 포함해서 fetchData 호출
	});

	// 필터 선택 후 filterSubmit 클릭 시 호출 - 필터 선택 리셋
	$('#filterReset').on('click', function() {
		// 동적으로 바뀐 select 태그 비우고 초기값으로 재설정
		$('#org_cd').empty();
		$('#org_cd').append(`<option value="any" selected>시, 군, 구</option>`);
		$('#org_cd').append(`<option value="any" selected>지역을 먼저 골라주세요</option>`);

		$('#kind').empty();
		$('#kind').append(`<option value="any" selected>품종</option>`);
		$('#kind').append(`<option value="any" selected>동물종류를 먼저 골라주세요</option>`);

		// option 태그의 선택값을 인덱스넘버 0으로 바꿈
		$("#upr_cd option:eq(0)").prop("selected", true);
		$("#upKind option:eq(0)").prop("selected", true);
		$("#org_cd option:eq(0)").prop("selected", true);
		$("#kind option:eq(0)").prop("selected", true);

		fetchData(currentPage, currPageGroup, formParam); // 필터 데이터 초기화한 뒤 fetchData 재호출
	});

		
/*

입양센터 상세페이지

*/

	// 클릭한 곳의 동물 상세페이지
	$(document).on('click', '.adoption-link', function(event) {
		pageScroll(0);
		// 입양센터 메인, 상세 페이지 각각의 전체를 감싸는 div에 클래스를 변경
		// CSS 스타일시트에 'on' 클래스는 display: block; , 'off' 클래스는 display: none; 이다.
		$('#adoption-main').removeClass().addClass('off');
		$('#adoption-detail').removeClass().addClass('on');
		event.preventDefault(); // 기본 링크 클릭 동작 방지
		const index = $(this).data('index'); // 클릭한 요소의 인덱스 값을 가져옴
		selectedPetData = adoptionItems[index]; // 선택된 항목 가져오기
		
		// 지역, 보호소 안내를 html 태그와 함께 저장하여 배치
		let infoText = '<span class="infoSpan">' + selectedPetData.orgNm + '</span>에 있는 <span class="infoSpan">' + selectedPetData.careNm + '</span>에서 보호중인 동물이에요.';
		$('#infoText').html(infoText);
		
		// 선택한 동물의 이미지를 html 태그와 함께 저장하여 배치
		let selectedPetImage = '<img src="' + selectedPetData.popfile + '" alt="Animal Image" />';
		$('#animalImage').html(selectedPetImage);
		
		// 선택한 동물의 상세정보들을 html 태그와 함께 저장하여 배치
		let selectedPetTable = '';
		selectedPetTable += '<tr><th>공고번호</th><td>' + selectedPetData.noticeNo + '</td>';
		selectedPetTable += '<th>접수일</th><td>' + selectedPetData.happenDt + '</td></tr>';
		selectedPetTable += '<tr><th>동물등록번호</th><td>' + selectedPetData.desertionNo + '</td>';
		selectedPetTable += '<th>발견장소</th><td>' + selectedPetData.happenPlace + '</td></tr>';
		selectedPetTable += '<tr><th>품종</th><td>' + selectedPetData.kindCd + '</td>';
		selectedPetTable += '<th>색상</th><td>' + selectedPetData.colorCd + '</td></tr>';
		selectedPetTable += '<tr><th>성별</th><td>' + selectedPetData.sexCd + '</td>';
		selectedPetTable += '<th>중성화 여부</th><td>' + selectedPetData.neuterYn + '</td></tr>';
		selectedPetTable += '<tr><th>나이/체중</th><td>' + selectedPetData.age + '/ ' + selectedPetData.weight + '</td>';
		selectedPetTable += '<th>구조시 특징</th><td>' + selectedPetData.specialMark + '</td></tr>';
		selectedPetTable += '<tr><th>보호소명</th><td>' + selectedPetData.careNm + '</td>';
		selectedPetTable += '<th>보호소 전화번호</th><td>' + selectedPetData.careTel + '</td></tr>';
		selectedPetTable += '<tr><th>관할기관</th><td>' + selectedPetData.orgNm + '</td>'
		selectedPetTable += '<th>담당자</th><td>' + selectedPetData.chargeNm + '</td></tr>'
		selectedPetTable += '<tr><th>보호소 주소</th><td colspan="3">' + selectedPetData.careAddr + '</td></tr>';
		selectedPetTable += '<tr><th>담당자 연락처</th><td colspan="3">' + selectedPetData.officetel + '</td></tr>';
		selectedPetTable += '<tr><th colspan="4">찾아가시는 길</th></tr><tr><td colspan="4">';
		
		selectedPetTable += '<div class="map_wrap">';
		selectedPetTable += '<div><div id="map" style="width: 100%; height: 500px; position: relative; overflow: hidden;"></div>';
		selectedPetTable += '<div id="menu_wrap" class="bg_white"><ul id="placesList"></ul><div id="pagination"></div>';
		selectedPetTable += '</div></div></div></td></tr>';
		
		$('#selectedAnimalTable').html(selectedPetTable);
		buildKakaoMap(selectedPetData.careAddr, selectedPetData.careNm, selectedPetData.careTel); 
		
	});
	
	// "목록으로" 버튼 클릭시
	$('#goMain').on('click', function() {
		pageScroll(0);
		// 입양센터 메인, 상세 페이지 각각의 전체를 감싸는 div에 클래스를 변경
		// CSS 스타일시트에 'on' 클래스는 display: block; , 'off' 클래스는 display: none; 이다.
		$('#adoption-main').removeClass().addClass('on');
		$('#adoption-detail').removeClass().addClass('off');
	});
	
	// 호출시 입력한 파라미터값의 좌표로 화면을 스크롤
	function pageScroll(y) {
		window.scrollTo({ 
			top: y,
			behavior: 'smooth' });
	}
	
	/* 카카오맵 API */
	function buildKakaoMap(careAddr, careNm, careTel) {
		var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		    mapOption = {
		        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		        level: 3 // 지도의 확대 레벨
		    };  
	
		// 지도를 생성합니다    
		var map = new kakao.maps.Map(mapContainer, mapOption); 
	
		// 주소-좌표 변환 객체를 생성합니다
		var geocoder = new kakao.maps.services.Geocoder();
		
		// 주소로 좌표를 검색합니다
		geocoder.addressSearch(careAddr, function(result, status) {
			console.log('result: ', result, 'status: ', status);
		    // 정상적으로 검색이 완료됐으면 
		     if (status === kakao.maps.services.Status.OK) {
	
		        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
				
				// 커스텀 마커 이미지 생성
				var imageSrc = '/static/Images/helppetf/kakaoMap/애완동물_아이콘_제작자_monkik_Flaticon.png',
					imageSize = new kakao.maps.Size(64, 64);

				var makerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
				
		        // 결과값으로 받은 위치를 마커로 표시합니다
		        var marker = new kakao.maps.Marker({
		            map: map,
		            position: coords,
					image: makerImage
		        });
					
		        // 인포윈도우로 장소에 대한 설명을 표시합니다
		        var infowindow = new kakao.maps.InfoWindow({
		            content: '<div class="careNm" style="width:200px; text-align:center; font-family: sans-serif; padding:10px 5px;">' + careNm + '</div>'
		        });
		        infowindow.open(map, marker);
				
		        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
		        map.setCenter(coords);
				
				
				$('.careNm').parent().parent().css('border-radius', '10px');
		    } 
		});    
	}
});