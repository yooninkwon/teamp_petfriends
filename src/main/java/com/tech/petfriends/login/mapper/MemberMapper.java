package com.tech.petfriends.login.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.tech.petfriends.login.dto.MemberAddressDto;
import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.dto.MemberPointsDto;
import com.tech.petfriends.mypage.dto.GradeDto;

@Mapper
public interface MemberMapper {
	
	// 포인트 테이블 가져오기
	ArrayList<MemberPointsDto> pointsList();
	
	// 포인트 테이블 인서트
	void insertPoints(MemberPointsDto memberPoints);
	
	// 주문 결제시 총 구매금액 업데이트
	void updatePayAmount(String mem_code, int order_amount);
	
	// 회원 유형 변경
	void updateCustomerType(@Param("ids") List<Long> ids, @Param("newType") String newType);
	
	// 회원 리스트
	ArrayList<MemberLoginDto> memberList();
	
	// 로그인시 마지막 접속 시간 업데이트
	void updatelogdate(String mem_code);
	
	// 최근 1주일 이내 가입 회원 조회
	int newMemberForWeek();
	
	// 최근 1주일 이내 방문 회원 조회
	int visitMemberForWeek();
	
	// 최근 1주일 탈퇴 회원 조회
	int withdrawMemberForWeek();
	
	// 최근 가입 회원 정보 5개
	ArrayList<MemberLoginDto> newMemberList();
	
	// 최근 가입 회원 정보 3개
	ArrayList<MemberLoginDto> withdrawMemberList();
	
	// 총 회원수 조회
	int totalMember();
	
    // 이메일로 사용자 조회
    MemberLoginDto getMemberByEmail(String email);
    
    // 아이디 찾기
    MemberLoginDto findUserId(String name, String phoneNumber);
    
    // 회원가입
    void insertMember(MemberLoginDto member);
    
    // 회원가입 기본 주소 입력
    void insertJoinAddress(MemberAddressDto address);
    
    // 닉네임 중복 체크
    int isNicknameDuplicate(String nickname);
    
    // 이메일 중복 검사
    int isEmailDuplicate(String email);
    
    // 연락처 중복 검사
    int isTellDuplicate(String tell);
    
    // 비밀번호 변경
    void updatePassword(String email, String encryptedPassword);
    
    // 중복회원 검사
    int isPhoneNumberDuplicate(String phoneNumber);

    // 로그인 회원 등급 정보 검색
	GradeDto getGradeByMemberCode(String mem_code);

	void deleteWindowPro(String mem_code);
	
	// 회원탈퇴
	void withdraw(String mem_code);
	
	// 탈퇴회원 복구
	void deleteRestoration(String mem_code);

}
