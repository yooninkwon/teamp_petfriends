package com.tech.petfriends.helppetf.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.petfriends.helppetf.vo.HelpPetfAdoptionItemsVo;
// 서비스 코드 작성
// HelpPetfAdoptionItemsVo에 json value의 Object 형식을 매핑해 return
@Service
public class AdoptionService {
	
	public HelpPetfAdoptionItemsVo parsingJsonObject(String json) {
		HelpPetfAdoptionItemsVo items = null;
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			items = mapper.readValue(json, HelpPetfAdoptionItemsVo.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return items;
	}
}
