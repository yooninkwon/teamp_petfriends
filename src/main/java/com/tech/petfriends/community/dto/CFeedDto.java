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
public class CFeedDto {
	
	private int feed_no;
	private String mem_code;
	private int board_no;
	private String user_id;
}
