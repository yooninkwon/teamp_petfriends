package com.tech.petfriends.index.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IndexProductDto {
	private String pro_code;
	private String pro_name;
	private String main_img1;
	private int proopt_finalprice;
	private int proopt_price;
	private int pro_discount;
	private String pro_onoff;
	private double average_rating;
	private int total_reviews;
}
