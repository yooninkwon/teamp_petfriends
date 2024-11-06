package com.tech.petfriends.admin.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;

@Service
public class AdminPetteacherDeleteService implements AdminServiceInterface {

	AdminPageDao adminDao;
	
	public AdminPetteacherDeleteService(AdminPageDao adminDao) {
		this.adminDao = adminDao; 
	}

	@Override
	public void execute(Model model) {
		// model을 Map으로 변환
		Map<String, Object> map = model.asMap();
		
		// request 추출
		HttpServletRequest request = (HttpServletRequest) map.get("request");
		String hpt_seq = request.getParameter("hpt_seq");
		
		// 파라미터 첨부하여 DB 호출, 데이터 삭제
		adminDao.adminPetteacherDelete(hpt_seq);
	}

}
