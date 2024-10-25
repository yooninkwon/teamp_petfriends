package com.tech.petfriends.admin.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@RestController
@RequestMapping("/admin")
public class AdminRestController {
	
	@Autowired
	AdminPageDao adminDao;
	
	@GetMapping("/petteacher_data")
	public List<PetteacherDto> getPetteacherData(HttpServletRequest request) {

		String type = request.getParameter("type");
		String category = request.getParameter("category");
		String sort = request.getParameter("sort");

		List<PetteacherDto> petteacherList = adminDao.getPetteacherList(type, category, sort);

		return petteacherList;
	}
}
