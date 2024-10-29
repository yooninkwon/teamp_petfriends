package com.tech.petfriends.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.petfriends.admin.dto.ProductListDto;
import com.tech.petfriends.admin.mapper.AdminProductDao;

public class AdminProductAddService implements AdminServiceInterface {

	private AdminProductDao adminProductDao;

	public AdminProductAddService(AdminProductDao adminProductDao) {
		this.adminProductDao = adminProductDao;
	}

	@Override
	public void execute(Model model) {
		// 모델에서 데이터 가져오기
		String petType = (String) model.getAttribute("petType"); // 반려동물 유형
		String proType = (String) model.getAttribute("proType"); // 제품 유형
		String proDetailType = (String) model.getAttribute("proDetailType"); // 제품 세부 유형
		String filterType1 = (String) model.getAttribute("filterType1"); // 필터 유형 1
		String filterType2 = (String) model.getAttribute("filterType2"); // 필터 유형 2
		String proName = (String) model.getAttribute("proName"); // 제품 이름
		String proDiscount = (String) model.getAttribute("proDiscount"); // 제품 할인
		String productStatus = (String) model.getAttribute("productStatus"); // 제품 상태
		String[] options = (String[])model.getAttribute("options");

		// 이미지 파일 가져오기
		MultipartFile[] mainImages = (MultipartFile[]) model.getAttribute("mainImages"); // 대표 이미지
		MultipartFile[] desImages = (MultipartFile[]) model.getAttribute("desImages"); // 상세 이미지

		System.out.println(options);

		
		System.out.println(petType +":"+proType);
		System.out.println(mainImages +":"+desImages);

//		adminProductDao.adminProductAdd();

	}

}
