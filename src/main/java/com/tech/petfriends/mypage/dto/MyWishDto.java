package com.tech.petfriends.mypage.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyWishDto {
	private int buy_count;
	private String pro_code;
    private String pro_name;
    private int min_price;
    private int review_avg;
    private int review_count;
    private String main_img1;
}
