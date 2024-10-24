package com.tech.petfriends.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.MemberCouponDto;
import com.tech.petfriends.mypage.dto.CouponDto;

@Mapper
public interface CouponDao {

	List<CouponDto> getAllCoupons(String status, String type, String sort);

	List<MemberCouponDto> getMemberCoupons(String status, String searchOrder, String startDate, String endDate, String memberCode,
			String couponCode, String orderCode);
	
}
