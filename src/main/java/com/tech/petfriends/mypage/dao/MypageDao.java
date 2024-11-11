package com.tech.petfriends.mypage.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.CouponDto;
import com.tech.petfriends.helppetf.dto.PethotelFormDataDto;
import com.tech.petfriends.helppetf.dto.PethotelMemDataDto;
import com.tech.petfriends.login.dto.MemberAddressDto;
import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.mypage.dto.MyCartDto;
import com.tech.petfriends.mypage.dto.MyOrderDto;
import com.tech.petfriends.mypage.dto.MyPetDto;
import com.tech.petfriends.mypage.dto.MyWishDto;

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
	
	List<MyCartDto> getCartByMemberCode(String mem_code);
	
	void deleteAllCartItems(String mem_code);
	
	boolean updateCartQuantity(String newQuantity, String cartCode);
	
	List<MyCartDto> getItemByCartCode(String cartCode);
	
	void deleteCartItem(String cartCode);
	
	List<MyCartDto> getItemsByCartCodes(List<String> cartCodes);

	void insertOrderCode(String cartCode, String o_code);
	
	void insertOrder(MyOrderDto orderData);
	
	void insertOrderStatus(String o_code);
	
	void updateCouponByOrder(String mc_code);
	
	void updateAmountByOrder(MyOrderDto orderData);
	
	ArrayList<MyOrderDto> getOrderByMemberCode(String mem_code);
	
	ArrayList<MyWishDto> getAllWishInfoByMemberCode(String mem_code, String sortType);
	
	List<MyOrderDto> getAllOrderInfoByMemberCode(String mem_code, String orderable);
	
	void deleteWishByProCode(String mem_code, String pro_code);

	ArrayList<PethotelMemDataDto> pethotelReserveMypageMem(String mem_code);

	PethotelMemDataDto pethotelReserveMypageMemNo(String reserveNo);

	ArrayList<PethotelFormDataDto> pethotelReserveMypagePets(String reserveNo);

	void pethotelReserveMyPageCancel(String reserveNo);
}
