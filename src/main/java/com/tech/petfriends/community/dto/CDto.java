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
    private String mem_code;
    private String user_id;
    private String board_title;
    private int board_password;
    private String board_content;
    private Timestamp board_created;
    private Timestamp board_modified;
    private int board_views;
    private String board_tag;
    private int board_likes;
    private int board_comment_count;

	
//    RE_CBOARD_IMAGE 테이블
	private int rebno;
	private String corgfile; // 일반 이미지 원본 파일 이름
	private String cchgfile; // 일반 이미지 변경 파일 이름
	private String orepfile; // 대표 이미지 원본 파일 이름
	private String chrepfile; // 대표 이미지변경 파일 이름

	// member_pet  테이블
	private String pet_img;
	private String pet_main;

}



