package com.tech.petfriends.product.service;

import java.util.ArrayList;

import org.springframework.ui.Model;

import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.dto.ProductDetailReviewListDto;

public class ProductDetailReviewListService implements ProductService {

	ProductDao productDao;

	public ProductDetailReviewListService(ProductDao productDao) {
		this.productDao = productDao;
	}

	@Override
	public void execute(Model model) {
		
		String proCode = (String) model.getAttribute("proCode");
		String selectedOpt = (String) model.getAttribute("selectedOpt");
		
		System.out.println("sadasd!!!!"+proCode + selectedOpt);
		
		if(selectedOpt.equals("dateDesc")) {
			selectedOpt="rev.review_date desc";
		}else if(selectedOpt.equals("rankDesc")) {
			selectedOpt="rev.review_rating desc";
		}else if(selectedOpt.equals("rankAsc")) {
			selectedOpt="rev.review_rating asc";
		}
		
		// 리뷰 리스트 가져오기
	    ArrayList<ProductDetailReviewListDto> reviewList = productDao.productDetailReviewList(proCode, selectedOpt);
	    model.addAttribute("reviewList", reviewList); // 모델에 리스트 추가
		
		
	}

}
