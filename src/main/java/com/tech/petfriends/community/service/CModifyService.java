package com.tech.petfriends.community.service;

import java.sql.Timestamp;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.tech.petfriends.community.mapper.IDao;

public class CModifyService implements CServiceInterface{

	private IDao iDao;

	public CModifyService(IDao iDao) {
		this.iDao = iDao;
	}
	
	@Override
	public void execute(Model model) {
		Map<String, Object> m = model.asMap();
		
		HttpServletRequest request = (HttpServletRequest) m.get("request");
		
	    int board_no = Integer.parseInt(request.getParameter("board_no"));
//	    int b_cate_no = Integer.parseInt(request.getParameter("b_cate_no"));
	    String user_id = request.getParameter("user_id");
	    String board_title = request.getParameter("board_title");
	    String board_content = request.getParameter("board_content");
	    
	    String createdParam = request.getParameter("board_created");
        String modifiedParam = request.getParameter("board_modified");

        Timestamp board_created = (createdParam != null && !createdParam.isEmpty()) ? Timestamp.valueOf(createdParam) : new Timestamp(System.currentTimeMillis());
        Timestamp board_modified = (modifiedParam != null && !modifiedParam.isEmpty()) ? Timestamp.valueOf(modifiedParam) : new Timestamp(System.currentTimeMillis());
	    
        String board_tag = request.getParameter("board_tag");
	    
//		int rebno = Integer.parseInt(request.getParameter("rebno"));
//		String corgfile = request.getParameter("corgfile");
		String cchgfile = request.getParameter("cchgfile");	
	
		iDao.modify(board_no, board_title, board_content, board_modified);
		
	}
	
}
