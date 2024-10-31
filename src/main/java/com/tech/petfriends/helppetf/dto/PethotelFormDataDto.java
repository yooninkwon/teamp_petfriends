package com.tech.petfriends.helppetf.dto;

import lombok.Getter;

@Getter
public class PethotelFormDataDto {
	private String hph_reserve_no;
	private String hphp_reserve_pet_no;
	private String hphp_pet_name;
	private String hphp_pet_type;
	private String hphp_pet_birth;
	private String hphp_pet_gender;
	private String hphp_pet_weight;
	private String hphp_pet_neut;
	private String hphp_comment;
	
	public void setHph_reserve_no(String hph_reserve_no) {
		this.hph_reserve_no = hph_reserve_no;
	}

	public void setHphp_reserve_pet_no(String hphp_reserve_pet_no) {
		this.hphp_reserve_pet_no = hphp_reserve_pet_no;
	}

	public void setHphp_pet_name(String hphp_pet_name) {
		this.hphp_pet_name = hphp_pet_name;
	}

	public void setHphp_pet_type(String hphp_pet_type) {
		this.hphp_pet_type = hphp_pet_type;
	}

	public void setHphp_pet_birth(String hphp_pet_birth) {
		String substr_pet_birth_date = hphp_pet_birth.substring(0, 10);
		this.hphp_pet_birth = substr_pet_birth_date;
	}

	public void setHphp_pet_gender(String hphp_pet_gender) {
		this.hphp_pet_gender = hphp_pet_gender;
	}

	public void setHphp_pet_weight(String hphp_pet_weight) {
		this.hphp_pet_weight = hphp_pet_weight;
	}

	public void setHphp_pet_neut(String hphp_pet_neut) {
		this.hphp_pet_neut = hphp_pet_neut;
	}

	public void setHphp_comment(String hphp_comment) {
		this.hphp_comment = hphp_comment;
	}
	
}
