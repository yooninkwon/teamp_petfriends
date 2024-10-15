package com.tech.petfriends.login.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.mapper.MemberMapper;

@Controller
@RequestMapping("/login")
public class LoginController {
	
	 @Autowired
	    private MemberMapper memberMapper;
	
	@GetMapping("/loginPage")
	public String loginPage() {
		System.out.println("로그인 페이지 이동");
		return "login/loginPage";
	}
	
	@PostMapping("/loginService")
    public String loginService(HttpServletRequest request, Model model, HttpSession session) {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        System.out.println("email : " + email);
        System.out.println("password : " + password);

        // MyBatis에 전달할 파라미터 준비
        Map<String, String> params = new HashMap<>();
        params.put("email", email);
        params.put("password", password);

        // MyBatis를 사용해 이메일과 비밀번호로 사용자 정보 조회 (닉네임 포함)
        MemberLoginDto member = memberMapper.getMemberByEmailAndPassword(params);

        if (member != null) {
            System.out.println("로그인 성공");
            // 세션에 사용자 닉네임 저장
            session.setAttribute("name", member.getName());
            System.out.println(member.getName() + " 님 환영합니다.");
            
            return "redirect:/";  // 로그인 성공 시 애플리케이션 루트 경로의 index 페이지로 이동
        } else {
            System.out.println("로그인 실패");
            model.addAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
            return "login/loginPage";  // 로그인 실패 시 로그인 페이지로 다시 이동
        }
    }
	
}
