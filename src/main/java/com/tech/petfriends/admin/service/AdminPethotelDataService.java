package com.tech.petfriends.admin.service;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PethotelMemDataDto;

public class AdminPethotelDataService implements AdminServiceInterface {

	private AdminPageDao adminDao;

	public AdminPethotelDataService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	@Override
	public void execute(Model model) {
		Map<String, Object> map = model.asMap();
		HttpServletRequest request = (HttpServletRequest) map.get("request");
		
		String reserveType = request.getParameter("reserveType");
		String searchOrder = request.getParameter("searchOrder");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String memberCode = request.getParameter("memberCode");
		String reserveCode = request.getParameter("reserveCode");

		ArrayList<PethotelMemDataDto> memSelectDto = adminDao.adminPethotelReserveData(reserveType, searchOrder, startDate, endDate, memberCode, reserveCode);
		model.addAttribute("memSelectDto", memSelectDto);

	}

}
