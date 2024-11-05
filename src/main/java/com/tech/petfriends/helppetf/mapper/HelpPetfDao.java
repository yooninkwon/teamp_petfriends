package com.tech.petfriends.helppetf.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.helppetf.dto.PethotelInfoDto;
import com.tech.petfriends.helppetf.dto.PethotelIntroDto;
import com.tech.petfriends.helppetf.dto.PetteacherDto;
import com.tech.petfriends.mypage.dto.MyPetDto;

@Mapper
public interface HelpPetfDao {
	
	public PetteacherDto petteacherDetail(String hpt_seq);

	public ArrayList<PetteacherDto> petteacherList(String petType, String category);

	public String findUserAddr(String mem_code);

	public void upViews(String hpt_seq);

	public PethotelIntroDto pethotelIntro();

	public PethotelInfoDto pethotelInfo();

	public int pethotelReverseRequestPets(String hph_reserve_no, String hphp_reserve_pet_no, String hphp_pet_name,
			String hphp_pet_type, String hphp_pet_birth, String hphp_pet_gender, String hphp_pet_weight,
			String hphp_pet_neut, String hphp_pet_comment);

	public int pethotelReverseRequestMem(String hph_reserve_no, String mem_code, String mem_nick, String hph_numof_pet,
			String hph_start_date, String hph_end_date);

	public void pethotelReserveErrorPet(String hph_reserve_no);
	
	public void pethotelReserveErrorMem(String hph_reserve_no);

	public ArrayList<MyPetDto> pethotelSelectPet(String mem_code);
}
