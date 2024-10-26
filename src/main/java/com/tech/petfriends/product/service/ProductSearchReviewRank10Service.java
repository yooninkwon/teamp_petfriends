package com.tech.petfriends.product.service;

import java.util.List;

import org.springframework.ui.Model;

import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.dto.ProductSearchReviewRank10Dto;

public class ProductSearchReviewRank10Service implements ProductService {

	ProductDao productDao;

	public ProductSearchReviewRank10Service(ProductDao productDao) {
		this.productDao = productDao;
	}

	@Override
	public void execute(Model model) {

		
		
		List<ProductSearchReviewRank10Dto> resultTen = productDao.productSearchReviewRank10();
		model.addAttribute("resultTen", resultTen);

	}

}
