package com.tech.petfriends.admin.service.helppetf;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.interfaces.AdminExecuteModelRequestAndReturn;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@Service
public class AdminPetteacherDataService implements AdminExecuteModelRequestAndReturn<ArrayList<PetteacherDto>> {

	private final AdminPageDao adminDao;

	public AdminPetteacherDataService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	@Override
	public ResponseEntity<ArrayList<PetteacherDto>> execute(Model model, HttpServletRequest request) {
		
		String type = request.getParameter("type");
		String category = request.getParameter("category");
		String sort = request.getParameter("sort");

		return ResponseEntity.ok(adminDao.getPetteacherList(type, category, sort));
		
	}

}
