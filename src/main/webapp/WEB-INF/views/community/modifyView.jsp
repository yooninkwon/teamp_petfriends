<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>게시글 수정</title>
    <jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/community/community_writeview.css">
    <script src="https://cdn.ckeditor.com/4.21.0/standard/ckeditor.js"></script>
</head>
<body>

<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

<div class="container">
    <h3>게시글 수정</h3>

    <form id="postForm" action="${pageContext.request.contextPath}/community/modify" method="post" enctype="multipart/form-data" class="write-form" onsubmit="return validateForm()">
        <input type="hidden" name="board_no" value="${contentView.board_no}"> <!-- 게시글 번호 -->
        <input type="hidden" name="u_no" value="${contentView.u_no}"> <!-- 사용자 번호 -->
        
        <label for="user_id">이름</label>
        <input type="text" id="user_id" name="user_id" value="${contentView.user_id}" readonly required>
		
        <label for="b_cate_no">카테고리</label>
        <select id="b_cate_no" name="b_cate_no" required>
            <option value="">카테고리를 선택하세요</option> <!-- 기본 선택지 -->
            <c:forEach var="category" items="${categoryList}">
                <option value="${category.b_cate_no}" <c:if test="${category.b_cate_no == contentView.b_cate_no}">selected</c:if>>${category.b_cate_name}</option>
            </c:forEach>
        </select>
		
		<label for="file" class="image-label">사진 업로드</label>
		<input type="file" id="file" name="file" multiple accept="image/*">
		
        <label for="board_title">제목</label>
        <input type="text" id="board_title" name="board_title" value="${contentView.board_title}" placeholder="제목을 입력하세요" required>

        <label for="board_content">내용</label>
        <textarea id="board_content" name="board_content" placeholder="내용을 입력하세요" required>${contentView.board_content}</textarea>
		
        <label for="chrepfile">대표 이미지 업로드</label>
        <input type="file" id="chrepfile" name="chrepfile" accept="image/*" onchange="showPreview(event)">
        <div id="newImagePreview" class="post-image" style="margin-top: 10px;"></div>

        <label>현재 대표 이미지</label>
        <div class="post-image">
            <img src="${pageContext.request.contextPath}/static/images/community_img/${contentView.cchgfile}" alt="현재 이미지" style="max-width: 100%; height: auto;">
        </div>
        
        <!-- 수정된 부분: 현재 이미지 이름을 저장하는 히든 필드 추가 -->
        <input type="hidden" name="current_image_name" value="${contentView.cchgfile}"> <!-- 현재 이미지 파일 이름 저장 -->
        
        <input type="button" id="previewButton" class="btn submit-btn" value="내용 미리보기">
        <input type="submit" id="submit-btn" class="btn submit-btn" value="수정 완료">
    </form>

    <!-- 미리보기 팝업 -->
    <div id="previewPopup" style="display:none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); justify-content: center; align-items: center;">
        <div class="popup-content" style="background: white; padding: 20px; border-radius: 5px;">
            <h4>미리보기</h4>
            <div id="preview" class="preview-area"></div>
            <input type="button" id="closePreview" class="btn" value="닫기">
        </div>
    </div>
</div>

<script>
    // CKEditor 초기화
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

    // 파일 업로드 이벤트 리스너 추가
    document.getElementById('file').addEventListener('change', function(event) {
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = '<img src="' + e.target.result + '" style="max-width:100%; max-height:400px; width:auto; height:auto;">';
                CKEDITOR.instances.board_content.insertHtml(img); 
            };

            reader.readAsDataURL(file); 
        }
    });
    
    // 새 이미지 미리보기 함수
    function showPreview(event) {
        const previewContainer = document.getElementById('newImagePreview');
        previewContainer.innerHTML = ''; // 기존 미리보기 초기화

        const files = event.target.files; // 선택한 파일들
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result; // 파일 내용
                img.style.maxWidth = '100%'; // 최대 너비
                img.style.height = 'auto'; // 자동 높이
                previewContainer.appendChild(img); // 미리보기 영역에 이미지 추가
            }

            reader.readAsDataURL(file); // 파일 읽기
        }
    }

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

    // 폼 유효성 검사 함수
    function validateForm() {
        var imageInput = document.getElementById("file").value;
        if (imageInput === "") {
            alert("새 이미지를 선택하세요.");
            return false; // 폼 제출 방지
        }
        return true; // 폼 제출 허용
    }
</script>

<footer>
    <jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</footer>
</body>
</html>