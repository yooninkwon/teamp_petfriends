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
		// model을 Map으로 변환
		Map<String, Object> map = model.asMap();
		
		// 세션을 추출
		HttpSession session = (HttpSession) map.get("session");
		
		// 세션에서 로그인 정보를 추출
		MemberLoginDto loginDto = (MemberLoginDto) session.getAttribute("loginUser");
		
		// 로그인 정보에서 멤버 코드를 저장
		String mem_code = loginDto.getMem_code();
		
		// DB에 멤버코드를 전달하여 멤버가 저장한 반려동물 추출
		ArrayList<MyPetDto> petDto = helpDao.pethotelSelectPet(mem_code);

		model.addAttribute("petDto", petDto);
	}
}
