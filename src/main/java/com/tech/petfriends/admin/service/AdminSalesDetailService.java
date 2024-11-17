package com.tech.petfriends.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.dto.SalesDetailDto;
import com.tech.petfriends.admin.mapper.AdminSalesDao;
import com.tech.petfriends.admin.service.interfaces.AdminExecute;

@Service
public class AdminSalesDetailService implements AdminExecute {

	private AdminSalesDao adminSalesDao ;

	public AdminSalesDetailService(AdminSalesDao adminSalesDao) {
		this.adminSalesDao = adminSalesDao;
	}

	@Override
	public void execute(Model model) {
		
		String type = (String) model.getAttribute("type");
		String detail = (String) model.getAttribute("detail");
		String startDay = (String) model.getAttribute("startDay");
		String endDay = (String) model.getAttribute("endDay");
		
		List<SalesDetailDto> list = adminSalesDao.salesDetail(type,detail,startDay,endDay);
		System.out.println(type + ": type");
		System.out.println(detail + ": detail");
		System.out.println(startDay + ": startDay");
		System.out.println(endDay + ": endDay");
	
		
		
		model.addAttribute("list",list);
		
		
		
	}

}
