package com.tech.petfriends.helppetf.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

public class AdoptionService implements HelppetfServiceInter {

	@Override
	public void execute(Model model) {
		Map<String, Object> map = model.asMap();

		HttpServletRequest request = (HttpServletRequest) map.get("request");
		String param = request.getParameter("");
//		페이지를 param으로 받아서 페이징 어쩌구저쩌구뻑ㅇㅠㅗㅗ해보기
	}

}
