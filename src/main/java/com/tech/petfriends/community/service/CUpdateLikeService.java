package com.tech.petfriends.community.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.tech.petfriends.community.mapper.IDao;

public class CUpdateLikeService implements CServiceInterface {
	private IDao iDao;

	public CUpdateLikeService(IDao idao) {
		this.iDao = idao;
	}

	@Override
	public void execute(Model model) {
		Map<String, Object> m = model.asMap();
		HttpServletRequest request = (HttpServletRequest) m.get("request");
		
		// 파라미터 수집

		String like_id = request.getParameter("like_id");
		String board_no = request.getParameter("board_no");
		String user_id = request.getParameter("user_id");
		String created_date = request.getParameter("created_date");
		
	    // likes 변수를 Int로 받아온 후 boolean으로 변환
		 int likesCount = iDao.isLiked(board_no, user_id); // int 타입으로 받아옴
		 boolean likes = (likesCount > 0); // 0보다 크면 true, 아니면 false
	    
		
	    if (likes) {
	        iDao.removeLike(board_no, user_id); // 좋아요 취소
	    } else {
	        iDao.addLike(board_no, user_id); // 좋아요 추가
	        
	    }
		
	}

}
