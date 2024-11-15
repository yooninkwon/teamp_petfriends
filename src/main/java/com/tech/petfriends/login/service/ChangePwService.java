package com.tech.petfriends.login.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.tech.petfriends.login.controller.LoginInterModelRequest;
import com.tech.petfriends.member.service.MemberService;

@Service
public class ChangePwService implements LoginInterModelRequest {

	private MemberService memberService;
	
	public ChangePwService(MemberService memberService) {
		this.memberService = memberService;
	}	
	
	@Override
	public void execute(Model model, HttpServletRequest request) {
		
		String addModelStr = "";
       String email = request.getParameter("email");
       String newPassword = request.getParameter("password");

       // 새로운 비밀번호 암호화 후 업데이트
       try {
           memberService.updatePassword(email, newPassword);
           model.addAttribute("message", "비밀번호가 성공적으로 변경되었습니다.");
           addModelStr = "redirect:/login/loginPage";  // 비밀번호 변경 후 로그인 페이지로 리다이렉트
       } catch (Exception e) {
           e.printStackTrace();
           model.addAttribute("error", "비밀번호 변경 중 오류가 발생했습니다.");
           addModelStr = "login/changePw";  // 에러 발생 시 비밀번호 변경 페이지로 다시 이동
       }
       
       model.addAttribute("addModelStr", addModelStr);
       
	}
	
	
}
