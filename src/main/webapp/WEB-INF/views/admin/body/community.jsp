<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="/static/css/admin/community.css">

<title>community_body</title>
</head>


<body>
	<div class="title">
		<h3>전체 게시글</h3>
	</div>
	<div id="communityList" class="tab-content">
		
		<!-- 필터링 영역 -->
		<div class="filter-section-1" id="status-filter">
			<div class="date-group">
				<div class="filter-title">작성일</div>
				<label><input type="date" id="start-date">부터</label> <label><input
					type="date" id="end-date">까지</label>
				
			</div>
		</div>
		
		<div class="cate-group" >
			<div class="filter-title">카테고리 </div>
				<select id="category-filter">			
				
				<option value="0">선택</option>
				<option value="1">육아꿀팁</option>
				<option value="2">내새꾸자랑</option>
				<option value="3">펫테리어</option>
				<option value="4">펫션쇼</option>
				<option value="5">집사일기</option>
				<option value="6">육아질문</option>
				<option value="7">입양</option>
				
				</select>
			</div>
		
		
		<div class="search-group">
			<div class="filter-title">게시글 찾기</div>
			<select id="search-order">
				<option value="all">전체</option>
				<!-- '전체' 옵션 -->
				<option value="title">제목</option>
				<option value="user_name">작성자</option>
				
			</select> <label><input type="text" name="search-filter" value=""
				id="search-filter"></label> <input type="button" value="검색"
				class="btn-style" id="searchBtn" />
		</div>

		<!-- 리스트 영역 -->
		<div class="product-list-container">
			<table class="product-list">
				<thead class="thead">
					<tr>
						<th><input type="checkbox" id="select-all"></th>
						<th>작성자</th>
						<th>제목</th>
						<th>카테고리</th>
						<th>작성일</th>
						<th>조회수</th>
					</tr>
				</thead>
				<tbody id="product-table-body">
					<!-- 이곳은 AJAX로 데이터가 들어가게 됩니다. -->
				</tbody>
			</table>
		</div>
	</div>
	<div id="community-list"></div>




	<script>
$(document).ready(function() {
    // 검색 버튼 클릭 이벤트 리스너
    $("#searchBtn").click(function() {
        var searchKeyword = $("#search-filter").val().trim();      
        var searchFilterType = $("#search-order").val();
        var searchCategory = $("#category-filter").val();
        var searchStartDate = $("#start-date").val();
        var searchEndDate = $("#end-date").val();

        // 검색 키워드나 카테고리가 비어 있으면 경고
        if (searchKeyword === "" && searchFilterType === "") {
            alert("검색어 또는 카테고리를 선택해주세요.");
            return;
        }

        // AJAX 요청 보내기
        $.ajax({
            url: '/admin/community',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                searchKeyword: searchKeyword,
                searchFilterType : searchFilterType,
                searchCategory : searchCategory,
                searchStartDate : searchStartDate,
                searchEndDate : searchEndDate
            }
			),
            success: function(data) {
                console.log("서버 응답 data:", data); // 서버에서 반환된 전체 데이터를 확인

                // 서버 응답에서 communityList가 배열로 있는지 확인
                var communityList = data.communityList || [];
	
             
                
                // communityList가 배열이고 데이터가 있는지 확인
                if (Array.isArray(communityList) && communityList.length > 0) {
                    // 테이블 본문을 비우고 새로 데이터 추가
                    $("#product-table-body").empty();
                    var rows = '';

                    // 데이터 반복 처리
                    communityList.forEach(function(post) {
                       

                        // 행 추가
                        rows += `<tr>
                                    <td><input type="checkbox" class="select-item"></td>
                                    <td>\${post.mem_name}</td>
                                    <td><a href="/community/contentView?board_no=\${post.board_no}">\${post.board_title}</a></td>
                                    <td>\${post.b_cate_name}</td>
                                    <td>\${post.board_created}</td>
                                    <td>\${post.board_views}</td>
                                  </tr>`;
                    });
                
                    // 테이블에 데이터 추가
                    $("#product-table-body").append(rows);
                   
                } else {
                    // communityList가 없거나 빈 배열일 경우
                    alert("검색 결과가 없습니다.");
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX 요청 실패:", error); // 에러 메시지 출력
                alert("데이터를 불러오는 중 오류가 발생했습니다.");
            }
        });
    });

    // 전체 선택/해제 체크박스
    $("#select-all").click(function() {
        var isChecked = $(this).prop('checked');
        $(".select-item").prop('checked', isChecked);
    });
});
</script>

</body>
</html>