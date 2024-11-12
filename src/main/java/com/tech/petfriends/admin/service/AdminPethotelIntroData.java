package com.tech.petfriends.admin.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PethotelIntroDto;

@Service
public class AdminPethotelIntroData implements AdminExecuteModel {
	
	AdminPageDao adminDao;
	
	public AdminPethotelIntroData(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}
	
	@Override
	public void execute(Model model) {
		// db호출하여 데이터 DTO에 저장
		PethotelIntroDto dto = adminDao.adminPethotelIntro();
		model.addAttribute("dto", dto);
	}
}