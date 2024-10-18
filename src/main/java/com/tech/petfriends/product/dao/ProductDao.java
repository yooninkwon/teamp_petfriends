package com.tech.petfriends.product.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.product.dto.ProductListViewDto;

@Mapper
public interface ProductDao {
	
	public ArrayList<ProductListViewDto> productList ();
	
	
	public ArrayList<ProductListViewDto> productListView (String petType, String proType, String dfoodType, String dsnackType, String dgoodsType, String cfoodType, String csnackType, String cgoodsType, String rankOption, String priceOptionString, String dfs1optionString, String dfs2optionString, String dg1optionString, String dg2optionString, String cfs1optionString, String cfs2optionString, String cg1optionString, String cg2optionString);
}
