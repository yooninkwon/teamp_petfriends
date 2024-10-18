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
import com.tech.petfriends.login.util.PasswordEncryptionService;

@Controller
@RequestMapping("/login")
public class LoginController {
   
    @Autowired
       private MemberMapper memberMapper;
   
    @GetMapping("/loginPage")
    public String LoginPage(HttpServletRequest request) {
        System.out.println("로그인 페이지 이동: " + request.getRequestURI());
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

        // MyBatis를 사용해 이메일로 사용자 정보 조회 (암호화된 비밀번호 포함)
        MemberLoginDto member = memberMapper.getMemberByEmail(email);

        if (member != null) {
            // Argon2 비밀번호 검증
            PasswordEncryptionService passwordService = new PasswordEncryptionService();
            boolean isValidPassword = passwordService.verifyPassword(member.getMem_pw(), password);

            if (isValidPassword) {
                System.out.println("로그인 성공");

                session.setAttribute("loginUser", member); // 세션에 사용자 정보 저장
                System.out.println(member.getMem_name() + " 님 환영합니다.");

                // 아이디 저장 체크박스 처리
                if ("on".equals(remember)) {
                    Cookie emailCookie = new Cookie("email", email);
                    emailCookie.setMaxAge(60 * 60 * 24 * 30); // 쿠키 유효 기간 30일
                    emailCookie.setPath("/");
                    response.addCookie(emailCookie);
                    System.out.println("쿠키 저장됨 / 저장된 이메일 : " + email);
                } else {
                    Cookie emailCookie = new Cookie("email", null);
                    emailCookie.setMaxAge(0); // 쿠키 삭제
                    emailCookie.setPath("/");
                    response.addCookie(emailCookie);
                    System.out.println("쿠키 삭제됨 / 삭제된 이메일 : " + email);
                }

                return "redirect:/";  // 로그인 성공 시 메인 페이지로 이동
            } else {
                System.out.println("비밀번호가 일치하지 않습니다.");
                model.addAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
                return "login/loginPage";  // 로그인 실패 시 로그인 페이지로 이동
            }
        } else {
            System.out.println("로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.");
            model.addAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
            return "login/loginPage";  // 로그인 실패 시 로그인 페이지로 이동
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
