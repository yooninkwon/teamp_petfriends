package com.tech.petfriends.admin.service;

import java.util.Map;

import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;

public class AdminPethotelReserveUpdateService implements AdminServiceInterface {
	
	AdminPageDao adminDao;
	
	public AdminPethotelReserveUpdateService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}
	
	@Override
	public void execute(Model model) {
		// model을 Map으로 변환
		Map<String, Object> map = model.asMap();
		
		@SuppressWarnings("unchecked")
		// statusMap은 스크립트에서 넘겨받은 오브젝트임 - 예약번호, 예약상태, 거절사유
		Map<String, String> statusMap = (Map<String, String>) map.get("statusMap");
		
		String hph_reserve_no = statusMap.get("hph_reserve_no");
		String hph_status = statusMap.get("hph_status");
		String hph_refusal_reason = statusMap.get("hph_refusal_reason");
		
		// DB호출
		adminDao.adminPethotelReserveUpdate(hph_reserve_no, hph_status, hph_refusal_reason);
	}
}
