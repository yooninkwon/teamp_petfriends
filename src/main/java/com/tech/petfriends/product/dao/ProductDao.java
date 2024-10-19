package com.tech.petfriends.product.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.product.dto.ProductListViewDto;

@Mapper
public interface ProductDao {
	
	public ArrayList<ProductListViewDto> productList ();
	
	
	public ArrayList<ProductListViewDto> productListView (String petType, String proType, String dfoodType, String dsnackType, String dgoodsType, String cfoodType, String csnackType, String cgoodsType, String rankOption, List<String> priceOption, List<String> dfs1option, List<String> dfs2option, List<String> dg1option, List<String> dg2option, List<String> cfs1option, List<String> cfs2option, List<String> cg1option, List<String> cg2option);
}
