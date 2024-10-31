package com.tech.petfriends.join.controller;

import java.util.HashMap;
import java.util.Random;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.configuration.ApikeyConfig;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;

@RestController
public class SmsController {

    private DefaultMessageService messageService;
    private ApikeyConfig apikeyConfig;

    // 생성자 주입으로 ApikeyConfig 주입
    public SmsController(ApikeyConfig apikeyConfig) {
        this.apikeyConfig = apikeyConfig;     		
    }

    @PostMapping("/send-sms")
    public HashMap<String, String> sendSms(@RequestParam("phoneNumber") String phoneNumber) {
        System.out.println("인증번호");
        
        // API Key 
        String coolApi = apikeyConfig.getCoolApikey();
        String coolSecret = apikeyConfig.getCoolSecretkey();
        this.messageService = NurigoApp.INSTANCE.initialize(coolApi, coolSecret, "https://api.coolsms.co.kr");  
                
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