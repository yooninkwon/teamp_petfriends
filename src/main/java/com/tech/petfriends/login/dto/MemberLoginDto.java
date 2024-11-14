package com.tech.petfriends.login.dto;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberLoginDto {
    private String mem_code;
    private String mem_email;
    private String mem_pw;
    private String mem_name;
    private String mem_nick;
    private Date mem_birth;
    private String mem_gender;
    private String mem_tell;
    private String mem_invite;
    private int mem_point;
    private int mem_pay_amount;
    private int g_no;
    private String mem_type;
    private Timestamp mem_regdate;
    private Timestamp mem_logdate;
    private String mem_wd_memo;
}
