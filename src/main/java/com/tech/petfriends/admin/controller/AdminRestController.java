package com.tech.petfriends.admin.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.AdminPetteacherDetailService;
import com.tech.petfriends.admin.service.AdminServiceInterface;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@RestController
@RequestMapping("/admin")
public class AdminRestController {
	
	@Autowired
	AdminPageDao adminDao;
	
	AdminServiceInterface adminServiceInterface;
	
	@GetMapping("/petteacher_admin_data")
	public List<PetteacherDto> getPetteacherData(HttpServletRequest request) {

		String type = request.getParameter("type");
		String category = request.getParameter("category");
		String sort = request.getParameter("sort");

		List<PetteacherDto> petteacherList = adminDao.getPetteacherList(type, category, sort);

		return petteacherList;
	}
	
	@GetMapping("/petteacher_admin_data_forEdit")
	public PetteacherDto petteacherDataForEdit(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		adminServiceInterface = new AdminPetteacherDetailService(adminDao);
		adminServiceInterface.execute(model);
		
		PetteacherDto dto = (PetteacherDto) model.getAttribute("dto");
		
		return dto;
	}

}


