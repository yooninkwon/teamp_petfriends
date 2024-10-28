package com.tech.petfriends.admin.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.helppetf.dto.PetteacherDto;

@Mapper
public interface AdminPageDao {

	PetteacherDto adminPetteacherDetail(String hpt_seq);

	void adminPetteacherWrite(String hpt_channal, String hpt_title, String hpt_exp, String hpt_content, String hpt_yt_videoid,
			String hpt_pettype, String hpt_category);

	void adminPetteacherDelete(String hpt_seq);
	
	List<PetteacherDto> getPetteacherList(String type, String category, String sort);

	ArrayList<PetteacherDto> adminPetteacherDetail(String petType, String category);

	void adminPetteacherEdit(String hpt_seq, String hpt_channal, String hpt_title, String hpt_exp, String hpt_content,
			String hpt_yt_videoid, String hpt_pettype, String hpt_category);
}