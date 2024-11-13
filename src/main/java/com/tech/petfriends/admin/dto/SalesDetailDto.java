package com.tech.petfriends.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SalesDetailDto {
	private String order_date;
	private int completed_count;
	private int cancelled_count;
	private int total_coupon;
	private int total_point;
	private int total_amount;
	private int cancel_amount;
	private int net_amount;
}
