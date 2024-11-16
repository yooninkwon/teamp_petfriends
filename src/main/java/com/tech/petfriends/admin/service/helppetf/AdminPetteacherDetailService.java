package com.tech.petfriends.admin.service.helppetf;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.interfaces.AdminExecuteModelRequestAndReturn;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@Service
public class AdminPetteacherDetailService implements AdminExecuteModelRequestAndReturn<PetteacherDto> {
	
	private final AdminPageDao adminDao;

	public AdminPetteacherDetailService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	@Override
	public ResponseEntity<PetteacherDto> execute(Model model, HttpServletRequest request) {

		String hpt_seq = request.getParameter("hpt_seq");
		
		// 파라미터 데이터 첨부해서 DB 호출, 데이터 불러옴
		return ResponseEntity.ok(adminDao.adminPetteacherDetail(hpt_seq));
	}
}
