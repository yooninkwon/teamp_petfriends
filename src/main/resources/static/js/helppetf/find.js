/**
 * 이 스크립트는 로그인 되어있는 유저의 로그인 정보를 세션에서 추출하여
 * 데이터베이스에 저장된 유저의 "배송지"주소를 불러온다.
 * 
 * 배송지 정보를 카카오맵 API에 입력하여 맵을 구성한다.
 * 
 * 다른 주소로 찾아보기 버튼을 누르면 iframe으로 구성된 모달창이 나온다.
 * 다음 우편번호 API를 이용하여 검색의 기준이 될 주소를 변경하여 검색할 수도 있다.
 * 
 * 페이지 이름 (동물병원/반려동물 동반시설)에 따라 찾아내는 결과의 카테고리가 변경된다.
 * 
 * 만약 로그인 되어있지 않더라도, 다른 주소로 찾아보기를 눌러
 * 다음 우편번호 API를 사용하면, 원하는 주소의 주변 시설들을 찾아볼 수 있다.
 * 
 * 카카오맵 API에서 구성된 검색결과 목록또는 맵 위의 마커를 클릭하면, 
 * 해당하는 시설의 "카카오맵 상세 페이지"로 연결된다.
 * 
 */


$(document).ready(function() {

	// 메인 nav, 서브 nav '선택됨' 클래스 설정
	document.getElementById(main_navbar_id).classList.add('selected');
	document.getElementById(sub_navbar_id).classList.add('selected');

	// 검색 키워드, 유저 주소, 닉네임 초기화
	var searchKeyword = '';
	var userAddress = ''
	var userNick = '';

	// 페이지 이름에 따라 검색 키워드 변경
	if (pageName === 'pet_facilities') {
		searchKeyword = '반려동물 동반';
	} else {
		searchKeyword = '동물병원';
	}

	// 로그인된 유저의 닉네임과 주소를 불러오는 함수
	getNickAndAddr();

	// 로그인된 유저의 닉네임과 주소를 불러오는 함수
	function getNickAndAddr() {
		fetch("/helppetf/find/adress_data", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				if (response.ok) {
					// 서버에 데이터 전송 성공 후 간단히 콘솔에 로그 출력
					console.log('Data successfully sent to server');
					return response.json();
				} else {
					console.error('Failed to send data');
				}
			})
			.then(data => {
				// 변수에 불러온 값을 저장
				userNick = data.mem_nick;
				userAddress = data.userAddr;

				// 안내창에 적혀있는 유저 닉네임, 주소를 변경하는 함수
				changeUserAddress(userAddress, true);
			})
			.catch(error => {
				console.error('ERROR:', error);
			});
	}

	// 안내창에 적혀있는 유저 닉네임, 주소를 변경하는 함수
	function changeUserAddress(userAddress, isFirst) {
		post = '';

		// 유저 닉네임이 null이 아니라면 == 로그인 되어 있다면
		if (isFirst) {
			if (userNick != null) {
				post += `<span class="user_nickname">${userNick}</span>님의 주소는 <span class="current_address">`;
				post += `${userAddress}</span> 입니다. 주소를 기반으로 주변 ${searchKeyword} 시설을 찾아볼게요.`;
			} else {
				post += '<span class="user_nickname">로그인</span> 하시면 <span class="current_address">';
				post += `배송지로 저장되어 있는 주소</span>로 주변 ${searchKeyword} 시설을 찾아보실 수 있습니다.`;
			}
		} else {
			// 다른주소로 찾아보기 했을 경우 출력 메세지
			post += `설정하신 주소는 <span class="current_address">`;
			post += `${userAddress}</span> 입니다. 주소를 기반으로 주변 ${searchKeyword} 시설을 찾아볼게요.`;
		}
		// 유저 닉네임, 주소를 html 태그와 함께 작성
		$('.my_adress_box').html(post);

		// 주소를 입력하여 지도를 구성하는 함수
		buildKakaoMap(userAddress);
	}


	// 카카오맵 API // 

	// 마커를 담을 배열입니다
	var markers = [];

	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		mapOption = {
			center: new kakao.maps.LatLng(37.566826, 126.9786567), // 초기 지도의 중심좌표
			level: 3 // 지도의 확대 레벨
		};

	// 지도를 생성
	var map = new kakao.maps.Map(mapContainer, mapOption);

	// 주소-좌표 변환 객체를 생성
	var geocoder = new kakao.maps.services.Geocoder();

	// 장소 검색 객체를 생성
	var ps = new kakao.maps.services.Places();

	// 주소를 입력하여 지도를 구성하는 함수
	function buildKakaoMap(userAddress) {

		// 주소로 좌표를 검색
		geocoder.addressSearch(userAddress, function(result, status) {
			if (status === kakao.maps.services.Status.OK) {
				var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

				// 지도의 중심을 결과값으로 받은 위치로 이동
				map.setCenter(coords);

				// 커스텀 마커 이미지 생성
				var imageSrc = '/static/Images/helppetf/kakaoMap/집_아이콘_제작자_Freepik_Flaticon.png',
					imageSize = new kakao.maps.Size(48, 48);

				var makerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

				// 결과값으로 받은 위치를 마커로 표시
				var marker = new kakao.maps.Marker({
					map: map,
					position: coords,
					image: makerImage
				});

				// 장소 검색 객체를 생성
				var ps = new kakao.maps.services.Places();

				// 키워드로 장소를 검색
				ps.keywordSearch(searchKeyword, placesSearchCB, {
					location: coords
				});
			}
		});

		// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
		var infowindow = new kakao.maps.InfoWindow({
			zIndex: 1
		});

		// 장소검색이 완료됐을 때 호출되는 콜백함수
		function placesSearchCB(data, status, pagination) {
			// 정상적으로 검색이 완료됐으면
			if (status === kakao.maps.services.Status.OK) {
				// 검색 목록과 마커를 표출
				displayPlaces(data);

				// 페이지 번호를 표출
				displayPagination(pagination);
			} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
				// 검색 결과가 0이라면
				alert('검색 결과가 존재하지 않습니다.');
				return;
			} else if (status === kakao.maps.services.Status.ERROR) {
				// 검색 중 오류가 발생한다면
				alert('검색 결과 중 오류가 발생했습니다.');
				return;
			}
		}

		// 검색 결과 목록과 마커를 표출하는 함수
		function displayPlaces(places) {

			// 결과 리스트, 메뉴들을 불러옴
			var listEl = document.getElementById('placesList'), menuEl = document
				.getElementById('menu_wrap'), fragment = document
					.createDocumentFragment(), bounds = new kakao.maps.LatLngBounds(), listStr = '';

			// 검색 결과 목록에 추가된 항목들을 제거
			removeAllChildNods(listEl);

			// 지도에 표시되고 있는 마커를 제거
			removeMarker();

			for (var i = 0; i < places.length; i++) {
				// 마커를 생성하고 지도에 표시
				var placePosition = new kakao.maps.LatLng(places[i].y,
					places[i].x), marker = addMarker(places[i].id, placePosition, i),
					itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성


				// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
				// LatLngBounds 객체에 좌표를 추가
				bounds.extend(placePosition);

				// 마커와 검색결과 항목에 mouseover 했을때
				// 해당 장소에 인포윈도우에 장소명을 표시
				// mouseout 했을 때는 인포윈도우를 닫음
				(function(marker, title) {
					kakao.maps.event.addListener(marker, 'mouseover', function() {
						displayInfowindow(marker, title);
					});
					kakao.maps.event.addListener(marker, 'mouseout', function() {
						infowindow.close();
					});
					itemEl.onmouseover = function() {
						displayInfowindow(marker, title);
					};
					itemEl.onmouseout = function() {
						infowindow.close();
					};
				})(marker, places[i].place_name);

				fragment.appendChild(itemEl);
			}

			// 검색결과 항목들을 검색결과 목록 Element에 추가
			listEl.appendChild(fragment);
			menuEl.scrollTop = 0;

			// 검색된 장소 위치를 기준으로 지도 범위를 재설정
			map.setBounds(bounds);
		}

		// 검색결과 항목을 Element로 반환하는 함수
		function getListItem(index, places) {
			var el = document.createElement('li');
			itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>';
			itemStr += '<div class="info"><a href="https://place.map.kakao.com/' + places.id + '" target="_blank">';
			itemStr += '<h5>' + places.place_name + '</h5>';

			if (places.road_address_name) {
				itemStr += '<span>    ' + places.road_address_name + '</span>';
				itemStr += '<span class="jibun gray">   ' + places.address_name;
				itemStr += '</span>';
			} else {
				itemStr += '<span>    ' + places.address_name + '</span>';
			}

			itemStr += '<span class="tel">  ' + places.phone + '</span></div>';

			el.innerHTML = itemStr;
			el.className = 'item';

			return el;
		}

		// 마커를 생성하고 지도 위에 마커를 표시하는 함수
		function addMarker(placeId, position, idx, title) {
			var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 사용
				imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
				imgOptions = {
					spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
					spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
					offset: new kakao.maps.Point(13, 37)
					// 마커 좌표에 일치시킬 이미지 내에서의 좌표
				}, markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize,
					imgOptions), marker = new kakao.maps.Marker({
						position: position, // 마커의 위치
						image: markerImage
					});

			// 마커 이벤트리스너 부착 - 클릭시 새 페이지로 해당 시설의 카카오맵 상세 페이지 이동			
			kakao.maps.event.addListener(marker, 'click', function() {
				window.open('https://place.map.kakao.com/' + placeId);
			});

			marker.setMap(map); // 지도 위에 마커를 표출
			markers.push(marker); // 배열에 생성된 마커를 추가

			return marker;
		}

		// 지도 위에 표시되고 있는 마커를 모두 제거
		function removeMarker() {
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
			markers = [];
		}

		// 검색결과 목록 하단에 페이지번호를 표시는 함수
		function displayPagination(pagination) {
			var paginationEl = document.getElementById('pagination'), fragment = document
				.createDocumentFragment(), i;

			// 기존에 추가된 페이지번호를 삭제
			while (paginationEl.hasChildNodes()) {
				paginationEl.removeChild(paginationEl.lastChild);
			}

			// 새로운 페이지번호 생성
			for (i = 1; i <= pagination.last; i++) {
				var el = document.createElement('a');
				el.href = "#";
				el.innerHTML = i;

				if (i === pagination.current) {
					el.className = 'on';
				} else {
					el.onclick = (function(i) {
						return function() {
							pagination.gotoPage(i);
						}
					})(i);
				}

				fragment.appendChild(el);
			}
			paginationEl.appendChild(fragment);
		}

		// 마커에 마우스오버 했을 경우 호출되는 함수
		// 인포윈도우에 장소명을 표시
		function displayInfowindow(marker, title) {
			var content = '<div class="infoWindow" style="width:150px; text-align:center; font-family: sans-serif; padding:10px 9px; z-index: 1;">'
				+ title + '</div>';

			infowindow.setContent(content);
			infowindow.open(map, marker);
			$('.infoWindow').parent().parent().css('border-radius', '10px');
		}


		// 검색결과 목록의 자식 Element를 제거하는 함수
		function removeAllChildNods(el) {
			while (el.hasChildNodes()) {
				el.removeChild(el.lastChild);
			}
		}

	}

	// 카카오맵 API 종료 // 



	// 우편번호 찾기 API //
	$('.search_btn').on('click', function() {
		const adress_wrap = $('.change_adress_wrap').get(0);
		adress_wrap.classList.toggle('on');
	});

	// 우편번호 API의 테마 지정
	var themeObj = {
		//bgColor: "#E3E3E3", //바탕 배경색
		searchBgColor: "#FF4081" //검색창 배경색
		//contentBgColor: "#F4EDED", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
		//pageBgColor: "#EBE2E2", //페이지 배경색
		//textColor: "", //기본 글자색
		//queryTextColor: "#FFFFFF" //검색창 글자색
		//postcodeTextColor: "", //우편번호 글자색
		//emphTextColor: "", //강조 글자색
		//outlineColor: "", //테두리
	};

	// 우편번호 찾기 화면을 넣을 element
	var element_postCode_layer = document.getElementsByClassName('search_wrap')[0];
	var element_div_layer = document.getElementsByClassName('change_adress_wrap')[0];
	//	    var element_postCode_layer = document.getElementsByClassName('search_wrap')[0];     $('.search_wrap')[0];
	//	    var element_div_layer = document.getElementsByClassName('change_adress_wrap')[0];

	$('.search_btn').on('click', function() {
		let flag = $(this).attr('data-isOn');

		// dataset의 값이 'on', 'off' 여부를 따짐
		if (flag === 'off') {
			// 'off'인 경우: 'on'으로 변경한 뒤 다음 우편번호찾기 API 요청 함수 호출
			$(this).attr('data-isOn', 'on');
			executePostcode();
		} else {
			// 'on'인 경우: 'off'로 변경한 뒤 다음 우편번호 API, 모달창 닫는 함수 호출
			$(this).attr('data-isOn', 'off');
			closePostcode();
		}
	});

	// 다음 우편번호찾기 API 요청 함수 호출
	function executePostcode() {
		new daum.Postcode({
			theme: themeObj,
			oncomplete: function(data) {
				// 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

				// 각 주소의 노출 규칙에 따라 주소를 조합한다.
				// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
				var addr = ''; // 주소 변수

				//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
				if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
					addr = data.roadAddress;
				} else { // 사용자가 지번 주소를 선택했을 경우(J)
					addr = data.jibunAddress;
				}
				$('.search_btn').attr('data-isOn', 'off');
				changeUserAddress(addr, false);
				closePostcode();
			},
			width: '100%',
			height: '100%',
			maxSuggestItems: 5
		}).embed(element_postCode_layer);

		// iframe을 넣은 element를 보이게 한다.
		element_div_layer.style.display = 'block';
		element_postCode_layer.style.display = 'block';

		// iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
		initLayerPosition();
	}

	function initLayerPosition() {
		var width = 300; //우편번호서비스가 들어갈 element의 width
		var height = 432; //우편번호서비스가 들어갈 element의 height

		// 위에서 선언한 값들을 실제 element에 넣는다.
		element_postCode_layer.style.width = width + 'px';
		element_postCode_layer.style.height = height + 'px';

		// 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
		element_postCode_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width) / 2) + 'px';
		element_postCode_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height) / 2) + 'px';
	}

	// 다음 우편번호 API, 모달창 닫는 함수 호출
	function closePostcode() {
		element_div_layer.style.display = 'none';
		element_postCode_layer.style.display = 'none';
	}

	// 우편번호 찾기 API 종료 //
});