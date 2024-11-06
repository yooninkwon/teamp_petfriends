package com.tech.petfriends.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductListViewDto {
	private String pro_code;
	private String pro_name;
	private String pro_pets;
	private String pro_type;
	private String pro_category;
	private String main_img1;
	private int proopt_finalprice;
	private int proopt_price;
	private int pro_discount;
	private String pro_onoff;
	private double average_rating;
	private int total_reviews;
	private double score;
}
