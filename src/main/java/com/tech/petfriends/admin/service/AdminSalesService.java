package com.tech.petfriends.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.dto.SalesDto;
import com.tech.petfriends.admin.mapper.AdminSalesDao;
import com.tech.petfriends.admin.service.interfaces.AdminExecute;

@Service
public class AdminSalesService implements AdminExecute {

	private AdminSalesDao adminSalesDao ;

	public AdminSalesService(AdminSalesDao adminSalesDao) {
		this.adminSalesDao = adminSalesDao;
	}

	@Override
	public void execute(Model model) {
		
		List<SalesDto> result = adminSalesDao.todaySales();
		
	
		
		
		model.addAttribute("result",result);
		
		
		
	}

}
