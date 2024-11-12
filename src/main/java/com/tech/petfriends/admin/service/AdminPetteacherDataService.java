package com.tech.petfriends.admin.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@Service
public class AdminPetteacherDataService implements AdminExecuteModelRequest {

	private AdminPageDao adminDao;

	public AdminPetteacherDataService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	@Override
	public void execute(Model model, HttpServletRequest request) {
		
		String type = request.getParameter("type");
		String category = request.getParameter("category");
		String sort = request.getParameter("sort");

		List<PetteacherDto> petteacherList = adminDao.getPetteacherList(type, category, sort);
		
		model.addAttribute("petteacherList", petteacherList);
	}

}
