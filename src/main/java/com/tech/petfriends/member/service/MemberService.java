package com.tech.petfriends.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tech.petfriends.login.dto.MemberAddressDto;
import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.mapper.MemberMapper;
import com.tech.petfriends.login.util.PasswordEncryptionService;

@Service
public class MemberService {
	@Autowired
    private MemberMapper memberMapper;
	
	@Autowired
	private PasswordEncryptionService passwordEncryptionService;

    public void joinMember(MemberLoginDto member) {
        memberMapper.insertMember(member);
    }
    
    public void joinAddress(MemberAddressDto address) {
    	memberMapper.insertJoinAddress(address);
    }
    
    public void updatePassword(String email, String newPassword) {
    	// 비밀번호 암호화
    	String encryptedPassword = passwordEncryptionService.encryptPassword(newPassword);
    	// 비밀번호 업데이트
    	memberMapper.updatePassword(email, encryptedPassword);
    }
    
}
