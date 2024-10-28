package com.tech.petfriends.admin.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductListDto {
	private String pro_code;
	private String pro_name;
	private String pro_pets;
	private String pro_type;
	private String pro_category;
	private String pro_onoff;
	private Date pro_date;
}
