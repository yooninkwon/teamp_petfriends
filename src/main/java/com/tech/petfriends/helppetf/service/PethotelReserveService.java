package com.tech.petfriends.helppetf.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.petfriends.helppetf.dto.PethotelFormDataDto;
import com.tech.petfriends.helppetf.dto.PethotelMemDataDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;
import com.tech.petfriends.login.dto.MemberLoginDto;

@Service
public class PethotelReserveService {

	HelpPetfDao helpDao;

	public PethotelReserveService(HelpPetfDao helpDao) {
		this.helpDao = helpDao;
	}

	public String execute(Model model, HttpSession session, HttpServletRequest request, ArrayList<PethotelFormDataDto> formList) throws Exception {
		
		// request의 예약 시작, 종료일 저장
		String hph_start_date = request.getParameter("start-date");
		String hph_end_date = request.getParameter("end-date");

		// 세션의 로그인 유저 정보 객체로 저장
		MemberLoginDto memberLoginDto = (MemberLoginDto) session.getAttribute("loginUser");
		
		// 예약정보 DTO 초기화
		PethotelMemDataDto memDto = null;
		
		// memId는 로그인한 이메일 주소의 "@" 이전의 값들만 저장
		String memId[] = memberLoginDto.getMem_email().split("@");
		
		// 시작, 종료일의 "-"를 제거하여 배열에 저장
		String memStartDate[] = hph_start_date.split("-");
		String memEndDate[] = hph_end_date.split("-");
		int random = (int) (Math.random()*10000);
		// 예약번호를 시작일[0~2] + 종료일[0~2] + 멤버아이디[0] + 랜덤숫자(0~9999) 로 설정 => ex) 2024110620241206_dpoowa
		String hph_reserve_no = memStartDate[0] + memStartDate[1] + memStartDate[2] 
				+ memEndDate[0] + memEndDate[1] + memEndDate[2] + memId[0] + random;
		
		// 예약한 동물의 마리 수 초기화
		int numOfPet = 0;
		
		// 전달받은 ArrayList(여러개의 폼을 저장한 오브젝트로 만들어짐)중 null인 인덱스를 제거
		formList.remove(null);
		
		try {
			// 전달받은 ArrayList의 인덱스 크기만큼 반복
			for (int i = 0; i < formList.size(); i++) {
				// DTO타입 ArrayList를 펫호텔 예약 펫 정보 DTO객체에 추출
				PethotelFormDataDto petDto = formList.get(i);
				
				// 반복될 때마다 예약펫 마리수를 +1
				numOfPet++;
				
				// 예약 펫 번호를 예약번호 + "_PET" + 폼에서의 인덱스넘버 로 설정 => ex) 2024110620241206_dpoowa_PET3
				String hphp_reserve_pet_no = hph_reserve_no + "_PET" + petDto.getHphp_reserve_pet_no();
				
				// DTO의 데이터를 각각 추출
				String hphp_pet_name = petDto.getHphp_pet_name();
				String hphp_pet_type = petDto.getHphp_pet_type();
				String hphp_pet_birth = petDto.getHphp_pet_birth();
				String hphp_pet_gender = petDto.getHphp_pet_gender();
				String hphp_pet_weight = petDto.getHphp_pet_weight();
				String hphp_pet_neut = petDto.getHphp_pet_neut();
				String hphp_pet_comment = petDto.getHphp_comment();

				// 파라미터로 첨부하여 DB에 저장
				helpDao.pethotelReverseRequestPets(hph_reserve_no, hphp_reserve_pet_no, hphp_pet_name,
						hphp_pet_type, hphp_pet_birth, hphp_pet_gender, hphp_pet_weight, hphp_pet_neut,
						hphp_pet_comment);
			}
			
			// 예약정보 객체 생성
			memDto = new PethotelMemDataDto();
			
			// 세션의 로그인정보 DTO에서 멤버 코드와 닉네임을 추출
			String mem_code = memberLoginDto.getMem_code();
			String mem_nick = memberLoginDto.getMem_nick();
			String hph_numof_pet = numOfPet + ""; // int인 마리 수를 String으로 변환
			
			// 예약정보 DTO에 필요한 정보 저장
			memDto.setHph_reserve_no(hph_reserve_no);
			memDto.setMem_code(mem_code);
			memDto.setMem_nick(mem_nick);
			memDto.setHph_numof_pet(hph_numof_pet);
			memDto.setHph_start_date(hph_start_date);
			memDto.setHph_end_date(hph_end_date);
			
			// 파라미터로 첨부하여 DB에 저장 
			helpDao.pethotelReverseRequestMem(hph_reserve_no, mem_code, mem_nick, hph_numof_pet, hph_start_date, hph_end_date);
		} catch (Exception e) {
			// catch: 위의 try과정 중 예외발생시
			System.out.println("insert error");
			try {
				// 예약 중 예외 발생시 예약번호에 해당하는 데이터 제거
				helpDao.pethotelReserveErrorPet(hph_reserve_no);
				helpDao.pethotelReserveErrorMem(hph_reserve_no);
			} catch (Exception se) {
				se.printStackTrace();
				throw new Exception(se);
			}
			
			e.printStackTrace();
			throw new Exception(e);
		}
		
		// Map 객체를 생성해 null을 제거한 ArrayList와 예약정보 Dto를 저장
		Map<String, Object> map = new HashMap<>();
		map.put("nrFormList", formList);
		map.put("mem_Dto", memDto);
		
		// Map 객체를 ObjectMapper를 사용하여 Json형식(String)으로 변환해 반환
        return new ObjectMapper().writeValueAsString(map);
	}

}
