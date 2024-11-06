package com.tech.petfriends.helppetf.service;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.mapper.HelpPetfDao;
import com.tech.petfriends.login.dto.MemberLoginDto;

@Service
public class FindAddrTMapService implements HelppetfServiceInter {
	
	private HelpPetfDao helpDao;
	public FindAddrTMapService(HelpPetfDao helpDao) {
		this.helpDao = helpDao;
	}

	@Override
	public void execute(Model model) {
		model.addAttribute("main_navbar_id", "helppetf");
		
		// 모델에서 세션을 추출
		HttpSession session = (HttpSession) model.getAttribute("session");
		
		// 세션에서 로그인 정보를 추출
		MemberLoginDto memDto = (MemberLoginDto) session.getAttribute("loginUser");
		
		if (memDto == null) {
			// 로그인 정보가 null인 경우 주소를 서울시청으로 지정
			String userAddr = "서울특별시 중구 세종대로 110";
			model.addAttribute("userAddr", userAddr);
			model.addAttribute("mem_nick", null);
		} else {
			// 로그인 정보DTO에서 멤버 코드와 닉네임을 저장
			String mem_nick = memDto.getMem_nick();
			String mem_code = memDto.getMem_code();
			
			// 멤버코드를 전달하여 멤버가 저장한 대표 주소를 반환받음
			String userAddr = helpDao.findUserAddr(mem_code);
			model.addAttribute("userAddr", userAddr);
			model.addAttribute("mem_nick", mem_nick);
		}
	}
	
}
