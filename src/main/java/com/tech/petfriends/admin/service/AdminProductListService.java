package com.tech.petfriends.admin.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.ui.Model;

import com.tech.petfriends.admin.dto.ProductListDto;
import com.tech.petfriends.admin.mapper.AdminProductDao;

public class AdminProductListService implements AdminExecuteModel {

	private AdminProductDao adminProductDao;

	public AdminProductListService(AdminProductDao adminProductDao) {
		this.adminProductDao = adminProductDao;
	}

	@Override
	public void execute(Model model) {
		String petType = (String) model.getAttribute("petType");
		String proType = (String) model.getAttribute("proType");
		String detailType = (String) model.getAttribute("detailType");
		String searchType = (String) model.getAttribute("searchType");
		String proOnOff = (String) model.getAttribute("proOnOff");
		
		if(detailType == null) {
			detailType="";
		}
		if(searchType == null) {
			searchType="";
		}
		
		System.out.println(petType + proType + detailType + searchType);
		
		List<ProductListDto> productList = adminProductDao.adminProductList(petType,proType,detailType,proOnOff);
		List<ProductListDto> searchProductList = similarList(searchType, productList);
		
		model.addAttribute("productList",searchProductList);
	}

	private List<ProductListDto> similarList(String searchPro, List<ProductListDto> allList) {
    // 결과 리스트를 초기화
    List<ProductListDto> resultList = new ArrayList<>();

    // 검색어 공백 제거
    String cleanedSearchPro = searchPro.replaceAll("\\s+", "");

    // 검색어를 한 글자씩 나누기
    String[] searchProChars = cleanedSearchPro.split(""); // "아수" -> ["아", "수"]

    for (ProductListDto product : allList) {
        // 제품명, 펫타입, 카테고리, 타입을 모두 공백 제거 후 결합
        String cleanedProName = product.getPro_name().replaceAll("\\s+", "");
             

        // 검색어의 각 문자가 제품명에 포함되는지 체크
        boolean isMatch = true;
        for (String searchChar : searchProChars) {
            if (!cleanedProName.contains(searchChar)) {
                isMatch = false;
                break; // 하나라도 포함되지 않으면 해당 제품은 제외
            }
        }
        // 모든 문자들이 포함되면 결과 리스트에 추가
        if (isMatch) {
            resultList.add(product);
        }
    }
    // 결과 리스트 반환
    return resultList;
}
	
	
}
