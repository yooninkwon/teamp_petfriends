package com.tech.petfriends.admin.service.helppetf;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.interfaces.AdminExecuteAndReturn;
import com.tech.petfriends.helppetf.dto.PethotelInfoDto;

@Service
public class AdminPethotelInfoData implements AdminExecuteAndReturn<PethotelInfoDto> {

	private final AdminPageDao adminDao;
	
	public AdminPethotelInfoData(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}
	
	@Override
	public ResponseEntity<PethotelInfoDto> execute() {
		// db호출하여 데이터 DTO에 저장
		return ResponseEntity.ok(adminDao.adminPethotelInfo());
	}
}
