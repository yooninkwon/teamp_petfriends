package com.tech.petfriends.helppetf.service;

import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.dto.PethotelIntroDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;

public class PethotelIntroService implements HelppetfServiceInter {
	
	HelpPetfDao helpDao;
	
	public PethotelIntroService(HelpPetfDao helpDao) {
		this.helpDao = helpDao; 
	}
	
	@Override
	public void execute(Model model) {

		model.addAttribute("main_navbar_id", "helppetf");
		model.addAttribute("sub_navbar_id", "pethotel");
		PethotelIntroDto dto = helpDao.pethotelIntro();
		model.addAttribute("dto", dto);
	}

}
