$(document).ready(function() {
    // 기본 차트 데이터 가져오기 (일별로 시작)
    fetchMemberData('day');
	fetchPetData('Type');
	
    // 라디오 버튼 변경 시 데이터 가져오기
    $('input[name="dateType"]').on('change', function() {
        const selectedType = $(this).val();
        fetchMemberData(selectedType);
    });
	
	// 라디오 버튼 변경 시 데이터 가져오기
    $('input[name="petType"]').on('change', function() {
        const selectedType = $(this).val();
        fetchPetData(selectedType);
    });
});

// 회원 통계 데이터를 가져오는 함수
function fetchMemberData(dateType) {
    $.ajax({
        url: '/admin/customer_list', // 데이터를 가져오는 URL
        method: 'GET',
        success: function(response) {
			const memberTotal = response.length;
            $('#mem_total').text(memberTotal);
            const now = new Date();
            now.setUTCHours(0, 0, 0, 0); // 시간 초기화
            let labels = [];
            let activeCountMap = {};
            let dormantCountMap = {};
            let withdrawnCountMap = {};
            let careCountMap = {}; // 관리 회원 카운트

            // 일별, 주별, 월별에 따라 라벨 생성 및 초기화
            switch (dateType) {
                case 'day':
                    for (let i = 6; i >= 0; i--) {
                        const date = new Date(now);
                        date.setDate(now.getDate() - i);
                        const formattedDate = date.toISOString().split('T')[0];
                        labels.push(formattedDate);
                        activeCountMap[formattedDate] = 0;
                        dormantCountMap[formattedDate] = 0;
                        withdrawnCountMap[formattedDate] = 0;
                        careCountMap[formattedDate] = 0;
                    }
                    break;
                case 'week':
                    // 주별로 월요일을 기준으로 표시
                    const startOfWeek = new Date(now);
                    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // 이번 주 월요일
                    for (let i = 5; i >= 0; i--) {
                        const weekStartDate = new Date(startOfWeek);
                        weekStartDate.setDate(startOfWeek.getDate() - i * 7);
                        const weekLabel = `${weekStartDate.getFullYear()}-${String(weekStartDate.getMonth() + 1).padStart(2, '0')}-${String(weekStartDate.getDate()).padStart(2, '0')}`;
                        labels.push(weekLabel);
                        activeCountMap[weekLabel] = 0;
                        dormantCountMap[weekLabel] = 0;
                        withdrawnCountMap[weekLabel] = 0;
                        careCountMap[weekLabel] = 0;
                    }
                    break;
                case 'month':
                    for (let i = 5; i >= 0; i--) {
                        const date = new Date(now);
                        date.setMonth(now.getMonth() - i);
                        const monthLabel = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                        labels.push(monthLabel);
                        activeCountMap[monthLabel] = 0;
                        dormantCountMap[monthLabel] = 0;
                        withdrawnCountMap[monthLabel] = 0;
                        careCountMap[monthLabel] = 0;
                    }
                    break;
                default:
                    break;
            }

            // 데이터 가공
            response.forEach(member => {
                let regDate = new Date(member.mem_regdate);
                regDate.setUTCHours(0, 0, 0, 0); // 시간 초기화
                let formattedDate;

                if (dateType === 'day') {
                    formattedDate = regDate.toISOString().split('T')[0];
                } else if (dateType === 'week') {
                    const weekStart = new Date(regDate);
                    weekStart.setDate(regDate.getDate() - regDate.getDay() + 1); // 월요일 기준으로 시작 날짜 설정
                    formattedDate = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, '0')}-${String(weekStart.getDate()).padStart(2, '0')}`;
                } else if (dateType === 'month') {
                    formattedDate = `${regDate.getFullYear()}-${String(regDate.getMonth() + 1).padStart(2, '0')}`;
                }

                // 상태별 분류
                const logDate = new Date(member.mem_logdate);
                logDate.setUTCHours(0, 0, 0, 0); // 시간 초기화
                const diffInDays = (now - logDate) / (1000 * 60 * 60 * 24);

                if (member.mem_type === '탈퇴') {
                    // 탈퇴 회원의 로그 날짜를 기준으로 처리
                    let withdrawalDateFormatted;
                    if (dateType === 'day') {
                        withdrawalDateFormatted = logDate.toISOString().split('T')[0];
                    } else if (dateType === 'week') {
                        const weekStart = new Date(logDate);
                        weekStart.setDate(logDate.getDate() - logDate.getDay() + 1);
                        withdrawalDateFormatted = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, '0')}-${String(weekStart.getDate()).padStart(2, '0')}`;
                    } else if (dateType === 'month') {
                        withdrawalDateFormatted = `${logDate.getFullYear()}-${String(logDate.getMonth() + 1).padStart(2, '0')}`;
                    }
                    if (withdrawnCountMap[withdrawalDateFormatted] !== undefined) {
                        withdrawnCountMap[withdrawalDateFormatted]++;
                    }
                } else if (member.mem_type === '관리') {
                    // 관리 회원의 로그 날짜를 기준으로 처리
                    let careDateFormatted;
                    if (dateType === 'day') {
                        careDateFormatted = logDate.toISOString().split('T')[0];
                    } else if (dateType === 'week') {
                        const weekStart = new Date(logDate);
                        weekStart.setDate(logDate.getDate() - logDate.getDay() + 1);
                        careDateFormatted = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, '0')}-${String(weekStart.getDate()).padStart(2, '0')}`;
                    } else if (dateType === 'month') {
                        careDateFormatted = `${logDate.getFullYear()}-${String(logDate.getMonth() + 1).padStart(2, '0')}`;
                    }
                    if (careCountMap[careDateFormatted] !== undefined) {
                        careCountMap[careDateFormatted]++;
                    }
                } else if (diffInDays > 30) {
                    // 휴면 회원의 로그 날짜를 기준으로 처리
                    let dormantDateFormatted;
                    if (dateType === 'day') {
                        dormantDateFormatted = logDate.toISOString().split('T')[0];
                    } else if (dateType === 'week') {
                        const weekStart = new Date(logDate);
                        weekStart.setDate(logDate.getDate() - logDate.getDay() + 1);
                        dormantDateFormatted = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, '0')}-${String(weekStart.getDate()).padStart(2, '0')}`;
                    } else if (dateType === 'month') {
                        dormantDateFormatted = `${logDate.getFullYear()}-${String(logDate.getMonth() + 1).padStart(2, '0')}`;
                    }
                    if (dormantCountMap[dormantDateFormatted] !== undefined) {
                        dormantCountMap[dormantDateFormatted]++;
                    }
                } else {
                    if (activeCountMap[formattedDate] !== undefined) {
                        activeCountMap[formattedDate]++;
                    }
                }
            });

            // 차트에 사용할 데이터 배열 생성
            const activeData = labels.map(label => activeCountMap[label]);
            const dormantData = labels.map(label => dormantCountMap[label]);
            const withdrawnData = labels.map(label => withdrawnCountMap[label]);
            const careData = labels.map(label => careCountMap[label]);

            // 차트 생성
            renderLineChart(labels, activeData, dormantData, withdrawnData, careData);
        },
        error: function(error) {
            console.error('회원 통계 데이터 로드 중 오류 발생:', error);
        }
    });
}

// Line 차트를 생성하는 함수
function renderLineChart(labels, activeData, dormantData, withdrawnData, careData) {
    const existingChart = Chart.getChart('lineChart'); // 기존 차트를 확인
    if (existingChart) {
        existingChart.destroy(); // 기존 차트가 있으면 삭제
    }

    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '가입 회원',
                    data: activeData,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: false
                },
                {
                    label: '휴면 회원',
                    data: dormantData,
                    borderColor: 'rgba(255, 206, 86, 1)',
                    fill: false
                },
                {
                    label: '탈퇴 회원',
                    data: withdrawnData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false
                },
                {
                    label: '관리 회원',
                    data: careData,
                    borderColor: 'black',
                    fill: false
                }
            ]
        },
        options: {
            maintainAspectRatio: false, // 비율 유지 비활성화
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 16
                        }
                    }
                }
            },
            scales: {
                x: { beginAtZero: true },
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0 // 소수점 제거
                    }
                }
            }
        }
    });
}

// 펫 데이터를 가져오는 함수
function fetchPetData(petType) {
    $.ajax({
        url: '/admin/pet_list', // 데이터를 가져오는 URL
        method: 'GET',
        success: function(response) {
			const petTotal = response.length;
            $('#pet_total').text(petTotal);
            let dataMap = {};
	
            if (petType === 'Type') {
                // 펫 종류에 따른 데이터 가공 (강아지 vs 고양이)
                dataMap = { '강아지': 0, '고양이': 0 };
                response.forEach(pet => {
                    if (pet.pet_type === 'D') {
                        dataMap['강아지']++;
                    } else if (pet.pet_type === 'C') {
                        dataMap['고양이']++;
                    }
                });

            } else if (petType === 'dogBreed' || petType === 'catBreed') {
                // 견종 또는 묘종에 따른 데이터 가공
                const targetType = petType === 'dogBreed' ? 'D' : 'C';
                let breedCountMap = {};
                
                response.forEach(pet => {
                    if (pet.pet_type === targetType) {
                        const breed = pet.pet_breed || '기타';
                        if (breedCountMap[breed]) {
                            breedCountMap[breed]++;
                        } else {
                            breedCountMap[breed] = 1;
                        }
                    }
                });

                // 상위 3개의 견종/묘종과 기타 분류
                const sortedBreeds = Object.entries(breedCountMap).sort((a, b) => b[1] - a[1]);
                const top3Breeds = sortedBreeds.slice(0, 3);
                let otherCount = 0;
                top3Breeds.forEach(([breed, count]) => {
                    dataMap[breed] = count;
                });
                sortedBreeds.slice(3).forEach(([_, count]) => {
                    otherCount += count;
                });
                if (otherCount > 0) {
                    dataMap['기타'] = otherCount;
                }
            }

            // 차트를 그리는 함수 호출
            renderDoughnutChart(Object.keys(dataMap), Object.values(dataMap));
        },
        error: function(error) {
            console.error('펫 데이터 로드 중 오류 발생:', error);
        }
    });
}

// Doughnut 차트를 생성하는 함수
function renderDoughnutChart(labels, data) {
    const existingChart = Chart.getChart('doughnutChart'); // 기존 차트를 확인
    if (existingChart) {
        existingChart.destroy(); // 기존 차트가 있으면 삭제
    }

    const ctx = document.getElementById('doughnutChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 205, 86, 0.6)'] // 색상 설정
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}
