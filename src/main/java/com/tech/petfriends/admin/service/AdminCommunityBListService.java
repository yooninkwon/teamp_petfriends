//package com.tech.petfriends.admin.service;
//
//import java.util.List;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.ui.Model;
//
//import com.tech.petfriends.admin.dto.ACommunityDto;
//import com.tech.petfriends.admin.mapper.AdminCommuntiyDao;
//
//public class AdminCommunityBListService implements AdminServiceInterface {
//
//	private AdminCommuntiyDao admincommunityDao;
//
//	public AdminCommunityBListService(AdminCommuntiyDao admincommunityDao) {
//		this.admincommunityDao = admincommunityDao;
//	}
//
//	 @Override
//	 public void execute(Model model) {
//		    // Model에서 Map<String, String> 형태의 request 객체 가져오기
//		  Map<String, Object> requestData = model.asMap();
//
//
//
//		    // DAO에서 목록 가져오기
//		    List<ACommunityDto> communityList = admincommunityDao.communityList();
//
//		    // 결과를 모델에 담기
//		    model.addAttribute("communityList", communityList);
//		}
//}