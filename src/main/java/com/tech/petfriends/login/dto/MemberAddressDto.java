package com.tech.petfriends.login.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberAddressDto {
	private String addr_code;
	private String mem_code;
	private String addr_postal;
	private String addr_line1;
	private String addr_line2;
	private char addr_default;
}
