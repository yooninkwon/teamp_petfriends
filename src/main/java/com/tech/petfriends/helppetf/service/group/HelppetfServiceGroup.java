package com.tech.petfriends.helppetf.service.group;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.dto.PethotelFormDataDto;
import com.tech.petfriends.helppetf.dto.PetteacherDto;
import com.tech.petfriends.helppetf.service.AdoptionGetJson;
import com.tech.petfriends.helppetf.service.FindAddrMapService;
import com.tech.petfriends.helppetf.service.PethotelMainService;
import com.tech.petfriends.helppetf.service.PethotelReserveService;
import com.tech.petfriends.helppetf.service.PethotelSelectPetService;
import com.tech.petfriends.helppetf.service.PetteacherDetailService;
import com.tech.petfriends.helppetf.service.PetteacherMainService;
import com.tech.petfriends.helppetf.vo.HelpPetfAdoptionItemsVo;
import com.tech.petfriends.mypage.dto.MyPetDto;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@Service
public class HelppetfServiceGroup {
	final PethotelSelectPetService pethotelSelectPetService;
	final PethotelReserveService pethotelReserveDataService;
	final PethotelMainService pethotelMainService;
	final AdoptionGetJson adoptionGetJson;
	final PetteacherMainService petteacherMainService;
	final PetteacherDetailService petteacherDetailService;
	final FindAddrMapService findAddrMapService;
	
	public ResponseEntity<ArrayList<MyPetDto>> executePethotelSelectPetService(Model model, HttpSession session) {
		return pethotelSelectPetService.execute(model, session);
	}
	
	public ResponseEntity<String> executePethotelReserveDataService(Model model, HttpServletRequest request, 
			HttpSession session, ArrayList<PethotelFormDataDto> formList) {
		pethotelReserveDataService.setFormList(formList);
		return pethotelReserveDataService.execute(model, request, session);
	}
	
	public ResponseEntity<String> executePethotelMainService(Model model) {
		return pethotelMainService.execute(model);
	}

	public Mono<ResponseEntity<HelpPetfAdoptionItemsVo>> executeAdoptionGetJson(Model model, HttpServletRequest request) {
		return adoptionGetJson.execute(model, request);
	}

	public ResponseEntity<ArrayList<PetteacherDto>> executePetteacherMainService(Model model, HttpServletRequest request) {
		return petteacherMainService.execute(model, request);
	}
	
	public ResponseEntity<PetteacherDto> executePetteacherDetailService(Model model, HttpServletRequest request) {
		return petteacherDetailService.execute(model, request);
	}
	
	public ResponseEntity<String> executeFindAddrMapService(Model model, HttpSession session) {
		return findAddrMapService.execute(model, session);
	}
	
}
