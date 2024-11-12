package com.tech.petfriends.admin.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderStatusDto {
    private String o_code;
    private String os_name;
    private Timestamp os_regdate;
}
