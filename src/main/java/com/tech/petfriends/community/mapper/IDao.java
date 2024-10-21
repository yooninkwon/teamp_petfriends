package com.tech.petfriends.community.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.community.dto.CCategoryDto;
import com.tech.petfriends.community.dto.CDto;


@Mapper
public interface IDao {
	
	public ArrayList<CDto> getPostList();
	
	public void write (String user_id,String board_title,String board_content, int b_cate_no);
	
	public void imgWrite(int board_no, String originalFile, String changeFile);

	public int selBid();

	public CDto contentView(String board_no); 

//	public ArrayList<CDto> selectImg(String board_no);

	public ArrayList<CCategoryDto> getCategoryList();
}

