package com.tech.petfriends.join.controller;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.util.PasswordEncryptionService;
import com.tech.petfriends.member.service.MemberService;

@Controller
@RequestMapping("/join")
public class JoinController {
	
	@Autowired
	private MemberService memberService;

	@GetMapping("/joinPage")
	public String JoinPage() {
		System.out.println("회원가입 페이지 이동");
		return "/join/joinPage";
	}
	
	
	@PostMapping("/joinService")
	public String joinService(HttpServletRequest request, HttpSession session) {
        MemberLoginDto member = new MemberLoginDto();
        // 비밀번호 암호화 아르곤2
        PasswordEncryptionService passencrypt = new PasswordEncryptionService(); 
        
        // UUID로 mem_code 생성
        String uniqueID = UUID.randomUUID().toString();
        member.setMem_code(uniqueID); 
        member.setMem_email(request.getParameter("email"));
        member.setMem_pw(passencrypt.encryptPassword(request.getParameter("password")));
        member.setMem_nick(request.getParameter("nickname"));
        member.setMem_tell(Integer.parseInt(request.getParameter("phoneNumber")));
        member.setMem_name(request.getParameter("name"));

        // 날짜 형식 변환
        String birthStr = request.getParameter("birth");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        try {
            java.util.Date parsedDate = dateFormat.parse(birthStr);
            Date birthDate = new Date(parsedDate.getTime()); // java.sql.Date로 변환
            member.setMem_birth(birthDate);
        } catch (ParseException e) {
            e.printStackTrace(); // 오류 발생 시 예외 처리
        }
        
        member.setMem_gender(request.getParameter("gender"));
        member.setMem_invite(request.getParameter("inviteCode"));
        
        // 현재 시간 설정
        java.sql.Timestamp currentTime = new java.sql.Timestamp(System.currentTimeMillis());
        member.setMem_regdate(currentTime);
        member.setMem_logdate(currentTime);

        memberService.joinMember(member);
        System.out.println("회원 가입 서비스 이동");
        
        // 회원가입 후 로그인 처리 (세션에 로그인 정보 저장)
        session.setAttribute("loginUser", member);
        
        // 회원가입 완료 후 메인 페이지로 리다이렉트
        return "redirect:/";
    }
}
