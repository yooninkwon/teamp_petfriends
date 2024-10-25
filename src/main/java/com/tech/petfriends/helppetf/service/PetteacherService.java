package com.tech.petfriends.helppetf.service;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.dto.PetteacherDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;

@Service
public class PetteacherService implements HelppetfServiceInter {
	
	private HelpPetfDao helpDao;
	
	public PetteacherService(HelpPetfDao helpDao) {
		this.helpDao = helpDao;
	}

	@Override
	public void execute(Model model) {
		Map<String, Object> map = model.asMap();
		HttpServletRequest request = (HttpServletRequest) map.get("request");
		String petType = request.getParameter("petType");
		String category = request.getParameter("category");

		ArrayList<PetteacherDto> ylist = helpDao.petteacherList(petType, category);

		model.addAttribute("ylist", ylist);
	}
}