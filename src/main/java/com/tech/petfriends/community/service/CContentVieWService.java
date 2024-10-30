package com.tech.petfriends.community.service;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.tech.petfriends.community.dto.CCommentDto;
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
		String comment_no = request.getParameter("comment_no");
		String parent_comment_no = request.getParameter("parent_comment_no");
		
		CDto dto = iDao.contentView(board_no);
		
		model.addAttribute("contentView", dto);

	      // 댓글 리스트 가져오기
		ArrayList<CCommentDto> commentList = iDao.commentList(board_no);
        model.addAttribute("commentList", commentList); // 댓글 리스트를 모델에 추가
		
        // 대 댓글 리스트 가져오기
    	ArrayList<CCommentDto> commentReplyList = iDao.commentReplyList(board_no);
        model.addAttribute("commentReplyList", commentReplyList);
	
   
	}

}
