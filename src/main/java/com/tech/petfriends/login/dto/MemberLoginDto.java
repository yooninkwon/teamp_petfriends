package com.tech.petfriends.login.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberLoginDto {
	private String email;
    private String pw;
    private String name;
}
