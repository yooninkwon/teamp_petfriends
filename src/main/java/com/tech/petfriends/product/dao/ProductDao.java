package com.tech.petfriends.product.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.product.dto.ProductDto;

@Mapper
public interface ProductDao {
	
	public ArrayList<ProductDto> productList ();
}
