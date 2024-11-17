package com.tech.petfriends.admin.service.helppetf;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.interfaces.AdminExecuteAndReturn;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@Service
public class AdminPetteacherWriteService implements AdminExecuteAndReturn<String> {

	private final AdminPageDao adminDao;
	
	private PetteacherDto dto;

	public void setDto(PetteacherDto dto) {
		this.dto = dto;
	}

	public AdminPetteacherWriteService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	@Override
	public ResponseEntity<String> execute() {
		
		String hpt_title = dto.getHpt_title();
		String hpt_exp = dto.getHpt_exp();
		String hpt_content = dto.getHpt_content();
		String hpt_yt_videoid = dto.getHpt_yt_videoid();
		String hpt_pettype = dto.getHpt_pettype();
		String hpt_category = dto.getHpt_category();
		String hpt_channal = dto.getHpt_channal();
		
		// 데이터 첨부하여 DB호출, insert
		adminDao.adminPetteacherWrite(hpt_channal, hpt_title, hpt_exp, hpt_content, 
				hpt_yt_videoid, hpt_pettype, hpt_category);
		
		return ResponseEntity.ok("데이터베이스 통신 성공");
	}

}
