package com.tech.petfriends.product.service;

import java.util.List;

import org.springframework.ui.Model;

import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.dto.ProductListViewDto;

public class ProductSearchListService implements ProductService {

	ProductDao productDao;

	public ProductSearchListService(ProductDao productDao) {
		this.productDao = productDao;
	}

	@Override
	public void execute(Model model) {

		String searchPro = (String) model.getAttribute("searchPro");
		System.out.println(searchPro);
		
		 
		
		List<ProductListViewDto> searchList = productDao.productSearchList(searchPro);
		model.addAttribute("searchList", searchList);

	}

}
