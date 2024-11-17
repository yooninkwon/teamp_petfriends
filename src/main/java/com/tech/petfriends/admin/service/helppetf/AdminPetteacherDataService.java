package com.tech.petfriends.admin.service.helppetf;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.interfaces.AdminExecuteRequestAndReturn;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@Service
public class AdminPetteacherDataService implements AdminExecuteRequestAndReturn<ArrayList<PetteacherDto>> {

	private final AdminPageDao adminDao;

	public AdminPetteacherDataService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	@Override
	public ResponseEntity<ArrayList<PetteacherDto>> execute(HttpServletRequest request) {
		
		String type = request.getParameter("type");
		String category = request.getParameter("category");
		String sort = request.getParameter("sort");

		return ResponseEntity.ok(adminDao.getPetteacherList(type, category, sort));
		
	}

}
