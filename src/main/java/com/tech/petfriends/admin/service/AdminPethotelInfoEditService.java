package com.tech.petfriends.admin.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.helppetf.dto.PethotelInfoDto;

@Service
public class AdminPethotelInfoEditService implements AdminExecuteModel {
	
	private AdminPageDao adminDao;

	private PethotelInfoDto infoDto;
	
	public AdminPethotelInfoEditService(AdminPageDao adminDao, PethotelInfoDto infoDto) {
		this.adminDao = adminDao;
		this.infoDto = infoDto;
	}

	@Override
	public void execute(Model model) {
		
		String info_line1 = infoDto.getInfo_line1();
		String info_line2 = infoDto.getInfo_line2();
		String info_line3 = infoDto.getInfo_line3();
		String info_line4 = infoDto.getInfo_line4();
		String info_line5 = infoDto.getInfo_line5();
		String info_line6 = infoDto.getInfo_line6();
		String info_line7 = infoDto.getInfo_line7();
		String info_line8 = infoDto.getInfo_line8();
		String info_line9 = infoDto.getInfo_line9();
		String info_line10 = infoDto.getInfo_line10();
		String info_line11 = infoDto.getInfo_line11();
		String info_line12 = infoDto.getInfo_line12();
		String info_line13 = infoDto.getInfo_line13();
		String info_line14 = infoDto.getInfo_line14();
		String info_line15 = infoDto.getInfo_line15();
		String info_line16 = infoDto.getInfo_line16();
		
		// 파라미터로 전달하여 DB호출
		adminDao.adminPethotelInfoEdit(info_line1, info_line2, info_line3, info_line4, info_line5, info_line6,
				info_line7, info_line8, info_line9, info_line10, info_line11, info_line12, info_line13, info_line14,
				info_line15, info_line16);
	}

}
