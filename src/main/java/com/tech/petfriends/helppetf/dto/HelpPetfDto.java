package com.tech.petfriends.helppetf.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HelpPetfDto {
	private int hpt_seq;
	private String hpt_yt_url;
	private String hpt_yt_videoid;
	private String hpt_exp;
	private String hpt_title;
	private String hpt_content;
	private String hpt_pettype;
	private String hpt_category;
	private int hpt_hit;
	private Date hpt_rgedate;
}

