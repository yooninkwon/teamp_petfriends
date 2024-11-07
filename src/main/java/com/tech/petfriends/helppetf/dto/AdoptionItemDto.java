package com.tech.petfriends.helppetf.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AdoptionItemDto {

//	공고번호
	@JsonProperty("desertionNo")
	private String desertionNo;

//	Thumbnail Image
	@JsonProperty("filename")
	private String filename;

//	접수일
	@JsonProperty("happenDt")
	private String happenDt;

//	발견장소
	@JsonProperty("happenPlace")
	private String happenPlace;

//	품종
	@JsonProperty("kindCd")
	private String kindCd;

//	색상
	@JsonProperty("colorCd")
	private String colorCd;

//	나이
	@JsonProperty("age")
	private String age;

//	체중
	@JsonProperty("weight")
	private String weight;

//	공고번호
	@JsonProperty("noticeNo")
	private String noticeNo;

//	공고시작일
	@JsonProperty("noticeSdt")
	private String noticeSdt;

//	공고종료일
	@JsonProperty("noticeEdt")
	private String noticeEdt;

//	Image
	@JsonProperty("popfile")
	private String popfile;

//	상태
	@JsonProperty("processState")
	private String processState;

//	성별
	@JsonProperty("sexCd")
	private String sexCd;

//	중성화여부
	@JsonProperty("neuterYn")
	private String neuterYn;

//	특징
	@JsonProperty("specialMark")
	private String specialMark;

//	보호소이름
	@JsonProperty("careNm")
	private String careNm;

//	보호소전화번호
	@JsonProperty("careTel")
	private String careTel;

//	보호소 주소
	@JsonProperty("careAddr")
	private String careAddr;

//	관할기관
	@JsonProperty("orgNm")
	private String orgNm;

//	담당자
	@JsonProperty("chargeNm")
	private String chargeNm;

//	담당자연락처
	@JsonProperty("officetel")
	private String officetel;

//	특이사항
	@JsonProperty("noticeComment")
	private String noticeComment;

}
