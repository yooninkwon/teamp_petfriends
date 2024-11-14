package com.tech.petfriends.community.dto;



import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "COMMUNITY_CHAT")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CChatDto {
	
	//채팅 테이블
    @javax.persistence.Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int message_id;
	
    private String sender;
	private String receiver;
	private String message_content;
		
	private Timestamp message_date;
	private String room_id;

}
