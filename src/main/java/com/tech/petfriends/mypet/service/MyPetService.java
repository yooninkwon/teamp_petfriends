package com.tech.petfriends.mypet.service;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.mypage.dao.MypageDao;
import com.tech.petfriends.mypage.dto.MyPetDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyPetService {
	
	private final MypageDao mypageDao;

    public Map<String, String> getPetRegistrationData(HttpServletRequest request) {
        String petType = request.getParameter("petType");
        String petName = request.getParameter("petName");
        Map<String, String> petData = new HashMap<>();
        petData.put("petType", petType);
        petData.put("petName", petName);
        return petData;
    }

    public Map<String, Object> handlePetImageUpload(HttpServletRequest request, MultipartFile petImgFile) {
        Map<String, Object> petData = new HashMap<>();
        String fileName = null;
        String petType = request.getParameter("petType");
        String petName = request.getParameter("petName");
        String petDetailType = request.getParameter("detailType");
        String petBirth = request.getParameter("petBirth");
        try {
            if (petImgFile != null && !petImgFile.isEmpty()) {
                // 절대경로 설정
                String imagesDir = new File("src/main/resources/static/Images/pet/").getAbsolutePath();
                // 파일 이름 설정
                fileName = petImgFile.getOriginalFilename();
                File saveFile = new File(imagesDir, fileName);
                // 파일 이름 중복 체크 및 수정
                int count = 1;
                String nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
                String ext = fileName.substring(fileName.lastIndexOf('.'));
                while (saveFile.exists()) {
                    fileName = nameWithoutExt + "(" + count + ")" + ext;
                    saveFile = new File(imagesDir, fileName);
                    count++;
                }
                // 파일 저장
                petImgFile.transferTo(saveFile);
            } else {
                fileName = "noPetImg.jpg";
            }
            // 모델에 추가할 데이터 준비
            petData.put("petType", petType);
            petData.put("petName", petName);
            petData.put("petImg", fileName);
            petData.put("petDetailType", petDetailType);
            petData.put("petBirth", petBirth);
        } catch (IOException e) {
            e.printStackTrace();
            petData.put("error", "파일 업로드 실패");
        }
        return petData;
    }
    
    public Map<String, Object> getPetDetails(HttpServletRequest request) {
        Map<String, Object> petDetails = new HashMap<>();
        String petType = request.getParameter("petType");
        String petName = request.getParameter("petName");
        String petImg = request.getParameter("petImg");
        String petDetailType = request.getParameter("petDetailType");
        String petBirth = request.getParameter("petBirth");
        String petGender = request.getParameter("petGender");
        String petNeut = request.getParameter("petNeut");
        String petWeight = request.getParameter("weight");
        if (petWeight == null || petWeight.isEmpty()) {
            petWeight = "0";
        }
        String petBodyType = request.getParameter("petBodyType");

        petDetails.put("petType", petType);
        petDetails.put("petName", petName);
        petDetails.put("petImg", petImg);
        petDetails.put("petDetailType", petDetailType);
        petDetails.put("petBirth", petBirth);
        petDetails.put("petGender", petGender);
        petDetails.put("petNeut", petNeut);
        petDetails.put("petWeight", petWeight);
        petDetails.put("petBodyType", petBodyType);

        return petDetails;
    }
    
    public MyPetDto registerPet(HttpServletRequest request, HttpSession session) {
        String petType = request.getParameter("petType");
        if ("dog".equals(petType)) {
            petType = "D";
        } else if ("cat".equals(petType)) {
            petType = "C";
        }
        String petName = request.getParameter("petName");
        String petImg = request.getParameter("petImg");
        String petDetailType = request.getParameter("petDetailType");
        String petBirth = request.getParameter("petBirth");
        String petGender = request.getParameter("petGender");
        String petNeut = request.getParameter("petNeut");
        String petWeight = request.getParameter("petWeight");
        String petBodyType = request.getParameter("petBodyType");
        String petInterInfo = request.getParameter("petInterInfo");
        String petAllergy = request.getParameter("petInterAllerge");
        if (petInterInfo == null || petInterInfo.isEmpty()) {
            petInterInfo = "X";
        }
        if (petAllergy == null || petAllergy.isEmpty()) {
            petAllergy = "X";
        }
        MemberLoginDto member = (MemberLoginDto) session.getAttribute("loginUser");
        MyPetDto pet = new MyPetDto();
        String uniqueID = UUID.randomUUID().toString();
        pet.setPet_code(uniqueID);
        pet.setMem_code(member.getMem_code());
        pet.setPet_type(petType);
        pet.setPet_name(petName);
        pet.setPet_img(petImg);
        pet.setPet_breed(petDetailType);
        pet.setPet_birth(Date.valueOf(petBirth));
        pet.setPet_gender("남아".equals(petGender) ? "M" : "F");
        pet.setPet_weight(petWeight);
        pet.setPet_neut("완료했어요!".equals(petNeut) ? "Y" : "N");
        pet.setPet_form(petBodyType);
        pet.setPet_care(petInterInfo);
        pet.setPet_allergy(petAllergy);
        ArrayList<MyPetDto> pets = mypageDao.getPetsByMemberCode(member.getMem_code());
        pet.setPet_main((pets == null || pets.isEmpty()) ? "Y" : "N");
        mypageDao.insertMyPet(pet);
        return pet;
    }
}
