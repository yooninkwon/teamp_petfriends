package com.tech.petfriends.admin.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PethotelFormDataDto;
import com.tech.petfriends.helppetf.dto.PethotelMemDataDto;

public class AdminPethotelReserveDetailService {
	
	private AdminPageDao adminDao;

	public AdminPethotelReserveDetailService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	public String execute(Model model, HttpServletRequest request) throws JsonProcessingException {
		
		String hph_reserve_no = request.getParameter("hph_reserve_no");
		
		ArrayList<PethotelFormDataDto> reservePets = adminDao.adminPethotelReservePets(hph_reserve_no);
		PethotelMemDataDto reserveMem = adminDao.adminPethotelReserveMem(hph_reserve_no);
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("reservePets", reservePets);
		map.put("reserveMem", reserveMem);
		
		String jsonData =  new ObjectMapper().writeValueAsString(map);
        return jsonData;
	}

}