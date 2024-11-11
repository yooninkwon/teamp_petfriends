package com.tech.petfriends.helppetf.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
		
		String json = null;
		
		PethotelInfoDto infoDto = helpDao.pethotelInfo();
		model.addAttribute("infoDto", infoDto);

		PethotelIntroDto introDto = helpDao.pethotelIntro();
		model.addAttribute("introDto", introDto);

		Map<String, Object> map = new HashMap<>();
		map.put("infoDto", infoDto);
		map.put("introDto", introDto);
		try {
			json = new ObjectMapper().writeValueAsString(map);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		if(json != null) {
			model.addAttribute("json", json);
		} else {
			model.addAttribute("json", "Error: Database load failed");
		}
		
	}
}
