document.addEventListener('DOMContentLoaded', function () {
    // 전체 체크박스 이벤트
    document.querySelector('input[name="select-item"]:first-of-type').addEventListener('change', selectAllItem);
	
    // 개별 체크박스 이벤트
    document.querySelectorAll('tbody .select-item').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectAllStatus);
        checkbox.addEventListener('change', updateCartTotal);
    });

    // 페이지 로드 시 기본 합계 계산
    updateCartTotal();
});

// 선택/해제 기능
function selectAllItem() {
    const isChecked = document.querySelector('input[name="select-item"]:first-of-type').checked;
    document.querySelectorAll('input[name="select-item"]').forEach(checkbox => {
        checkbox.checked = isChecked;
    });
    updateCartTotal();
}

// 개별 체크박스 상태에 따라 전체 선택 체크박스 상태 업데이트
function updateSelectAllStatus() {
    const allChecked = Array.from(document.querySelectorAll('tbody input[name="select-item"]'))
        .every(checkbox => checkbox.checked);

    document.querySelector('thead input[name="select-item"]').checked = allChecked;
    updateCartTotal();
}

// 합계 계산 기능
function updateCartTotal() {
    let totalProductPrice = 0;
    let totalDiscount = 0;
    let totalDeliveryFee = 3000; // 기본 배송비
    let finalProductPrice = 0;
    let totalPoints = 0;
    let userRate = parseFloat(document.body.getAttribute('data-user-rate')) / 100;
    
    document.querySelectorAll('tbody .select-item').forEach((checkbox, index) => {
        if (checkbox.checked) {
            const itemRow = checkbox.closest('tr');
            const itemPrice = parseFloat(itemRow.querySelector('.pro-price').getAttribute('data-price'));
            const itemFinalPrice = parseFloat(itemRow.querySelector('.pro-dis-price').getAttribute('data-price'));
            const itemCount = parseInt(itemRow.querySelector('.quantity-input').value);

            totalProductPrice += itemPrice * itemCount;
            finalProductPrice += itemFinalPrice * itemCount;
        }
    });
	totalDiscount = totalProductPrice - finalProductPrice;
    totalPoints = Math.floor(finalProductPrice * userRate);

    // 계산된 값으로 DOM 업데이트
    document.querySelector('#totalProductPrice').innerText = `${totalProductPrice.toLocaleString()}원`;
    document.querySelector('#totalDiscount').innerText = `-${totalDiscount.toLocaleString()}원`;
    document.querySelector('#totalDeliveryFee').innerText = `+${totalDeliveryFee.toLocaleString()}원`;
    document.querySelector('#finalProductPrice').innerText = `=${finalProductPrice.toLocaleString()}원`;
    document.querySelector('#totalPoints').innerText = `${totalPoints.toLocaleString()}원`;
}
	
// AJAX 요청으로 모든 항목 주문
function orderAllItem() {
    fetch('/mypage/orderAllItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'orderAll' })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/mypage/payment';
        } else {
            alert('주문 처리에 실패했습니다.');
        }
    })
    .catch(error => console.error('Error:', error));
}

// AJAX 요청으로 선택된 항목 주문
function orderSelectedItem() {
    const selectedItems = Array.from(document.querySelectorAll('tbody .select-item'))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.closest('tr').querySelector('.quantity-input').dataset.cartCode);

    fetch('/mypage/orderSelectedItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartCodes: selectedItems })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/mypage/payment';
        } else {
            alert('선택된 상품 주문에 실패했습니다.');
        }
    })
    .catch(error => console.error('Error:', error));
}

function updateQuantity(event) {
    const button = event.target;
    const input = button.closest('td').querySelector('.quantity-input');
    const cartCode = input.getAttribute('data-cart-code');
    const maxStock = parseInt(input.getAttribute('data-max-stock'));
    let currentQuantity = parseInt(input.value);

    // + 또는 - 버튼을 클릭했는지 확인하여 수량 조정
    if (button.innerText === "+") {
        currentQuantity += 1;
    } else if (button.innerText === "-") {
        currentQuantity -= 1;
    }
	
	if (currentQuantity > maxStock) {
        alert(`재고 이상 담을 수 없습니다.(남은 수량: ${maxStock})`);
        location.reload();
		return;
    }
	
    // 서버에 업데이트 요청을 보냄
    fetch(`/mypage/updateQuantity`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartCode: cartCode, newQuantity: currentQuantity.toString() }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            alert('수량 업데이트에 실패했습니다.');
        }
    })
    .catch(error => console.error('Error:', error));
}

// 스크롤 위치를 저장하는 함수
function saveScrollPosition() {
    sessionStorage.setItem("scrollPosition", window.scrollY);
}
// 페이지 로드 시 이전 스크롤 위치로 이동하는 함수
function restoreScrollPosition() {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
    }
}
// 페이지가 로드될 때 스크롤 위치 복원
document.addEventListener("DOMContentLoaded", restoreScrollPosition);
// 페이지를 벗어나기 전 스크롤 위치 저장
window.addEventListener("beforeunload", saveScrollPosition);