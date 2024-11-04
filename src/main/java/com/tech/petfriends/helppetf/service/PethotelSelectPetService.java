package com.tech.petfriends.helppetf.service;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.mapper.HelpPetfDao;
import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.mypage.dto.MyPetDto;

public class PethotelSelectPetService implements HelppetfServiceInter {
	
	HelpPetfDao helpDao;
	
	public PethotelSelectPetService(HelpPetfDao helpDao) {
		this.helpDao = helpDao;
	}
	
	@Override
	public void execute(Model model) {	
		Map<String, Object> map = model.asMap();
		
		HttpSession session = (HttpSession) map.get("session");
		
		MemberLoginDto loginDto = (MemberLoginDto) session.getAttribute("loginUser");
		
		String mem_code = loginDto.getMem_code();
		
		ArrayList<MyPetDto> petDto = helpDao.pethotelSelectPet(mem_code);
		
//		String Pet_name = petDto.getPet_name();
//		String Pet_type = petDto.getPet_type();
//		Date Pet_birth = petDto.getPet_birth();
//		String Pet_gender = petDto.getPet_gender();
//		String Pet_weight = petDto.getPet_weight();
//		String Pet_neut = petDto.getPet_neut();
//		String Pet_img = petDto.getPet_img();
		model.addAttribute("petDto", petDto);
		
		
	}

}
