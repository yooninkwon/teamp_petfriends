package com.tech.petfriends.community.service;

import java.util.Map;

import javax.security.auth.message.callback.PrivateKeyCallback.Request;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.tech.petfriends.community.mapper.IDao;

public class CReplyDeleteService implements CServiceInterface {
	
	private IDao iDao;
	
	public CReplyDeleteService(IDao iDao) {
		this.iDao = iDao;
	}
	
	@Override
	public void execute(Model model) {
		Map<String, Object> m = model.asMap();
		HttpServletRequest request = (HttpServletRequest) m.get("request");
		
		String board_no = request.getParameter("board_no");
		String comment_no = request.getParameter("comment_no");
//		String user_id = request.getParameter("user_id");
//		String comment_content = request.getParameter("comment_content");
		String parent_comment_no = request.getParameter("parent_comment_no");
		String comment_level = request.getParameter("comment_level");
		String comment_order_no = request.getParameter("comment_order_no");
		
		
	    // 댓글 삭제 시도
	    int rn = iDao.replyDelete(comment_no, parent_comment_no, comment_level, comment_order_no);

	    if (rn == 0) {
	        // 삭제 실패 (상위 댓글이 존재)
	        model.addAttribute("errorMessage", "이 댓글은 상위 댓글을 가지고 있어 삭제할 수 없습니다.");
	        model.addAttribute("url", "redirect:/community/contentView?board_no=" + board_no);
	    } else {
	        // 삭제 성공
	        iDao.stepInit(comment_no,parent_comment_no, comment_level);        
	        model.addAttribute("url", "redirect:/community/contentView?board_no=" + board_no);
	    }
	}

	
	
	
}
