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
		
		String hph_start_date = request.getParameter("start-date");
		String hph_end_date = request.getParameter("end-date");

		MemberLoginDto memberLoginDto = (MemberLoginDto) session.getAttribute("loginUser");
		PethotelMemDataDto memDto;
		String memId[] = memberLoginDto.getMem_email().split("@");
		String memStartDate[] = hph_start_date.split("-");
		String memEndDate[] = hph_end_date.split("-");
		String hph_reserve_no = memStartDate[0] + memStartDate[1] + memStartDate[2] + memEndDate[0] + memEndDate[1] + memEndDate[2] + "_" + memId[0];
		int numOfPet = 0;
		formList.remove(null);
		
		try {
			for (int i = 0; i < formList.size(); i++) {
				
				PethotelFormDataDto petDto = formList.get(i);
				numOfPet++;
				String hphp_reserve_pet_no = hph_reserve_no + "_PET" + petDto.getHphp_reserve_pet_no();
				String hphp_pet_name = petDto.getHphp_pet_name();
				String hphp_pet_type = petDto.getHphp_pet_type();
				String hphp_pet_birth = petDto.getHphp_pet_birth();
				String hphp_pet_gender = petDto.getHphp_pet_gender();
				String hphp_pet_weight = petDto.getHphp_pet_weight();
				String hphp_pet_neut = petDto.getHphp_pet_neut();
				String hphp_pet_comment = petDto.getHphp_comment();

				helpDao.pethotelReverseRequestPets(hph_reserve_no, hphp_reserve_pet_no, hphp_pet_name,
						hphp_pet_type, hphp_pet_birth, hphp_pet_gender, hphp_pet_weight, hphp_pet_neut,
						hphp_pet_comment);
			}

			memDto = new PethotelMemDataDto();
			String mem_code = memberLoginDto.getMem_code();
			String mem_nick = memberLoginDto.getMem_nick();
			String hph_numof_pet = numOfPet + "";

			memDto.setHph_reserve_no(hph_reserve_no);
			memDto.setMem_code(mem_code);
			memDto.setMem_nick(mem_nick);
			memDto.setHph_numof_pet(hph_numof_pet);
			memDto.setHph_start_date(hph_start_date);
			memDto.setHph_end_date(hph_end_date);

			helpDao.pethotelReverseRequestMem(hph_reserve_no, mem_code, mem_nick, hph_numof_pet, hph_start_date, hph_end_date);

			model.addAttribute("mem_Dto", memDto);
		} catch (Exception e) {
			
			System.out.println("insert error");
			
			try {
				helpDao.pethotelReserveErrorPet(hph_reserve_no);
				helpDao.pethotelReserveErrorMem(hph_reserve_no);
			} catch (Exception se) {
				se.printStackTrace();
				throw new Exception(se);
			}
			
			e.printStackTrace();
			throw new Exception(e);
		}
		
		// return
		
		Map<String, Object> map = new HashMap<>();
		map.put("nrFormList", formList);
		map.put("mem_Dto", memDto);
		
        String jsonData = new ObjectMapper().writeValueAsString(map);
	
        return jsonData;
	}

}
