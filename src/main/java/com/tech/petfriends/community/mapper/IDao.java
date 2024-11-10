package com.tech.petfriends.community.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.tech.petfriends.community.dto.CCategoryDto;
import com.tech.petfriends.community.dto.CCommentDto;
import com.tech.petfriends.community.dto.CCommunityFriendDto;
import com.tech.petfriends.community.dto.CDto;


@Mapper
public interface IDao {
	
	public ArrayList<CDto> getPostList();
	
	public void write (String user_id,String board_title,String board_content, int b_cate_no);
	
	public void imgWrite(int board_no, String originalFile, String changeFile,String repImgOriginal, String repImgChange);

	public CDto getPetIMG(String mem_code);
	
	public int selBid();

	public CDto contentView(String board_no); 

	public ArrayList<CCategoryDto> getCategoryList();

	public ArrayList<CDto> getPostsByCategory(int b_cate_no);
	
	public void modify(int board_no, String board_title, String board_content, int b_cate_no);

	public void modifyImg(int board_no, String originalFile, String changeFile,String repImgOriginal, String repImgChange);

	public void delete(int board_no);

	public void deleteFeedBoard(int board_no);

	public void comment(String board_no, String comment_no, String mem_nick, String comment_content,
			String parent_comment_no, String comment_level, String comment_order_no, String mem_code);

	public void commentReply(String board_no,String mem_nick, String comment_content,
			String parent_comment_no, String comment_level, String comment_order_no, String mem_code);
	
	public void commentShape(String parent_comment_no, String comment_level);
	
	public ArrayList<CCommentDto> commentList(String board_no);

	public ArrayList<CCommentDto> commentReplyList(String board_no);

	public int stepInit(String comment_no, String parent_comment_no, String comment_level);

	public int replyDelete(String comment_no, String parent_comment_no, String comment_level, String comment_order_no);
	
	public void addLike (String board_no,String mem_nick, String mem_code);
	
	public void removeLike (String board_no,String mem_nick, String mem_code);
	
	public int isLiked (String board_no, String mem_code);

	public void write(String mem_nick, String mem_code, String board_title, String board_content, int b_cate_no);

	public int getLikesCount(String board_no);

	public ArrayList<CDto> getHotTopicList();
	
	public void addFeed(String mem_code, int board_no, String mem_nick);
	
	public ArrayList<CDto> myFeedList(String mem_code);

	public CDto myFeedName (String mem_code);
	
	public void report(int board_no, String reporter_id, String reason, int comment_no, String report_type);

	public void incrementViews(String board_no);

	public void addFriend(String mem_nick, String friend_mem_nick);

	public void deleteFriend(String mem_nick);

	public int isFriend(String mem_nick, String friend_mem_nick);

	public ArrayList<CCommunityFriendDto> getNeighborList(String mem_nick);

	public ArrayList<CDto> storyList (String mem_nick);
	
//	public ArrayList<CDto> searchPosts (String board_title, String board_content, String user_id);
	

}

