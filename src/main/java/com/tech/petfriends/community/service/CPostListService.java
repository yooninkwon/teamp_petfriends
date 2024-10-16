package com.tech.petfriends.community.service;

import java.util.ArrayList;

import org.springframework.ui.Model;

import com.tech.petfriends.community.dto.CDto;
import com.tech.petfriends.community.mapper.IDao;

public class CPostListService implements CServiceInterface{
	
	private IDao iDao;
	
	public CPostListService(IDao iDao) {
	this.iDao = iDao;
}

	@Override
	public void execute(Model model) {
		public ArrayList<CDto> getPostList() {
		    return iDao.getPostList(); // DAO 호출
		}
	}
	
}
