package com.tech.petfriends.admin.service;

import java.util.List;

import org.springframework.ui.Model;

import com.tech.petfriends.admin.dto.ProductDetailImgDto;
import com.tech.petfriends.admin.dto.ProductDetailOptDto;
import com.tech.petfriends.admin.dto.ProductDetailProDto;
import com.tech.petfriends.admin.mapper.AdminProductDao;

public class AdminProductDetailService implements AdminServiceInterface {

	private AdminProductDao adminProductDao;

	public AdminProductDetailService(AdminProductDao adminProductDao) {
		this.adminProductDao = adminProductDao;
	}

	@Override
	public void execute(Model model) {
		String proCode = (String) model.getAttribute("proCode");

		System.out.println("나는 코드가말이야 ~~ "+proCode);
		
		ProductDetailProDto pro = adminProductDao.adminDetatilPro(proCode);
		
		ProductDetailImgDto img = adminProductDao.adminDetailImg(proCode);
		
		List<ProductDetailOptDto> opt = adminProductDao.adminDetailOpt(proCode);
		
		model.addAttribute("pro", pro);
		model.addAttribute("img", img);
		model.addAttribute("opt", opt);
		
		
		
		
	}

}
