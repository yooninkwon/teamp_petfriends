package com.tech.petfriends.admin.service;

import java.util.ArrayList;

import org.springframework.ui.Model;

import com.tech.petfriends.admin.dto.AdminHelpPetfDto;
import com.tech.petfriends.admin.mapper.AdminPageDao;

public class AdminPetteacherService implements AdminServiceInterface {
	
	private AdminPageDao adminDao;

	public AdminPetteacherService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	@Override
	public void execute(Model model) {
//		ArrayList<AdminHelpPetfDto> ylist = adminDao.adminPetteacherList();
//		model.addAttribute("ylist", ylist);
	}
	
	
}
