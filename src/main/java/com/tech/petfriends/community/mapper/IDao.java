package com.tech.petfriends.community.mapper;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

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

	public ArrayList<CDto> getPostsByCategory(int b_cate_no);

//	public List<CDto> getAllPosts(); // 모든 게시물 조회 메서드 추가
	
	 public void modify(int board_no, String board_title, String board_content, Timestamp board_modified);

	
	
	
}

