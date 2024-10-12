package com.tech.petfriends.helppetf.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.dto.HelpPetfDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;

@Service
public class PetteacherDetailService implements HelppetfServiceInter {
	
	private HelpPetfDao helpDao;
	
	public PetteacherDetailService(HelpPetfDao helpDao) {
		this.helpDao = helpDao;
	}

	@Override
	public void execute(Model model) {
		
		Map<String, Object> map = model.asMap();
		HttpServletRequest request = (HttpServletRequest) map.get("request");
		
		String hpt_seq = request.getParameter("hpt_seq");
		HelpPetfDto dto = helpDao.petteacherDetail(hpt_seq);
		
		model.addAttribute("dto", dto);
	}
	
}
