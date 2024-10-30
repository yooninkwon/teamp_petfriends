package com.tech.petfriends.admin.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
		String proDiscountStr = (String) model.getAttribute("proDiscount"); // 제품 할인 값을 String으로 가져오기
		int proDiscount = Integer.parseInt(proDiscountStr); // String을 int로 변환하기
		String productStatus = (String) model.getAttribute("productStatus"); // 제품 상태
		String options = (String)model.getAttribute("options");
		String proCode = UUID.randomUUID().toString();

		filterType1 = ifNull(filterType1);
		filterType2 = ifNull(filterType2);
		
		//상품등록
		adminProductDao.adminProductAdd(proCode,proName,petType,proType,proDetailType,filterType1,filterType2,proDiscount,productStatus);

		// 이미지 파일 가져오기
		MultipartFile[] mainImages = (MultipartFile[]) model.getAttribute("mainImages"); // 대표 이미지
		MultipartFile[] desImages = (MultipartFile[]) model.getAttribute("desImages"); // 상세 이미지
		// option java list로 변환
		List<Map<String, Object>> optionList = makeList(options);
		
		    
		 // 파일 저장 경로 지정
		String mainImagesDir = new File("src/main/resources/static/Images/ProductImg/MainImg").getAbsolutePath();
		String desImagesDir = new File("src/main/resources/static/Images/ProductImg/DesImg").getAbsolutePath();    

	    List<String> savedMainImageNames = saveFiles(mainImages, mainImagesDir); // 새 파일 이름 리스트
	    List<String> savedDesImageNames = saveFiles(desImages, desImagesDir); // 상세 이미지
	    
	 // Null일 경우 빈 리스트로 초기화하여 null 채우기 작업이 원활히 이루어지도록 설정
	    if (savedMainImageNames == null) {
	        savedMainImageNames = new ArrayList<>();
	    }
	    if (savedDesImageNames == null) {
	        savedDesImageNames = new ArrayList<>();
	    }
	    
	    while (savedMainImageNames.size() < 5) {
	        savedMainImageNames.add(null); // null로 채우기
	    }
	    while (savedDesImageNames.size() < 10) {
	        savedDesImageNames.add(null); // null로 채우기
	    }

	    //이미지 등록
		adminProductDao.adminProductImgAdd(proCode,savedMainImageNames,savedDesImageNames);
		
		int x=1;
		// 옵션 리스트를 반복하며 각 옵션을 DB에 추가
	    for (Map<String, Object> option : optionList) {
	        String optionName = (String) option.get("name"); // 옵션명 추출
	        int optionPrice = Integer.parseInt(option.get("price").toString()); // 가격 추출
	        int optionCount = Integer.parseInt(option.get("count").toString()); // 수량 추출
	        int finalPrice = (optionPrice * (100 - proDiscount) / 100) / 10 * 10; 
	        String optCode = proCode+"-"+x;
	        // 각 옵션을 DB에 추가하는 메소드 호출
	        adminProductDao.adminProductOptAdd(proCode, optionName, optionPrice, optionCount, finalPrice, optCode);
	        x++;
	    }
	}
	
	// json배열을 java식으로 변환
	public List<Map<String, Object>> makeList(String options){
		 ObjectMapper mapper = new ObjectMapper();
		    List<Map<String, Object>> optionList = new ArrayList<>();

		    try {
		        // JSON 문자열을 List<Map<String, Object>> 형식으로 변환
		        optionList = mapper.readValue(options, new TypeReference<List<Map<String, Object>>>() {});
		    } catch (Exception e) {
		        e.printStackTrace();
		    }
		    
		    return optionList;
	}
	
	// 이미지 새이름 생성 메소드
	private String generateNewFileName(String originalFilename) {
	    return System.currentTimeMillis() + "_" + originalFilename; // 현재 시간 + 원본 파일 이름
	}
	// 파일저장 및 이미지 새이름 리턴 
	public List<String> saveFiles(MultipartFile[] files, String uploadDir) {
	    List<String> savedFileNames = new ArrayList<>(); // 새 파일 이름을 저장할 리스트
	    
	    if (files == null || files.length == 0) {
	        return null; // 파일이 없으면 null 반환
	    }
	    
	    for (MultipartFile file : files) {
	        if (!file.isEmpty()) {
	            String originalFilename = file.getOriginalFilename();
	            String newFileName = generateNewFileName(originalFilename); // 새 파일 이름 생성
	            
	            try {
	                // 파일 저장
	                File destinationFile = new File(uploadDir + File.separator + newFileName);
	                file.transferTo(destinationFile);
	                
	                savedFileNames.add(newFileName); // 새 파일 이름 추가
	            } catch (IOException e) {
	                e.printStackTrace(); // 예외 처리
	            }
	        }
	    }

	    return savedFileNames; // 새 파일 이름 리스트 반환
	}
	
	public String ifNull(String filter) {
		if(filter.equals("")) {
			filter=null;
		}
		
		return filter;
	}
	
}
