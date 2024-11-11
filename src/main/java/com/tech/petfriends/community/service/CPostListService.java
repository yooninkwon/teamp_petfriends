package com.tech.petfriends.community.service;

import java.util.ArrayList;
import java.util.Map;

import javax.security.auth.message.callback.PrivateKeyCallback.Request;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.community.dto.CDto;
import com.tech.petfriends.community.mapper.IDao;
import com.tech.petfriends.login.dto.MemberLoginDto;

@Service
public class CPostListService implements CServiceInterface{
	
	private IDao iDao;

	public CPostListService(IDao iDao) {
		this.iDao = iDao;
	}

	@Override
	public void execute(Model model) {
		Map<String, Object> m = model.asMap();
		HttpServletRequest request = (HttpServletRequest) m.get("request");
		HttpSession session = (HttpSession) m.get("session");
	
		
		MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
		if(loginUser != null) {
		String mem_code = loginUser.getMem_code();
		System.out.println("mem_code" + mem_code);
		
        CDto getpetimg = (CDto) iDao.getPetIMG(mem_code);
        model.addAttribute("getpetimg",getpetimg);
		}
		
		ArrayList<CDto> postList = iDao.getPostList(); // DAO 호출
        model.addAttribute("postList", postList); // 모델에 게시글 리스트 추가
	
    
        ArrayList<CDto> getHotTopicList = iDao.getHotTopicList();
        model.addAttribute("getHotTopicList",getHotTopicList);
        		
       
        if(loginUser != null) {
        	 String mem_nick = loginUser.getMem_nick();
    	
    		
             ArrayList<CDto> storyList = iDao.storyList(mem_nick);
             model.addAttribute("storyList",storyList);
    		}
        
        String board_title = request.getParameter("board_title") ;
        String board_content = request.getParameter("board_content") ;
        String user_id = request.getParameter("user_id") ;
        
        System.out.println("board_title: "+board_title);		
        
		/*
		 * ArrayList<CDto> searchPosts = iDao.searchPosts(board_title, board_content,
		 * user_id); model.addAttribute("searchPosts",searchPosts);
		 */
	
	} 
	
}
	

