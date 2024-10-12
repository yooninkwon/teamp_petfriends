package com.tech.petfriends.admin.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.tech.petfriends.admin.dto.AdminHelpPetfDto;
import com.tech.petfriends.admin.mapper.AdminPageDao;

public class AdminPetteacherDetailService implements AdminServiceInterface {
	
	private AdminPageDao adminDao;

	public AdminPetteacherDetailService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	@Override
	public void execute(Model model) {
		Map<String, Object> map = model.asMap();
		HttpServletRequest request = (HttpServletRequest) map.get("request");
		String hpt_seq = request.getParameter("hpt_seq");
		
		AdminHelpPetfDto dto = adminDao.adminPetteacherDetail(hpt_seq);
		model.addAttribute("dto", dto);
	}
	
	
}
