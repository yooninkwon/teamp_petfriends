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

    <form id="postForm" action="notice_edit_service" method="post" enctype="multipart/form-data" class="write-form">
        <input type="hidden" name="noticeId" value="${notice.notice_no}"/>

        <div id="input-group">
        	<label for="">카테고리</label> <br />
	        <select id="category" name="category" required onchange="toggleEventGroup()" disabled>
	            <option value="공지사항">공지사항</option>
	        </select>
        </div>
       
        <div id="input-group">
        	<label for="">공개여부</label> <br />
        	<select id="notice_show" name="notice_show" required>
	            <option value="Y" ${notice.notice_show == 'Y' ? 'selected' : ''}>공개</option>
	            <option value="N" ${notice.notice_show == 'N' ? 'selected' : ''}>비공개</option>
	        </select>
        </div>

        <div id="input-group">
        	<label for="">제목</label> <br />
	        <input type="text" id="notice_title" name="notice_title" value="${notice.notice_title}" required>
        </div>
        
        <div id="content-group">
        	<label for="">내용</label>
        	<textarea id="notice_content" name="notice_content" required>${notice.notice_content}</textarea>
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
</script>
</body>
</html>