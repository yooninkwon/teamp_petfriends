package com.tech.petfriends.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.CouponDto;
import com.tech.petfriends.admin.dto.MemberCouponDto;
import com.tech.petfriends.mypage.dto.MyOrderDto;

@Mapper
public interface CouponOrderDao {
	
	// 쿠폰관리
	List<CouponDto> getAllCoupons(String status, String kind, String grade, String type, String sort);
	List<MemberCouponDto> getMemberCoupons(String status, String searchOrder, String startDate, String endDate, String memberCode, String couponCode, String orderCode);
	void registerCoupon(CouponDto couponDto);
	CouponDto getCouponById(String cp_no);
	void updateCoupon(CouponDto couponDto);
	void deleteCoupon(String cp_no);
	void updateMemberCouponDead(String today);
	
	// 주문관리
	List<MyOrderDto> getAllOrders(String status, String startDate, String endDate, String orderCode, String proCode, String memberCode);
	void deleteOrderStatus(String oCode, String osName);
	int updateOrderStatus(String oCode, String osName);

}
