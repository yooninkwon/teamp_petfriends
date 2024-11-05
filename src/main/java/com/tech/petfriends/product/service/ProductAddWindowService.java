package com.tech.petfriends.product.service;

import org.springframework.ui.Model;

import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.dto.ProductDetailWishListDto;

public class ProductAddWindowService implements ProductService {

	ProductDao productDao;

	public ProductAddWindowService(ProductDao productDao) {
		this.productDao = productDao;
	}

	@Override
	public void execute(Model model) {

		String pro_code = (String) model.getAttribute("windowProCode");
		String mem_code= (String) model.getAttribute("windowMemCode");
		
		System.out.println(pro_code+"윈도우서비스~~");
		System.out.println(mem_code+"윈도우서비스~~");
		
		//둘러본 목록에 해당 상품이 있는지 확인
		int windowResult = productDao.productWindowConfirm(pro_code, mem_code);
		System.out.println(windowResult+"윈도우서비스~~ 몇개일까요");
		
		if(windowResult == 0) {
			//둘러본 목록에 0 결과값을 얻으면 추가
			productDao.productWindowAdd(pro_code, mem_code);
		}else {
			return;
		}

	}

}
