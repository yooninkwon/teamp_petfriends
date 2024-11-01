package com.tech.petfriends.helppetf.dto;

import lombok.Getter;


@Getter
public class PethotelMemDataDto {
	private String hph_reserve_no;
	private String mem_code;
	private String mem_nick;
	private String hph_numof_pet;
	private String hph_start_date;
	private String hph_end_date;
	private String hph_approval_date;
	private String hph_status;
	private String hph_refusal_reason;
	private String hph_rge_date;

	public void setHph_reserve_no(String hph_reserve_no) {
		this.hph_reserve_no = hph_reserve_no;
	}

	public void setMem_code(String mem_code) {
		this.mem_code = mem_code;
	}

	public void setMem_nick(String mem_nick) {
		this.mem_nick = mem_nick;
	}

	public void setHph_numof_pet(String hph_numof_pet) {
		this.hph_numof_pet = hph_numof_pet;
	}

	public void setHph_start_date(String hph_start_date) {
		String substr_start_date = hph_start_date.substring(0, 10);
		this.hph_start_date = substr_start_date;
	}

	public void setHph_end_date(String hph_end_date) {
		String substr_end_date = hph_end_date.substring(0, 10);
		this.hph_end_date = substr_end_date;
	}

	public void setHph_rge_date(String hph_rge_date) {
		String substr_rge_date = hph_rge_date.substring(0, 10);
		this.hph_rge_date = substr_rge_date;
	}

	public void setHph_approval_date(String hph_approval_date) {
		String substr_approval_date = hph_approval_date.substring(0, 10);
		this.hph_approval_date = substr_approval_date;
	}

	public void setHph_status(String hph_status) {
		this.hph_status = hph_status;
	}

	public void setHph_refusal_reason(String hph_refusal_reason) {
		this.hph_refusal_reason = hph_refusal_reason;
	}
	
}
