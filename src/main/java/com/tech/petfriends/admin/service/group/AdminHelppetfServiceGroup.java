package com.tech.petfriends.admin.service.group;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
	private final AdminPethotelReserveUpdateService adminPethotelReserveUpdateService;
	private final AdminPethotelReserveDetailService adminPethotelReserveDetailService;
	private final AdminPethotelDataService adminPethotelDataService;
	private final AdminPetteacherDataService adminPetteacherDataService;
	private final AdminPetteacherDetailService adminPetteacherDetailService;
	private final AdminPetteacherDeleteService adminPetteacherDeleteService;
	private final AdminPetteacherWriteService adminPetteacherWriteService;
	private final AdminPetteacherEditService adminPetteacherEditService;
	private final AdminPethotelIntroData adminPethotelIntroData;
	private final AdminPethotelInfoData adminPethotelInfoData;
	private final AdminPethotelIntroEditService adminPethotelIntroEditService;
	private final AdminPethotelInfoEditService adminPethotelInfoEditService;

	public ResponseEntity<String> executeAdminPethotelReserveUpdate(Map<String, String> statusMap) {
		adminPethotelReserveUpdateService.setStatusMap(statusMap);
		return adminPethotelReserveUpdateService.execute();
	}

	public ResponseEntity<String> executeAdminPethotelReserveDetailService(HttpServletRequest request) {
		return adminPethotelReserveDetailService.execute(request);
	}

	public ResponseEntity<ArrayList<PethotelMemDataDto>> executeAdminPethotelDataService(HttpServletRequest request) {
		return adminPethotelDataService.execute(request);
	}

	public ResponseEntity<ArrayList<PetteacherDto>> executeAdminPetteacherDataService(HttpServletRequest request) {
		return adminPetteacherDataService.execute(request);
	}

	public ResponseEntity<PetteacherDto> executeAdminPetteacherDetailService(HttpServletRequest request) {
		return adminPetteacherDetailService.execute(request);
	}

	public ResponseEntity<String> executeAdminPetteacherDeleteService(HttpServletRequest request) {
		return adminPetteacherDeleteService.execute(request);
	}

	public ResponseEntity<String> executeAdminPetteacherWriteService(PetteacherDto dto) {
		adminPetteacherWriteService.setDto(dto);
		return adminPetteacherWriteService.execute();
	}

	public ResponseEntity<String> executeAdminPetteacherEditService(HttpServletRequest request, PetteacherDto dto) {
		adminPetteacherEditService.setDto(dto);
		return adminPetteacherEditService.execute(request);
	}

	public ResponseEntity<PethotelIntroDto> executeAdminPethotelIntroData() {
		return adminPethotelIntroData.execute();
	}

	public ResponseEntity<PethotelInfoDto> executeAdminPethotelInfoData() {
		return adminPethotelInfoData.execute();
	}

	public ResponseEntity<String> executeAdminPethotelIntroEditService(PethotelIntroDto dto) {
		adminPethotelIntroEditService.setIntroDto(dto);
		return adminPethotelIntroEditService.execute();
	}

	public ResponseEntity<String> executeAdminPethotelInfoEditService(PethotelInfoDto dto) {
		adminPethotelInfoEditService.setInfoDto(dto);
		return adminPethotelInfoEditService.execute();
	}

}
