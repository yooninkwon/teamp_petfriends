package com.tech.petfriends.product.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.product.dto.ProductDetailDto;
import com.tech.petfriends.product.dto.ProductDetailOptionDto;
import com.tech.petfriends.product.dto.ProductDetailReviewRankDto;
import com.tech.petfriends.product.dto.ProductListViewDto;

@Mapper
public interface ProductDao {

	//제품리스트 
	public ArrayList<ProductListViewDto> productListView (String petType, String proType, String dfoodType, String dsnackType, String dgoodsType, String cfoodType, String csnackType, String cgoodsType, String rankOption, List<String> priceOption, List<String> dfs1option, List<String> dfs2option, List<String> dg1option, List<String> dg2option, List<String> cfs1option, List<String> cfs2option, List<String> cg1option, List<String> cg2option);

	//제품상세페이지 _ 상품정보, 상품이미지(대표 및 상세)
	public ProductDetailDto productDetail(String pro_code);

	//제품상세페이지 _ 리뷰평균점수, 리뷰갯수, 1/2/3/4/5점 갯수
	public ProductDetailReviewRankDto productReviewRank(String pro_code);

	public ArrayList<ProductDetailOptionDto> productOption(String pro_code);

	
	



}
