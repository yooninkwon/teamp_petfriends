package com.tech.petfriends.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tech.petfriends.product.domain.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>{
	
	List<ProductCategory> findByParentIsNull();
	List<ProductCategory> findByParent(ProductCategory parent);
	
}
