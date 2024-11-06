package com.tech.petfriends.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.ACommunityDto;

@Mapper
public interface AdminCommuntiyDao {
	
  List<ACommunityDto> communityList(int board_no);
	
}
