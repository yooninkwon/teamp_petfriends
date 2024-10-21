package com.tech.petfriends.join.controller;

import java.util.HashMap;
import java.util.Random;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;

@RestController
public class SmsController {

    // CoolSMS API 서비스 객체 생성
    final DefaultMessageService messageService;

    public SmsController() {
        this.messageService = NurigoApp.INSTANCE.initialize("NCSWTSZ7XCBIS18Q", "PEL2JOR1PTX6ZNSHGKE7U2WB4AMOPBD5", "https://api.coolsms.co.kr");
    }

    @PostMapping("/send-sms")
    public HashMap<String, String> sendSms(@RequestParam("phoneNumber") String phoneNumber) {
        System.out.println("인증번호");
    	// 인증번호 생성
        String authCode = generateAuthCode();
        
        
        // 메시지 객체 생성 및 설정
        Message message = new Message();
        message.setFrom("01058403660"); // 발신자 번호 입력
        message.setTo(phoneNumber); // 수신자 번호 입력
        message.setText("[펫프렌즈] 회원가입 인증번호는 " + authCode + " 입니다."); // 메시지 내용

        try {
            // SMS 전송
            messageService.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 인증번호를 클라이언트에 반환 (또는 저장)
        HashMap<String, String> response = new HashMap<>();
        response.put("authCode", authCode);
        return response;
    }

    // 인증번호 생성 함수
    private String generateAuthCode() {
        Random random = new Random();
        return String.valueOf(100000 + random.nextInt(900000)); // 6자리 인증번호 생성
    }
}