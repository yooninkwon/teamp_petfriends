package com.tech.petfriends.mypage.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyServiceHistoryDto {
    private int cs_no;
    private String mem_code;
    private String mem_name;
    private String cs_caregory;
    private String cs_contect;
    private Timestamp cs_regdate;
    private String cs_answer;
    private String cs_delete;
}
