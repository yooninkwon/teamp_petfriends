package com.tech.petfriends.admin.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PetteacherDto;

@Service
public class AdminPetteacherEditService implements AdminExecuteModelRequest {

	private AdminPageDao adminDao;

	private PetteacherDto dto;

	public AdminPetteacherEditService(AdminPageDao adminDao, PetteacherDto dto) {
		this.adminDao = adminDao;
		this.dto = dto;
	}

	@Override
	public void execute(Model model, HttpServletRequest request) {
		
		String hpt_seq = request.getParameter("hpt_seq");

		String hpt_title = dto.getHpt_title();
		String hpt_exp = dto.getHpt_exp();
		String hpt_content = dto.getHpt_content();
		String hpt_yt_videoid = dto.getHpt_yt_videoid();
		String hpt_pettype = dto.getHpt_pettype();
		String hpt_category = dto.getHpt_category();
		String hpt_channal = dto.getHpt_channal();
		
		// 파라미터로 전달하여 DB 호출, update
		adminDao.adminPetteacherEdit(hpt_seq, hpt_channal, hpt_title, hpt_exp, hpt_content, 
				hpt_yt_videoid, hpt_pettype, hpt_category);
	}

}
