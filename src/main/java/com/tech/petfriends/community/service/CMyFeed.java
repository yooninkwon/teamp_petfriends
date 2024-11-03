package com.tech.petfriends.community.service;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;

import com.tech.petfriends.community.dto.CDto;
import com.tech.petfriends.community.mapper.IDao;
import com.tech.petfriends.login.dto.MemberLoginDto;


public class CMyFeed implements CServiceInterface{
	
	private IDao iDao;

	public CMyFeed(IDao iDao) {
		this.iDao = iDao;
	}

	@Override
	public void execute(Model model) {
        // Model에서 request와 session을 가져옵니다.
        Map<String, Object> m = model.asMap();
        HttpServletRequest request = (HttpServletRequest) m.get("request");
        HttpSession session = (HttpSession) m.get("session");
        
	
        
        
        // 이미 mem_code가 모델에 추가되어 있으므로 바로 가져올 수 있습니다.
        String mem_code = (String) model.getAttribute("mem_code");
        model.addAttribute("mem_code", mem_code);
        
        // mem_code를 기반으로 myFeedList 조회
        ArrayList<CDto> myFeedList = iDao.myFeedList(); // mem_code를 인자로 넘기기
        model.addAttribute("myFeedList", myFeedList);
    } 
	
}
	

