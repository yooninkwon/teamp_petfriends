package com.tech.petfriends.helppetf.service.group;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
	private final PethotelSelectPetService pethotelSelectPetService;
	private final PethotelReserveService pethotelReserveDataService;
	private final PethotelMainService pethotelMainService;
	private final AdoptionGetJson adoptionGetJson;
	private final PetteacherMainService petteacherMainService;
	private final PetteacherDetailService petteacherDetailService;
	private final FindAddrMapService findAddrMapService;
	
	public ResponseEntity<ArrayList<MyPetDto>> executePethotelSelectPetService(HttpSession session) {
		return pethotelSelectPetService.execute(session);
	}
	
	public ResponseEntity<String> executePethotelReserveDataService(HttpServletRequest request, 
			HttpSession session, ArrayList<PethotelFormDataDto> formList) {
		pethotelReserveDataService.setFormList(formList);
		return pethotelReserveDataService.execute(request, session);
	}
	
	public ResponseEntity<String> executePethotelMainService() {
		return pethotelMainService.execute();
	}

	public Mono<ResponseEntity<HelpPetfAdoptionItemsVo>> executeAdoptionGetJson(HttpServletRequest request) {
		return adoptionGetJson.execute(request);
	}

	public ResponseEntity<ArrayList<PetteacherDto>> executePetteacherMainService(HttpServletRequest request) {
		return petteacherMainService.execute(request);
	}
	
	public ResponseEntity<PetteacherDto> executePetteacherDetailService(HttpServletRequest request) {
		return petteacherDetailService.execute(request);
	}
	
	public ResponseEntity<String> executeFindAddrMapService(HttpSession session) {
		return findAddrMapService.execute(session);
	}
	
}
