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
			// endDay에 1일을 더하는 로직
			let endDate = new Date(endDay);
			endDate.setDate(endDate.getDate() + 1); // 1일을 더함
			endDay = endDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변경
		} else if (detail === '직접선택월') {
			startDay = $('#start-month').val();
			endDay = $('#end-month').val();
			if (startDay === '' || endDay === '') {
				alert(`날짜를 선택해주세요`);
				return;
			}
			// endDay에 1개월을 더하는 로직
			let endMonth = new Date(endDay);
			endMonth.setMonth(endMonth.getMonth() + 1); // 1개월을 더함
			endDay = endMonth.toISOString().split('T')[0].slice(0, 7); // 'YYYY-MM' 형식으로 변경
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
				// 기존 테이블 내용 비우기 (새로고침 시)
				$('#product-table-body').empty();

				// list를 반복하면서 테이블에 추가
				list.forEach(function(item) {
					var row = '<tr>' +
						'<td>' + item.order_date + '</td>' +
						'<td>' + item.completed_count.toLocaleString() + '</td>' +
						'<td>' + item.cancelled_count.toLocaleString() + '</td>' +
						'<td>' + item.total_coupon.toLocaleString() + '</td>' +
						'<td>' + item.total_point.toLocaleString() + '</td>' +
						'<td>' + item.total_amount.toLocaleString() + '</td>' +
						'<td>' + item.cancel_amount.toLocaleString() + '</td>' +
						'<td>' + item.net_amount.toLocaleString() + '</td>' +
						'</tr>';

					// 테이블 본문에 행 추가
					$('#product-table-body').append(row);



					salesGraph(list);

				});


			},
			error: function(xhr, status, error) {
				console.error('Error fetching data:', error);
			}
		});
	}





	let totalChart = null;


	function salesGraph(list) {
		const totalAmountData = [];
		const cancelAmountData = [];
		const netAmountData = [];
		const labels = [];

		list.slice().reverse().forEach(function(item) {

			labels.push(item.order_date);  // 날짜 추가
			totalAmountData.push(item.total_amount);  // total_amount 값 추가
			cancelAmountData.push(item.cancel_amount);  // cancel_amount 값 추가
			netAmountData.push(item.net_amount);  // net_amount 값 추가

		});

		// 기존 차트가 있다면 destroy()로 제거
		if (totalChart) {
			totalChart.destroy();
		}

		const ctxTotal = document.getElementById('totalChart').getContext('2d');

		const maxtotal = Math.max(...totalAmountData); // 데이터에서 가장 큰 값
		const maxcancel = Math.max(...cancelAmountData); // 데이터에서 가장 큰 값
		const maxY = maxtotal + maxcancel;


		totalChart = new Chart(ctxTotal, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [
					{
						label: '결제금액',
						data: totalAmountData,
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1


					},

					{
						label: '환불금액',
						data: cancelAmountData,
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1

					},

					{
						label: '순매출액',
						data: netAmountData,
						backgroundColor: 'rgba(255, 206, 86, 0.2)',
						borderColor: 'rgba(255, 206, 86, 1)',
						borderWidth: 1

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
							size: 10 // 글자 크기
						},
						anchor: 'end', // 레이블 위치 (끝 부분)
						align: 'top', // 레이블의 위치 (위쪽)
						formatter: (value) => {
							return value.toLocaleString(); // 세 자리마다 , 추가
						}
					},
					plugins: {
					    zoom: {
					        pan: {
					            enabled: true, // 드래그로 이동
					            mode: 'x'      // x축 이동만 허용
					        },
					        zoom: {
					            enabled: true, // 줌 활성화
					            mode: 'x'      // x축 줌만 허용
					        }
					    }
					}
				},
				scales: {
					x: {
						ticks: {
							autoSkip: false,  // 너무 많은 항목이 있을 경우, 자동으로 건너뛰지 않도록 설정
							maxRotation: 0,  // 레이블 기울임 방지
				            minRotation: 0   // 레이블 기울임 방지
						}

					},
					y: {
						beginAtZero: true,
						max: maxY
					}

				}
			}
		});



	}


	$('#searchBtn').on('click', function(event) {
		loadSalesList();
	});














});