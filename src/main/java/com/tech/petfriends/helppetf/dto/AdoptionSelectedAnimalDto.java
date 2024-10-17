package com.tech.petfriends.helppetf.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdoptionSelectedAnimalDto {
	private String desertionNo;    // 공고번호
    private String filename;       // 이미지 파일 URL
    private String happenDt;       // 발견 날짜
    private String happenPlace;    // 발견 장소
    private String kindCd;         // 동물 종류
    private String age;            // 나이
    private String careAddr;       // 보호소 주소
    private String careNm;         // 보호소 이름
    private String careTel;        // 보호소 전화번호
    private String chargeNm;       // 담당자 이름
    private String colorCd;        // 색상
    private String neuterYn;       // 중성화 여부
    private String noticeComment;  // 공고 설명
    private String noticeEdt;      // 공고 종료 날짜
    private String noticeNo;       // 공고 번호
    private String noticeSdt;      // 공고 시작 날짜
    private String officetel;      // 보호소 연락처
    private String orgNm;          // 소속 기관
    private String popfile;        // 큰 이미지 파일 URL
    private String processState;   // 상태 (보호중, 완료 등)
    private String sexCd;          // 성별
    private String specialMark;    // 특이 사항
    private String weight;         // 무게
}
