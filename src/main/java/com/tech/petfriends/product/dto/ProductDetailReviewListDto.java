package com.tech.petfriends.product.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductDetailReviewListDto {
	private String pet_img; //펫사진 pet
	private String pet_name;   //펫네임 pet
	private int	review_rating; //후기점수 review
	private String review_img1; //후기사진 review
	private String review_img2; //후기사진 review
	private String review_img3; //후기사진 review
	private String review_img4; //후기사진 review
	private String review_img5; //후기사진 review
	private String review_text; //후기내용 review
	private Date review_date; //후기작성일자 review
}
