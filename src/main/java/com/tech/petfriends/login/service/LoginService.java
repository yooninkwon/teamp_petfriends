package com.tech.petfriends.login.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.mapper.MemberMapper;
import com.tech.petfriends.login.util.PasswordEncryptionService;
import com.tech.petfriends.mypage.dto.GradeDto;

@Service
public class LoginService {

    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private PasswordEncryptionService passwordEncryptionService;

    public String processLoginService(HttpServletRequest request, HttpServletResponse response,
                                      HttpSession session, RedirectAttributes rs) {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String remember = request.getParameter("remember");
        String previousUrl = request.getParameter("previousUrl");

        // 사용자 정보 조회
        MemberLoginDto member = memberMapper.getMemberByEmail(email);
        if (member != null) {
            // 비밀번호 검증
            boolean isValidPassword = passwordEncryptionService.verifyPassword(member.getMem_pw(), password);
            if (isValidPassword) {
                // 회원 등급 정보 조회
                GradeDto userGrade = memberMapper.getGradeByMemberCode(member.getMem_code());

                // 사용자 상태 체크
                if ("강제탈퇴".equals(member.getMem_type())) {
                    rs.addFlashAttribute("message", "관리자에 의해 탈퇴처리 된 회원입니다. 고객센터에 문의 해주세요.");
                    return "redirect:/login/loginPage";
                }
                if ("탈퇴".equals(member.getMem_type())) {
                    request.setAttribute("withdraw", "탈퇴한 회원입니다. 정보를 복구하시겠습니까?");
                    request.setAttribute("member", member);
                    return "/login/loginPage";
                }
                if ("휴면".equals(member.getMem_type())) {
					rs.addFlashAttribute("message","휴면회원 입니다. 로그인 하시려면 비밀번호를 변경 해주세요.");
					rs.addFlashAttribute("mem_email",member.getMem_email());
					return "redirect:/login/findPw";
				}

                // 로그인 성공 처리
                memberMapper.updatelogdate(member.getMem_code());
                memberMapper.deleteWindowPro(member.getMem_code());
                session.setAttribute("loginUser", member);
                session.setAttribute("userGrade", userGrade);

                // 아이디 저장 처리 (쿠키)
                handleRememberMeCookie(response, email, remember);

                return "redirect:" + previousUrl;
            } else {
                rs.addFlashAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
                return "redirect:/login/loginPage";
            }
        } else {
            rs.addFlashAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
            return "redirect:/login/loginPage";
        }
    }

    private void handleRememberMeCookie(HttpServletResponse response, String email, String remember) {
        if ("on".equals(remember)) {
            Cookie emailCookie = new Cookie("email", email);
            emailCookie.setMaxAge(60 * 60 * 24 * 30); // 30일
            emailCookie.setPath("/");
            response.addCookie(emailCookie);
        } else {
            Cookie emailCookie = new Cookie("email", null);
            emailCookie.setMaxAge(0); // 쿠키 삭제
            emailCookie.setPath("/");
            response.addCookie(emailCookie);
        }
    }
}

