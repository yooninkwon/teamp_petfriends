package com.tech.petfriends.admin.controller;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.admin.service.group.AdminHelppetfServiceGroup;
import com.tech.petfriends.helppetf.dto.PethotelInfoDto;
import com.tech.petfriends.helppetf.dto.PethotelIntroDto;
import com.tech.petfriends.helppetf.dto.PethotelMemDataDto;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@RestController
@RequestMapping("/admin")
public class AdminHelppetfRestController {
	
	final AdminHelppetfServiceGroup helppetfServiceGroup;
	
	public AdminHelppetfRestController(AdminHelppetfServiceGroup helppetfServiceGroup) {
		this.helppetfServiceGroup = helppetfServiceGroup;
	}
	
	@PutMapping("/pethotel_reserve_update")
	public ResponseEntity<String> pethotelReserveUpdate(@RequestBody Map<String, String> statusMap) {
		return helppetfServiceGroup.executeAdminPethotelReserveUpdate(statusMap);
	}

	@GetMapping("/pethotel_admin_reserve_detail")
	public ResponseEntity<String> pethotelReserveDetail(HttpServletRequest request) {
		return helppetfServiceGroup.executeAdminPethotelReserveDetailService(request);
	}

	@GetMapping("/pethotel_admin_reserve")
	public ResponseEntity<ArrayList<PethotelMemDataDto>> pethotelReserveData(HttpServletRequest request) {
		return helppetfServiceGroup.executeAdminPethotelDataService(request);
	}
	
	@GetMapping("/petteacher_admin_data")
	public ResponseEntity<ArrayList<PetteacherDto>> getPetteacherData(HttpServletRequest request) {
		return helppetfServiceGroup.executeAdminPetteacherDataService(request);
	}

	@GetMapping("/petteacher_admin_data_forEdit")
	public ResponseEntity<PetteacherDto> petteacherDataForEdit(HttpServletRequest request) {
		return helppetfServiceGroup.executeAdminPetteacherDetailService(request);
	}

	@DeleteMapping("/petteacher_admin_data_forDelete")
	public ResponseEntity<String> petteacherDataForDelete(HttpServletRequest request) {
		return helppetfServiceGroup.executeAdminPetteacherDeleteService(request);
	}

	@PostMapping("/petteacher_admin_data_forWrite")
	public ResponseEntity<String> petteacherDataForWrite(@RequestBody PetteacherDto dto) {
		return helppetfServiceGroup.executeAdminPetteacherWriteService(dto);
	}

	@PutMapping("/petteacher_admin_data_forEdit")
	public ResponseEntity<String> petteacherDataForEdit(@RequestBody PetteacherDto dto, HttpServletRequest request) {		
		return helppetfServiceGroup.executeAdminPetteacherEditService(request, dto);
	}

	@GetMapping("/pethotel_admin_intro_data")
	public ResponseEntity<PethotelIntroDto> pethotelIntroData() {
		return helppetfServiceGroup.executeAdminPethotelIntroData();
	}

	@GetMapping("/pethotel_admin_info_data")
	public ResponseEntity<PethotelInfoDto> pethotelInfoData() {
		return helppetfServiceGroup.executeAdminPethotelInfoData();
	}

	@PutMapping("/pethotel_admin_intro_dataForEdit")
	public ResponseEntity<String> pethotelIntroForEdit(@RequestBody PethotelIntroDto dto, HttpServletRequest request) {
		return helppetfServiceGroup.executeAdminPethotelIntroEditService(dto);
	}

	@PutMapping("/pethotel_admin_info_dataForEdit")
	public ResponseEntity<String> pethotelInfoForEdit(@RequestBody PethotelInfoDto dto, HttpServletRequest request) {
		return helppetfServiceGroup.executeAdminPethotelInfoEditService(dto);
	}

}
