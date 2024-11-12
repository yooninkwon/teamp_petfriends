package com.tech.petfriends.admin.service;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PethotelMemDataDto;

public class AdminPethotelDataService implements AdminExecuteModelRequest {

	private AdminPageDao adminDao;

	public AdminPethotelDataService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	@Override
	public void execute(Model model, HttpServletRequest request) {

		String reserveType = request.getParameter("reserveType");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String memberCode = request.getParameter("memberCode");
		String reserveCode = request.getParameter("reserveCode");

		// 각각 데이터 전달해 DB 호출하여 데이터 불러옴
		ArrayList<PethotelMemDataDto> memSelectDto = adminDao.adminPethotelReserveData(reserveType, startDate, endDate,
				memberCode, reserveCode);
		
		// model에 등록
		model.addAttribute("memSelectDto", memSelectDto);

	}

}
