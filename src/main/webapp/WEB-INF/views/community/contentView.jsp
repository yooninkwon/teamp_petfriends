<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>contentView</title>
    <jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
    <link rel="stylesheet" href="/static/css/community/community_contentview.css">
    <script>
        function toggleComments() {
            var commentsSection = document.getElementById("commentsSection");
            commentsSection.style.display = commentsSection.style.display === "none" || commentsSection.style.display === "" ? "block" : "none";
        }

        function toggleReplyForm(commentId) {
            var replyForm = document.getElementById("replyForm-" + commentId);
            replyForm.style.display = replyForm.style.display === "none" || replyForm.style.display === "" ? "block" : "none";
        }
    </script>
</head>
<body>

<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

<div class="container">
    <h1 class="post-title">${contentView.board_title}</h1>
    <div class="post-header">
        <span class="user-name">${contentView.user_id}</span>
        <span class="post-time">${contentView.board_created}</span>
    </div>
    <div class="post-content">
        ${contentView.board_content}
    </div>

    <div class="post-footer">
        <div class="left-buttons">
            <span>❤️ ${contentView.board_likes}</span>
            <span>💬 <button onclick="toggleComments()" class="comment-button">댓글</button> ${contentView.board_comment_count}</span>
        </div>

        <div class="edit-delete-buttons">
            <form action="/community/modifyView" method="get">
                <input type="hidden" name="board_no" value="${contentView.board_no}">
                <button type="submit" class="edit-button">수정</button>
            </form>

            <form action="/community/delete" method="get" onsubmit="return confirm('정말 삭제하시겠습니까?')">
                <input type="hidden" name="board_no" value="${contentView.board_no}">
                <button type="submit" class="delete-button">삭제</button>
            </form>
        </div>
    </div>

    <!-- 댓글 목록 영역 -->
    <div id="commentsSection" class="comment-section" style="display: none;">
        <h3>댓글 목록</h3>
        <c:forEach var="comment" items="${commentList}">
            <div class="comment">
                <span class="user-name">${comment.user_id}</span>: 
                <span class="comment-content preformatted-text">${fn:escapeXml(comment.comment_content)}</span>
                <span class="comment-time">${comment.created_date}</span>
                <button onclick="toggleReplyForm(${comment.comment_no})">댓글</button>

                <div id="replyForm-${comment.comment_no}" class="reply-section" style="display: none;">
                    <form action="/community/comment" method="post">
                        <input type="hidden" name="board_no" value="${contentView.board_no}">
                        <input type="hidden" name="parent_comment_no" value="${comment.comment_no}"> <!-- 부모 댓글 번호 -->
                        <textarea name="comment_content" placeholder="대댓글을 입력하세요..." required></textarea> 
                        <button type="submit">댓글 달기</button>
                    </form>
                </div>
            </div>
        </c:forEach>
        
        <div class="comment-input">
            <form action="/community/comment" method="post">
                <input type="hidden" name="board_no" value="${contentView.board_no}">
                <textarea name="comment_content" placeholder="댓글을 입력하세요..." required></textarea> 
                <button type="submit">댓글 달기</button>
            </form>
        </div>
    </div>
</div>

<footer>
    <jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</footer>
</body>
</html>