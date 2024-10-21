package com.tech.petfriends.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDetailReviewRankDto {
	private int total_reviews;
	private double average_rating;
	private int rating_1;
	private int rating_2;
	private int rating_3;
	private int rating_4;
	private int rating_5;
}
