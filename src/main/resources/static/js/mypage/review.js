document.querySelectorAll('.tab-btn').forEach(function(tabBtn) {
    tabBtn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        this.classList.add('active');

		document.querySelectorAll('.tab-content').forEach(function(content) {
	      content.classList.remove('active');
	    });
	    document.getElementById(this.dataset.tab).classList.add('active');
    });
});

let selectedFiles = []; // 선택한 파일을 저장할 배열
let deleteFiles = [];
function writeReview(cartCode, savingPoint) {
	// 후기 작성 탭으로 전환
    $('.tab-btn').removeClass('active');
    $('button[data-tab="write-review"]').addClass('active');
    $('.tab-content').removeClass('active');
    $('#write-review-container').addClass('active');

    // AJAX로 해당 상품 및 리뷰 정보 가져오기
    $.ajax({
        url: `/mypage/review/getReviewInfo?cartCode=${cartCode}`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
			// 상품 정보 표시
            $('#product-info').html(`
                <img src="/static/Images/ProductImg/MainImg/${data.main_img1}" alt="${data.pro_name}" class="product-image" />
				<div class="product-info">
                    <div>${data.pro_name}</div>
                    <div class="review-info">${data.proopt_name}</div>
                </div>
            `);
			
            // Hidden input에 값 저장
            $('#review-cart-code').val(data.cart_code);
            $('#review-pro-code').val(data.pro_code);

			// 폼 초기화 or 기존 데이터 반영
            if (data.review_code) {
                // 기존 리뷰 데이터 적용
	            $('#review-code').val(data.review_code);
                $('#review-rating').val(data.review_rating);
                $('#review-text').val(data.review_text);
                $('#rating-stars .star').each(function () {
                    $(this).toggleClass('filled', $(this).data('value') <= data.review_rating);
                });
				// 첨부 이미지 미리보기
                const images = [data.review_img1, data.review_img2, data.review_img3, data.review_img4, data.review_img5].filter(Boolean);
                const imgContainer = images
                    .map((img, index) => `
						<div id="preview-container" style="position: relative; display: inline-block;">
		                    <img src="/static/Images/ProductImg/ReviewImg/${img}" alt="첨부 이미지" class="product-image"/>
		                    <button class="remove-btn" data-img="${img}" data-index="${index}">×</button>
		                </div>
                    `)
                    .join('');
					
					for (let i = 0; i < images.length; i++) {
						addServerFileToFilesArray(`/static/Images/ProductImg/ReviewImg/${images[i]}`, images[i]);
					}
					
					
                $('#image-preview').html(imgContainer);

                // 삭제 버튼 이벤트 추가
                $('#image-preview .remove-btn').on('click', function () {
                    $(this).parent('#preview-container').remove();
					let imgName = $(this).data('img');
					let indexNo = $(this).data('index');
					removeImage(imgName);
					
                });
            } else {
				// 적립금
                $('#savingPoint').val(savingPoint);
                // 폼 초기화
                $('#review-rating').val(0);
                $('#review-text').val('');
                $('#rating-stars .star').removeClass('filled');
                $('#image-preview').empty();
            }
        },
        error: function () {
            alert('상품 정보를 불러오는 데 실패했습니다.');
        }
    });
}

function removeImage(imgName) {
    console.log('imgName', imgName);
    
    // 삭제할 파일을 deleteFiles 배열에 추가
    deleteFiles.push(imgName);
    
    console.log('deleteFiles', deleteFiles);
    
    // selectedFiles 배열에서 해당 파일 이름을 가진 항목을 삭제
    const indexToRemove = selectedFiles.findIndex(file => file.name === imgName);
    if (indexToRemove !== -1) {
        selectedFiles.splice(indexToRemove, 1);  // 해당 항목을 삭제
    }

    console.log('selectedFiles', selectedFiles);
}

async function addServerFileToFilesArray(url, filename) {
    try {
        const response = await fetch(url); // 파일 다운로드
        if (!response.ok) throw new Error('파일 다운로드 실패');

        const blob = await response.blob(); // Blob 생성
        const file = new File([blob], filename, { type: blob.type }); // File 객체 생성

        selectedFiles.push(file); // 배열에 추가
        console.log(`파일 추가 완료: ${file.name}`);
    } catch (error) {
        console.error('파일 추가 중 오류:', error);
    }

}


$(document).on('click', '#rating-stars .star', function () {
    const rating = $(this).data('value');
    $('#review-rating').val(rating); // Hidden input에 별점 값 저장

    // 별점 UI 업데이트
    $('#rating-stars .star').each(function () {
        $(this).toggleClass('filled', $(this).data('value') <= rating);
    });
});



$('#review-images').on('change', function () {
    const files = Array.from(this.files); // 새로 선택한 파일들

    // 선택한 파일 배열에 추가 (중복 제거)
	files.forEach(file => {
	    if (!selectedFiles.some(f => f.name === file.name)) { // 파일 이름으로 중복 체크
	        selectedFiles.push(file);
	    }
	});
	
	// 현재 미리보기된 이미지 수 체크
	const currentPreviewCount = $('#image-preview #preview-container').length;
	const totalImages = currentPreviewCount + files.length;
	
    if (totalImages > 5) {
        alert('이미지는 최대 5장까지만 업로드할 수 있습니다.');
        return;
    }

	// 새로 추가된 파일 미리보기
	files.forEach(file => {
	    const reader = new FileReader();
	    reader.onload = function (e) {
	        const imgContainer = `
	            <div id="preview-container" style="position: relative; display: inline-block;">
	                <img src="${e.target.result}" alt="미리보기" class="product-image"/>
	                <button class="remove-btn" data-file-name="${file.name}">×</button>
	            </div>
	        `;
	        $('#image-preview').append(imgContainer);
	    };
	    reader.readAsDataURL(file);
	});
	
	$('#image-preview').on('click', '.remove-btn', function () {
	    const fileName = $(this).data('file-name');
	    selectedFiles = selectedFiles.filter(f => f.name !== fileName); // 배열에서 삭제
	    $(this).parent('#preview-container').remove(); // 미리보기 제거
	});
	
    // 입력 초기화 (같은 파일 다시 선택 가능하게 하기 위함)
    $(this).val('');
	
	console.log(selectedFiles);
});

$('#review-form').on('submit', function (e) {
    e.preventDefault(); // 기본 폼 제출 방지

    const formData = new FormData(this); // 기존 폼 데이터를 포함하는 FormData 객체 생성
	console.log([...formData.entries()]);
	formData.delete('reviewImages');
	
    // 선택한 파일 배열 추가
	if (deleteFiles.length != 0) {
		deleteFiles.forEach(file => formData.append('deleteFiles', file));
	} else {
		formData.append('deleteFiles', null);
	}
    selectedFiles.forEach((file, index) => {
		if (file && file.size > 0) {
		    formData.append('reviewImages', file);
		}
	});
	
    // AJAX 요청으로 서버에 전송
    $.ajax({
        url: '/mypage/review/writeReview',
        type: 'POST',
        data: formData,
        processData: false, // 데이터를 문자열로 변환하지 않음
        contentType: false, // FormData의 기본 Content-Type 사용
        success: function (response) {
            alert('리뷰가 성공적으로 저장되었습니다!');
            location.href = '/mypage/review'; // 성공 시 리다이렉트
        },
        error: function (xhr, status, error) {
            console.error('리뷰 저장 중 오류 발생:', error);
            alert('리뷰 저장에 실패했습니다.');
        }
    });
});

$(document).ready(function() {
    writeReviewData();
    $('button[data-tab="write-review"]').on('click', function () {
        writeReviewData();
    });
    $('button[data-tab="myreview"]').on('click', function () {
        reviewData();
    });
	
    function writeReviewData() {
        const itemsPerPage = 6; // 페이지 당 item 수
        let currentPage = 1;
        let totalItems = 0;
        let myOrderList = []; // 데이터 저장할 배열
        let currPageGroup = 1;
        let totalPages = 0;
	
        fetchData(currentPage, currPageGroup);

        function fetchData(currentPage, currPageGroup) {
            $.ajax({
                url: '/mypage/myOrder/data',
                method: 'GET',
                dataType: 'json',
                success: function (myOrder) {
                    myOrderList = myOrder;
                    totalItems = myOrderList.length;
                    totalPages = Math.ceil(totalItems / itemsPerPage);

                    displayItems(currentPage);
                    setupPagination(currentPage, currPageGroup);
                },
                error: function (xhr, status, error) {
                    console.error('Error fetching data:', error);
                }
            });
        }

		function displayItems(currentPage) {
		    const start = (currentPage - 1) * itemsPerPage;
		    const end = start + itemsPerPage;
		    const sliceList = myOrderList.slice(start, end);

		    let lists = '';
		    if (sliceList.length === 0) {
		        // 목록이 비어 있을 때 빈 리스트 이미지를 표시
		        $('#write-review-list').hide();
		        $('#empty-list').show();
		    } else {
		        $('#write-review-list').show();
		        $('#empty-list').hide();

		        $.each(sliceList, function (index, myOrder) {
					myOrder.os_regdate = myOrder.os_regdate ? formatDate(myOrder.os_regdate) : '';
					
					// 유효기간 체크
		            const regDate = new Date(myOrder.os_regdate); // 구매확정 날짜
		            const today = new Date(); // 현재 날짜
		            const diffDays = Math.floor((today - regDate) / (1000 * 60 * 60 * 24)); // 날짜 차이 계산
		
		            // 조건에 따라 포인트 메시지 결정
					const savingPoint = new Intl.NumberFormat().format(Math.floor(myOrder.proopt_finalprice * myOrder.cart_cnt * 0.01))
		            const pointMessage = diffDays > 7
		                ? '<span style="color: gray;">포인트 지급 유효기간 만료</span>'
		                : `<span style="color: #ff4081;">${savingPoint}P 지급예정</span>`;
				
					// 후기 작성 버튼 또는 작성 완료 표시
		            const reviewButton = myOrder.review_code
		                ? `<button class="done-review-btn">후기 작성 완료</button>`
		                : `${pointMessage} <button class="write-review-btn" onclick="writeReview('${myOrder.cart_code}','${savingPoint}')">후기작성</button>`;
										
		            lists += `
		                <div class="wishlist-item">
		                    <a href="/product/productDetail?code=${myOrder.pro_code}" class="product-link">
		                        <img src="/static/Images/ProductImg/MainImg/${myOrder.main_img1}" alt="${myOrder.pro_name}" class="product-image" />
		                        <div class="product-info">
		                            <div>${myOrder.pro_name}</div>
		                            <div class="review-info">${myOrder.proopt_name}</div>
		                            <div class="review-info">구매확정 : ${myOrder.os_regdate}</div>
		                        </div>
		                    </a>
							<div class="review-write">
								${reviewButton}
							</div>
		                </div>
		            `;
		        });
		        $('#write-review-list').html(lists);
		    }
		}

        function setupPagination(currentPage, currPageGroup) {
            const maxPagesToShow = 10;
            const startPage = (currPageGroup - 1) * maxPagesToShow + 1;
            const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

            let paginationHtml = '';
            if (currPageGroup > 1) {
                paginationHtml += '<a href="#" class="page-link" data-page="prev-group">&laquo; 이전</a>';
            }
            for (let i = startPage; i <= endPage; i++) {
                paginationHtml += '<a href="#" class="page-link ' + (i === currentPage ? 'active' : '') + '" data-page="' + i + '">' + i + '</a>';
            }
            if (endPage < totalPages) {
                paginationHtml += '<a href="#" class="page-link" data-page="next-group">다음 &raquo;</a>';
            }
			
			$('#write-review-pagination').html(paginationHtml);
			
            $('.page-link').on('click', function (event) {
                event.preventDefault();

                let clickedPage = $(this).data('page');
                if (clickedPage === 'prev-group') {
                    currPageGroup--;
                    currentPage = (currPageGroup - 1) * maxPagesToShow + 1;
                } else if (clickedPage === 'next-group') {
                    currPageGroup++;
                    currentPage = (currPageGroup - 1) * maxPagesToShow + 1;
                } else {
                    currentPage = clickedPage;
                }

                displayItems(currentPage);
                setupPagination(currentPage, currPageGroup);
            });
        }

		// 날짜 형식 변환
		function formatDate(dateString) {
		    const date = new Date(dateString);
			const year = date.getFullYear();
		    const month = String(date.getMonth() + 1).padStart(2, '0');
		    const day = String(date.getDate()).padStart(2, '0');
		    const hours = String(date.getHours()).padStart(2, '0');
		    const minutes = String(date.getMinutes()).padStart(2, '0');

		    return `${year}-${month}-${day} ${hours}:${minutes}`;
		}
    }
	
	function reviewData() {
		const itemsPerPage = 6; // 페이지 당 item 수
        let currentPage = 1;
        let totalItems = 0;
        let reviewList = []; // 데이터 저장할 배열
        let currPageGroup = 1;
        let totalPages = 0;
	
        fetchData(currentPage, currPageGroup);

        function fetchData(currentPage, currPageGroup) {
            $.ajax({
                url: '/mypage/review/data',
                method: 'GET',
                dataType: 'json',
                success: function (review) {
                    reviewList = review;
                    totalItems = reviewList.length;
                    totalPages = Math.ceil(totalItems / itemsPerPage);

                    displayItems(currentPage);
                    setupPagination(currentPage, currPageGroup);
                },
                error: function (xhr, status, error) {
                    console.error('Error fetching data:', error);
                }
            });
        }

		function displayItems(currentPage) {
		    const start = (currentPage - 1) * itemsPerPage;
		    const end = start + itemsPerPage;
		    const sliceList = reviewList.slice(start, end);

		    let lists = '';
		    if (sliceList.length === 0) {
		        // 목록이 비어 있을 때 빈 리스트 이미지를 표시
		        $('#myreview-list').hide();
		        $('#empty-list').show();
		    } else {
		        $('#myreview-list').show();
		        $('#empty-list').hide();

		        $.each(sliceList, function (index, review) {
		            let starHtml = '';
		            for (let i = 1; i <= 5; i++) {
		                starHtml += `<span class="star ${i <= Math.floor(review.review_rating) ? 'filled' : ''}">★</span>`;
		            }
					
					const imagesHtml = [review.review_img1, review.review_img2, review.review_img3, review.review_img4, review.review_img5]
		                .filter(img => img).map(img => `<img src="/static/Images/ProductImg/ReviewImg/${img}" class="product-image" />`)
		                .join('');
						
					lists += `
		                <div class="wishlist-item">
							<div class="review-view">
			                    <a href="/product/productDetail?code=${review.pro_code}" class="product-link">
			                        <img src="/static/Images/ProductImg/MainImg/${review.main_img1}" alt="${review.pro_name}" class="product-image" />
			                        <div class="product-info">
			                            <div>${review.pro_name}</div>
			                            <div class="review-info">${review.proopt_name}</div>
										<div class="star-rating">${starHtml}</div>
			                        </div>
			                    </a>
								<div class="review-text">${review.review_text}</div>
								<div>${imagesHtml}</div>
							</div>
							<div class="review-modify">
	                            <div class="review-info">${review.review_date.split('T')[0]}</div>
								<div><button class="write-review-btn" onclick="writeReview('${review.cart_code}',0)">수정하기</button></div>
							</div>
		                </div>
		            `;
		        });
		        $('#myreview-list').html(lists);
		    }
		}

        function setupPagination(currentPage, currPageGroup) {
            const maxPagesToShow = 10;
            const startPage = (currPageGroup - 1) * maxPagesToShow + 1;
            const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

            let paginationHtml = '';
            if (currPageGroup > 1) {
                paginationHtml += '<a href="#" class="page-link" data-page="prev-group">&laquo; 이전</a>';
            }
            for (let i = startPage; i <= endPage; i++) {
                paginationHtml += '<a href="#" class="page-link ' + (i === currentPage ? 'active' : '') + '" data-page="' + i + '">' + i + '</a>';
            }
            if (endPage < totalPages) {
                paginationHtml += '<a href="#" class="page-link" data-page="next-group">다음 &raquo;</a>';
            }
			
			$('#myreview-pagination').html(paginationHtml);
			
            $('.page-link').on('click', function (event) {
                event.preventDefault();

                let clickedPage = $(this).data('page');
                if (clickedPage === 'prev-group') {
                    currPageGroup--;
                    currentPage = (currPageGroup - 1) * maxPagesToShow + 1;
                } else if (clickedPage === 'next-group') {
                    currPageGroup++;
                    currentPage = (currPageGroup - 1) * maxPagesToShow + 1;
                } else {
                    currentPage = clickedPage;
                }

                displayItems(currentPage);
                setupPagination(currentPage, currPageGroup);
            });
        }
    }
});