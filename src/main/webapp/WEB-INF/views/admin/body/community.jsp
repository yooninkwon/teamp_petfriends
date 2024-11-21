<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<script src="/static/js/admin/community.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.1/xlsx.full.min.js"></script> <!-- SheetJS 추가 -->

<link rel="stylesheet" href="/static/css/admin/community.css">


<title>community_body</title>
</head>


<script>
    $(document).ready(function() {
        // 탭 클릭 시 내용 전환
        $('.tab-btn').click(function() {
            var targetTab = $(this).data('tab');

            // 활성화된 탭과 콘텐츠를 비활성화
            $('.tab-btn').removeClass('active');
            $('.tab-content').removeClass('active');

            // 클릭한 탭과 관련된 콘텐츠 활성화
            $(this).addClass('active');
            $('#' + targetTab).addClass('active');
        });
    });
</script>

<body>
    <div class="title">
        <h3>COMMUNITY</h3>
    </div>

    <!-- 탭 영역 -->
    <div class="tab-section">
        <button class="tab-btn active" data-tab="communityList">전체 게시글</button>
        <button class="tab-btn" data-tab="boardReport">신고현황</button>
    </div>

    <div id="communityList" class="tab-content active">
        <!-- 필터링 영역 -->
        <div class="filter-section-1" id="status-filter">
            <div class="date-group">
                <div class="filter-title">작성일</div>            
                <label><input type="date" id="start-date">부터</label> <label><input type="date" id="end-date">까지</label>            
                <button type="button" id="reset-date" class="btn-style">초기화</button>
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
                <option value="title">제목</option>
                <option value="user_name">작성자</option>
            </select> 
            <label><input type="text" name="search-filter" value="" id="search-filter"></label> 
            <input type="button" value="검색" class="btn-style" id="searchBtn" />
            <input type="button" value="엑셀 다운로드" class="btn-style" id="downloadBtn" />
        </div>

        <!-- 리스트 영역 -->
        <div class="community-list-container">
            <table class="community-list">
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
                <tbody id="community-table-body">
                    <!-- 이곳은 AJAX로 데이터가 들어가게 됩니다. -->
                </tbody>
            </table>
        </div>

        <div id="pagination">
            <!-- 페이징 -->
        </div>
    </div>

    <!-- 신고현황 탭 콘텐츠 -->
    <div id="boardReport" class="tab-content">
        <!-- 신고현황 관련 내용 -->
        <div class="report-section">
            <!-- 필터링 영역 -->
            <div class="filter-section-1" id="report-status-filter">
                <div class="date-group">
                    <div class="filter-title">신고일</div>            
                    <label><input type="date" id="report-start-date">부터</label> 
                    <label><input type="date" id="report-end-date">까지</label>            
                    <button type="button" id="report-reset-date" class="btn-style">초기화</button>
                </div>
            </div>        

            <div class="cate-group">
                <div class="filter-title">종류</div>
                <select id="report-category-filter">            
                    <option value="0">선택</option>
                    <option value="1">게시판</option>
                    <option value="2">댓글</option>
                    <option value="3">채팅</option>
                </select>
            </div>

            <div class="search-group">
                <div class="filter-title">신고 내용 찾기</div>
                <select id="report-search-order">
                    <option value="all">전체</option>
                    <option value="user_name">작성자</option>
                    <option value="reporter">신고자</option>
              
                
                </select> 
                <label><input type="text" name="report-search-filter" value="" id="report-search-filter"></label> 
                <input type="button" value="검색" class="btn-style" id="report-searchBtn" />
                <input type="button" value="엑셀 다운로드" class="btn-style" id="report-downloadBtn" />
                <input type="button" value="처리/미처리" class="btn-style" id="report-statusBtn" />
            </div>

            <!-- 리스트 영역 -->
            <div class="community-list-container">
                <table class="community-list">
                    <thead class="thead">
                        <tr>
                            <th><input type="checkbox" id="report-select-all"></th>
                            <th>작성자</th>
                            <th>신고사유</th>
                            <th>종류</th>
                            <th>신고자</th>
                            <th>신고일</th>
                            <th>처리</th>
                        </tr>
                    </thead>
                    <tbody id="report-community-table-body">
                        <!-- 이곳은 AJAX로 데이터가 들어가게 됩니다. -->
                    </tbody>
                </table>
            </div>

			<!-- 팝업창 -->
			<div id="report-detail-popup" class="popup" style="display: none;">
			    <div class="popup-content">
			        <span class="popup-close" id="popup-close">&times;</span>
			        <h2>신고 상세 정보</h2>
			        			        
			        <p><strong>작성자:</strong> <span id="popup-mem-name"></span></p>			        
			        <p><strong>회원코드:</strong> <span id="popup-mem-code"></span></p>			        
					<p><strong>신고타입:</strong> <span id="popup-report-type"></span></p>
					<p><strong>신고자:</strong> <span id="popup-reporter-id"></span></p>
			        <p><strong>신고사유:</strong> <span id="popup-reason"></span></p>
			        <p><strong>신고일:</strong> <span id="popup-report-date"></span></p>
			        <p><strong>상태:</strong> <span id="popup-status"></span></p>
			    
					<button id="go-to-post" class="go-to-post-btn">게시글로 이동</button>   
			    </div>
			</div>
			
            <div id="report-pagination">
                <!-- 페이징 -->
            </div>
       
			
		 </div>
    </div>
</body>
</html>