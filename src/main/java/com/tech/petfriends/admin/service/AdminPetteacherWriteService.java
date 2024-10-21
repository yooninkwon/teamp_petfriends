package com.tech.petfriends.admin.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.tech.petfriends.admin.mapper.AdminPageDao;

public class AdminPetteacherWriteService implements AdminServiceInterface {

	private AdminPageDao adminDao;

	public AdminPetteacherWriteService(AdminPageDao adminDao) {
		this.adminDao = adminDao;
	}

	@Override
	public void execute(Model model) {
		Map<String, Object> map = model.asMap();
		HttpServletRequest request = (HttpServletRequest) map.get("request");
		String hpt_title = request.getParameter("hpt_title");
		String hpt_exp = request.getParameter("hpt_exp");
		String hpt_content = request.getParameter("hpt_content");
		String hpt_yt_videoid = request.getParameter("hpt_yt_videoid");
		String hpt_pettype = request.getParameter("hpt_pettype");
		String hpt_category = request.getParameter("hpt_category");

		adminDao.adminPetteacherWrite(hpt_title, hpt_exp, hpt_content, 
				hpt_yt_videoid, hpt_pettype, hpt_category);
	}

}
