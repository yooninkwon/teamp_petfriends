//탭 전환 기능
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

$(document).ready(function() {
    
    // 페이지 로드 시 기본적으로 첫 탭의 데이터를 불러오기
    wishData();

	// 탭 전환 시 쿠폰 등록 데이터 로드
    $('button[data-tab="wishlist"]').on('click', function () {
        wishData();
    });

    // 탭 전환 시 회원 쿠폰 데이터 로드
    $('button[data-tab="buyoften"]').on('click', function () {
        buyoftenData();
    });

    // 찜목록 탭 데이터 로드 함수
    function wishData() {
        const itemsPerPage = 6; // 페이지 당 item 수
        let currentPage = 1;
        let totalItems = 0;
        let myWishList = []; // 데이터 저장할 배열
        let currPageGroup = 1;
        let totalPages = 0;

        // 필터 기본 값
        let filterParam = {sort: '최근 추가순'};
	
        fetchData(currentPage, currPageGroup, filterParam);

        function fetchData(currentPage, currPageGroup, filterParam) {
            $.ajax({
                url: '/mypage/wish/data',
                method: 'GET',
                data: filterParam,
                dataType: 'json',
                success: function (myWish) {
                    myWishList = myWish;
                    totalItems = myWishList.length;
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
		    const sliceList = myWishList.slice(start, end);

		    let lists = '';
		    if (sliceList.length === 0) {
		        // 목록이 비어 있을 때 빈 리스트 이미지를 표시
		        $('#wishlist-list').hide();
		        $('#empty-list').show();
		    } else {
		        $('#wishlist-list').show();
		        $('#empty-list').hide();

		        $.each(sliceList, function (index, myWish) {
		            let starHtml = '';
		            for (let i = 1; i <= 5; i++) {
		                starHtml += `<span class="star ${i <= Math.floor(myWish.review_avg) ? 'filled' : ''}">★</span>`;
		            }
		            starHtml += `<span class="review_count">(${myWish.review_count})</span>`;

		            lists += `
		                <div class="wishlist-item" data-review-avg="${myWish.review_avg}" data-review-count="${myWish.review_count}">
		                    <a href="/product/productDetail?code=${myWish.pro_code}" class="product-link">
		                        <img src="/static/Images/ProductImg/MainImg/${myWish.main_img1}" alt="${myWish.pro_name}" class="product-image" />
		                        <div class="product-info">
		                            <div>${myWish.pro_name}</div>
		                            <div>${new Intl.NumberFormat().format(myWish.min_price)}원</div>
		                            <div class="star-rating">${starHtml}</div>
		                        </div>
		                    </a>
		                    <a href="/mypage/deleteWish?proCode=${myWish.pro_code}" class="wish-btn" onclick="return confirm('즐겨찾기에서 삭제하시겠습니까?')">
		                        <i class="fa-solid fa-paw"></i>
		                    </a>
		                </div>
		            `;
		        });
		        $('#wishlist-list').html(lists);
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
			
			$('#wishlist-pagination').html(paginationHtml);
			
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

        // 필터링 코드
	    $('#sortDropdown').on('change', function() {
	       filterParam = {sort: $('#sortDropdown').val()};
	
	       fetchData(currentPage, currPageGroup, filterParam);
	    });
    }

	// 자주 구매 탭 데이터 로드 함수
	function buyoftenData() {
		const itemsPerPage = 6; // 페이지 당 item 수
        let currentPage = 1;
        let totalItems = 0;
        let buyoftenList = []; // 데이터 저장할 배열
        let currPageGroup = 1;
        let totalPages = 0;

        // 필터 기본 값
        let filterParam = {orderable: ''};
	
        fetchData(currentPage, currPageGroup, filterParam);

        function fetchData(currentPage, currPageGroup, filterParam) {
            $.ajax({
                url: '/mypage/buyoften/data',
                method: 'GET',
                data: filterParam,
                dataType: 'json',
                success: function (buyoften) {
                    buyoftenList = buyoften;
                    totalItems = buyoftenList.length;
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
		    const sliceList = buyoftenList ? buyoftenList.slice(start, end) : [];

		    let lists = '';
		    if (sliceList.length === 0) {
		        // 목록이 비어 있을 때 빈 리스트 이미지를 표시
		        $('#buyoften-list').hide();
		        $('#empty-list2').show();
		    } else {
		        $('#buyoften-list').show();
		        $('#empty-list2').hide();

		        $.each(sliceList, function (index, buyoften) {
		            let starHtml = '';
		            for (let i = 1; i <= 5; i++) {
		                starHtml += `<span class="star ${i <= Math.floor(buyoften.review_avg) ? 'filled' : ''}">★</span>`;
		            }
		            starHtml += `<span class="review_count">(${buyoften.review_count})</span>`;

		            lists += `
		                <div class="wishlist-item" data-review-avg="${buyoften.review_avg}" data-review-count="${buyoften.review_count}">
		                    <a href="/product/productDetail?code=${buyoften.pro_code}" class="product-link">
		                        <img src="/static/Images/ProductImg/MainImg/${buyoften.main_img1}" alt="${buyoften.pro_name}" class="product-image" />
		                        <div class="product-info">
		                            <div>${buyoften.pro_name}</div>
		                            <div>${new Intl.NumberFormat().format(buyoften.min_price)}원</div>
		                            <div class="star-rating">${starHtml}</div>
		                        </div>
		                    </a>
		                    <div class="orderCnt">${buyoften.buy_count}회 구매</div>
		                </div>
		            `;
		        });
		        $('#buyoften-list').html(lists);
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
			
			$('#buyoften-pagination').html(paginationHtml);
			
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

        // 필터링 코드
	    $('#orderable').on('change', function() {
			if(this.checked){
		        filterParam = {orderable: $('#orderable').val()};
			} else {
				filterParam = {orderable: ''};
			}
			
	        fetchData(currentPage, currPageGroup, filterParam);
	    });
    }
});