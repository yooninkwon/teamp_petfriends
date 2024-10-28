package com.tech.petfriends.admin.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.AdminPetteacherDataService;
import com.tech.petfriends.admin.service.AdminPetteacherDeleteService;
import com.tech.petfriends.admin.service.AdminPetteacherDetailService;
import com.tech.petfriends.admin.service.AdminPetteacherEditService;
import com.tech.petfriends.admin.service.AdminPetteacherWriteService;
import com.tech.petfriends.admin.service.AdminServiceInterface;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@RestController
@RequestMapping("/admin")
public class AdminRestController {
	
	@Autowired
	AdminPageDao adminDao;
	
	AdminServiceInterface adminServiceInterface;
	
	@GetMapping("/petteacher_admin_data")
	public List<PetteacherDto> getPetteacherData(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		adminServiceInterface = new AdminPetteacherDataService(adminDao);
		adminServiceInterface.execute(model);
		
		@SuppressWarnings("unchecked")
		List<PetteacherDto> petteacherList = (List<PetteacherDto>) model.getAttribute("petteacherList");
		
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
	
	@DeleteMapping("/petteacher_admin_data_forDelete")
	public String petteacherDataForDelete(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		adminServiceInterface = new AdminPetteacherDeleteService(adminDao);
		adminServiceInterface.execute(model);
		
		return "{\"status\": \"success\"}";
	}

	@PostMapping("/petteacher_admin_data_forWrite")
	public String petteacherDataForWrite(@RequestBody PetteacherDto dto, Model model) {
		model.addAttribute("dto", dto);
		adminServiceInterface = new AdminPetteacherWriteService(adminDao);
		adminServiceInterface.execute(model);
		
		return "{\"status\": \"success\"}";
	}

	@PutMapping("petteacher_admin_data_forEdit")
	public String petteacherDataForEdit(@RequestBody PetteacherDto dto, HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		model.addAttribute("dto", dto);
		adminServiceInterface = new AdminPetteacherEditService(adminDao);
		adminServiceInterface.execute(model);
		
		return "{\"status\": \"success\"}";
	}

}


