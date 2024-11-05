package com.tech.petfriends.mypage.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyCartDto {
	private String main_img1;
	private String pro_name;
	private String proopt_name;
	private int proopt_price;
	private int pro_discount;
	private int proopt_finalprice;
	private int cart_cnt;
	private int proopt_stock;
	private String cart_code;
}
