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
		Map<String, Object> map = model.asMap();
		
		@SuppressWarnings("unchecked")
		Map<String, String> statusMap = (Map<String, String>) map.get("statusMap");
		
		String hph_reserve_no = statusMap.get("hph_reserve_no");
		String hph_status = statusMap.get("hph_status");
		String hph_refusal_reason = statusMap.get("hph_refusal_reason");
		
		adminDao.adminPethotelReserveUpdate(hph_reserve_no, hph_status, hph_refusal_reason);
	}
}
