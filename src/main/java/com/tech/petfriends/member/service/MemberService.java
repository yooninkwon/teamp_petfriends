package com.tech.petfriends.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.mapper.MemberMapper;

@Service
public class MemberService {
	@Autowired
    private MemberMapper memberMapper;

    public void joinMember(MemberLoginDto member) {
        memberMapper.insertMember(member);
    }
}
