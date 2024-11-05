package com.tech.petfriends.admin.service;

import java.util.List;

import org.springframework.ui.Model;

import com.tech.petfriends.admin.dto.ACommunityDto;
import com.tech.petfriends.admin.mapper.AdminCommuntiyDao;
import com.tech.petfriends.admin.mapper.AdminProductDao;

public class AdminCommunityBListService implements AdminServiceInterface {

	private AdminCommuntiyDao admincommunityDao;

	public AdminCommunityBListService(AdminCommuntiyDao admincommunityDao) {
		this.admincommunityDao = admincommunityDao;
	}

	@Override
	public void execute(Model model) {
		Integer board_no = (Integer) model.getAttribute("board_no");
	
		
		List<ACommunityDto> CommunityList = admincommunityDao.communityList();
		model.addAttribute("CommunityList",CommunityList);
	}

}
