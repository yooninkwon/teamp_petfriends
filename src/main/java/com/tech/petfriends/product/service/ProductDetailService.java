package com.tech.petfriends.product.service;

import java.util.ArrayList;

import org.springframework.ui.Model;

import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.dto.ProductDetailDto;
import com.tech.petfriends.product.dto.ProductDetailOptionDto;
import com.tech.petfriends.product.dto.ProductDetailPointDto;
import com.tech.petfriends.product.dto.ProductDetailReviewRankDto;
import com.tech.petfriends.product.dto.ProductDetailWishListDto;
import com.tech.petfriends.product.dto.ProductListViewDto;

public class ProductDetailService implements ProductService {

	ProductDao productDao;
	

	
	public ProductDetailService(ProductDao productDao) {
		this.productDao = productDao;
	}



	@Override
	public void execute(Model model) {

		String pro_code = (String) model.getAttribute("productCode");
		String mem_code = (String) model.getAttribute("memberCode");
		
		//제품상세페이지 _ 제품정보, 대표이미지 및 상세이미지
		ProductDetailDto product = productDao.productDetail(pro_code);
		model.addAttribute("product",product);
		
		//제품상세페이지 _ 리뷰평균점수, 리뷰갯수, 1/2/3/4/5점 갯수
		ProductDetailReviewRankDto reviewRank = productDao.productReviewRank(pro_code);
		model.addAttribute("reviewRank",reviewRank);
		
		//제품상세페이지 _ 제품 옵션 선택지 데이터
		ArrayList<ProductDetailOptionDto> productOption = productDao.productOption(pro_code); 
		model.addAttribute("productOption",productOption.get(0));
		model.addAttribute("productOptionList",productOption);
		
		//제품상세페이지 _ 해당유저 상품의 찜상태체크
		ProductDetailWishListDto whishCheck = productDao.productWishList(pro_code, mem_code);
		model.addAttribute("whishCheck",whishCheck);
		System.out.println(pro_code + ": " +mem_code);
		
		//제품상세페이지 _ 해당유저의 제품구매시 예상적립금
		ProductDetailPointDto point = productDao.productPoint(mem_code);
		model.addAttribute("point",point);
		
		ArrayList<ProductListViewDto> recPro = productDao.productRecommendProduct(pro_code);
		model.addAttribute("recPro",recPro);
	}

	
}
