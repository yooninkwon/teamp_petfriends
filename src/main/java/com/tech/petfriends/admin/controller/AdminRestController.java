package com.tech.petfriends.admin.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.AdminPethotelDataService;
import com.tech.petfriends.admin.service.AdminPethotelInfoData;
import com.tech.petfriends.admin.service.AdminPethotelInfoEditService;
import com.tech.petfriends.admin.service.AdminPethotelIntroData;
import com.tech.petfriends.admin.service.AdminPethotelIntroEditService;
import com.tech.petfriends.admin.service.AdminPethotelReserveDetailService;
import com.tech.petfriends.admin.service.AdminPethotelReserveUpdateService;
import com.tech.petfriends.admin.service.AdminPetteacherDataService;
import com.tech.petfriends.admin.service.AdminPetteacherDeleteService;
import com.tech.petfriends.admin.service.AdminPetteacherDetailService;
import com.tech.petfriends.admin.service.AdminPetteacherEditService;
import com.tech.petfriends.admin.service.AdminPetteacherWriteService;
import com.tech.petfriends.admin.service.AdminServiceInterface;
import com.tech.petfriends.helppetf.dto.PethotelInfoDto;
import com.tech.petfriends.helppetf.dto.PethotelIntroDto;
import com.tech.petfriends.helppetf.dto.PethotelMemDataDto;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@RestController
@RequestMapping("/admin")
public class AdminRestController {

	@Autowired
	AdminPageDao adminDao;

	AdminServiceInterface adminServiceInterface;

	@PostMapping("/pethotel_reserve_update")
	public String pethotelReserveUpdate(@RequestBody Map<String, String> statusMap, HttpServletRequest request, Model model) {
		model.addAttribute("statusMap", statusMap);
		model.addAttribute("request", request);
		adminServiceInterface = new AdminPethotelReserveUpdateService(adminDao);
		adminServiceInterface.execute(model);
		
		return "{\"status\": \"success\"}";
	}

	@GetMapping("/pethotel_admin_reserve_detail")
	public String pethotelReserveDetail(HttpServletRequest request, Model model) throws JsonProcessingException {
		AdminPethotelReserveDetailService adminService = new AdminPethotelReserveDetailService(adminDao);
		
		return adminService.execute(model, request);
	}

	@SuppressWarnings("unchecked")
	@GetMapping("/pethotel_admin_reserve")
	public ArrayList<PethotelMemDataDto> pethotelReserveData(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		adminServiceInterface = new AdminPethotelDataService(adminDao);
		adminServiceInterface.execute(model);
		
		return (ArrayList<PethotelMemDataDto>) model.getAttribute("memSelectDto");
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping("/petteacher_admin_data")
	public List<PetteacherDto> getPetteacherData(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		adminServiceInterface = new AdminPetteacherDataService(adminDao);
		adminServiceInterface.execute(model);
		
		return (List<PetteacherDto>) model.getAttribute("petteacherList");
	}

	@GetMapping("/petteacher_admin_data_forEdit")
	public PetteacherDto petteacherDataForEdit(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		adminServiceInterface = new AdminPetteacherDetailService(adminDao);
		adminServiceInterface.execute(model);

		return (PetteacherDto) model.getAttribute("dto");
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

	@PutMapping("/petteacher_admin_data_forEdit")
	public String petteacherDataForEdit(@RequestBody PetteacherDto dto, HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		model.addAttribute("dto", dto);
		adminServiceInterface = new AdminPetteacherEditService(adminDao);
		adminServiceInterface.execute(model);

		return "{\"status\": \"success\"}";
	}

	@GetMapping("/pethotel_intro_data")
	public PethotelIntroDto pethotelIntroData(Model model) {
		adminServiceInterface = new AdminPethotelIntroData(adminDao);
		adminServiceInterface.execute(model);
		return (PethotelIntroDto) model.getAttribute("dto");
	}

	@GetMapping("/pethotel_info_data")
	public PethotelInfoDto pethotelInfoData(Model model) {
		adminServiceInterface = new AdminPethotelInfoData(adminDao);
		adminServiceInterface.execute(model);
		return (PethotelInfoDto) model.getAttribute("dto");
	}

	@PutMapping("/pethotel_admin_intro_dataForEdit")
	public String pethotelIntroForEdit(@RequestBody PethotelIntroDto dto, HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		model.addAttribute("dto", dto);
		adminServiceInterface = new AdminPethotelIntroEditService(adminDao);
		adminServiceInterface.execute(model);

		return "{\"status\": \"success\"}";
	}

	@PutMapping("/pethotel_admin_info_dataForEdit")
	public String pethotelInfoForEdit(@RequestBody PethotelInfoDto dto, HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		model.addAttribute("dto", dto);
		adminServiceInterface = new AdminPethotelInfoEditService(adminDao);
		adminServiceInterface.execute(model);

		return "{\"status\": \"success\"}";
	}
}
