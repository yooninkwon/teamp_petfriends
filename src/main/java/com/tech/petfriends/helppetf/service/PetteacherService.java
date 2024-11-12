package com.tech.petfriends.helppetf.service;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.dto.PetteacherDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;

@Service
public class PetteacherService implements HelppetfExecuteModelRequest {
	
	private HelpPetfDao helpPetfDao;
	
	public PetteacherService(HelpPetfDao helpPetfDao) {
		this.helpPetfDao = helpPetfDao;
	}

	@Override
	public void execute(HttpServletRequest request, Model model) {
		
		String petType = request.getParameter("petType");
		String category = request.getParameter("category");
		
		// 파라미터를 첨부하여 DB호출, 데이터 리턴받음
		ArrayList<PetteacherDto> ylist = helpPetfDao.petteacherList(petType, category);

		model.addAttribute("ylist", ylist);
	}
}