package com.tech.petfriends.join.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.login.mapper.MemberMapper;

@RestController
public class EmailRestController {
	@Autowired
    private MemberMapper memberMapper; // DB 조회를 위한 Mapper

    @GetMapping("/check-email")
    public Map<String, Boolean> checkEmail(@RequestParam String email) {
        boolean isDuplicate = memberMapper.isEmailDuplicate(email) > 0;
        Map<String, Boolean> response = new HashMap<>();
        response.put("isDuplicate", isDuplicate);
        return response;
    }
}
