package com.tech.petfriends.admin.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PethotelIntroDto;

@Service
public class AdminPethotelIntroEditService implements AdminServiceInterface {
	
	AdminPageDao adminDao;
	
	public AdminPethotelIntroEditService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}
	
	@Override
	public void execute(Model model) {
		PethotelIntroDto dto = (PethotelIntroDto) model.getAttribute("dto");
		String intro_line1 = dto.getIntro_line1();
		String intro_line2 = dto.getIntro_line2();
		String intro_line3 = dto.getIntro_line3();
		String intro_line4 = dto.getIntro_line4();
		String intro_line5 = dto.getIntro_line5();
		String intro_line6 = dto.getIntro_line6();
		String intro_line7 = dto.getIntro_line7();
		String intro_line8 = dto.getIntro_line8();
		String intro_line9 = dto.getIntro_line9();
		adminDao.adminPethotelIntroEdit(intro_line1, intro_line2, intro_line3, intro_line4, intro_line5,
				intro_line6, intro_line7, intro_line8, intro_line9);
	}

}
