package com.tech.petfriends.helppetf.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.dto.HelpPetfDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;

@Service
public class PetteacherService implements HelppetfServiceInter {
	
	private HelpPetfDao helpDao;
	
	public PetteacherService(HelpPetfDao helpDao) {
		this.helpDao = helpDao;
	}

	@Override
	public void execute(Model model) {

		ArrayList<HelpPetfDto> ylist = helpDao.petteacherList();

		model.addAttribute("ylist", ylist);
	}
}
