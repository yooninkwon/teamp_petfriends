package com.tech.petfriends.login.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.mapper.MemberMapper;

@Service
public class WithdrawService {

    @Autowired
    private MemberMapper memberMapper;

    public String processWithdraw(String reason, HttpSession session, HttpServletResponse response, RedirectAttributes re) {
        // 쿠키 삭제
        Cookie emailCookie = new Cookie("email", null);
        emailCookie.setMaxAge(0); // 쿠키 유효 기간을 0으로 설정하여 삭제
        emailCookie.setPath("/"); // 설정된 경로와 일치시켜야 삭제됨
        response.addCookie(emailCookie);

        // 세션에서 로그인 사용자 정보 가져오기
        MemberLoginDto member = (MemberLoginDto) session.getAttribute("loginUser");
        if (member != null) {
            memberMapper.withdraw(member.getMem_code(), reason);
            re.addFlashAttribute("message", "회원 탈퇴가 완료되었습니다.");
            session.invalidate(); // 세션 무효화
            return "redirect:/";
        } else {
            re.addFlashAttribute("error", "로그인 정보가 없습니다. 다시 시도해 주세요.");
            return "redirect:/login/loginPage";
        }
    }
}