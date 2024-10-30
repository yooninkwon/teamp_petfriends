package com.tech.petfriends.helppetf.service;

import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

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

	public void execute(Model model) throws Exception {
		Map<String, Object> map = model.asMap();
		
		HttpServletRequest request = (HttpServletRequest) map.get("request");
		String start_date = request.getParameter("start-date");
		String end_date = request.getParameter("end-date");

		HttpSession session = (HttpSession) map.get("session");
		MemberLoginDto memberLoginDto = (MemberLoginDto) session.getAttribute("loginUser");
		
		@SuppressWarnings("unchecked")
		ArrayList<PethotelFormDataDto> formList = (ArrayList<PethotelFormDataDto>) map.get("formList");
		String memId[] = memberLoginDto.getMem_email().split("@");
		String memStartDate[] = start_date.split("-");
		String memEndDate[] = end_date.split("-");
		String hph_reserve_no = memStartDate[0] + memStartDate[1] + memStartDate[2] + "D" + memId[0] + "D" + memEndDate[0] + memEndDate[1] + memEndDate[2];
		int numOfPet = 0;
		formList.remove(null);
		model.addAttribute("nullRemovedFormList", formList);
		try {
			for (int i = 0; i < formList.size(); i++) {

				PethotelFormDataDto petDto = formList.get(i);
				numOfPet++;
				String hphp_reserve_pet_no = hph_reserve_no + "PET" + petDto.getHphp_reserve_pet_no();
				String hphp_pet_name = petDto.getHphp_pet_name();
				String hphp_pet_type = petDto.getHphp_pet_type();
				String hphp_pet_birth = petDto.getHphp_pet_birth();
				String hphp_pet_gender = petDto.getHphp_pet_gender();
				String hphp_pet_weight = petDto.getHphp_pet_weight();
				String hphp_pet_neut = petDto.getHphp_pet_neut();
				String hphp_pet_comment = petDto.getHphp_pet_comment();

				System.out.println("PET - num: " + numOfPet + "|" + hphp_reserve_pet_no + "|" + hphp_pet_name + "|"
						+ hphp_pet_type + "|" + hphp_pet_birth + "|" + hphp_pet_gender + "|" + hphp_pet_weight + "|"
						+ hphp_pet_neut + "|" + hphp_pet_comment);
				helpDao.pethotelReverseRequestPets(hph_reserve_no, hphp_reserve_pet_no, hphp_pet_name,
						hphp_pet_type, hphp_pet_birth, hphp_pet_gender, hphp_pet_weight, hphp_pet_neut,
						hphp_pet_comment);
			}

			PethotelMemDataDto memDto = new PethotelMemDataDto();
			String mem_code = memberLoginDto.getMem_code();
			String mem_nick = memberLoginDto.getMem_nick();
			String hph_numof_pet = numOfPet + "";
			Date hph_start_date = null;
			Date hph_end_date = null;
			
			hph_start_date = java.sql.Date.valueOf(start_date);
			hph_end_date = java.sql.Date.valueOf(end_date);

			memDto.setHph_reserve_no(hph_reserve_no);
			memDto.setMem_code(mem_code);
			memDto.setMem_nick(mem_nick);
			memDto.setHph_numof_pet(hph_numof_pet);
			memDto.setHph_start_date(hph_start_date);
			memDto.setHph_end_date(hph_end_date);

			System.out.println("MEM: " + hph_reserve_no + "|" + mem_code + "|" + hph_numof_pet + "|" + hph_start_date
					+ "|" + hph_end_date);

			helpDao.pethotelReverseRequestMem(hph_reserve_no, mem_code, hph_numof_pet, hph_start_date, hph_end_date);

			model.addAttribute("mem_Dto", memDto);
		} catch (Exception e) {
			System.out.println("insert error");
			
			try {
				helpDao.pethotelReserveErrorPet(hph_reserve_no);
				helpDao.pethotelReserveErrorMem(hph_reserve_no);
			} catch (Exception se) {
				se.printStackTrace();
				throw new Exception();
			}
			
			e.printStackTrace();
			throw e;
		}

	}

}
