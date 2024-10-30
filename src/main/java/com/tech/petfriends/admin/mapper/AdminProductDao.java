package com.tech.petfriends.admin.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.ProductListDto;

@Mapper
public interface AdminProductDao {
	
	//어드민 상품리스트 불러오기
	ArrayList<ProductListDto> adminProductList(String petType, String proType, String detailType, String searchType);

	//어드민 상품등록
	void adminProductAdd(String proCode, String proName, String petType, String proType, String proDetailType,
			String filterType1, String filterType2, int proDiscount, String productStatus);
	//어드민 상품이미지등록
	void adminProductImgAdd(String proCode, List<String> savedMainImageNames, List<String> savedDesImageNames);
	//어드민 상품옵션등록
	void adminProductOptAdd(String proCode, String optionName, int optionPrice, int optionCount, int finalPrice, String optCode);

	
}
