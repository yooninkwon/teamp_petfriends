package com.tech.petfriends.join.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.login.mapper.MemberMapper;

@RestController
public class TellRestController {
	@Autowired
    private MemberMapper memberMapper; // DB 조회를 위한 Mapper

    @GetMapping("/check-tell")
    public Map<String, Boolean> checkTell(@RequestParam String tell) {
        boolean isDuplicate = memberMapper.isTellDuplicate(tell) > 0;
        Map<String, Boolean> response = new HashMap<>();
        response.put("isDuplicate", isDuplicate);
        return response;
    }
}
