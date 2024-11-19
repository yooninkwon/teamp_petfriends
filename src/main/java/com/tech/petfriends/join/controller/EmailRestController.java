package com.tech.petfriends.join.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.login.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class EmailRestController {
	
    private final MemberMapper memberMapper;

    @GetMapping("/check-email")
    public Map<String, Boolean> checkEmail(@RequestParam String email) {
        boolean isDuplicate = memberMapper.isEmailDuplicate(email) > 0;
        Map<String, Boolean> response = new HashMap<>();
        response.put("isDuplicate", isDuplicate);
        return response;
    }
}
