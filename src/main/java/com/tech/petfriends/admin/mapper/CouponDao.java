package com.tech.petfriends.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.mypage.dto.CouponDto;

@Mapper
public interface CouponDao {

	List<CouponDto> getAllCoupons(String status, String type, String sort);
	
}
