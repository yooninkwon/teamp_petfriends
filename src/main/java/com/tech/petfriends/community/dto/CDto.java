package com.tech.petfriends.community.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CDto {
	

    private int boardNo;
    private int bCateNo2;
    private int uNo;
    private String userId;
    private String boardTitle;
    private int boardPassword;
    private String boardContent;
    private Timestamp boardCreated;
    private Timestamp boardModified;
    private int boardViews;
    private String boardTag;
    private String boardFile;
    private int boardLikes;
    private int boardCommentCount;
	
}
