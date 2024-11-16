package com.tech.petfriends.helppetf.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.petfriends.helppetf.dto.PethotelInfoDto;
import com.tech.petfriends.helppetf.dto.PethotelIntroDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;
import com.tech.petfriends.helppetf.service.interfaces.HelppetfExecuteModel;

@Service
public class PethotelMainService implements HelppetfExecuteModel<String> {
	
	private final HelpPetfDao helpDao;
	
	public PethotelMainService(HelpPetfDao helpDao) {
		this.helpDao = helpDao; 
	}
	
	@Override
	public ResponseEntity<String> execute(Model model) {
				
		PethotelInfoDto infoDto = helpDao.pethotelInfo();
		model.addAttribute("infoDto", infoDto);

		PethotelIntroDto introDto = helpDao.pethotelIntro();
		model.addAttribute("introDto", introDto);

		Map<String, Object> map = new HashMap<>();
		map.put("infoDto", infoDto);
		map.put("introDto", introDto);
		try {
			return ResponseEntity.ok(new ObjectMapper().writeValueAsString(map));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 처리 중 오류 발생");
		}
	}
}
