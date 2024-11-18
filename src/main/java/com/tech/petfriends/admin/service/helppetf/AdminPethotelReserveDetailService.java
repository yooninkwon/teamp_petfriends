package com.tech.petfriends.admin.service.helppetf;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.interfaces.AdminExecuteRequestAndReturn;
import com.tech.petfriends.helppetf.dto.PethotelFormDataDto;
import com.tech.petfriends.helppetf.dto.PethotelMemDataDto;

@Service
public class AdminPethotelReserveDetailService implements AdminExecuteRequestAndReturn<String>{
	
	private final AdminPageDao adminDao;

	public AdminPethotelReserveDetailService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}
	
	@Override
	public ResponseEntity<String> execute(HttpServletRequest request) {
		// 전달받은 예약번호 저장
		String hph_reserve_no = request.getParameter("hph_reserve_no");
				
		// 예약번호에 해당하는 "예약정보" 데이터 저장
		PethotelMemDataDto reserveMem = adminDao.adminPethotelReserveMem(hph_reserve_no);
		
		// 예약번호에 해당하는 "펫 정보"들 데이터 저장
		ArrayList<PethotelFormDataDto> reservePets = adminDao.adminPethotelReservePets(hph_reserve_no);
		
		Map<String, Object> map = new HashMap<>();
		
		// Map에 각각 데이터들 저장
		map.put("reservePets", reservePets);
		map.put("reserveMem", reserveMem);
		
		// Map을 json(String) 형식으로 변환하여 모델에 전달
		try {
			return ResponseEntity.ok(new ObjectMapper().writeValueAsString(map));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("펫정보 불러오기 실패");
		}
	}

}