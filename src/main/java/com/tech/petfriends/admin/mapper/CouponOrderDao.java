package com.tech.petfriends.admin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.CouponDto;
import com.tech.petfriends.admin.dto.MemberCouponDto;
import com.tech.petfriends.mypage.dto.GradeDto;
import com.tech.petfriends.mypage.dto.MyOrderDto;
import com.tech.petfriends.mypage.dto.MyServiceHistoryDto;

@Mapper
public interface CouponOrderDao {
	
	// 쿠폰관리
	List<CouponDto> getAllCoupons(String status, String kind, String grade, String type, String sort);
	List<MemberCouponDto> getMemberCoupons(String status, String searchOrder, String startDate, String endDate, String memberCode, String couponCode, String orderCode);
	void registerCoupon(CouponDto couponDto);
	CouponDto getCouponById(String cp_no);
	void updateCoupon(CouponDto couponDto);
	void deleteCoupon(String cp_no);
	// 스케쥴러
	int updateMemberCouponDead(String today);
	List<Map<String, Object>> getThreeMonthsPayment(String threeMonthsAgo, String today);
	List<GradeDto> getAllGradeConditions();
	void updateMemberGrade(String memCode, int g_no);
	List<Map<String, Object>> getAllMemberGrades();
	List<Map<String, Object>> getCouponsForGrades();
	void insertMemberCoupon(String uuid, String memCode, String couponNo);
	
	// 주문관리
	List<MyOrderDto> getAllOrders(String status, String startDate, String endDate, String orderCode, String proCode, String memberCode);
	void deleteOrderStatus(String oCode, String osName);
	int updateOrderStatus(String oCode, String osName);
	
	// 고객센터
	List<MyServiceHistoryDto> getAllCs(String status, String category);
	void writeAnswer(String cs_no, String cs_answer);
	MyServiceHistoryDto getCsDetailByNo(String cs_no);
}
