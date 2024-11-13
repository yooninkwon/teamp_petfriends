package com.tech.petfriends.admin.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PethotelInfoDto;

@Service
public class AdminPethotelInfoData implements AdminExecuteModel {

	AdminPageDao adminDao;
	
	public AdminPethotelInfoData(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}
	
	@Override
	public void execute(Model model) {
		// db호출하여 데이터 DTO에 저장
		PethotelInfoDto dto = adminDao.adminPethotelInfo();
		model.addAttribute("dto", dto);
	}
}
