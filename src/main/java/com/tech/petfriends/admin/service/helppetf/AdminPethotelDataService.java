package com.tech.petfriends.admin.service.helppetf;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.interfaces.AdminExecuteModelRequestAndReturn;
import com.tech.petfriends.helppetf.dto.PethotelMemDataDto;

@Service
public class AdminPethotelDataService implements AdminExecuteModelRequestAndReturn<ArrayList<PethotelMemDataDto>> {

	private final AdminPageDao adminDao;

	public AdminPethotelDataService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	@Override
	public ResponseEntity<ArrayList<PethotelMemDataDto>> execute(Model model, HttpServletRequest request) {

		String reserveType = request.getParameter("reserveType");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String memberCode = request.getParameter("memberCode");
		String reserveCode = request.getParameter("reserveCode");

		// 각각 데이터 전달해 DB 호출하여 데이터 불러옴
		return ResponseEntity.ok(adminDao.adminPethotelReserveData(reserveType, startDate,
				endDate,memberCode, reserveCode));
		
	}

}
