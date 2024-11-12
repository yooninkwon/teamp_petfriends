package com.tech.petfriends.admin.service;

import java.util.Map;

import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;

public class AdminPethotelReserveUpdateService implements AdminExecuteModel {
	
	private AdminPageDao adminDao;
	
	private Map<String, String> statusMap;
	
	public AdminPethotelReserveUpdateService(AdminPageDao adminDao, Map<String, String> statusMap) {
		this.adminDao = adminDao;
		this.statusMap = statusMap;
	}
	
	@Override
	public void execute(Model model) {
		
		// 전달받은 statusMap에서 데이터 추출
		String hph_reserve_no = (String) statusMap.get("hph_reserve_no");
		String hph_status = (String) statusMap.get("hph_status");
		String hph_refusal_reason = (String) statusMap.get("hph_refusal_reason");
		
		// DB호출
		adminDao.adminPethotelReserveUpdate(hph_reserve_no, hph_status, hph_refusal_reason);
	}
}
