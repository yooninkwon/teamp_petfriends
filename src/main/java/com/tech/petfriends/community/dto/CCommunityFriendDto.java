package com.tech.petfriends.community.dto;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CCommunityFriendDto {
	

   
    private String mem_nick;
    private String friend_mem_nick;
    private Date friend_created;
   
    private String pet_img;
    private String mem_code;
    
    private String friend_mem_code;
}





