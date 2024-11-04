package com.tech.petfriends.index.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.index.dto.IndexProductDto;
import com.tech.petfriends.index.mapper.IndexDao;

@Service
public class IndexProductService implements IndexService {
	
	IndexDao indexDao;
	
	public IndexProductService(IndexDao indexDao) {
		this.indexDao = indexDao;
	}
	
	@Override
	public void execute(Model model) {
		List<IndexProductDto> dogList = indexDao.indexProductListDog();
		model.addAttribute("dogList",dogList);
		
		List<IndexProductDto> catList = indexDao.indexProductListCat();
		model.addAttribute("catList",catList);
			
		
		
		
	}
}
