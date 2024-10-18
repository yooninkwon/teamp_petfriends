<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>글쓰기</title>
    <jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
    <link rel="stylesheet" href="/static/css/community/community_writeview.css">
    <script src="https://cdn.ckeditor.com/4.21.0/standard/ckeditor.js"></script>
</head>
<body>

<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

<div class="container">
    <h3>글쓰기</h3>

    <form action="${pageContext.request.contextPath}/community/write" method="post" enctype="multipart/form-data" class="write-form">
        <label for="user_id">이름</label>
        <input type="text" id="user_id" name="user_id" placeholder="이름을 입력하세요" required>

        <label for="board_title">제목</label>
        <input type="text" id="board_title" name="board_title" placeholder="제목을 입력하세요" required>

        <label for="board_content">내용</label>
        <textarea id="board_content" name="board_content" placeholder="내용을 입력하세요" required></textarea>

        <label for="file"></label>
        <input type="file" id="file" name="file" multiple>

        <input type="button" id="previewButton" class="btn submit-btn" value="내용 미리보기">
        <input type="submit" id="submit-btn" class="btn submit-btn" value="작성 완료">
    </form>

    <!-- 미리보기 팝업 -->
    <div id="previewPopup">
        <div class="popup-content">
            <h4>미리보기</h4>
            <div id="preview" class="preview-area"></div>
            <input type="button" id="closePreview" class="btn" value="닫기">
        </div>
    </div>
</div>

<script>
    // CKEditor 초기화
    CKEDITOR.replace('board_content', {
        
    	filebrowserUploadUrl: '/community/upload',
        filebrowserUploadMethod: 'form',
        filebrowserImageUploadUrl: '/community/upload',
        filebrowserFlashUploadUrl: '/community/upload',
        height: 700,
        on: {
            instanceReady: function() {
                this.dataProcessor.htmlFilter.addRules({
                    elements: {
                        img: function(el) {
                            // 이미지의 최대 크기를 설정 (여기서는 800x600으로 제한)
                            el.attributes.style = 'max-width:1000px;max-height:400px;width:auto;height:auto;';
                            return el;
                        }
                    }
                });
            }
        }
    });

    // 파일 업로드 이벤트 리스너 추가
    document.getElementById('file').addEventListener('change', function(event) {
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = '<img src="' + e.target.result + '" style="max-width: 100%;">';
                CKEDITOR.instances.board_content.insertHtml(img); // CKEditor의 내용에 이미지 삽입
            };

            reader.readAsDataURL(file); // 파일을 Data URL로 읽음
        }
    });

    // 미리보기 버튼 클릭 시 팝업 열기
    document.getElementById('previewButton').addEventListener('click', function() {
        const previewContent = CKEDITOR.instances.board_content.getData();
        document.getElementById('preview').innerHTML = previewContent; // CKEditor 내용 미리보기
        document.getElementById('previewPopup').style.display = 'flex'; // 팝업 열기
    });

    // 닫기 버튼 클릭 시 팝업 닫기
    document.getElementById('closePreview').addEventListener('click', function() {
        document.getElementById('previewPopup').style.display = 'none'; // 팝업 닫기
    });
</script>

<footer>
<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</footer>
</body>
</html>