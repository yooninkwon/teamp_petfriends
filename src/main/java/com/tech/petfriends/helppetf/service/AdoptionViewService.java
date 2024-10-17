package com.tech.petfriends.helppetf.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.dto.AdoptionSelectedAnimalDto;

public class AdoptionViewService implements HelppetfServiceInter {

	@Override
	public void execute(Model model) {
		// 세션에서 데이터 가져옴 (리다이렉트 되기 때문에 실행함)
		HttpServletRequest request = (HttpServletRequest) model.getAttribute("request");
	    HttpSession session = request.getSession();
	    // 가져온 데이터를 AdoptionSelectedAnimalDto 타입의 selectedAnimal로 등록
	    AdoptionSelectedAnimalDto selectedAnimal = (AdoptionSelectedAnimalDto) session.getAttribute("selectedAnimal");
	    
	    // null이 아니라면
	    if (selectedAnimal != null) {
	        // 모델에 데이터 추가하여 JSP로 전달
	        model.addAttribute("selectedAnimal", selectedAnimal);
	    }
	}
}