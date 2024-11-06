<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항 수정</title>
<link rel="stylesheet" href="/static/css/notice/notice_writeview.css">
<script src="https://cdn.ckeditor.com/4.21.0/standard/ckeditor.js"></script>
</head>
<body>
<div class="container">
    <h3>공지사항 수정</h3>

    <form id="postForm" action="event_edit_service" method="post" enctype="multipart/form-data" class="write-form">
        <input type="hidden" name="eventId" value="${event.event_no}"/>

        <div id="input-group">
        	<label for="">카테고리</label> <br />
	        <select id="category" name="category" required onchange="toggleEventGroup()" disabled>
	            <option value="공지사항">이벤트</option>
	        </select>
        </div>
        
        <div id="event-group">
        	<label for="">이벤트 설정</label> <br />
        	<div id="event-date">
        		<label for="">시작날짜</label>
		        <input type="date" name="startDate" value="${formattedStartDate}" />
		        <label for="">종료날짜</label>
		        <input type="date" name="endDate" value="${formattedEndDate}" />
        	</div>
	        <div id="event-file">
	        	<label>현재 메인 이미지:</label>
				<span id="currentThumbnail">${event.event_thumbnail}</span> ||
				<label>현재 슬라이드 이미지:</label>
				<span id="currentSlideImg">${event.event_slideimg}</span> <br />
	        	<label for="">메인이미지 <span style="font-size: 14px;">(700 * 400)</span></label>
		        <input type="file" name="thumbnail" id="thumbnailInput" />
		        <label for="">슬라이드 이미지 <span style="font-size: 14px;">(700 * 400)</span></label>
		        <input type="file" name="slideImg"/>
	        </div>
        </div>
       
        <div id="input-group">
        	<label for="">공개여부</label> <br />
        	<select id="notice_show" name="notice_show" required>
	            <option value="Y" ${event.event_show == 'Y' ? 'selected' : ''}>공개</option>
	            <option value="N" ${event.event_show == 'N' ? 'selected' : ''}>비공개</option>
	        </select>
        </div>

        <div id="input-group">
        	<label for="">제목</label> <br />
	        <input type="text" id="notice_title" name="notice_title" value="${event.event_title}" required>
        </div>
        
        <div id="content-group">
        	<label for="">내용</label>
        	<textarea id="notice_content" name="notice_content" required>${event.event_content}</textarea>
        </div>

        <input type="submit" id="submitBtn" value="수정 완료">
    </form>
</div>

<script>
// CKEditor 초기화
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
document.getElementById('thumbnailInput').addEventListener('change', function() {
    const fileName = this.files[0]?.name || "파일이 선택되지 않았습니다.";
    document.getElementById('currentThumbnail').textContent = fileName;
});
document.getElementById('slideImgInput').addEventListener('change', function() {
    const fileName = this.files[0]?.name || "파일이 선택되지 않았습니다.";
    document.getElementById('currentSlideImg').textContent = fileName;
});

</script>
</body>
</html>