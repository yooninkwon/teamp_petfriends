package com.tech.petfriends.mypage.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CouponDto {
	private int cp_no;
	private String cp_name;
	private String cp_keyword;
	private Date cp_start;
	private Date cp_end;
	private Date cp_dead;
	private String cp_type;
	private int cp_amount;
	private int g_no;
}
