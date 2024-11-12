<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>
	mypage_body
</title>
</head>
<body data-user-rate="${userGrade.g_rate}">
<h2>장바구니</h2>
<div class="coupon-container">
    <h3>배송지 정보</h3>
    <hr />
    <div class="form-col" style="margin-bottom: 20px;">
    	<input type="text" value="${loginUser.mem_name}" style="margin-right: 5px;" disabled>
    	<input type="text" value="${loginUser.mem_tell}" style="margin-right: 5px;" disabled>
        <c:forEach var="address" items="${address}">
            <c:if test="${address.addr_default.toString() == 'Y'}">
                ${address.addr_line1} ${address.addr_line2}
                <button type="button" class="addressModifyBtn" onclick="openAddressChange()" style="margin-left: 5px;">배송지 변경하기</button>
            </c:if>
        </c:forEach>
    </div>
	
	<div class="form-col">
	    <h3>전체 상품(${cart.size()})</h3>
	    <a href="/mypage/deleteAllItem" class="delete-all-item" onclick="return confirm('장바구니에 담긴 상품을 전체 삭제하시겠습니까?')">전체삭제</a>
    </div>
    
    <table class="cart-table">
        <thead>
            <tr>
                <th><input type="checkbox" name="select-item" class="select-item" checked></th>
                <th>이미지</th>
                <th>상품정보</th>
                <th>판매가</th>
                <th>수량</th>
                <th>합계</th>
                <th>선택</th>
            </tr>
        </thead>
        <tbody>
        	<c:choose>
		    	<c:when test="${cart.size() == 0}">
		    		<tr>
		    			<td colspan="7">
			    			<div id="empty-list">
						        <img src="/static/Images/mypage/cart_empty.png" style="width: 200px;" />
						        <div><strong>장바구니가 비었..다구요?</strong></div>
						        <a href="/product/productlist" class="emptyBtn">쇼핑하러 가기</a>
						    </div>
		    			</td>
		    		</tr>
		    	</c:when>
		    	<c:otherwise>
		    		<c:forEach var="item" items="${cart}">
		                <tr>
		                    <td>
		                    	<input type="checkbox" name="select-item" class="select-item" checked>
		                    </td>
		                    <td>
			                    <a href="/product/productDetail?code=${item.pro_code}" class="product-link">
		                    	<img src="/static/Images/ProductImg/MainImg/${item.main_img1}" alt="${item.pro_name}" class="product-image" style="margin: 0;">
			                    </a>
		                    </td>
		                    <td style="text-align: left;">
		                        <div class="pro-name">${item.pro_name}</div>
		                        <div class="pro-option">${item.proopt_name}</div>
		                    </td>
		                    <td style="text-align: left;">
		                    	<div>
		                    		<span class="pro-discount">${item.pro_discount}%</span>
		                    		<span class="pro-price" data-price="${item.proopt_price}">
		                    			<fmt:formatNumber value="${item.proopt_price}" type="number" groupingUsed="true"/>원
		                    		</span>
		                    	</div>
		                    	<div class="pro-dis-price" data-price="${item.proopt_finalprice}">
		                     		<fmt:formatNumber value="${item.proopt_finalprice}" type="number" groupingUsed="true"/>원
		                    	</div>
		                    	<div>
		                    		<span class="pro-accum"><fmt:formatNumber value="${(item.proopt_finalprice / 100) * userGrade.g_rate}" type="number" maxFractionDigits="0" groupingUsed="true"/>원 적립</span>
		                    	</div>
		                    </td>
		                    <td>
		                    	<button class="quantity-btn" data-cart-code="${item.cart_code}" data-max-stock="${item.proopt_stock}" onclick="updateQuantity(event)">-</button>
		                        <input type="text" value="${item.cart_cnt}" class="quantity-input" data-cart-code="${item.cart_code}" data-max-stock="${item.proopt_stock}" onchange="updateQuantity(event)">
		                    	<button class="quantity-btn" data-cart-code="${item.cart_code}" data-max-stock="${item.proopt_stock}" onclick="updateQuantity(event)">+</button>
		                    </td>
		                    <td class="item-total"> 
		                        <fmt:formatNumber value="${item.proopt_finalprice * item.cart_cnt}" type="number" groupingUsed="true"/>원
		                    </td>
		                    <td>
		                    	<div><a href="/mypage/orderThisItem?cartCode=${item.cart_code}" class="order-item">주문하기</a></div>
		                    	<div><a href="/mypage/deleteThisItem?cartCode=${item.cart_code}" class="delete-item" onclick="return confirm('상품을 삭제하시겠습니까?')">X삭제</a></div>
		                    </td>
		                </tr>
		            </c:forEach>
		    	</c:otherwise>
		    </c:choose>
        </tbody>
    </table>
    
    <table class="cart-summary">
        <thead>
            <tr>
                <th>총 상품금액</th>
                <th>총 배송비</th>
                <th>총 할인금액</th>
                <th>결제 예정금액</th>
            </tr>
        </thead>
        <tbody>
            <td id="totalProductPrice">-</td>
            <td id="totalDeliveryFee">-</td>
            <td id="totalDiscount">-</td>
            <td>
                <div id="finalProductPrice">-</div>
                <div style="font-size: 14px; color: gray;">구매 시 <span id="totalPoints">-</span> 적립</div>
            </td>
        </tbody>
    </table>
    
	<div class="button-container">
	    <button class="orderAllItem" onclick="orderSelectedItem(event)">전체상품 구매</button>
	    <button class="orderSelectedItem" onclick="orderSelectedItem(event)">선택상품 구매</button>
	</div>
</div>

<script src="/static/js/mypage/setting.js"></script>
<script src="/static/js/mypage/cart.js"></script>
</body>
</html>