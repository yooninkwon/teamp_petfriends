$(document).ready(function() {
    loadOrderData('orderlist');

    // 탭 전환 시 데이터 로드
    $('.tab-btn').on('click', function() {
        const tabType = $(this).data('tab');
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        loadOrderData(tabType);
    });

    // 날짜 버튼 클릭 시 start-date와 end-date 설정 후 자동 조회
    $('.date-group button').on('click', function() {
        const days = $(this).text();
        let startDate = new Date();
        const endDate = new Date(); // 오늘

		switch (days) {
            case '전체':
                // startDate와 endDate를 null로 설정하여 전체 데이터 가져오기
                $('#start-date').val('');
                $('#end-date').val('');
                break;
            case '오늘':
                startDate = endDate;
                $('#start-date').val(startDate.toISOString().split('T')[0]);
                $('#end-date').val(endDate.toISOString().split('T')[0]);
                break;
            case '1주일':
                startDate = new Date();
                startDate.setDate(endDate.getDate() - 7);
                $('#start-date').val(startDate.toISOString().split('T')[0]);
                $('#end-date').val(endDate.toISOString().split('T')[0]);
                break;
            case '1개월':
                startDate = new Date();
                startDate.setMonth(endDate.getMonth() - 1);
                $('#start-date').val(startDate.toISOString().split('T')[0]);
                $('#end-date').val(endDate.toISOString().split('T')[0]);
                break;
            case '3개월':
                startDate = new Date();
                startDate.setMonth(endDate.getMonth() - 3);
                $('#start-date').val(startDate.toISOString().split('T')[0]);
                $('#end-date').val(endDate.toISOString().split('T')[0]);
                break;
            case '6개월':
                startDate = new Date();
                startDate.setMonth(endDate.getMonth() - 6);
                $('#start-date').val(startDate.toISOString().split('T')[0]);
                $('#end-date').val(endDate.toISOString().split('T')[0]);
                break;
            default:
                return;
        }

        loadOrderData($('.tab-btn.active').data('tab')); // 현재 활성화된 탭으로 자동 조회
    });

    // 조회 버튼 클릭 시 날짜 필터 적용
    $('#filterBtn').on('click', function() {
        loadOrderData($('.tab-btn.active').data('tab'));
    });

    function loadOrderData(tabType) {
        const itemsPerPage = 4; // 페이지 당 item 수
        let currentPage = 1;

        const startDate = $('#start-date').val() ? new Date($('#start-date').val()) : null;
        const endDate = $('#end-date').val() ? new Date($('#end-date').val()) : null;

        // 시간 부분을 제거하여 순수 날짜만 비교
        if (startDate) startDate.setHours(0, 0, 0, 0);
        if (endDate) endDate.setHours(23, 59, 59, 999);

        $.ajax({
            url: '/mypage/order/data',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                const orderList = response.myorders;
                const items = response.items;
                const orderStatuses = response.orderStatuses;

                let filteredList = tabType === 'orderlist'
                    ? orderList.filter(order => order.o_cancel === null)
                    : orderList.filter(order => order.o_cancel !== null);

				// 탭별 날짜 필터 적용
                if (startDate && endDate) {
                    filteredList = filteredList.filter(order => {
                        let dateToCheck;
                        
                        if (tabType === 'orderlist') {
                            // 주문내역 탭: 결제완료 날짜로 필터링
                            dateToCheck = orderStatuses.find(status => status.o_code === order.o_code && status.os_name === '결제완료')?.os_regdate;
                        } else {
                            // 취소/반품 탭: 최신 상태의 등록일로 필터링
                            dateToCheck = orderStatuses.filter(status => status.o_code === order.o_code)
                                .reduce((latest, current) => current.os_regdate > latest.os_regdate ? current : latest, { os_regdate: '' }).os_regdate;
                        }
                        
                        if (!dateToCheck) return false;

                        const checkDate = new Date(dateToCheck);
                        checkDate.setHours(0, 0, 0, 0); // 시간 제거

                        return checkDate >= startDate && checkDate <= endDate;
                    });
                }
				
				// 최신순 정렬
                filteredList.sort((a, b) => {
                    // 주문내역 탭: orderDate 기준 최신순 정렬
                    if (tabType === 'orderlist') {
                        const dateA = new Date(orderStatuses.find(status => status.o_code === a.o_code && status.os_name === '결제완료')?.os_regdate);
                        const dateB = new Date(orderStatuses.find(status => status.o_code === b.o_code && status.os_name === '결제완료'));
                        return dateB - dateA;
                    }
                    // 취소/반품 탭: regdate 기준 최신순 정렬
                    else {
                        const dateA = new Date(orderStatuses.filter(status => status.o_code === a.o_code)
                            .reduce((latest, current) => current.os_regdate > latest.os_regdate ? current : latest, { os_regdate: '' }).os_regdate);
                        const dateB = new Date(orderStatuses.filter(status => status.o_code === b.o_code)
                            .reduce((latest, current) => current.os_regdate > latest.os_regdate ? current : latest, { os_regdate: '' }).os_regdate);
                        return dateB - dateA;
                    }
                });
				
                const totalItems = filteredList.length;
                const totalPages = Math.ceil(totalItems / itemsPerPage);

                displayItems(currentPage, itemsPerPage, filteredList, orderStatuses, items, tabType);
                setupPagination(totalPages, currentPage, itemsPerPage, filteredList, orderStatuses, items, tabType);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }
	
    function displayItems(currentPage, itemsPerPage, myorders, orderStatuses, items, tabType) {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const sliceList = myorders.slice(start, end);

        let lists = '';
        if (sliceList.length === 0) {
            $('#orderlist-list').hide();
            $('#empty-list').show();
        } else {
            $('#orderlist-list').show();
            $('#empty-list').hide();

            sliceList.forEach(myorder => {
                let OrderDate = orderStatuses.find(status => status.o_code === myorder.o_code && status.os_name === '결제완료')?.os_regdate;
                let latestStatus = orderStatuses.filter(status => status.o_code === myorder.o_code)
                    .reduce((latest, current) => current.os_regdate > latest.os_regdate ? current : latest, { os_name: '', os_regdate: '' });
                let orderItems = items.filter(item => item.o_code === myorder.o_code);
				
				// 날짜 포맷 적용
				OrderDate = OrderDate ? formatDate(OrderDate) : '';
				latestStatus.os_regdate = latestStatus.os_regdate ? formatDate(latestStatus.os_regdate) : '';
				
                lists += `
                    <div class="order-box">
                        <div class="order-header">
                            <div>
                                주문번호 ${myorder.o_code}
                                <span> | ${OrderDate}</span>
                            </div>
                            <a href="/mypage/order/orderDetail?orderCode=${myorder.o_code}">주문상세 ></a>
                        </div>
                        <div class="order-info">
                            <div>
                                <div class="order-status">
                                    ${latestStatus.os_name}
                                    <span>${latestStatus.os_regdate}</span>
                                </div>
                `;

                orderItems.forEach(item => {
                    lists += `
                        <div class="item">
                            <a href="/product/productDetail?code=${item.pro_code}" class="product-link">
                                <img src="/static/Images/ProductImg/MainImg/${item.main_img1}" alt="${item.pro_name}" class="item-img">
                                <div class="item-details">
                                    <div>${item.pro_name}</div>
                                    <div class="item-light">${item.proopt_name}</div>
                                    <div class="item-bold">${new Intl.NumberFormat().format(item.proopt_finalprice)}원 <span class="item-light"> | ${item.cart_cnt}개</span></div>
                                </div>
                            </a>
                        </div>
                    `;
                });

                lists += `
                            </div>
                `;

                if (tabType === 'orderlist') {    
                    lists += `
                        <div class="order-actions">
                            ${latestStatus.os_name === '배송완료' ? `
                                <a href="/mypage/order/delivDetail?orderCode=${myorder.o_code}">배송조회</a>
                                <button onclick="showCancelPopup('${myorder.o_code}')">반품/환불</button>
                            ` : `
                                <a href="/mypage/order/delivDetail?orderCode=${myorder.o_code}">배송조회</a>
                                <button onclick="showCancelPopup('${myorder.o_code}')">주문취소</button>
                            `}
                        </div>
                    `;
                } else {
                    lists += `
                        <div class="order-actions"></div>
                    `;
                }
                        
                lists += `
                    </div>
                </div>
                `;
            });

            $('#orderlist-list').html(lists);
        }
    }

    function setupPagination(totalPages, currentPage, itemsPerPage, myorders, orderStatuses, items, tabType) {
        let paginationHtml = '';
        if (totalPages >= 1) {
            for (let i = 1; i <= totalPages; i++) {
                paginationHtml += `<a href="#" class="page-link ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
            }
            $('#orderlist-pagination').html(paginationHtml);

            $('.page-link').on('click', function(event) {
                event.preventDefault();
                currentPage = parseInt($(this).data('page'));
                displayItems(currentPage, itemsPerPage, myorders, orderStatuses, items, tabType);
            });
        }
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
});

// 취소 요청 팝업 창 열기
function showCancelPopup(orderCode) {
    const popupWidth = 350;
    const popupHeight = 300;
    const popupX = (window.screen.width / 2) - (popupWidth / 2);
    const popupY = (window.screen.height / 2) - (popupHeight / 2);
    
    window.open(`/mypage/order/cancelRequest?orderCode=${orderCode}`, 'cancelRequest', `width=${popupWidth},height=${popupHeight},left=${popupX},top=${popupY},resizable=no`);
}
// 취소 요청 제출
function submitCancelRequest(orderCode) {
	const selectValue = document.getElementById('cancel-option').value;
    const detailValue = document.getElementById('cancel-detail').value.trim();

    // AJAX로 취소 요청을 보냄
	$.ajax({
        url: `/mypage/order/cancel?orderCode=${orderCode}`,
        method: 'POST',
        data: {
            o_cancel: selectValue,
            o_cancel_detail: detailValue
        },
        success: function(response) {
            window.close();
            window.opener.location.reload();
        }
    });
}