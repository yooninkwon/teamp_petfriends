package com.tech.petfriends.admin.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@Service
public class AdminPetteacherDetailService implements AdminServiceInterface {
	
	private AdminPageDao adminDao;

	public AdminPetteacherDetailService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	@Override
	public void execute(Model model) {
		// model을 Map으로 변환
		Map<String, Object> map = model.asMap();
		// request 추출
		HttpServletRequest request = (HttpServletRequest) map.get("request");
		String hpt_seq = request.getParameter("hpt_seq");
		
		// 파라미터 데이터 첨부해서 DB 호출, 데이터 불러옴
		PetteacherDto dto = adminDao.adminPetteacherDetail(hpt_seq);
		
		// model에 전달
		model.addAttribute("dto", dto);
	}
}
