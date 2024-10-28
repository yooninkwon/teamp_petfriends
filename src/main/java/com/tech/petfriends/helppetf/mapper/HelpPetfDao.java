package com.tech.petfriends.helppetf.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.helppetf.dto.PetteacherDto;

@Mapper
public interface HelpPetfDao {
	
	public PetteacherDto petteacherDetail(String hpt_seq);

	public ArrayList<PetteacherDto> petteacherList(String petType, String category);

	public String findUserAddr(String userId);

	public void upViews(String hpt_seq);
}
