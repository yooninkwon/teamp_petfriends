package com.tech.petfriends.login.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tech.petfriends.login.mapper.MemberMapper;
import com.tech.petfriends.login.service.LoginService;
import com.tech.petfriends.login.service.PasswordService;
import com.tech.petfriends.login.service.WithdrawService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

	private final MemberMapper memberMapper;
	private final LoginService loginService;
	private final PasswordService passwordService;
	private final WithdrawService withdrawService;

	// 로그인 이전페이지 저장
	String previousUrl = "";
	@GetMapping("/loginPage")
	public String LoginPage(HttpServletRequest request, Model model) {
		if (request.getHeader("Referer").equals("http://localhost:9002/login/loginPage")
				|| request.getHeader("Referer").equals("http://localhost:9002/login/changePw")
				|| request.getHeader("Referer").equals("http://localhost:9002/login/")) {
			model.addAttribute("previousUrl", previousUrl);
		} else {
			previousUrl = request.getHeader("Referer");
			model.addAttribute("previousUrl", previousUrl);
		}
		return "login/loginPage";
	}

	// 로그인 서비스
	@PostMapping("/loginService")
	public String loginService(HttpServletRequest request, HttpServletResponse response, 
			HttpSession session, RedirectAttributes rs) {
	    return loginService.processLoginService(request, response, session, rs);
	}

	// 아이디 찾기
	@GetMapping("/findId")
	public String FindId() {
		return "login/findId";
	}

	// 비밀번호 찾기
	@GetMapping("/findPw")
	public String FindPw() {
		return "login/findPw";
	}

	// 비밀번호 변경 이동
	@PostMapping("/changePw")
	public String ChangePw(HttpServletRequest request, Model model) {
		String email = request.getParameter("email");
		model.addAttribute("userEmail", email);
		return "login/changePw";
	}

	// 비밀번호 변경 서비스
	@PostMapping("/changePwService")
	public String changePwService(HttpServletRequest request, RedirectAttributes re) {
	    return passwordService.changePassword(request, re);
	}

	// 회원 탈퇴
	@GetMapping("/withdraw")
	public String withdraw(@RequestParam(required = false, defaultValue = "없음") String reason, HttpSession session,
	                       HttpServletResponse response, RedirectAttributes re) {
	    return withdrawService.processWithdraw(reason, session, response, re);
	}

	// 탈퇴 회원 복구
	@PostMapping("/restoration")
	public String restoration(@RequestParam("code") String memCode, RedirectAttributes re) {
		memberMapper.deleteRestoration(memCode);
		re.addFlashAttribute("message", "복구가 완료되었습니다. 다시 로그인 해주세요");
		return "redirect:/";
	}

}