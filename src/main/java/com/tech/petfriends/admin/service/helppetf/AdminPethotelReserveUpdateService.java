package com.tech.petfriends.admin.service.helppetf;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.interfaces.AdminExecuteModelAndReturn;

@Service
public class AdminPethotelReserveUpdateService implements AdminExecuteModelAndReturn<String> {
	
	private final AdminPageDao adminDao;
	
	private Map<String, String> statusMap;
	
	public void setStatusMap(Map<String, String> statusMap) {
		this.statusMap = statusMap;
	}

	public AdminPethotelReserveUpdateService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}
	
	@Override
	public ResponseEntity<String> execute(Model model) {
		
		// 전달받은 statusMap에서 데이터 추출
		String hph_reserve_no = (String) statusMap.get("hph_reserve_no");
		String hph_status = (String) statusMap.get("hph_status");
		String hph_refusal_reason = (String) statusMap.get("hph_refusal_reason");
		
		// DB호출
		adminDao.adminPethotelReserveUpdate(hph_reserve_no, hph_status, hph_refusal_reason);
		
		return ResponseEntity.ok("데이터베이스 통신 성공");
	}
}
