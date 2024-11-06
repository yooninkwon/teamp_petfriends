package com.tech.petfriends.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.ACommunityDto;

@Mapper
public interface AdminCommunityDao {
	
  List<ACommunityDto> communityList(String searchKeyword, String searchFilterType, String searchCategory, String searchStartDate, String searchEndDate);
	
}
