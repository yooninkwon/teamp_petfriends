package com.tech.petfriends.login.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.mapper.MemberMapper;

@RestController
public class FindIdRestController {
	
	@Autowired
	private MemberMapper memberMapper;

	@PostMapping("/find-id")
	public ResponseEntity<?> findId(@RequestBody Map<String, String> request) {
	    String name = request.get("name");
	    String phoneNumber = request.get("phoneNumber");    
	    // MemberLoginDto 객체 반환
	    MemberLoginDto member = memberMapper.findUserId(name, phoneNumber);
	    if (member != null && member.getMem_email() != null) { // 적절한 필드 사용
	        Map<String, String> response = new HashMap<>();
	        response.put("userId", member.getMem_email()); // getMem_email() 또는 적절한 필드 사용
	        return ResponseEntity.ok(response);  // 성공 시 아이디 반환
	    } else {
	    	return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"사용자 정보를 찾을 수 없습니다.\"}");
	    }
	}	
}
