package com.tech.petfriends.mypage.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyReviewDto {
	private String cart_code;
	private String pro_code;
    private String pro_name;
    private String proopt_name;
    private String main_img1;
    
    private String mem_code;
    private String review_code;
    private int review_rating;
    private String review_text;
    private String review_img1;
    private String review_img2;
    private String review_img3;
    private String review_img4;
    private String review_img5;
    private Date review_date;
}