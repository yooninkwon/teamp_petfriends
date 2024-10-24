package com.tech.petfriends.join.controller;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tech.petfriends.configuration.ApikeyConfig;
import com.tech.petfriends.login.dto.MemberAddressDto;
import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.mapper.MemberMapper;
import com.tech.petfriends.login.util.PasswordEncryptionService;
import com.tech.petfriends.member.service.MemberService;

@Controller
@RequestMapping("/join")
public class JoinController {
	
	@Autowired
    private MemberMapper memberMapper;
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	ApikeyConfig apikeyConfig;
	
	@GetMapping("/joinPage")
	public String JoinPage(Model model) {
		System.out.println("회원가입 페이지 이동");
		
		String kakaoApiKey = apikeyConfig.getKakaoApikey();
		model.addAttribute("kakaoApi",kakaoApiKey);
		
		return "/join/joinPage";
	}
	
	@GetMapping("/addressMap")
	public String AddrMap(Model model) {
		System.out.println("주소 지도 화면 이동");
		
		String kakaoApiKey = apikeyConfig.getKakaoApikey();
		model.addAttribute("kakaoApi",kakaoApiKey);
		
		return "/join/addressMap";
	}
	
	
	@PostMapping("/joinService")
	public String joinService(HttpServletRequest request, HttpSession session, Model model, RedirectAttributes redirectAttributes) {
        MemberLoginDto member = new MemberLoginDto();
        MemberAddressDto address = new MemberAddressDto();
        // 비밀번호 암호화 아르곤2
        PasswordEncryptionService passencrypt = new PasswordEncryptionService(); 
        
        String phoneNumber = request.getParameter("phoneNumber");
        
        int duplicateCount = memberMapper.isPhoneNumberDuplicate(phoneNumber);
        if (duplicateCount > 0) {
        	redirectAttributes.addFlashAttribute("error", "이미 가입된 정보입니다.");
            return "redirect:/login/loginPage";  // 중복일 경우 회원 가입 페이지로 다시 이동
        }
        
        // UUID로 mem_code 생성
        String uniqueID = UUID.randomUUID().toString();
        member.setMem_code(uniqueID); 
        member.setMem_email(request.getParameter("email"));
        member.setMem_pw(passencrypt.encryptPassword(request.getParameter("password")));
        member.setMem_nick(request.getParameter("nickname"));
        member.setMem_tell(phoneNumber);
        
        
        System.out.println(request.getParameter("phoneNumber")); 
        member.setMem_name(request.getParameter("name"));

        // 날짜 형식 변환
        String birthStr = request.getParameter("birth");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        try {
            java.util.Date parsedDate = dateFormat.parse(birthStr);
            Date birthDate = new Date(parsedDate.getTime()); // java.sql.Date로 변환
            member.setMem_birth(birthDate);
        } catch (ParseException e) {
            e.printStackTrace(); // 오류 발생 시 예외 처리
        }
        
        member.setMem_gender(request.getParameter("gender"));
        member.setMem_invite(request.getParameter("inviteCode"));
        
        // 현재 시간 설정
        java.sql.Timestamp currentTime = new java.sql.Timestamp(System.currentTimeMillis());
        member.setMem_regdate(currentTime);
        member.setMem_logdate(currentTime);

        memberService.joinMember(member);
        
        // 주소 테이블 인서트
        String uniqueID2 = UUID.randomUUID().toString();
        address.setAddr_code(uniqueID2);
        // 멤버 코드는 동일하게 맞추기 위해 기존 uuid 사용
        address.setMem_code(uniqueID);
        
        address.setAddr_postal(request.getParameter("postcode"));
        address.setAddr_line1(request.getParameter("address"));
        address.setAddr_line2(request.getParameter("detailAddress"));
        address.setAddr_default('Y');
        
        memberService.joinAddress(address);       
        
        System.out.println("회원 가입 서비스 이동");
        
        // 회원가입 후 로그인 처리 (세션에 로그인 정보 저장)
        session.setAttribute("loginUser", member);
        
        // 회원가입 완료 후 메인 페이지로 리다이렉트
        return "redirect:/";
    }
}
