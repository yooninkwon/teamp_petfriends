package com.tech.petfriends.community.service;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.tech.petfriends.community.dto.CDto;
import com.tech.petfriends.community.mapper.IDao;

public class CContentVieWService implements CServiceInterface{

	private IDao iDao;
	
	public CContentVieWService(IDao iDao) {
		this.iDao = iDao;
	}
	
	@Override
	public void execute(Model model) {
		Map<String, Object> m = model.asMap();
		
		HttpServletRequest request = (HttpServletRequest) m.get("request");
		
		String board_no = request.getParameter("board_no");
		CDto dto = iDao.contentView(board_no);
		model.addAttribute("contentView", dto);

		//		ArrayList<CDto> imgList = iDao.selectImg(board_no);
//		model.addAttribute("imgList",imgList);
		
	}

}
