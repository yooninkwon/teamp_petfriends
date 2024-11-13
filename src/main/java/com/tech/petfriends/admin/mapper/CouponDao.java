package com.tech.petfriends.admin.mapper;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.CouponDto;
import com.tech.petfriends.admin.dto.MemberCouponDto;

@Mapper
public interface CouponDao {

	List<CouponDto> getAllCoupons(String status, String kind, String grade, String type, String sort);

	List<MemberCouponDto> getMemberCoupons(String status, String searchOrder, String startDate, String endDate, String memberCode, String couponCode, String orderCode);

	void registerCoupon(CouponDto couponDto);

	CouponDto getCouponById(String cp_no);

	void updateCoupon(CouponDto couponDto);
	
	void deleteCoupon(String cp_no);

	void updateMemberCouponDead(String today);

}
