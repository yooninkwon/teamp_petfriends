package com.tech.petfriends.admin.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.helppetf.dto.PethotelFormDataDto;
import com.tech.petfriends.helppetf.dto.PethotelInfoDto;
import com.tech.petfriends.helppetf.dto.PethotelIntroDto;
import com.tech.petfriends.helppetf.dto.PethotelMemDataDto;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@Mapper
public interface AdminPageDao {

	PetteacherDto adminPetteacherDetail(String hpt_seq);

	void adminPetteacherWrite(String hpt_channal, String hpt_title, String hpt_exp, String hpt_content, String hpt_yt_videoid,
			String hpt_pettype, String hpt_category);

	void adminPetteacherDelete(String hpt_seq);
	
	ArrayList<PetteacherDto> getPetteacherList(String type, String category, String sort);

	ArrayList<PetteacherDto> adminPetteacherDetail(String petType, String category);

	void adminPetteacherEdit(String hpt_seq, String hpt_channal, String hpt_title, String hpt_exp, String hpt_content,
			String hpt_yt_videoid, String hpt_pettype, String hpt_category);

	PethotelIntroDto adminPethotelIntro();

	PethotelInfoDto adminPethotelInfo();

	void adminPethotelIntroEdit(String intro_line1, String intro_line2, String intro_line3, String intro_line4,
			String intro_line5, String intro_line6, String intro_line7, String intro_line8, String intro_line9);

	void adminPethotelInfoEdit(String info_line1, String info_line2, String info_line3, String info_line4,
			String info_line5, String info_line6, String info_line7, String info_line8, String info_line9,
			String info_line10, String info_line11, String info_line12, String info_line13, String info_line14,
			String info_line15, String info_line16);

	ArrayList<PethotelMemDataDto> adminPethotelReserveData(String reserveType, String startDate, String endDate,
			String memberCode, String reserveCode);
	
	ArrayList<PethotelFormDataDto> adminPethotelReservePets(String hph_reserve_no);
	
	PethotelMemDataDto adminPethotelReserveMem(String hph_reserve_no);

	void adminPethotelReserveUpdate(String hph_reserve_no, String hph_status, String hph_refusal_reason);
}