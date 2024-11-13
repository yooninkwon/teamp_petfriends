package com.tech.petfriends.admin.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberCouponDto {
    private String mc_code;
    private String mem_code;
    private int cp_no;
    private Timestamp mc_issue;
    private Timestamp mc_use;
    private Timestamp mc_dead;

    private String mem_name;
    private String cp_name;
    private String o_code;
}
