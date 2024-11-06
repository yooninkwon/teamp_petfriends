package com.tech.petfriends.helppetf.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.dto.PethotelInfoDto;
import com.tech.petfriends.helppetf.dto.PethotelIntroDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;

@Service
public class PethotelMainService implements HelppetfServiceInter {
	
	HelpPetfDao helpDao;
	
	public PethotelMainService(HelpPetfDao helpDao) {
		this.helpDao = helpDao; 
	}
	
	@Override
	public void execute(Model model) {
		model.addAttribute("main_navbar_id", "helppetf");
		model.addAttribute("sub_navbar_id", "pethotel");
		
		// model에서 페이지를 식별할 값을 추출
		String pethotelPage = (String) model.getAttribute("pethotelPage");
		
		// 추출한 데이터가 info, intro일 경우 각각에 해당하는 데이터를 요청
		if(pethotelPage.equals("info")) {
			PethotelInfoDto dto = helpDao.pethotelInfo();
			model.addAttribute("dto", dto);
		} else {
			PethotelIntroDto dto = helpDao.pethotelIntro();
			model.addAttribute("dto", dto);
		}
		
		
		
	}

}
