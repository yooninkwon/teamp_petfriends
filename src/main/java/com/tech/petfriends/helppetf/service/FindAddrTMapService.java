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
		String apiKey = (String) model.getAttribute("apiKey");
		model.addAttribute("apiKey", apiKey);
		
		model.addAttribute("main_navbar_id", "helppetf");
		
		HttpSession session = (HttpSession) model.getAttribute("session");
		
		MemberLoginDto memDto = (MemberLoginDto) session.getAttribute("loginUser");
		
		if (memDto == null) {
			// 로그인이 안돼있을 경우 기본 주소를 서울시청으로
			String userAddr = "서울특별시 중구 세종대로 110";
			model.addAttribute("userAddr", userAddr);
			model.addAttribute("mem_nick", null);
		} else {
			String mem_nick = memDto.getMem_nick();
			String mem_code = memDto.getMem_code();
			model.addAttribute("mem_nick", mem_nick);
			
			String userAddr = helpDao.findUserAddr(mem_code);
			model.addAttribute("userAddr", userAddr);
			model.addAttribute("mem_nick", mem_nick);
		}
	}
	
}
