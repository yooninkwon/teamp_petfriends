package com.tech.petfriends.admin.service;

import java.util.List;

import org.springframework.ui.Model;

import com.tech.petfriends.admin.dto.ProductListDto;
import com.tech.petfriends.admin.mapper.AdminProductDao;

public class AdminProductListService implements AdminServiceInterface {

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
		
		List<ProductListDto> productList = adminProductDao.adminProductList(petType,proType,detailType,searchType,proOnOff);
		model.addAttribute("productList",productList);
	}

}
