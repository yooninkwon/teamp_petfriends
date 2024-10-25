package com.tech.petfriends.mypage.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.CouponDto;
import com.tech.petfriends.mypage.dto.GradeDto;
import com.tech.petfriends.mypage.dto.MyPetDto;

@Mapper
public interface MypageDao {

	ArrayList<MyPetDto> getPetsByMemberCode(String mem_code);

	GradeDto getGradeByMemberCode(String mem_code);

	void removeMainPet(String previousChecked);

	void setMainPet(String newlyChecked);

	MyPetDto getInfoByPetCode(String petCode);

	ArrayList<CouponDto> getAllCoupon();

	ArrayList<CouponDto> getCouponByMemberCode(String mem_code);

	CouponDto searchCouponByKeyword(String keyword);
	
	int checkIssued(String mem_code, int cp_no);

	void insertCouponByCouponNo(String mc_code, String mem_code, int cp_no);
	
}
