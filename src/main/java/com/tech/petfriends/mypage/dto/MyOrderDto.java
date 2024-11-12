package com.tech.petfriends.mypage.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyOrderDto {
    private String o_code;
    private String mem_code;
    private String o_addr;
    private String o_resiver;
    private int o_resiver_tell;
    private String o_entry;
    private String o_entry_detail;
    private String o_memo;
    private String mc_code;
    private int o_coupon;
    private int o_point;
    private String o_payment;
    private int o_amount;
    private int o_saving;
    private Timestamp o_expecdate;
    private String o_cancel;
    private String o_cancel_detail;
}
