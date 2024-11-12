package com.tech.petfriends.admin.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;

import com.tech.petfriends.admin.dto.ACommunityDto;
import com.tech.petfriends.admin.mapper.AdminCommunityDao;


public class AdminCommunityReportService implements AdminExecuteModel {

	private AdminCommunityDao admincommunityDao;

	public AdminCommunityReportService(AdminCommunityDao admincommunityDao) {
		this.admincommunityDao = admincommunityDao;
	}

	 @Override
	 public void execute(Model model) {		  
		  Map<String, Object> requestData = model.asMap();
		  
		  ArrayList<Map<String, Object>> reportno= (ArrayList<Map<String, Object>>) requestData.get("selectedReport");
		  System.out.println("reportno: "+ reportno);
		  
		  Map<String, Object> reportNoMap;
		  for(int i = 0; i < reportno.size(); i++) {			  
			   reportNoMap = reportno.get(i);		  		  		  
			int reportid = Integer.parseInt((String) reportNoMap.get("reportNo"));
			   System.out.println("DATA: "+ i +"||    " + reportNoMap.get("reportNo"));
			   admincommunityDao.reportStatusUpdate(reportid);
			   System.out.println(reportNoMap.get("reportNo").getClass().getName());
			  
		  }
		  
	 }
}