<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>게시글 수정</title>
    <jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
    <link rel="stylesheet" href="/static/css/community/community_writeview.css">
    <script src="https://cdn.ckeditor.com/4.21.0/standard/ckeditor.js"></script>
</head>
<body>

<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

<div class="container">
    <h3>게시글 수정</h3>

    <form id="postForm" action="${pageContext.request.contextPath}/community/modify" method="post" enctype="multipart/form-data" class="write-form" onsubmit="return validateForm()">
        <input type="hidden" name="board_no" value="${contentView.board_no}"> <!-- 게시글 번호 -->
        <input type="hidden" name="u_no" value="${contentView.u_no}"> <!-- 사용자 번호 -->
        

      	       <!-- 추가된 부분: 게시글 생성 및 수정 시간 -->
        <input type="hidden" name="board_created" value="${contentView.board_created}">
        <input type="hidden" name="board_modified" value="${contentView.board_modified}">
  
      
        <label for="user_id">이름</label>
        <input type="text" id="user_id" name="user_id" value="${contentView.user_id}" readonly required>
		
		<label for="b_cate_no">카테고리</label>
		<select id="b_cate_no" name="b_cate_no" required>
		    <option value="">카테고리를 선택하세요</option> <!-- 기본 선택지 -->
		    <c:forEach var="category" items="${categoryList}">
		        <option value="${category.b_cate_no}" <c:if test="${category.b_cate_no == contentView.b_cate_no}">selected</c:if>>${category.b_cate_name}</option>
		    </c:forEach>
		</select>
		
        <label for="board_title">제목</label>
        <input type="text" id="board_title" name="board_title" value="${contentView.board_title}" placeholder="제목을 입력하세요" required>

        <label for="board_content">내용</label>
        <textarea id="board_content" name="board_content" placeholder="내용을 입력하세요" required>${contentView.board_content}</textarea>
		
		
        <div class="post-image">
            <label>현재 이미지:</label>
           	<br>
            <img src="${pageContext.request.contextPath}/static/images/community_img/${contentView.cchgfile}" alt="현재 이미지" style="max-width: 100%; height: auto;">
            <br>
            <label for="newImage">새 이미지 업로드:</label>
            <input type="file" id="file" name="cchgfile" multiple>
        </div>

        <input type="button" id="previewButton" class="btn submit-btn" value="내용 미리보기">
        <input type="submit" id="submit-btn" class="btn submit-btn" value="수정 완료">
    </form>

    <!-- 미리보기 팝업 -->
    <div id="previewPopup" style="display:none;">
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
        height: 700,
        on: {
            instanceReady: function() {
                this.dataProcessor.htmlFilter.addRules({
                    elements: {
                        img: function(el) {
                            // 이미지의 최대 크기를 설정
                            el.attributes.style = 'max-width:1000px;max-height:400px;width:auto;height:auto;';
                            return el;
                        }
                    }
                });
            }
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

    // 폼 유효성 검사 함수
    function validateForm() {
        var imageInput = document.getElementById("file").value;
        if (imageInput === "") {
            alert("이미지를 넣으시오");
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