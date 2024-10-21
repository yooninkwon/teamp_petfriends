package com.tech.petfriends.community.dto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CDto {
	

    private int board_no;
    private int b_cate_no;
    private int u_no;
    private String user_id;
    private String board_title;
    private int board_password;
    private String board_content;
    private Timestamp board_created;
    private Timestamp board_modified;
    private int board_views;
    private String board_tag;
    private String board_post_img;
    private Integer board_likes;
    private Integer board_comment_count;
	private String board_post_unimg;
	
	private int rebno;
	private String corgfile;
	private String cchgfile;
	


}



