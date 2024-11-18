package com.tech.petfriends.admin.service.helppetf;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.interfaces.AdminExecuteAndReturn;
import com.tech.petfriends.helppetf.dto.PethotelIntroDto;

@Service
public class AdminPethotelIntroData implements AdminExecuteAndReturn<PethotelIntroDto> {
	
	private final AdminPageDao adminDao;
	
	public AdminPethotelIntroData(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}
	
	@Override
	public ResponseEntity<PethotelIntroDto> execute() {
		// db호출하여 데이터 DTO에 저장
		return ResponseEntity.ok(adminDao.adminPethotelIntro());
	}
}