package com.tech.petfriends.login.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
	public String LoginPage() {
		System.out.println("로그인 페이지 이동");
		return "login/loginPage";
	}
	
	@PostMapping("/loginService")
    public String LoginService(HttpServletRequest request, HttpServletResponse response,
    		Model model, HttpSession session) {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String remember = request.getParameter("remember");

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
            session.setAttribute("name", member.getMem_name());
            // 세션에 사용자 회원번호 저장
            session.setAttribute("mem_code", member.getMem_code());
            System.out.println(member.getMem_name() + " 님 환영합니다.");
            
         // 아이디 저장 체크박스가 선택된 경우
            if ("on".equals(remember)) {
                Cookie emailCookie = new Cookie("email", email);
                emailCookie.setMaxAge(60 * 60 * 24 * 30); // 쿠키 유효 기간 30일
                emailCookie.setPath("/"); // 모든 경로에서 쿠키 접근 가능
                response.addCookie(emailCookie);
                System.out.println("쿠키 저장됨 / 저장된 이메일 : " + email);
            } else {
                // 아이디 저장 체크박스가 선택되지 않은 경우 쿠키 삭제
                Cookie emailCookie = new Cookie("email", null);
                emailCookie.setMaxAge(0); // 쿠키 삭제
                emailCookie.setPath("/"); 
                response.addCookie(emailCookie);
                System.out.println("쿠키 삭제됨 / 삭제된 이메일 : " + email);
            }      
            return "redirect:/";  // 로그인 성공 시 애플리케이션 루트 경로의 index 페이지로 이동
        } else {
            System.out.println("로그인 실패");
            model.addAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
            return "login/loginPage";  // 로그인 실패 시 로그인 페이지로 다시 이동
        }
    }
	
	@GetMapping("/findId")
	public String FindId() {
		System.out.println("아이디 찾기 이동");
		return "login/findId";
	}
	
	@GetMapping("/findPw")
	public String FindPw() {
		System.out.println("비밀번호 찾기 이동");
		return "login/findPw";
	}
	
	
}
