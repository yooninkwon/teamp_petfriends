package com.tech.petfriends.mypage.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.CouponDto;
import com.tech.petfriends.login.dto.MemberAddressDto;
import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.mypage.dto.MyPetDto;

@Mapper
public interface MypageDao {
	void insertMyPet(MyPetDto pet);

	ArrayList<MyPetDto> getPetsByMemberCode(String mem_code);

	void removeMainPet(String mem_code);

	void setMainPet(String newlyChecked);
	
	ArrayList<String> getBreedOptionByType(String petType);

	void insertPet(MyPetDto myPetDto);
	
	MyPetDto getInfoByPetCode(String petCode);
	
	void modifyPetByPetCode(MyPetDto myPetDto);
	
	void deletePetByPetCode(String petCode);
	
	ArrayList<CouponDto> getAllCoupon();

	ArrayList<CouponDto> getCouponByMemberCode(String mem_code);

	CouponDto searchCouponByKeyword(String keyword);
	
	int checkIssued(String mem_code, int cp_no);

	void insertCouponByCouponNo(String mc_code, String mem_code, int cp_no);

	ArrayList<MemberAddressDto> getAddrByMemberCode(String mem_code);

	void updatePhoneNumber(String memCode, String phoneNumber);
	
	void updateDefaultAddress(String memCode);

	void setMainAddress(String addrCode);

	void deleteAddress(String addrCode);
	
	boolean insertNewAddress(String addrCode, String memCode, String addrPostal, String addrLine1, String addrLine2);

	void updateMemberInfo(MemberLoginDto loginUser);
}
