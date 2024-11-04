package com.tech.petfriends.notice.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventDto {

	private int event_no;
	private String event_title;
	private String event_content;
	private int event_hit;
	private Date event_legdate;
	private Date event_startdate;
	private Date event_enddate;
	private String event_thumbnail;
	private String event_slideimg;
	private String event_show;
	
}
