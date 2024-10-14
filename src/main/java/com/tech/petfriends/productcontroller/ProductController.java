package com.tech.petfriends.productcontroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/product")
public class ProductController {

	@GetMapping("/productlist")
	public String productlist() {
		
		
		
		return "/product/productlist";
	}
}
