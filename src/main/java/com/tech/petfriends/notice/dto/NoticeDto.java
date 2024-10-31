package com.tech.petfriends.notice.dto;

import java.sql.Date;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeDto {
	private int notice_no;
	private String notice_title;
	private String notice_content;
	private Date notice_date;
	private int notice_hit;
	private String notice_show;
}
