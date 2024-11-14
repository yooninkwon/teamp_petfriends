package com.tech.petfriends.login.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPointsDto {
	private int point_no;
	private String mem_code;
	private String o_code;
	private int points;
	private char point_type;
	private Date point_date;
	private String point_info;
}
