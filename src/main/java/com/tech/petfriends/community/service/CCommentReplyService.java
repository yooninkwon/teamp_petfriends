package com.tech.petfriends.community.service;

import java.sql.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.tech.petfriends.community.mapper.IDao;

public class CCommentReplyService implements CServiceInterface {

	private IDao iDao;
	
	public CCommentReplyService(IDao iDao) {
		this.iDao = iDao;
	}

	@Override
	public void execute(Model model) {
		Map<String, Object> m = model.asMap();
		HttpServletRequest request = (HttpServletRequest) m.get("request");
		
		String board_no = request.getParameter("board_no");
		String comment_no = request.getParameter("comment_no");
		String user_id = request.getParameter("user_id");
		String comment_content = request.getParameter("comment_content");
		String parent_comment_no = request.getParameter("parent_comment_no");
		String comment_level = request.getParameter("comment_level");
		String comment_order_no = request.getParameter("comment_order_no");
		
		iDao.commentShape(parent_comment_no, comment_level);
		iDao.commentReply(board_no, user_id,comment_content,parent_comment_no,comment_level,comment_order_no);
	
	
	}
	
	
}
