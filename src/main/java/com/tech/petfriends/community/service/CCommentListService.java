//package com.tech.petfriends.community.service;
//
//import java.util.ArrayList;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.ui.Model;
//
//import com.tech.petfriends.community.dto.CCommentDto;
//import com.tech.petfriends.community.mapper.IDao;
//
//public class CCommentListService implements CServiceInterface{
//
//	private IDao iDao;
//	
//	public CCommentListService(IDao iDao) {
//		this.iDao = iDao;
//	}
//	
//	@Override
//	public void execute(Model model) {
//		ArrayList<CCommentDto> commentList = iDao.commentList();
//		model.addAttribute("commentList",commentList);
//	}
//
//	
//	
//}
