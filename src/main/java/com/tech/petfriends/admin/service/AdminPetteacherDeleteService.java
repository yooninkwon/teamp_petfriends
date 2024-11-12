package com.tech.petfriends.admin.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;

@Service
public class AdminPetteacherDeleteService implements AdminExecuteModelRequest {

	private AdminPageDao adminDao;
	
	public AdminPetteacherDeleteService(AdminPageDao adminDao) {
		this.adminDao = adminDao; 
	}

	@Override
	public void execute(HttpServletRequest request, Model model) {
		String hpt_seq = request.getParameter("hpt_seq");
		
		// 파라미터 첨부하여 DB 호출, 데이터 삭제
		adminDao.adminPetteacherDelete(hpt_seq);
	}

}
