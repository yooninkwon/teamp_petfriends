<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>contentView</title>
    <jsp:include page="/WEB-INF/views/include_jsp/include_css_js.jsp" />
    <link rel="stylesheet" href="/static/css/community/community_contentview.css">
</head>
<body>

<jsp:include page="/WEB-INF/views/include_jsp/header.jsp" />

     <div class="container">
        <h1 class="post-title">${contentView.board_title}</h1> <!-- 클래스 추가 -->
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
            <span>💬 ${contentView.board_comment_count}</span>
         </div>
         
          <div class="edit-delete-buttons">
                   <form action="/community/modifyView" method="get">
                    <input type="hidden" name="board_no" value="${contentView.board_no}">
                    <button type="submit" class="edit-button">수정</button>
                </form>
                <a href="/community/delete?board_no=${contentView.board_no}" class="delete-button" 
                   onclick="return confirm('정말 삭제하시겠습니까?')">삭제</a>
            </div>
        
        

        
        </div>
    </div>

<footer>
<jsp:include page="/WEB-INF/views/include_jsp/footer.jsp" />
</footer>
</body>
</html>