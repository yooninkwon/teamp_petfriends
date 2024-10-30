package com.tech.petfriends.product.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.product.dto.ProductDetailCartCheckDto;
import com.tech.petfriends.product.dto.ProductDetailDto;
import com.tech.petfriends.product.dto.ProductDetailOptionDto;
import com.tech.petfriends.product.dto.ProductDetailPointDto;
import com.tech.petfriends.product.dto.ProductDetailReviewListDto;
import com.tech.petfriends.product.dto.ProductDetailReviewRankDto;
import com.tech.petfriends.product.dto.ProductDetailWishListDto;
import com.tech.petfriends.product.dto.ProductListViewDto;
import com.tech.petfriends.product.dto.ProductSearchReviewRank10Dto;

@Mapper
public interface ProductDao {

	//제품리스트 
	public ArrayList<ProductListViewDto> productListView (String petType, String proType, String dfoodType, String dsnackType, String dgoodsType, String cfoodType, String csnackType, String cgoodsType, String rankOption, List<String> priceOption, List<String> dfs1option, List<String> dfs2option, List<String> dg1option, List<String> dg2option, List<String> cfs1option, List<String> cfs2option, List<String> cg1option, List<String> cg2option);

	//제품상세페이지 _ 상품정보, 상품이미지(대표 및 상세)
	public ProductDetailDto productDetail(String pro_code);

	//제품상세페이지 _ 리뷰평균점수, 리뷰갯수, 1/2/3/4/5점 갯수
	public ProductDetailReviewRankDto productReviewRank(String pro_code);

	//제품상세페이지 _ 상품별 옵션선택(드랍다운 옵션태그)
	public ArrayList<ProductDetailOptionDto> productOption(String pro_code);

	//제품상세페이지 _ 찜목록에 따른 표기상태변경(찜목록에 있고 없고 확인)
	public ProductDetailWishListDto productWishList(String pro_code, String mem_code);

	//제품상세페이지 _ 찜목록 추가
	public void productWishListInsert(String pro_code, String mem_code);

	//제품상세페이지 _ 찜목록 취소
	public void productWishListDelete(String pro_code, String mem_code);

	//제품상세페이지 _ 해당유저의 등급기준 예상적립금
	public ProductDetailPointDto productPoint(String mem_code);

	//제품상세페이지 _ 해당유저의 장바구니담기
	public void productDetailCart(String mem_code, String pro_code, String opt_code, int cart_cnt, String cart_code);

	//제품상세페이지 _ 추천제품목록 4가지
	public ArrayList<ProductListViewDto> productRecommendProduct(String pro_code);

	//제품상세페이지 _ 해당유저 장바구니 담으려는 상품이 장바구니 존재유무 확인
	public ProductDetailCartCheckDto productDetailCartCheck(String mem_code, String pro_code, String opt_code);

	//제품상세페이지 _ 제품리뷰 리스트 나열 쿼리
	public ArrayList<ProductDetailReviewListDto> productDetailReviewList(String proCode, String selectedOpt);

	//검색아이콘 _ 제품 탑10 제품 나열 쿼리
	public ArrayList<ProductSearchReviewRank10Dto> productSearchReviewRank10();

	//검색아이콘 _ 검색제품 나열 쿼리
	public List<ProductListViewDto> productSearchList(String searchPro);
	
	

	
	



}
