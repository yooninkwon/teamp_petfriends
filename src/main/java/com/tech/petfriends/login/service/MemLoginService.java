package com.tech.petfriends.login.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.mapper.MemberMapper;
import com.tech.petfriends.login.util.PasswordEncryptionService;
import com.tech.petfriends.mypage.dto.GradeDto;

@Service
public class MemLoginService {

    private final MemberMapper memberMapper;
    private final HttpServletResponse response;
    private final HttpSession session;

    // 생성자 주입을 통해 의존성 주입
    public MemLoginService(MemberMapper memberMapper, HttpServletResponse response, HttpSession session) {
        this.memberMapper = memberMapper;
        this.response = response;
        this.session = session;
    }

    // 로그인 로직을 서비스 계층으로 분리
    public String executeLogin(HttpServletRequest request, Model model, RedirectAttributes rs) {
        String modelAdd = "";
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String remember = request.getParameter("remember");
        String previousUrl = request.getParameter("previousUrl");

        System.out.println("email : " + email);
        System.out.println("password : " + password);

        // 이메일을 기준으로 사용자 정보 조회
        MemberLoginDto member = memberMapper.getMemberByEmail(email);

        if (member != null) {
            PasswordEncryptionService passwordService = new PasswordEncryptionService();
            boolean isValidPassword = passwordService.verifyPassword(member.getMem_pw(), password);

            if (isValidPassword) {
                System.out.println("로그인 성공");
                GradeDto userGrade = memberMapper.getGradeByMemberCode(member.getMem_code());

                if ("강제탈퇴".equals(member.getMem_type())) {
                    System.out.println("관리자에 의해 탈퇴된 회원입니다.");
                    rs.addFlashAttribute("message", "관리자에 의해 탈퇴처리 된 회원입니다. 고객센터에 문의 해주세요.");
                    return "redirect:/login/loginPage";
                }

                if ("탈퇴".equals(member.getMem_type())) {
                    System.out.println("탈퇴한 회원입니다.");
                    model.addAttribute("withdraw", "탈퇴한 회원입니다. 정보를 복구하시겠습니까?");
                    model.addAttribute("member", member);
                    return "/login/loginPage";
                }

                memberMapper.updatelogdate(member.getMem_code());
                memberMapper.deleteWindowPro(member.getMem_code());

                session.setAttribute("loginUser", member);
                session.setAttribute("userGrade", userGrade);

                System.out.println(member.getMem_name() + " 님 환영합니다.");

                if ("on".equals(remember)) {
                    Cookie emailCookie = new Cookie("email", email);
                    emailCookie.setMaxAge(60 * 60 * 24 * 30);
                    emailCookie.setPath("/");
                    response.addCookie(emailCookie);
                    System.out.println("쿠키 저장됨 / 저장된 이메일 : " + email);
                } else {
                    Cookie emailCookie = new Cookie("email", null);
                    emailCookie.setMaxAge(0);
                    emailCookie.setPath("/");
                    response.addCookie(emailCookie);
                    System.out.println("쿠키 삭제됨 / 삭제된 이메일 : " + email);
                }
                return "redirect:" + previousUrl;
            } else {
                System.out.println("비밀번호가 일치하지 않습니다.");
                rs.addFlashAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
                return "redirect:/login/loginPage";
            }
        } else {
            System.out.println("등록된 이메일이 아닙니다.");
            rs.addFlashAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
            return "redirect:/login/loginPage";
        }
    }
}