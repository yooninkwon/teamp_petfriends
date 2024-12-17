package com.tech.petfriends.product.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tech.petfriends.product.domain.ProductCategory;
import com.tech.petfriends.product.repository.ProductCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {

	private final ProductCategoryRepository categoryRepository;
	
	public List<ProductCategory> getCategory(){
		
		List<ProductCategory> rootCategories = categoryRepository.findByParentIsNull();
	    
		for (ProductCategory rootCategory : rootCategories) {
			findCategory(rootCategory);
		}
		
		return rootCategories;
		
	}

	private void findCategory(ProductCategory parentCategory) {
		List<ProductCategory> subCategories = categoryRepository.findByParent(parentCategory);
		parentCategory.setChildren(subCategories);
		
		for (ProductCategory subCategory : subCategories ) {
			findCategory(subCategory);
		}
		
	}
	
	
}
