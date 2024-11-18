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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.mapper.MemberMapper;
import com.tech.petfriends.login.util.PasswordEncryptionService;
import com.tech.petfriends.mypage.dto.GradeDto;

@Controller
@RequestMapping("/login")
public class LoginController {

	@Autowired
	private MemberMapper memberMapper;

	@Autowired
	private PasswordEncryptionService passwordEncryptionService;

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

	@PostMapping("/loginService")
	public String loginService(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session, RedirectAttributes rs) {
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		String remember = request.getParameter("remember");
		String previousUrl = request.getParameter("previousUrl");
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
				GradeDto userGrade = memberMapper.getGradeByMemberCode(member.getMem_code());
				if (member.getMem_type().equals("강제탈퇴")) {
					rs.addFlashAttribute("message", "관리자에 의해 탈퇴처리 된 회원입니다. 고객센터에 문의 해주세요.");
					return "redirect:/login/loginPage";
				}
				if (member.getMem_type().equals("탈퇴")) {
					model.addAttribute("withdraw", "탈퇴한 회원입니다. 정보를 복구하시겠습니까?");
					model.addAttribute("member", member);
					return "/login/loginPage";
				}
				memberMapper.updatelogdate(member.getMem_code()); // 로그인시 로그데이트 현재로 업데이트
				memberMapper.deleteWindowPro(member.getMem_code()); // 유저로그인시 둘러본상품목록 전체삭제
				session.setAttribute("loginUser", member); // 세션에 사용자 정보 저장
				session.setAttribute("userGrade", userGrade);
				// 아이디 저장 체크박스 처리
				if ("on".equals(remember)) {
					Cookie emailCookie = new Cookie("email", email);
					emailCookie.setMaxAge(60 * 60 * 24 * 30); // 쿠키 유효 기간 30일
					emailCookie.setPath("/");
					response.addCookie(emailCookie);
				} else {
					Cookie emailCookie = new Cookie("email", null);
					emailCookie.setMaxAge(0); // 쿠키 삭제
					emailCookie.setPath("/");
					response.addCookie(emailCookie);
				}
				return "redirect:" + previousUrl; // 로그인 성공 시 메인 페이지로 이동
			} else {
				rs.addFlashAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
				return "redirect:/login/loginPage"; // 로그인 실패 시 로그인 페이지로 이동
			}
		} else {
			rs.addFlashAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
			return "redirect:/login/loginPage"; // 로그인 실패 시 로그인 페이지로 이동
		}
	}

	@GetMapping("/findId")
	public String FindId() {
		return "login/findId";
	}

	@GetMapping("/findPw")
	public String FindPw() {
		return "login/findPw";
	}

	@PostMapping("/changePw")
	public String ChangePw(HttpServletRequest request, Model model) {
		String email = request.getParameter("email");
		model.addAttribute("userEmail", email);
		return "login/changePw";
	}

	@PostMapping("/changePwService")
	public String changePwService(HttpServletRequest request, RedirectAttributes re) {
		String email = request.getParameter("email");
		String newPassword = request.getParameter("password");
		// 새로운 비밀번호 암호화 후 업데이트
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

	@GetMapping("/withdraw")
	public String withdraw(@RequestParam(required = false, defaultValue = "없음") String reason, HttpSession session,
			HttpServletResponse response, RedirectAttributes re) {
		// 쿠키 삭제
		Cookie emailCookie = new Cookie("email", null);
		emailCookie.setMaxAge(0); // 쿠키 유효 기간을 0으로 설정하여 무효화
		emailCookie.setPath("/"); // 설정된 경로와 일치시켜야 삭제됨
		response.addCookie(emailCookie);
		MemberLoginDto member = (MemberLoginDto) session.getAttribute("loginUser");
		memberMapper.withdraw(member.getMem_code(), reason);
		re.addFlashAttribute("message", "회원 탈퇴가 완료되었습니다.");
		session.invalidate();
		return "redirect:/";
	}

	@PostMapping("/restoration")
	public String restoration(@RequestParam("code") String memCode, RedirectAttributes re) {
		memberMapper.deleteRestoration(memCode);
		re.addFlashAttribute("message", "복구가 완료되었습니다. 다시 로그인 해주세요");
		return "redirect:/";
	}

}