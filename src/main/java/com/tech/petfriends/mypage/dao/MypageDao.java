package com.tech.petfriends.mypage.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.mypage.dto.MyPetDto;

@Mapper
public interface MypageDao {

	ArrayList<MyPetDto> getPetsByMemberCode(String memCode);
	
}
