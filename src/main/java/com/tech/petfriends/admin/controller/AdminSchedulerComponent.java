package com.tech.petfriends.admin.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.tech.petfriends.admin.mapper.CouponOrderDao;
import com.tech.petfriends.mypage.dto.GradeDto;

@Component
public class AdminSchedulerComponent {
	
	@Autowired
	CouponOrderDao couponOrderDao;
	
	// 매일 자정에 실행
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void updateExpiredCoupons() {
    	
    	String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yy/MM/dd"));
    	System.out.println(today + " 쿠폰 만료 상태 업데이트 작업 실행 중...");
    	
        int updateDead = couponOrderDao.updateMemberCouponDead(today);
        
        System.out.println(updateDead + "개 쿠폰 만료 처리 완료");
    }
    
    // 매월 1일 자정에 실행
    @Scheduled(cron = "0 0 0 1 * *")
    @Transactional
    public void updateMemberGrade() {
    	
    	String threeMonthsAgo = LocalDate.now().minusMonths(3).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        System.out.println(today + " 회원 등급 갱신 작업 실행 중...");
        
        // 1. 등급 업데이트 수행
        // 1-1. 각 회원의 3개월 구매확정 금액 합산
        List<Map<String, Object>> memberPayments = couponOrderDao.getThreeMonthsPayment(threeMonthsAgo, today);

        // 1-2. 등급 조건 조회
        List<GradeDto> gradeConditions = couponOrderDao.getAllGradeConditions();

        // 1-3. 회원별 등급 갱신
        int updatedCount = 0;
        for (Map<String, Object> paymentData : memberPayments) {
            String memCode = (String) paymentData.get("MEM_CODE");
            int totalPayment = ((Number) paymentData.get("TOTAL_PAYMENT")).intValue();
            int currentGradeNo = ((Number) paymentData.get("G_NO")).intValue();

            for (GradeDto grade : gradeConditions) {
                if (grade.getG_no() > currentGradeNo && totalPayment >= grade.getG_condition()) {
                    couponOrderDao.updateMemberGrade(memCode, grade.getG_no());
                    updatedCount++;
                    break;
                }
            }
        }
        
        // 2. 쿠폰 발급 수행
        // 1. 회원별 최신 등급 조회
        List<Map<String, Object>> memberGrades = couponOrderDao.getAllMemberGrades();

        // 2. 등급 기반 쿠폰 조회
        List<Map<String, Object>> gradeCoupons = couponOrderDao.getCouponsForGrades();

        // 3. 쿠폰 발급
        for (Map<String, Object> member : memberGrades) {
            String memCode = (String) member.get("MEM_CODE");
            int gNo = ((Number) member.get("G_NO")).intValue();

            for (Map<String, Object> coupon : gradeCoupons) {
                int couponGradeNo = ((Number) coupon.get("G_NO")).intValue();

                // 회원의 등급과 쿠폰 등급이 일치하는 경우 발급
                if (gNo == couponGradeNo) {
                    String couponNo = (String) coupon.get("CP_NO");
                    String uuid = UUID.randomUUID().toString();

                    couponOrderDao.insertMemberCoupon(uuid, memCode, couponNo);
                }
            }
        }

        System.out.println(updatedCount + "명 회원의 등급 갱신 완료");
    }
}
