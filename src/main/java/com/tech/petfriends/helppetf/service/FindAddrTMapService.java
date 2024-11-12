package com.tech.petfriends.helppetf.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;
import com.tech.petfriends.login.dto.MemberLoginDto;

@Service
public class FindAddrTMapService implements HelppetfExecuteModelSession {
	
	private HelpPetfDao helpDao;
	public FindAddrTMapService(HelpPetfDao helpDao) {
		this.helpDao = helpDao;
	}

	@Override
	public void execute(HttpSession session, Model model) {
		String userAddr = "";
		String mem_nick = null;
		String mem_code = "";
		
		// 세션에서 로그인 정보를 추출
		MemberLoginDto memDto = (MemberLoginDto) session.getAttribute("loginUser");
		
		if (memDto == null) {
			// 로그인 정보가 null인 경우 주소를 서울시청으로 지정
			userAddr = "서울특별시 중구 세종대로 110";
		} else {
			// 로그인 정보DTO에서 멤버 코드와 닉네임을 저장
			mem_nick = memDto.getMem_nick();
			mem_code = memDto.getMem_code();
			
			// 멤버코드를 전달하여 멤버가 저장한 대표 주소를 반환받음
			userAddr = helpDao.findUserAddr(mem_code);
		}
		
		// 데이터들을 Key-Value 형식으로 저장
		Map<String, Object> map = new HashMap<>();
		map.put("userAddr", userAddr);
		map.put("mem_nick", mem_nick);
		
		// Map을 json형식으로 변환
		try {
			model.addAttribute("jsonData", new ObjectMapper().writeValueAsString(map));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}
	
}
