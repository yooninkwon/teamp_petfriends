package com.tech.petfriends.admin.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CouponDto {
	private int cp_no;
	private String mc_code;
	private String cp_name;
	private String cp_keyword;
	private String cp_kind;
	private int g_no;
	private Date cp_start;
	private Date cp_end;
	private Date cp_dead;
	private String cp_type;
	private int cp_amount;
	
    private int issueCount;
    private int totalUsage;
}
