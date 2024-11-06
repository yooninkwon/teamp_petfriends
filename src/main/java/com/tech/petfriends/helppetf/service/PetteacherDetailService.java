package com.tech.petfriends.helppetf.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.dto.PetteacherDto;
import com.tech.petfriends.helppetf.mapper.HelpPetfDao;

@Service
public class PetteacherDetailService implements HelppetfServiceInter {
	
	private HelpPetfDao helpDao;
	
	public PetteacherDetailService(HelpPetfDao helpDao) {
		this.helpDao = helpDao;
	}

	@Override
	public void execute(Model model) {
		model.addAttribute("main_navbar_id", "helppetf");		
		model.addAttribute("sub_navbar_id", "petteacher");
		
		// model을 Map으로 변환
		Map<String, Object> map = model.asMap();
		
		// Map에서 request를 추출
		HttpServletRequest request = (HttpServletRequest) map.get("request");
		
		// 파라미터의 값을 저장
		String hpt_seq = request.getParameter("hpt_seq");
		
		// 전달받은 파라미터 값에 해당하는 글 번호를 가진 게시글의 조회수를 +1
		helpDao.upViews(hpt_seq); // 조회수 +1
		
		// 전달받은 파라미터 값에 해당하는 글 번호를 가진 게시글의 상세 내용을 DTO객체에 저장
		PetteacherDto dto = helpDao.petteacherDetail(hpt_seq);
		
		model.addAttribute("dto", dto);
	}
	
}
