package com.tech.petfriends.admin.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.ProductListDto;

@Mapper
public interface AdminProductDao {
	
	ArrayList<ProductListDto> adminProductList(String petType, String proType, String detailType, String searchType);
	
}
