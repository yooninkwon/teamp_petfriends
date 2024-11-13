package com.tech.petfriends.admin.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.tech.petfriends.admin.mapper.CouponDao;

@Component
public class AdminSchedulerComponent {
	
	@Autowired
	CouponDao couponDao;
	
	// 매일 자정에 실행
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void updateExpiredCoupons() {
    	String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yy/MM/dd"));
        System.out.println(today + " 쿠폰 만료 상태 업데이트 작업 실행 중...");
        couponDao.updateMemberCouponDead(today);
    }
}
