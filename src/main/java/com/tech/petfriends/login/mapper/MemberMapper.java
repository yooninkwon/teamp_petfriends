package com.tech.petfriends.login.mapper;

import java.util.Map;


import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.login.dto.MemberLoginDto;

@Mapper
public interface MemberMapper {
    // 이메일과 비밀번호로 사용자 조회 (닉네임 포함)
    MemberLoginDto getMemberByEmailAndPassword(Map<String, String> params);
}
