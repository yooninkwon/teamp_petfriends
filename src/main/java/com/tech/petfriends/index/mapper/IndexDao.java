package com.tech.petfriends.index.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.ui.Model;

import com.tech.petfriends.index.dto.IndexProductDto;

@Mapper
public interface IndexDao {


	public List<IndexProductDto> indexProductListDog();

	public List<IndexProductDto> indexProductListCat();
	
	
	

	
	



}
