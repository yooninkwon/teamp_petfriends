package com.tech.petfriends.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.service.ProductListService;
import com.tech.petfriends.product.service.ProductService;

@Controller
@RequestMapping("/product")
public class ProductController {

	@Autowired
	ProductDao productDao;
	
	ProductService productService;
	
	//제품리스트 페이지
	@GetMapping("/productlist")
	public String productlist(Model model) {
		productService = new ProductListService(productDao);
		productService.execute(model);
		
		return "/product/productlist";
	}

}
