package com.tech.petfriends.product.service;

import org.springframework.ui.Model;

import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.dto.ProductDetailWishListDto;

public class ProductWishListService implements ProductService {

	ProductDao productDao;

	public ProductWishListService(ProductDao productDao) {
		this.productDao = productDao;
	}

	@Override
	public void execute(Model model) {

		String pro_code = (String) model.getAttribute("productCode");
		String mem_code = (String) model.getAttribute("memCode");
		System.out.println(pro_code + " : " + mem_code);

		ProductDetailWishListDto find = productDao.productWishList(pro_code, mem_code);


		if (find.getWishListResult() == 1) {
			productDao.productWishListDelete(pro_code, mem_code);
		} else {
			productDao.productWishListInsert(pro_code, mem_code);
		}
		
		ProductDetailWishListDto result = productDao.productWishList(pro_code, mem_code);
		model.addAttribute("result", result);

	}

}
