package com.tech.petfriends.community.dto;

import java.sql.Date;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Service
@Getter
public class CCommentDto {
	private int comment_no;
	private int board_no;
	private String user_id;
	private String  comment_content;
	private Date created_date;
	private int parent_comment_no;
	private int comment_level;
	private int comment_order_no; 
	private Date edited_date;
	private String mem_code;
	
	private String pet_img;
	
}
