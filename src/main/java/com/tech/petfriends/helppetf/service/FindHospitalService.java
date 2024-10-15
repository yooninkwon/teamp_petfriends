package com.tech.petfriends.helppetf.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.mapper.HelpPetfDao;

@Service
public class FindHospitalService implements HelppetfServiceInter {
	
	private HelpPetfDao helpDao;
	public FindHospitalService(HelpPetfDao helpDao) {
		this.helpDao = helpDao;
	}

	@Override
	public void execute(Model model) {
		String apiKey = (String) model.getAttribute("apiKey");
		model.addAttribute("apiKey", apiKey);
		
		// 임시로 user id를 "aaa"로 넣은 코드: 
		// DB 내부 아이디 aaa에 해당하는 주소를 반환
		String userAddr = helpDao.findUserAddr("aaa");
		model.addAttribute("userAddr", userAddr);
	}
	
}
