package com.tech.petfriends.product.service;

import org.springframework.ui.Model;

import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.dto.ProductDetailDto;

public class ProductDetailService implements ProductService {

	ProductDao productDao;
	

	
	public ProductDetailService(ProductDao productDao) {
		this.productDao = productDao;
	}



	@Override
	public void execute(Model model) {

		String pro_code = (String) model.getAttribute("productCode");
		
		model.addAttribute("product",productDetail(pro_code));
	}

	//제품상세페이지 _ 제품정보, 대표이미지 및 상세이미지
	public ProductDetailDto productDetail(String pro_code) {
		ProductDetailDto product = productDao.productDetail(pro_code);
		
		return product;
	}
	
}
