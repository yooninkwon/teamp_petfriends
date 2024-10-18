package com.tech.petfriends.mypage.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.mypage.dto.GradeDto;
import com.tech.petfriends.mypage.dto.MyPetDto;

@Mapper
public interface MypageDao {

	ArrayList<MyPetDto> getPetsByMemberCode(String memCode);

	MemberLoginDto getInfoByMemberCode(String memCode);

	GradeDto getGradeByMemberCode(String memCode);

	void removeMainPet(String previousChecked);

	void setMainPet(String newlyChecked);

	MyPetDto getInfoByPetCode(String petCode);
	
}
