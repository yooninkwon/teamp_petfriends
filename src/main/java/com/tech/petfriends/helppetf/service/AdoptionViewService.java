//package com.tech.petfriends.helppetf.service;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpSession;
//
//import org.springframework.stereotype.Service;
//import org.springframework.ui.Model;
//
//import com.tech.petfriends.helppetf.dto.AdoptionSelectedAnimalDto;
//
//@Service
//public class AdoptionViewService implements HelppetfServiceInter {
//
//	@Override
//	public void execute(Model model) {
//
//		model.addAttribute("main_navbar_id", "helppetf");
//		model.addAttribute("sub_navbar_id", "adoption");
//		
//		// 모델에서 request를 추출
//		HttpServletRequest request = (HttpServletRequest) model.getAttribute("request");
//		
//		// request에서 세션을 얻음
//	    HttpSession session = request.getSession();
//	    
//	    // 세션에서 추출한 데이터를 DTO로 저장
//	    AdoptionSelectedAnimalDto selectedAnimal = (AdoptionSelectedAnimalDto) session.getAttribute("selectedAnimal");
//	    
//	    // 저장시킨 DTO가 null이 아니라면
//	    if (selectedAnimal != null) {
//	        // 모델에 데이터 추가하여 JSP로 전달
//	        model.addAttribute("selectedAnimal", selectedAnimal);
//	    }
//	}
//}