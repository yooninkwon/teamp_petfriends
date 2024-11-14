package com.tech.petfriends.community.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CReportDto {

	
	private int report_id;
	private int board_no;
	private String reporter_id;
	private String reason;
	private Date report_date;
	private String status;
	private int comment_no;
	private String report_type;
	private String mem_code;
}
