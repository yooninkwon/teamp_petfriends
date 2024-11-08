<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항 작성</title>
<link rel="stylesheet" href="/static/css/notice/notice_writeview.css">
<script src="https://cdn.ckeditor.com/4.21.0/standard/ckeditor.js"></script>
</head>
<body>
<div class="container">
    <h3>신규등록</h3>

    <form id="postForm" action="notice_write_service" method="post" enctype="multipart/form-data" class="write-form">

        <div id="input-group">
        	<label for="">카테고리</label> <br />
	        <select id="category" name="category" required onchange="toggleEventGroup()">
	            <option value="공지사항">공지사항</option>
	            <option value="이벤트">이벤트</option>
	        </select>
        </div>
        
        <div id="event-group" style="display: none;">
        	<label for="">이벤트 설정</label> <br />
        	<div id="event-date">
        		<label for="">시작날짜</label>
		        <input type="date" name="startDate" value="" />
		        <label for="">종료날짜</label>
		        <input type="date" name="endDate" value="" />
        	</div>
	        <div id="event-file">
	        	<label for="">메인이미지 <span style="font-size: 14px;">(850 * 350)</span></label>
		        <input type="file" name="thumbnail" />
		        <label for="">슬라이드 이미지 <span style="font-size: 14px;">(700 * 400)</span></label>
		        <input type="file" name="slideImg"/>
	        </div>
        </div>
        
        <div id="input-group">
        	<label for="">공개여부</label> <br />
        	<select id="notice_show" name="notice_show" required>
	            <option value="Y">공개</option>
	            <option value="N">비공개</option>
	        </select>
        </div>

        <div id="input-group">
        	<label for="">제목</label> <br />
	        <input type="text" id="notice_title" name="notice_title" placeholder="제목을 입력하세요" required>
        </div>
        
        <div id="content-group">
        	<label for="">내용</label>
        	<textarea id="notice_content" name="notice_content" placeholder="내용을 입력하세요" required></textarea>
        </div>
        

        <input type="button" id="submitBtn" value="내용 미리보기">
        <input type="submit" id="submitBtn" value="작성 완료">
    </form>

    <!-- 미리보기 팝업 -->
    <div id="previewPopup" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); justify-content: center; align-items: center;">
        <div class="popup-content" style="background: white; padding: 20px; border-radius: 5px;">
            <h4>미리보기</h4>
            <div id="preview" class="preview-area"></div>
            <input type="button" id="closePreview" class="btn" value="닫기">
        </div>
    </div>
</div>

<script>
//CKEditor 초기화
CKEDITOR.replace('notice_content', {
    height: 700,
    on: {
        instanceReady: function() {
            this.dataProcessor.htmlFilter.addRules({
                elements: {
                    img: function(el) {
                        el.attributes.style = 'width:auto;height:auto;';
                        return el;
                    }
                }
            });
        }
    }
});

// 카테고리에 따라 이벤트 설정 보이기/숨기기
function toggleEventGroup() {
    var category = document.getElementById('category').value;
    var eventGroup = document.getElementById('event-group');
    if (category === '이벤트') {
        eventGroup.style.display = 'block';
    } else {
        eventGroup.style.display = 'none';
    }
}

</script>
</body>
</html>