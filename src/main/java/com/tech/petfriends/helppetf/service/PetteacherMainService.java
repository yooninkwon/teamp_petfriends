package com.tech.petfriends.helppetf.service;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.dto.PetteacherDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;
import com.tech.petfriends.helppetf.service.interfaces.HelppetfExecuteModelRequest;

@Service
public class PetteacherMainService implements HelppetfExecuteModelRequest<ArrayList<PetteacherDto>> {
	
	private final HelpPetfDao helpPetfDao;
	
	public PetteacherMainService(HelpPetfDao helpPetfDao) {
		this.helpPetfDao = helpPetfDao;
	}

	@Override
	public ResponseEntity<ArrayList<PetteacherDto>> execute(Model model, HttpServletRequest request) {
		
		String petType = request.getParameter("petType");
		String category = request.getParameter("category");
		
		// 파라미터를 첨부하여 DB호출, 데이터 리턴
		return ResponseEntity.ok(helpPetfDao.petteacherList(petType, category));
	}
}