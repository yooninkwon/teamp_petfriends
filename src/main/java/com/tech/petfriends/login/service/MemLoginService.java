package com.tech.petfriends.login.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tech.petfriends.login.controller.LoginInterModelRequest;
import com.tech.petfriends.login.controller.LoginInterModelRequestRedirect;
import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.mapper.MemberMapper;
import com.tech.petfriends.login.util.PasswordEncryptionService;
import com.tech.petfriends.mypage.dto.GradeDto;

@Service
public class MemLoginService implements LoginInterModelRequestRedirect {

	private MemberMapper memberMapper; 
	private HttpServletResponse response; 
	private HttpSession session;
	
	public MemLoginService(MemberMapper memberMapper, HttpServletResponse response, HttpSession session) {
		this.memberMapper = memberMapper;
		this.response = response;
		this.session = session;
	}
	
	
	@Override
	public void execute(Model model, HttpServletRequest request, RedirectAttributes rs) {
		String modelAdd = "";
		
		String email = request.getParameter("email");
        String password = request.getParameter("password");
        String remember = request.getParameter("remember");
        String previousUrl = request.getParameter("previousUrl");
        
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

                GradeDto userGrade = memberMapper.getGradeByMemberCode(member.getMem_code());
                
                if (member.getMem_type().equals("강제탈퇴")) {
					System.out.println("관리자에 의해 탈퇴된 회원입니다.");
					rs.addFlashAttribute("message","관리자에 의해 탈퇴처리 된 회원입니다. 고객센터에 문의 해주세요.");
					
					modelAdd = "redirect:/login/loginPage";
				}
                
                if (member.getMem_type().equals("탈퇴")) {
					System.out.println("탈퇴한 회원입니다.");
					model.addAttribute("withdraw","탈퇴한 회원입니다. 정보를 복구하시겠습니까?");
					model.addAttribute("member", member);
					modelAdd = "/login/loginPage";
				}
                
                memberMapper.updatelogdate(member.getMem_code()); // 로그인시 로그데이트 현재로 업데이트
                memberMapper.deleteWindowPro(member.getMem_code()); //유저로그인시 둘러본상품목록 전체삭제
                
                session.setAttribute("loginUser", member); // 세션에 사용자 정보 저장
                session.setAttribute("userGrade", userGrade);
                
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
                modelAdd =  "redirect:"+previousUrl;  // 로그인 성공 시 메인 페이지로 이동
            } else {
                System.out.println("비밀번호가 일치하지 않습니다.");
                rs.addFlashAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
                modelAdd =  "redirect:/login/loginPage";  // 로그인 실패 시 로그인 페이지로 이동
            }
        } else {
            System.out.println("등록된 이메일이 아닙니다.");
            rs.addFlashAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
            modelAdd =  "redirect:/login/loginPage";  // 로그인 실패 시 로그인 페이지로 이동
        }
		
        
        model.addAttribute("modelAdd", modelAdd);
		
	}

}
