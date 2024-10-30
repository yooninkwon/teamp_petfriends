package com.tech.petfriends.admin.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PethotelInfoDto;

@Service
public class AdminPethotelInfoData implements AdminServiceInterface {

	AdminPageDao adminDao;
	
	public AdminPethotelInfoData(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}
	
	@Override
	public void execute(Model model) {
		PethotelInfoDto dto = adminDao.adminPethotelInfo();
		model.addAttribute("dto", dto);
	}
}
