package com.tech.petfriends.join.service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tech.petfriends.login.dto.MemberAddressDto;
import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.dto.MemberPointsDto;
import com.tech.petfriends.login.mapper.MemberMapper;
import com.tech.petfriends.login.util.PasswordEncryptionService;

@Service
public class JoinService {

    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private PasswordEncryptionService passwordEncryptionService;

    public String processJoinService(HttpServletRequest request, HttpSession session, RedirectAttributes redirectAttributes) {
        MemberLoginDto member = new MemberLoginDto();
        MemberAddressDto address = new MemberAddressDto();    
        String phoneNumber = request.getParameter("phoneNumber");
        int duplicateCount = memberMapper.isPhoneNumberDuplicate(phoneNumber);
        if (duplicateCount > 0) {
            redirectAttributes.addFlashAttribute("error", "이미 가입된 정보입니다.");
            return "redirect:/login/loginPage";
        }
        // UUID로 mem_code 생성
        String uniqueID = UUID.randomUUID().toString();
        member.setMem_code(uniqueID);
        member.setMem_email(request.getParameter("email"));
        // 비밀번호 암호화 아르곤2
        member.setMem_pw(passwordEncryptionService.encryptPassword(request.getParameter("password")));
        member.setMem_nick(request.getParameter("nickname"));
        member.setMem_tell(phoneNumber);
        member.setMem_name(request.getParameter("name"));
        // 날짜 형식 변환
        String birthStr = request.getParameter("birth");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        try {
            java.util.Date parsedDate = dateFormat.parse(birthStr);
            Date birthDate = new Date(parsedDate.getTime()); // java.sql.Date로 변환
            member.setMem_birth(birthDate);
        } catch (Exception e) {
            e.printStackTrace();
        }
        member.setMem_gender(request.getParameter("gender"));
        // 현재 시간 설정
        java.sql.Timestamp currentTime = new java.sql.Timestamp(System.currentTimeMillis());
        member.setMem_regdate(currentTime);
        member.setMem_logdate(currentTime);
        // 가입하는 회원이 기존 회원 닉네임 초대코드로 입력 시 적립금 적립
        handleInvitationCode(request, member);
        // 주소 테이블 인서트
        String uniqueID2 = UUID.randomUUID().toString();
        address.setAddr_code(uniqueID2);
        address.setMem_code(uniqueID);
        address.setAddr_postal(request.getParameter("postcode"));
        address.setAddr_line1(request.getParameter("address"));
        address.setAddr_line2(request.getParameter("detailAddress"));
        address.setAddr_default('Y');
        memberMapper.insertJoinAddress(address);
        // 회원가입 후 로그인 처리
        session.setAttribute("loginUser", member);
        redirectAttributes.addFlashAttribute("fromJoin", member.getMem_nick() + "님 회원가입이 완료 되었습니다.");      
        return "redirect:/mypet/myPetRegistPage1";
    }

    private void handleInvitationCode(HttpServletRequest request, MemberLoginDto member) {
        String inviteMember = request.getParameter("inviteCode");
        if (inviteMember != null && !inviteMember.isEmpty()) {
            if (memberMapper.isNicknameDuplicate(inviteMember) == 1) {
                MemberLoginDto inviteUser = memberMapper.nickNameMember(inviteMember);
                if (inviteUser != null) {
                    member.setMem_invite(inviteUser.getMem_nick());
                    // 초대 회원 포인트 적립 처리
                    MemberPointsDto invitePoints = new MemberPointsDto();
                    invitePoints.setMem_code(inviteUser.getMem_code());
                    invitePoints.setPoint_memo("가입 추천 적립금");
                    invitePoints.setPoint_info("적립");
                    invitePoints.setPoint_type('+');
                    invitePoints.setPoints(5000);
                    memberMapper.invitePoints(invitePoints);
                    memberMapper.updatePointsForInvite(inviteUser.getMem_code(), invitePoints.getPoints());
                    // 신규 가입 회원 포인트 적립 처리
                    MemberPointsDto newMemberPoints = new MemberPointsDto();
                    newMemberPoints.setMem_code(member.getMem_code());
                    newMemberPoints.setPoint_memo("초대 가입 적립금");
                    newMemberPoints.setPoint_info("적립");
                    newMemberPoints.setPoint_type('+');
                    newMemberPoints.setPoints(5000);           
                    memberMapper.insertMember(member);
                    memberMapper.invitePoints(newMemberPoints);
                    memberMapper.updatePointsForInvite(newMemberPoints.getMem_code(), newMemberPoints.getPoints());
                }
            } else {
                member.setMem_invite("");
            }
        }
    }
}
