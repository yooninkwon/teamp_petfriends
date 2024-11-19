package com.tech.petfriends.login.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tech.petfriends.login.mapper.MemberMapper;
import com.tech.petfriends.login.util.PasswordEncryptionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PasswordService {

    private final MemberMapper memberMapper;
    private final PasswordEncryptionService passwordEncryptionService;

    public String changePassword(HttpServletRequest request, RedirectAttributes re) {
        String email = request.getParameter("email");
        String newPassword = request.getParameter("password");

        try {
            // 비밀번호 암호화
            String encryptedPassword = passwordEncryptionService.encryptPassword(newPassword);
            // 비밀번호 업데이트
            memberMapper.updatePassword(email, encryptedPassword);
            re.addFlashAttribute("message", "비밀번호가 성공적으로 변경되었습니다.");
            return "redirect:/login/loginPage"; // 비밀번호 변경 후 로그인 페이지로 리다이렉트
        } catch (Exception e) {
            e.printStackTrace();
            re.addFlashAttribute("error", "비밀번호 변경 중 오류가 발생했습니다.");
            return "login/changePw"; // 에러 발생 시 비밀번호 변경 페이지로 다시 이동
        }
    }
}
