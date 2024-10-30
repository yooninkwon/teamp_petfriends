package com.tech.petfriends.helppetf.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PethotelMemDataDto {
	private String hph_reserve_no;
	private String mem_code;
	private String mem_nick;
	private String hph_numof_pet;
	private Date hph_start_date;
	private Date hph_end_date;
	private String hph_approval_date;
	private String hph_status;
	private String hph_refusal_reason;
}
