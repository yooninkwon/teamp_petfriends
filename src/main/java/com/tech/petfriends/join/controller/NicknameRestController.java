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
public class NicknameRestController {
 
    private final MemberMapper memberMapper; // DB 조회를 위한 Mapper

    @GetMapping("/check-nickname")
    public Map<String, Boolean> checkNickname(@RequestParam String nickname) {
        boolean isDuplicate = memberMapper.isNicknameDuplicate(nickname) > 0;
        Map<String, Boolean> response = new HashMap<>();
        response.put("isDuplicate", isDuplicate);
        return response;
    }
}
