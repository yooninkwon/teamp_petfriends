package com.tech.petfriends.helppetf.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.dto.PethotelInfoDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;

@Service
public class PethotelInfoService implements HelppetfServiceInter {
	
	HelpPetfDao helpDao;
	
	public PethotelInfoService(HelpPetfDao helpDao) {
		this.helpDao = helpDao; 
	}
	
	@Override
	public void execute(Model model) {
		model.addAttribute("main_navbar_id", "helppetf");
		model.addAttribute("sub_navbar_id", "pethotel");
		PethotelInfoDto dto = helpDao.pethotelInfo();
		model.addAttribute("dto", dto);
	}

}
