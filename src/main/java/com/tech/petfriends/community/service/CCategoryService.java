package com.tech.petfriends.community.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.ui.Model;

import com.tech.petfriends.community.dto.CCategoryDto;
import com.tech.petfriends.community.dto.CDto;
import com.tech.petfriends.community.mapper.IDao;

public class CCategoryService implements CServiceInterface {
	private IDao iDao;
	
	public CCategoryService(IDao idao) {
		this.iDao = idao;
	}
		
	@Override
	public void execute(Model model) {
		ArrayList<CCategoryDto> category = iDao.getCategoryList();
		model.addAttribute("category",category);
		
	}

 
	
}
