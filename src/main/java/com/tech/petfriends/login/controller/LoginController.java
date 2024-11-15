package com.tech.petfriends.login.controller;

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
import com.tech.petfriends.login.service.ChangePwService;
import com.tech.petfriends.login.service.MemLoginService;
import com.tech.petfriends.member.service.MemberService;


@Controller
@RequestMapping("/login")
public class LoginController {
   
    @Autowired
    private MemberMapper memberMapper;
    
    @Autowired
    private MemberService memberService;
   
    LoginInterModelRequest loginInterMR;
    
    String previousUrl = "";
    
    @GetMapping("/loginPage")
    public String LoginPage(HttpServletRequest request, Model model) {
    	if(request.getHeader("Referer").equals("http://localhost:9002/login/loginPage")) {
    		model.addAttribute("previousUrl",previousUrl);
    	} else {
    		previousUrl = request.getHeader("Referer");	
    		model.addAttribute("previousUrl",previousUrl);
    	}
        System.out.println("로그인 페이지 이동: " + request.getRequestURI());
        return "login/loginPage";
    }
   
    @PostMapping("/loginService")
    public String loginService(HttpServletRequest request, HttpServletResponse response,
                           Model model, HttpSession session, RedirectAttributes rs) {
    	loginInterMR = new MemLoginService(memberMapper, response, rs, session);
    	loginInterMR.execute(model, request);
    	return (String) model.getAttribute("modelAdd");
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
   
   
   @PostMapping("/changePw")
   public String ChangePw(HttpServletRequest request, Model model) {
	   String email = request.getParameter("email");
	   System.out.println("비밀번호 변경 이동");
	   System.out.println(email);
	   model.addAttribute("userEmail",email);
	   return "login/changePw";
   }
   
   @PostMapping("/changePwService")
   public String changePwService(HttpServletRequest request, Model model) {
	   loginInterMR = new ChangePwService(memberService);
	   loginInterMR.execute(model, request);
	   return (String) model.getAttribute("addModelStr");
   }
   
   @GetMapping("/withdraw")
   public String withdraw(@RequestParam(required = false, defaultValue = "없음") String reason, 
		   HttpSession session, HttpServletResponse response, RedirectAttributes re) {
	    // 쿠키 삭제
	    Cookie emailCookie = new Cookie("email", null);
	    emailCookie.setMaxAge(0); // 쿠키 유효 기간을 0으로 설정하여 무효화
	    emailCookie.setPath("/"); // 설정된 경로와 일치시켜야 삭제됨
	    response.addCookie(emailCookie);
	    MemberLoginDto member = (MemberLoginDto) session.getAttribute("loginUser");
	    memberMapper.withdraw(member.getMem_code(),reason);
	    re.addFlashAttribute("message","회원 탈퇴가 완료되었습니다.");
	    session.invalidate();
	    return "redirect:/";
   }
   
   @PostMapping("/restoration")
   public String restoration(@RequestParam("code") String memCode, RedirectAttributes re) {
	   System.out.println(memCode);
	   memberMapper.deleteRestoration(memCode);
	   re.addFlashAttribute("message","복구가 완료되었습니다. 다시 로그인 해주세요");
	   return "redirect:/";
   }
   
}