package com.tech.petfriends.admin.dto;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ACommunityDto {
	
	private int board_no;
    private int b_cate_no;
    private String mem_code;
    private String user_id;
    private String board_title;
    private int board_password;
    private String board_content;
    private Date board_created;
    private Date board_modified;
    private int board_views;
    private String board_tag;
    private int board_likes;
    private int board_comment_count;
    
   
    private String b_cate_name;
    private String mem_name;
}
