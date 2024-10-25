package com.tech.petfriends.product.service;

import org.springframework.ui.Model;

import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.dto.ProductDetailCartCheckDto;

public class ProductDetailCartCheckService implements ProductService {

	ProductDao productDao;

	public ProductDetailCartCheckService(ProductDao productDao) {
		this.productDao = productDao;
	}

	@Override
	public void execute(Model model) {
		

		
		
		
		String pro_code = (String) model.getAttribute("proCode");
		String mem_code = (String) model.getAttribute("memCode");
		String opt_code = (String) model.getAttribute("optCode");
		
		System.out.println(pro_code);
		System.out.println(mem_code);
		System.out.println(opt_code);
		
		ProductDetailCartCheckDto cartCheckResult = productDao.productDetailCartCheck(mem_code, pro_code, opt_code);
		int cartResult = cartCheckResult.getCartCheckResult();
		
		System.out.println(cartResult);
		
		model.addAttribute("cartResult",cartResult);
	}

}
