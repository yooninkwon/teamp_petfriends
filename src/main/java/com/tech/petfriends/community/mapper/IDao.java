package com.tech.petfriends.community.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.community.dto.CDto;


@Mapper
public interface IDao {

	public ArrayList<CDto> getPostList();
}
