package com.tech.petfriends.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDetailProDto {
	private String pro_code;
	private String pro_name;
	private String pro_pets;
	private String pro_type;
	private String pro_category;
	private String pro_filter1;
	private String pro_filter2;
	private int pro_discount;
	private String pro_onoff;
}
