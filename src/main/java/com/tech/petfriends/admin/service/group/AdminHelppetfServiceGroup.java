package com.tech.petfriends.admin.service.group;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.service.helppetf.AdminPethotelDataService;
import com.tech.petfriends.admin.service.helppetf.AdminPethotelInfoData;
import com.tech.petfriends.admin.service.helppetf.AdminPethotelInfoEditService;
import com.tech.petfriends.admin.service.helppetf.AdminPethotelIntroData;
import com.tech.petfriends.admin.service.helppetf.AdminPethotelIntroEditService;
import com.tech.petfriends.admin.service.helppetf.AdminPethotelReserveDetailService;
import com.tech.petfriends.admin.service.helppetf.AdminPethotelReserveUpdateService;
import com.tech.petfriends.admin.service.helppetf.AdminPetteacherDataService;
import com.tech.petfriends.admin.service.helppetf.AdminPetteacherDeleteService;
import com.tech.petfriends.admin.service.helppetf.AdminPetteacherDetailService;
import com.tech.petfriends.admin.service.helppetf.AdminPetteacherEditService;
import com.tech.petfriends.admin.service.helppetf.AdminPetteacherWriteService;
import com.tech.petfriends.helppetf.dto.PethotelInfoDto;
import com.tech.petfriends.helppetf.dto.PethotelIntroDto;
import com.tech.petfriends.helppetf.dto.PethotelMemDataDto;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminHelppetfServiceGroup {
	final AdminPethotelReserveUpdateService adminPethotelReserveUpdateService;
	final AdminPethotelReserveDetailService adminPethotelReserveDetailService;
	final AdminPethotelDataService adminPethotelDataService;
	final AdminPetteacherDataService adminPetteacherDataService;
	final AdminPetteacherDetailService adminPetteacherDetailService;
	final AdminPetteacherDeleteService adminPetteacherDeleteService;
	final AdminPetteacherWriteService adminPetteacherWriteService;
	final AdminPetteacherEditService adminPetteacherEditService;
	final AdminPethotelIntroData adminPethotelIntroData;
	final AdminPethotelInfoData adminPethotelInfoData;
	final AdminPethotelIntroEditService adminPethotelIntroEditService;
	final AdminPethotelInfoEditService adminPethotelInfoEditService;

	public ResponseEntity<String> executeAdminPethotelReserveUpdate(Model model, Map<String, String> statusMap) {
		adminPethotelReserveUpdateService.setStatusMap(statusMap);
		return adminPethotelReserveUpdateService.execute(model);
	}

	public ResponseEntity<String> executeAdminPethotelReserveDetailService(Model model, HttpServletRequest request) {
		return adminPethotelReserveDetailService.execute(model, request);
	}

	public ResponseEntity<ArrayList<PethotelMemDataDto>> executeAdminPethotelDataService(Model model,
			HttpServletRequest request) {
		return adminPethotelDataService.execute(model, request);
	}

	public ResponseEntity<ArrayList<PetteacherDto>> executeAdminPetteacherDataService(Model model,
			HttpServletRequest request) {
		return adminPetteacherDataService.execute(model, request);
	}

	public ResponseEntity<PetteacherDto> executeAdminPetteacherDetailService(Model model, HttpServletRequest request) {
		return adminPetteacherDetailService.execute(model, request);
	}

	public ResponseEntity<String> executeAdminPetteacherDeleteService(Model model, HttpServletRequest request) {
		return adminPetteacherDeleteService.execute(model, request);
	}

	public ResponseEntity<String> executeAdminPetteacherWriteService(Model model, PetteacherDto dto) {
		adminPetteacherWriteService.setDto(dto);
		return adminPetteacherWriteService.execute(model);
	}

	public ResponseEntity<String> executeAdminPetteacherEditService(Model model, HttpServletRequest request,
			PetteacherDto dto) {
		adminPetteacherEditService.setDto(dto);
		return adminPetteacherEditService.execute(model, request);
	}

	public ResponseEntity<PethotelIntroDto> executeAdminPethotelIntroData(Model model) {
		return adminPethotelIntroData.execute(model);
	}

	public ResponseEntity<PethotelInfoDto> executeAdminPethotelInfoData(Model model) {
		return adminPethotelInfoData.execute(model);
	}

	public ResponseEntity<String> executeAdminPethotelIntroEditService(Model model, PethotelIntroDto dto) {
		adminPethotelIntroEditService.setIntroDto(dto);
		return adminPethotelIntroEditService.execute(model);
	}

	public ResponseEntity<String> executeAdminPethotelInfoEditService(Model model, PethotelInfoDto dto) {
		adminPethotelInfoEditService.setInfoDto(dto);
		return adminPethotelInfoEditService.execute(model);
	}

}
