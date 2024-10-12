package com.tech.petfriends.admin.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.AdminHelpPetfDto;

@Mapper
public interface AdminPageDao {

	ArrayList<AdminHelpPetfDto> adminPetteacherList();

	AdminHelpPetfDto adminPetteacherDetail(String hpt_seq);

	void adminPetteacherWrite(String hpt_title, String hpt_exp, String hpt_content, String hpt_yt_url, String hpt_yt_videoid,
			String hpt_pettype, String hpt_category);

	void adminPetteacherDelete(String hpt_seq);
	
}
