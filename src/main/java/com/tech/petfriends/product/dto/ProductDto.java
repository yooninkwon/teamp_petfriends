package com.tech.petfriends.product.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDto {
	private String pro_code;
	private String pro_name;
	private String pro_pets;
	private String pro_type;
	private String pro_category;
	private String pro_filter1;
	private String pro_filter2;
	private int pro_discount;
	private Date pro_date;
	private String pro_onoff;
}
