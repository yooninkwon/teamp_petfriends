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

    <form id="postForm" action="notice_write_service" method="post" enctype="multipart/form-data" class="write-form"">

        <label for="b_cate_no">카테고리</label>
        <select id="b_cate_no" name="category" required>
            <option value="공지사항">공지사항</option>
            <option value="이벤트">이벤트</option>
        </select>

        <label for="board_title">제목</label>
        <input type="text" id="board_title" name="notice_title" placeholder="제목을 입력하세요" required>

        <label for="board_content">내용</label>
        <textarea id="board_content" name="notice_content" placeholder="내용을 입력하세요" required></textarea>

        <input type="button" id="previewButton" class="btn submit-btn" value="내용 미리보기">
        <input type="submit" id="submit-btn" class="btn submit-btn" value="작성 완료">
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
CKEDITOR.replace('board_content', {
    height: 700,
    on: {
        instanceReady: function() {
            this.dataProcessor.htmlFilter.addRules({
                elements: {
                    img: function(el) {
                        el.attributes.style = 'max-width:1000px;max-height:400px;width:auto;height:auto;';
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