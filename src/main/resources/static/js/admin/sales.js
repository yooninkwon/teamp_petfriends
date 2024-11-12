$(document).ready(function() {

	/*오늘의 날짜 기입*/
	function insertTodayDate() {
		const today = new Date();
		const year = today.getFullYear(); // 연도
		const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1 필요)
		const day = String(today.getDate()).padStart(2, '0'); // 일
		const hours = String(today.getHours()).padStart(2, '0'); // 시 (24시간 형식)
		const minutes = String(today.getMinutes()).padStart(2, '0'); // 분
		// 요일 정보 가져오기 (Intl.DateTimeFormat 사용)
		const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(today);

		// 날짜 형식: YYYY-MM-DD
		const formattedDate = `${year}-${month}-${day} ${weekday}`;
		const formattedDateTime = `${year}-${month}-${day} (${weekday}) ${hours}:${minutes}`;

		// 날짜를 삽입할 span 요소 선택 (jQuery 사용)
		$('#todayText1_2').text(formattedDate);
		$('#todayText2_1').text('최종 업데이트일시 : ' + formattedDateTime);
	}

	// 페이지 로드 시 날짜 삽입 실행
	insertTodayDate();
	Chart.register(ChartDataLabels);
	const ctx = document.getElementById('myChart').getContext('2d');

	var paymentAmount = parseInt(document.getElementById('paymentAmount').innerText.replace(/[^0-9]/g, ''), 10);
	var refundAmount = parseInt(document.getElementById('refundAmount').innerText.replace(/[^0-9]/g, ''), 10);
	var todayText2_2_total = parseInt(document.getElementById('todayText2_2_total').innerText.replace(/[^0-9]/g, ''), 10);


	const dataValues = [paymentAmount, refundAmount, todayText2_2_total];

	const maxValue = Math.max(...dataValues); // 데이터에서 가장 큰 값
	const maxY = Math.ceil(maxValue * 1.2 / 1000) * 1000; // 1000의 배수로 맞추기

	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['결제금액', '환불금액', '순매출액'],
			datasets: [{
				data: dataValues,
				backgroundColor: [
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 206, 86, 0.2)',

				],
				borderColor: [
					'rgba(54, 162, 235, 1)',
					'rgba(255, 99, 132, 1)',
					'rgba(255, 206, 86, 1)',

				],
				borderWidth: 1,
				barThickness: 50, // 막대의 고정 두께 설정
			}]
		},
		options: {
			responsive: true, // 기본값 (차트를 컨테이너에 맞춤)
			maintainAspectRatio: false, // 비율 유지 해제 (부모 크기와 맞춤)
			plugins: {
				legend: { display: false }, // 범례를 숨김
				datalabels: {
					display: true, // 데이터 레이블 표시
					color: 'black', // 레이블 색상
					font: {
						size: 14 // 글자 크기
					},
					anchor: 'end', // 레이블 위치 (끝 부분)
					align: 'top', // 레이블의 위치 (위쪽)
					formatter: (value) => {
						return value.toLocaleString(); // 세 자리마다 , 추가
					}
				}
			},
			scales: {
				x: {


				},
				y: {
					beginAtZero: true,
					max: maxY
				}

			}
		}
	});


	// 현재 날짜를 'YYYY-MM' 형식으로 가져오기
	const today = new Date();
	const maxMonth = today.toISOString().split("T")[0].slice(0, 7); // 'YYYY-MM' 형식 추출

	// 날짜 그룹 설정 함수 (month 포함)
	function setDateRangeControls(startId, endId, isMonth = false) {
		const startInput = document.getElementById(startId);
		const endInput = document.getElementById(endId);

		// 오늘 날짜 이후로 선택 불가 (month의 경우 YYYY-MM 형식 사용)
		if (isMonth) {
			startInput.setAttribute('max', maxMonth);
			endInput.setAttribute('max', maxMonth);
		} else {
			const maxDate = today.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식 추출
			startInput.setAttribute('max', maxDate);
			endInput.setAttribute('max', maxDate);
		}

		// "부터" 날짜 변경 시, "까지" 최소 날짜 설정
		startInput.addEventListener('change', function() {
			const startValue = startInput.value;
			if (startValue) {
				endInput.setAttribute('min', startValue);
			}
		});

		// "까지" 날짜 변경 시, "부터" 최대 날짜 설정
		endInput.addEventListener('change', function() {
			const endValue = endInput.value;
			if (endValue) {
				startInput.setAttribute('max', endValue);
			}
		});
	}

	// `day`와 `month` 그룹에 각각 적용
	setDateRangeControls('start-day', 'end-day');           // day 그룹
	setDateRangeControls('start-month', 'end-month', true); // month 그룹 (isMonth = true)

	$("#filterMonth").hide();
	$("#filterDay input[type='radio']").first().prop('checked', true);

	// 라디오 버튼 값 변경 시 이벤트 처리
	$('input[name="type-filter"]').on('change', function() {
		let typeVal = $(this).val(); // 선택된 라디오 버튼의 value 값

		if (typeVal === '일별') {
			$("#filterMonth").hide();
			$("#filterDay").show();
			$("#filterDay input[type='radio']").first().prop('checked', true);
		} else {
			$("#filterDay").hide();
			$("#filterMonth").show();
			$("#filterMonth input[type='radio']").first().prop('checked', true);
		}


	});

	$('input[type="radio"]').on('change', function() {
		// 날짜 입력 필드 초기화
		$("#start-day, #end-day, #start-month, #end-month").val(null);
		// '끝' 날짜의 최소값을 초기화해줍니다.
		$("#start-day, #end-day").attr("min", "");  // 날짜 선택 범위 초기화
		$("#start-month, #end-month").attr("min", "");  // 월 선택 범위 초기화
		// `day`와 `month` 그룹에 각각 적용
		setDateRangeControls('start-day', 'end-day');           // day 그룹
		setDateRangeControls('start-month', 'end-month', true); // month 그룹 (isMonth = true)

		// 'type-day' 그룹에서 선택된 값 가져오기
		var selectedValue = $('input[name="type-day"]:checked').val();
		// '직접선택일' 라디오 버튼 선택 시에만 날짜 필드를 활성화
		if (selectedValue === '직접선택일') {
			// 날짜 입력 필드를 활성화
			$('#start-day, #end-day').prop('disabled', false);
			$('#start-month, #end-month').prop('disabled', true);
		} else if (selectedValue === '직접선택월') {
			// '직접선택일' 외의 옵션이 선택되면 날짜 필드를 비활성화
			$('#start-day, #end-day').prop('disabled', true);
			$('#start-month, #end-month').prop('disabled', false);
		} else {
			$('#start-day, #end-day').prop('disabled', true);
			$('#start-month, #end-month').prop('disabled', true);
		}
	});


	const ctxTotal = document.getElementById('totalChart').getContext('2d');

	const totalChart = new Chart(ctxTotal, {
		type: 'bar',
		data: {
			labels: ['2022', '2023', '2024'],
			datasets: [
				{
					label: '결제금액',
					data: [10, 20, 30, 40],
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					borderColor: 'rgba(54, 162, 235, 1)',
					borderWidth: 1,
					barThickness: 50 // 막대의 고정 두께 설정
				},
				{
					label: '환불금액',
					data: [5, 10, 15, 20],
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgba(255, 99, 132, 1)',
					borderWidth: 1,
					barThickness: 50 // 막대의 고정 두께 설정
				},
				{
					label: '순매출액',
					data: [5, 10, 15, 20],
					backgroundColor: 'rgba(255, 206, 86, 0.2)',
					borderColor: 'rgba(255, 206, 86, 1)',
					borderWidth: 1,
					barThickness: 50 // 막대의 고정 두께 설정
				}



			]
		},
		options: {
			responsive: true, // 기본값 (차트를 컨테이너에 맞춤)
			maintainAspectRatio: false, // 비율 유지 해제 (부모 크기와 맞춤)
			plugins: {
				legend: { display: true }, // 범례를 숨김
				datalabels: {
					display: true, // 데이터 레이블 표시
					color: 'black', // 레이블 색상
					font: {
						size: 14 // 글자 크기
					},
					anchor: 'end', // 레이블 위치 (끝 부분)
					align: 'top', // 레이블의 위치 (위쪽)
					formatter: (value) => {
						return value.toLocaleString(); // 세 자리마다 , 추가
					}
				}
			},
			scales: {
				x: {


				},
				y: {
					beginAtZero: true,

				}

			}
		}
	});



	function loadSalesList() {
		let type = $('input[name="type-filter"]:checked').val();
		let detail = $('input[name="type-day"]:checked').val();
		let startDay = '';
		let endDay = '';

		if (detail === '직접선택일') {
			startDay = $('#start-day').val();
			endDay = $('#end-day').val();
			if (startDay === '' || endDay === '') {
				alert(`날짜를 선택해주세요`);
				return;
			}
		} else if (detail === '직접선택월') {
			startDay = $('#start-month').val();
			endDay = $('#end-month').val();
			if (startDay === '' || endDay === '') {
				alert(`날짜를 선택해주세요`);
				return;
			}
		}

		$.ajax({
			url: '/admin/salesDetail',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				type,
				detail,
				startDay,
				endDay
			}),
			success: function(list) {

			},
			error: function(xhr, status, error) {
				console.error('Error fetching data:', error);
			}
		});
	}

	$('#searchBtn').on('click', function(event) {
		loadSalesList();
	});





});