$(document).ready(function() {
    loadOrderData('orderlist');

    // 탭 전환 시 데이터 로드
    $('.tab-btn').on('click', function() {
        const tabType = $(this).data('tab');
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        loadOrderData(tabType);
    });

    function loadOrderData(tabType) {
        const itemsPerPage = 4;
        let currentPage = 1;
        let totalItems = 0;
        let filteredList = [];
        let totalPages = 0;

        $.ajax({
            url: '/mypage/order/data',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                const orderList = response.myorders;
                const items = response.items;
                const orderStatuses = response.orderStatuses;

                filteredList = tabType === 'orderlist'
                    ? orderList.filter(order => order.o_cancel === null)
                    : orderList.filter(order => order.o_cancel !== null);
				console.log("Order List:", orderList);
				console.log("Items:", items);
				console.log("Order Statuses:", orderStatuses);
				console.log("filteredList:", filteredList)
                totalItems = filteredList.length;
                totalPages = Math.ceil(totalItems / itemsPerPage);

                displayItems(currentPage, itemsPerPage, filteredList, orderStatuses, items);
                setupPagination(totalPages, currentPage, itemsPerPage, filteredList, orderStatuses, items);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    function displayItems(currentPage, itemsPerPage, myorders, orderStatuses, items) {
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
                let latestStatus = orderStatuses.filter(status => status.o_code === myorder.o_code)
                    .reduce((latest, current) => current.os_regdate > latest.os_regdate ? current : latest, { os_name: '', os_regdate: '' });
                
                let orderItems = items.filter(item => item.o_code === myorder.o_code);

                lists +=`
	                    <div class="order-box">
	                        <div class="order-header">
	                            <div>
	                                주문번호 ${myorder.o_code}
	                                <span> | ${orderStatuses.find(status => status.o_code === myorder.o_code && status.os_name === '결제완료')?.os_regdate}</span>
	                            </div>
	                            <a href="">주문상세 ></a>
	                        </div>
	                        <div class="order-info">
								<div>
		                            <div class="order-status">
		                                ${latestStatus.os_name}
		                                <span>${latestStatus.os_name === '배송완료' ? latestStatus.os_regdate : myorder.o_expecdate}</span>
		                            </div>
	                	`;

                orderItems.forEach(item => {
                    	lists +=`
			                        <div class="item">
			                            <img src="/static/Images/ProductImg/MainImg/${item.main_img1}" alt="${item.pro_name}" class="item-img">
			                            <div class="item-details">
			                                <div>${item.pro_name}</div>
			                                <div class="item-light">${item.proopt_name}</div>
			                                <div class="item-bold">${item.proopt_finalprice}원 <span class="item-light"> | ${item.cart_cnt}개</span></div>
			                            </div>
			                        </div>
								</div>
		                    	`;
                });

                lists +=`
			                    <div class="order-actions">
			                        ${latestStatus.os_name === '배송완료' ? `
			                            <a href="" style="color: #ff4081; border: 1px solid #ff4081;">후기작성</a>
			                            <a href="">배송조회</a>
			                            <a href="">교환/반품</a>
			                        ` : `
			                            <a href="" style="color: #ff4081; border: 1px solid #ff4081;">배송조회</a>
			                            <a href="">주문취소</a>
			                        `}
			                    </div>
			                </div>
			            </div>
			            `;
            });

            $('#orderlist-list').html(lists);
        }
    }

    function setupPagination(totalPages, currentPage, itemsPerPage, myorders, orderStatuses, items) {
        let paginationHtml = '';
        if (totalPages > 1) {
            for (let i = 1; i <= totalPages; i++) {
                paginationHtml += `<a href="#" class="page-link ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
            }
            $('#orderlist-pagination').html(paginationHtml);

            $('.page-link').on('click', function(event) {
                event.preventDefault();
                currentPage = parseInt($(this).data('page'));
                displayItems(currentPage, itemsPerPage, myorders, orderStatuses, items);
            });
        }
    }
});