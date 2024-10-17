package com.tech.petfriends.product.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.dto.ProductDto;

@Service
public class ProductListService implements ProductService{
	
	private ProductDao productDao;
	
	public ProductListService(ProductDao productDao) {
		this.productDao=productDao;
	}
	
	
	@Override
	public void execute(Model model) {
		ArrayList<ProductDto> list = productDao.list();
		
		
		model.addAttribute("list",list);
		
	}
}
