package com.tech.petfriends.mypage.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.CouponDto;
import com.tech.petfriends.admin.dto.OrderStatusDto;
import com.tech.petfriends.helppetf.dto.PethotelFormDataDto;
import com.tech.petfriends.helppetf.dto.PethotelMemDataDto;
import com.tech.petfriends.login.dto.MemberAddressDto;
import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.dto.MemberPointsDto;
import com.tech.petfriends.mypage.dto.MyCartDto;
import com.tech.petfriends.mypage.dto.MyOrderDto;
import com.tech.petfriends.mypage.dto.MyPetDto;
import com.tech.petfriends.mypage.dto.MyReviewDto;
import com.tech.petfriends.mypage.dto.MyServiceHistoryDto;
import com.tech.petfriends.mypage.dto.MyWishDto;

@Mapper
public interface MypageDao {
	
	// 회원가입시 펫등록
	void insertMyPet(MyPetDto pet);
	
	// 내새꾸
	// 펫 이미지 삭제
	void deletePetImgForPetCode(String petCode);
	
	// 펫 전체 리스트 가져오기
	ArrayList<MyPetDto> getPetList();
	
	// 펫코드로 이미지 가져오기
	String getPetImgForPetCode(String petCode);

	ArrayList<MyPetDto> getPetsByMemberCode(String mem_code);
	void removeMainPet(String mem_code);
	void setMainPet(String newlyChecked);
	ArrayList<String> getBreedOptionByType(String petType);
	void insertPet(MyPetDto myPetDto);
	MyPetDto getInfoByPetCode(String petCode);
	void modifyPetByPetCode(MyPetDto myPetDto);
	void deletePetByPetCode(String petCode);
	
	// 포인트
	ArrayList<MemberPointsDto> getAllPointLogByMemCode(String mem_code);
	Integer getExsavingAmountByMemCode(String mem_code);
	
	// 쿠폰
	ArrayList<CouponDto> getAllCoupon();
	ArrayList<CouponDto> getCouponByMemberCode(String mem_code);
	CouponDto searchCouponByKeyword(String keyword);
	int checkIssued(String mem_code, int cp_no);
	void insertCouponByCouponNo(String mc_code, String mem_code, int cp_no);
	
	// 내 정보 변경
	ArrayList<MemberAddressDto> getAddrByMemberCode(String mem_code);
	void updatePhoneNumber(String memCode, String phoneNumber);
	void updateDefaultAddress(String memCode);
	void setMainAddress(String addrCode);
	void deleteAddress(String addrCode);
	boolean insertNewAddress(String addrCode, String memCode, String addrPostal, String addrLine1, String addrLine2);
	void updateMemberInfo(MemberLoginDto loginUser);
	
	// 장바구니
	List<MyCartDto> getCartByMemberCode(String mem_code);
	void deleteAllCartItems(String mem_code);
	boolean updateCartQuantity(String newQuantity, String cartCode);
	List<MyCartDto> getItemByCartCode(String cartCode);
	void deleteCartItem(String cartCode);
	List<MyCartDto> getItemsByCartCodes(List<String> cartCodes);
	
	// 결제
	void insertOrderCode(String cartCode, String o_code);
	void updateStrockByOrder(String cartCode);
	void insertOrder(MyOrderDto orderData);
	void insertOrderStatus(String o_code);
	void updateCouponByOrder(String mc_code);
	void updateAmountByOrder(MyOrderDto orderData);
	void setOffByStock();
	
	// 주문내역
	ArrayList<MyOrderDto> getOrderByMemberCode(String mem_code);
	ArrayList<OrderStatusDto> getStatusByOrderCode(String o_code);
	ArrayList<MyCartDto> getCartByOrderCode(String o_code);
	MyOrderDto getOrderByOrderCode(String o_code);
	// 주문내역 : 구매확정
	void insertComfirmStatus(String o_code);
	void updateAmountByConfirmed(String mem_code, String o_saving);
	// 주문내역 : 주문취소
	void updateCancelByOrderCode(String o_code, String o_cancel, String o_cancel_detail);
	void insertCancelStatus(String o_code);
	void updateCouponByCancel(String mc_code);
	void updateAmountByCancel(MyOrderDto order);
	void updateStrockByCancel(String cart_code);
	void setOnByStock();
	
	// 구매후기
	List<MyCartDto> getConfirmedItemByMemberCode(String mem_code);
	List<MyReviewDto> getReviewByMemberCode(String mem_code);
	MyReviewDto getReviewInfoByCartCode(String cartCode);
	void updateReview(MyReviewDto reviewDto);
	void insertReview(MyReviewDto reviewDto);
	void updateAmountByReview(String memCode, int savingPoint);
	MyReviewDto existingReview(String review_code);
	void deleteImageUpdate();
  
	// 즐겨찾는 상품
	ArrayList<MyWishDto> getAllWishInfoByMemberCode(String mem_code, String sortType);
	List<MyWishDto> getAllOrderInfoByMemberCode(String mem_code, String orderable);
	void deleteWishByProCode(String mem_code, String pro_code);

    // 펫호텔 예약내역
	ArrayList<PethotelMemDataDto> pethotelReserveMypageMem(String mem_code);
	PethotelMemDataDto pethotelReserveMypageMemNo(String reserveNo);
	ArrayList<PethotelFormDataDto> pethotelReserveMypagePets(String reserveNo);
	void pethotelReserveMyPageCancel(String reserveNo);

	// 고객센터
	List<MyServiceHistoryDto> getMyServiceHistory(String mem_code);
	void writeCS(String mem_code, String cs_caregory, String cs_contect);
	void modifyCS(String cs_no, String cs_caregory, String cs_contect);
	MyServiceHistoryDto getMyServiceByNo(String cs_no);
	void deleteCS(String cs_no);
}
