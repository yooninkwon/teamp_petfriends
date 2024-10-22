package com.tech.petfriends.login.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.tech.petfriends.login.dto.MemberLoginDto;

@Mapper
public interface MemberMapper {
    // 이메일과 사용자 조회
    MemberLoginDto getMemberByEmail(String email);
    
    // 회원가입
    void insertMember(MemberLoginDto member);;
    
    // 닉네임 중복 체크
    int isNicknameDuplicate(String nickname);
    
    
}
