package com.tech.petfriends.product.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductListViewDto {
	private String pro_code;
	private String pro_name;
	private String main_img1;
	private int proopt_finalprice;
	private int proopt_price;
	private int pro_discount;
	private String pro_onoff;
	
	//private int 리뷰갯수
	//private int 평균별점
}
