package com.tech.petfriends.helppetf.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;

import com.tech.petfriends.helppetf.dto.AdoptionSelectedAnimalDto;

public class AdoptionService implements HelppetfServiceInter {

	@Override
	public void execute(Model model) {
		// 세션에서 데이터 가져오기
		HttpServletRequest request = (HttpServletRequest) model.getAttribute("request");
	    HttpSession session = request.getSession();
	    AdoptionSelectedAnimalDto selectedAnimal = (AdoptionSelectedAnimalDto) session.getAttribute("selectedAnimal");
	    
	    if (selectedAnimal != null) {
	        // 모델에 데이터 추가하여 JSP로 전달
	        model.addAttribute("animal", selectedAnimal);
	        System.out.println("서비스: "+selectedAnimal);
	    }

	}

}
