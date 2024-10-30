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
        
        function toggleLike(boardNo, liked) {
            $.ajax({
                url: "/community/updateLike",
                type: "POST",
                data: { board_no: boardNo, liked: liked },
                success: function(updatedLikes) {
                    $("#like-count").text(updatedLikes);
                    $("#like-button").text(liked ? "❤️" : "🤍");
                    $("#like-button").attr("onclick", "toggleLike(" + boardNo + ", " + !liked + ")");
                },
                error: function() {
                    alert("오류가 발생했습니다.");
                }
            });
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
    <!-- 왼쪽 끝에 위치할 댓글 및 좋아요 버튼 -->
    <div class="left-buttons">
        <span>${contentView.board_likes}</span>
        <button id="like-button" onclick="toggleLike(${contentView.board_no}, false)">🤍</button>
       
        <span>💬 <button onclick="toggleComments()" class="main_comment-button">댓글</button> ${contentView.board_comment_count}</span>
    </div>

    <!-- 오른쪽 끝에 위치할 수정 및 삭제 버튼 -->
    <div class="edit-delete-buttons">
        <form action="/community/modifyView" method="get">
            <input type="hidden" name="board_no" value="${contentView.board_no}">
            <button type="submit" class="main_edit-button">수정</button>
        </form>

        <form action="/community/delete" method="post" onsubmit="return confirm('정말 삭제하시겠습니까?')">
            <input type="hidden" name="board_no" value="${contentView.board_no}">
            <button type="submit" class="main_delete-button">삭제</button>
        </form>
    </div>
</div>

    <!-- 댓글 목록 영역 --> 
   
    <div id="commentsSection" class="comment-section" style="display: none;">
        <h3>댓글 목록</h3>
      
      
        
     <c:forEach var="comment" items="${commentList}">
    <div class="comment" style="padding-left: ${comment.comment_order_no * 20}px;"> 
        <span class="user-name">${comment.user_id}</span>: 
        <span class="comment-content preformatted-text">${fn:escapeXml(comment.comment_content)}</span>
        <span class="comment-time">${comment.created_date}</span>
    
    <div class="button-group">
        <button onclick="toggleReplyForm(${comment.comment_no})">댓글</button>

        <!-- 댓글 삭제 버튼: 현재 로그인한 사용자와 댓글 작성자가 같을 경우만 보이기 -->
        <%-- <c:if test="${sessionScope.loggedInUserId == comment.user_id}"> --%>
            <form action="/community/replyDelete" method="post" onsubmit="return confirm('정말 삭제하시겠습니까?')">
                <input type="hidden" name="comment_no" value="${comment.comment_no}">
                <input type="hidden" name="board_no" value="${contentView.board_no}">
				<input type="hidden" name="parent_comment_no" value="${comment.parent_comment_no}">
				<input type="hidden" name="comment_level" value="${comment.comment_level}">
				<input type="hidden" name="comment_order_no" value="${comment.comment_order_no}">
				<button type="submit" class="delete-button">삭제</button>
            </form>
      <%--   </c:if> --%>
 	 </div>
        <!-- 대댓글 입력 폼 -->
        <div id="replyForm-${comment.comment_no}" class="reply-section" style="display: none;">
            <form action="/community/commentReply" method="post">
                <input type="hidden" name="board_no" value="${contentView.board_no}">
                <input type="hidden" name="comment_no" value="${comment.comment_no}">                       
                <input type="hidden" name="parent_comment_no" value="${comment.parent_comment_no}">
                <input type="hidden" name="comment_level" value="${comment.comment_level}">
                <input type="hidden" name="comment_order_no" value="${comment.comment_order_no}">
                <textarea name="comment_content" placeholder="대댓글을 입력하세요..." required></textarea>
                <button type="submit">댓글 달기</button>
            </form>
        </div>

        <!-- 대댓글 리스트 -->
        <c:forEach var="commentReply" items="${commentReplyList}" varStatus="status">
            <c:if test="${commentReply.parent_comment_no == comment.comment_no}">
                <div class="commentReply" style="padding-left: ${(commentReply.comment_order_no) * 50}px;"> 
                    <span class="user-name">${commentReply.user_id}</span>: 
                    <img src="/static/images/community_img/reply.png" alt="Reply Indicator" class="commentReply-indicator">
                    <span class="commentReply-content preformatted-text">${fn:escapeXml(commentReply.comment_content)}</span>
                    <span class="commentReply-time">${commentReply.created_date}</span>
                  
                  <div class="button-group">
                    <button onclick="toggleReplyForm(${commentReply.comment_no})">댓글</button>

                    <!-- 대댓글 삭제 버튼: 현재 로그인한 사용자와 대댓글 작성자가 같을 경우만 보이기 -->
                   <%--  <c:if test="${sessionScope.loggedInUserId == commentReply.user_id}"> --%>
                        <form action="/community/replyDelete" method="post" onsubmit="return confirm('정말 삭제하시겠습니까?')">
                            <input type="hidden" name="comment_no" value="${commentReply.comment_no}">
                            <input type="hidden" name="board_no" value="${contentView.board_no}">
							<input type="hidden" name="parent_comment_no" value="${commentReply.parent_comment_no}">
							<input type="hidden" name="comment_level" value="${commentReply.comment_level}">
							<input type="hidden" name="comment_order_no" value="${commentReply.comment_order_no}">
							<button type="submit" class="delete-button">삭제</button>
                        </form>
                <%--     </c:if> --%>
						</div>
                    <div id="replyForm-${commentReply.comment_no}" class="reply-section" style="display: none;">
                        <form action="/community/commentReply" method="post">
                            <input type="hidden" name="board_no" value="${contentView.board_no}">
                            <input type="hidden" name="comment_no" value="${commentReply.comment_no}">  
                            <input type="hidden" name="parent_comment_no" value="${commentReply.parent_comment_no}">
                            <input type="hidden" name="comment_level" value="${commentReply.comment_level}">
                            <input type="hidden" name="comment_order_no" value="${commentReply.comment_order_no}">
                            <textarea name="comment_content" placeholder="대댓글을 입력하세요..." required></textarea>
                            <button type="submit">댓글 달기</button>
                        </form>
                    </div>
                </div>
            </c:if>
        </c:forEach>
    </div>
</c:forEach>

        <!-- 댓글 작성 폼 -->
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