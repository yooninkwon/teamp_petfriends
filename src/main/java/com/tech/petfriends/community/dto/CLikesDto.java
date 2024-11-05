package com.tech.petfriends.community.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CLikesDto {

	private int like_id;
	private int board_no;
	private String user_id;
	private Date created_date;
	private String mem_code;

}
