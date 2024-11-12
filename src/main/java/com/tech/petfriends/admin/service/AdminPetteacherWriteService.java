package com.tech.petfriends.admin.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@Service
public class AdminPetteacherWriteService implements AdminExecuteModel {

	private AdminPageDao adminDao;
	
	private PetteacherDto dto;

	public AdminPetteacherWriteService(AdminPageDao adminDao, PetteacherDto dto) {
		this.adminDao = adminDao;
		this.dto = dto;
	}

	@Override
	public void execute(Model model) {
		
		String hpt_title = dto.getHpt_title();
		String hpt_exp = dto.getHpt_exp();
		String hpt_content = dto.getHpt_content();
		String hpt_yt_videoid = dto.getHpt_yt_videoid();
		String hpt_pettype = dto.getHpt_pettype();
		String hpt_category = dto.getHpt_category();
		String hpt_channal = dto.getHpt_channal();
		
		// 데이터 첨부하여 DB호출, insert
		adminDao.adminPetteacherWrite(hpt_channal, hpt_title, hpt_exp, hpt_content, 
				hpt_yt_videoid, hpt_pettype, hpt_category);
	}

}
