<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>펫프렌즈</title>
<jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
</head>


<body>
	<!-- 헤더 인클루드 -->
	<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />


	<!-- 메인구성 시작-->
	<!-- 이벤트 -->
	<div class="slider">
		<div class="slides">
			<!-- 각 슬라이드 -->
			<c:forEach var="event" items="${event}">
				<div class="slide" onclick="location.href='/notice/eventView?id=${event.event_no }'">
					<img
						src="<c:url value='/static/Images/slideImg/${event.event_slideimg}'/>"
						alt="${event.event_title}">
				</div>
			</c:forEach>
		</div>
		<!-- 화살표버튼 -->
		<button class="prev" onclick="moveSlide(-1)">&#10094;</button>
		<button class="next" onclick="moveSlide(1)">&#10095;</button>
	</div>

	<div class="newNotice">
		<a href="/notice/noticeView?id=${notice.notice_no}">
		[NEW NOTICE] &nbsp; ${notice.notice_title }
		<span style="float: right; padding-right: 20px;">작성일 : ${notice.notice_date }&nbsp;조회수 : ${notice.notice_hit }</span>
		</a>
	</div> <hr />

	<!-- 메인 Best Product 구성 -->
	<div class="proSlide">
		<h1 id="best_product">BEST 멍멍템</h1>
		<div id="best_product_table">
			<c:forEach var="list" items="${dogList}">
				<div class="bestProductItem" data-product-code="${list.pro_code}"
					onclick="location.href='/product/productDetail?code=${list.pro_code}'">
					<div class="bestproduct-image-wrapper">
						<img src="/static/images/ProductImg/MainImg/${list.main_img1}" />
					</div>
					<span class="bestProName">${list.pro_name}</span> <span
						id="bestProPrice"> <fmt:formatNumber
							value="${list.proopt_price}" pattern="#,###" />원
					</span> <br /> <span id="bestProDis">${list.pro_discount}%</span> <span
						id="bestProFpri"> <fmt:formatNumber
							value="${list.proopt_finalprice}" pattern="#,###" />원
					</span>
					<div class="bestProRating">
						<span class="bestProAverage"
							data-average-rating="${list.average_rating}"></span> <span>(${list.total_reviews})</span>
						<!-- 별점과 리뷰 개수 -->
					</div>
				</div>
			</c:forEach>
		</div>
	</div>

	<div class="proSlide">
		<h1 id="best_product">BEST 냐옹템</h1>
		<div id="best_product_table">
			<c:forEach var="list" items="${catList}">
				<div class="bestProductItem" data-product-code="${list.pro_code}"
					onclick="location.href='/product/productDetail?code=${list.pro_code}'">
					<div class="bestproduct-image-wrapper">
						<img src="/static/images/ProductImg/MainImg/${list.main_img1}" />
					</div>
					<span class="bestProName">${list.pro_name}</span> <span
						id="bestProPrice"> <fmt:formatNumber
							value="${list.proopt_price}" pattern="#,###" />원
					</span> <br /> <span id="bestProDis">${list.pro_discount}%</span> <span
						id="bestProFpri"> <fmt:formatNumber
							value="${list.proopt_finalprice}" pattern="#,###" />원
					</span>
					<div class="bestProRating">
						<span class="bestProAverage"
							data-average-rating="${list.average_rating}"></span> <span>(${list.total_reviews})</span>
						<!-- 별점과 리뷰 개수 -->
					</div>
				</div>
			</c:forEach>
		</div>
	</div>

	<!-- 메인페이지 구분선 -->
	<div class="mainLine"></div>

	<!-- 메인 구성 끝 -->


	<!-- 푸터 인클루드 -->
	<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</body>
</html>