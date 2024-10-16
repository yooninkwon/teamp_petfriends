package com.tech.petfriends.community.mapper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import com.tech.petfriends.community.dto.CDto;

public class CDao {
	Connection conn= null;
	PreparedStatement pstmt = null;
	ResultSet rs = null;
	
    public ArrayList<CDto> getPostList() {
    	ArrayList<CDto> postList = new ArrayList<>();
        String sql = "SELECT * FROM BOARD ORDER BY BOARD_CREATED DESC"; // 최신 게시글 순으로 정렬

        try {
           
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                CDto dto = new CDto();
                dto.setBoardNo(rs.getInt("BOARD_NO"));
                dto.setBCateNo2(rs.getInt("B_CATE_NO2"));
                dto.setUNo(rs.getInt("u_no"));
                dto.setUserId(rs.getString("USER_ID"));
                dto.setBoardTitle(rs.getString("BOARD_TITLE"));
                dto.setBoardPassword(rs.getInt("BOARD_PASSWORD"));
                dto.setBoardContent(rs.getString("BOARD_CONTENT"));
                dto.setBoardCreated(rs.getTimestamp("BOARD_CREATED"));
                dto.setBoardModified(rs.getTimestamp("BOARD_MODIFIED"));
                dto.setBoardViews(rs.getInt("BOARD_VIEWS"));
                dto.setBoardTag(rs.getString("BOARD_TAG"));
                dto.setBoardFile(rs.getString("BOARD_FILE"));
                dto.setBoardLikes(rs.getInt("BOARD_LIKES"));
                dto.setBoardCommentCount(rs.getInt("BOARD_COMMENT_COUNT"));

                postList.add(dto);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return postList;
    }
	
}
