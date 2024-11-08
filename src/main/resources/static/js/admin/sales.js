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
					align: 'top' // 레이블의 위치 (위쪽)
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
	console.log(myChart.options.plugins.datalabels);

});