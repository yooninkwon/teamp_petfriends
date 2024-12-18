package com.tech.petfriends.helppetf.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.petfriends.helppetf.dto.PetteacherDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;
import com.tech.petfriends.helppetf.service.interfaces.HelppetfExecuteRequest;

@Service
public class PetteacherDetailService implements HelppetfExecuteRequest<PetteacherDto> {
	
	private final HelpPetfDao helpDao;
	
	public PetteacherDetailService(HelpPetfDao helpDao) {
		this.helpDao = helpDao;
	}

	@Override
	public ResponseEntity<PetteacherDto> execute(HttpServletRequest request) {
		
		// 파라미터의 값을 저장
		String hpt_seq = request.getParameter("hpt_seq");
		
		// 전달받은 파라미터 값에 해당하는 글 번호를 가진 게시글의 조회수를 +1
		helpDao.upViews(hpt_seq); // 조회수 +1
		
		// 전달받은 파라미터 값에 해당하는 글 번호를 가진 게시글의 상세 내용을 DTO객체에 저장
		return ResponseEntity.ok(helpDao.petteacherDetail(hpt_seq));
	}
	
}
