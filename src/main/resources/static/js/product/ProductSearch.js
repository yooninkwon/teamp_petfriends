$(document).ready(function() {
	$('#searchInput').on('input', function() {
		const searchTerm = $(this).val();

		// Ajax 요청
		$.ajax({
			url: '/path/to/your/api', // 서버 API URL
			type: 'GET',
			data: { query: searchTerm }, // 쿼리 파라미터로 입력값 전달
			success: function(data) {
				// 결과를 화면에 출력
				$('#result').empty(); // 이전 결과 삭제
				data.forEach(item => {
					$('#result').append('<div>' + item + '</div>');
				});
			},
			error: function(xhr, status, error) {
				console.error('Error: ' + error);
			}
		});
	});
});