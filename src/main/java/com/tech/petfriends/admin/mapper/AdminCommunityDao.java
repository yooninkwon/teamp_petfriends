package com.tech.petfriends.admin.mapper;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.admin.dto.ACommunityDto;

@Mapper
public interface AdminCommunityDao {
	
  List<ACommunityDto> communityList(String searchKeyword, String searchFilterType, String searchCategory, String searchStartDate, String searchEndDate);
 
  List<ACommunityDto> reportList(String searchKeyword, String searchFilterType, String searchCategory, String searchStartDate, String searchEndDate);
  
  // 총 게시글 수 조회
  int totalItems(String searchKeyword, String searchFilterType, 
                 String searchCategory, String searchStartDate, 
                 String searchEndDate);

	
  int reportTotalItems(String searchKeyword, String searchFilterType, 
          String searchCategory, String searchStartDate, 
          String searchEndDate);

  void reportStatusUpdate(int reportId);

 
  
  
  
  
}
