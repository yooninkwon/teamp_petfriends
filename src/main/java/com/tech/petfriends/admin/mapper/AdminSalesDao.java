package com.tech.petfriends.admin.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.ProductDetailImgDto;
import com.tech.petfriends.admin.dto.ProductDetailOptDto;
import com.tech.petfriends.admin.dto.ProductDetailProDto;
import com.tech.petfriends.admin.dto.ProductListDto;
import com.tech.petfriends.admin.dto.SalesDto;

@Mapper
public interface AdminSalesDao {

	List<SalesDto> todaySales();
	
	

	
}
