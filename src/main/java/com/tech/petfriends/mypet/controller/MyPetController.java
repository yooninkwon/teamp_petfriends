package com.tech.petfriends.mypet.controller;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.mypage.dao.MypageDao;
import com.tech.petfriends.mypage.dto.MyPetDto;

@Controller
@RequestMapping("/mypet")
public class MyPetController {
	
	@Autowired
	MypageDao mypageDao;
	
	@GetMapping("/myPetRegistPage1")
	public String myPetRegistPage1() {
		System.out.println("펫등록 페이지1");
		
		return "mypet/myPetRegistPage1";
	}
	
	@PostMapping("/myPetRegistPage2")
	public String myPetRegistPage2(HttpServletRequest request, Model model) {	
		System.out.println("펫등록 페이지2");
		String petType = request.getParameter("petType");
		String petName = request.getParameter("petName");
		
		model.addAttribute("petType",petType);
		model.addAttribute("petName",petName);
		
		return "mypet/myPetRegistPage2";
	}
	
	@PostMapping("/myPetRegistPage3")
	public String myPetRegistPage3(
	        HttpServletRequest request,
	        @RequestParam("petImg") MultipartFile petImgFile,
	        Model model) {

	    System.out.println("펫등록 페이지3");

	    String petType = request.getParameter("petType");
	    String petName = request.getParameter("petName");
	    String petDetailType = request.getParameter("detailType");
	    String petBirth = request.getParameter("petBirth");

	    String uploadDir = request.getServletContext().getRealPath("/static/Images/pet/");
	    File directory = new File(uploadDir);
	    if (!directory.exists()) {
	        directory.mkdirs();
	    }
	    String fileName = petImgFile.getOriginalFilename();
	    String filePath = uploadDir + fileName;

	    try {
	        petImgFile.transferTo(new File(filePath));
	        System.out.println("파일 저장 경로: " + filePath);
	        System.out.println("파일 저장 완료");
	    } catch (IOException e) {
	        e.printStackTrace();
	    }

	    // 모델에 데이터 추가
	    model.addAttribute("petType", petType);
	    model.addAttribute("petName", petName);
	    model.addAttribute("petImg", uploadDir + fileName); // 경로와 파일 이름을 포함한 이미지 경로 전달
	    model.addAttribute("petDetailType", petDetailType);
	    model.addAttribute("petBirth", petBirth);

	    return "mypet/myPetRegistPage3";
	}
	
	@PostMapping("/myPetRegistPage4")
	public String myPetRegistPage4(HttpServletRequest request, Model model) {	
		System.out.println("펫등록 페이지4");
		String petType = request.getParameter("petType");
		String petName = request.getParameter("petName");
		String petImg = request.getParameter("petImg");
		String petDetailType = request.getParameter("petDetailType");
		String petBrith = request.getParameter("petBrith");
		String petGender = request.getParameter("petGender");
		String petNeut = request.getParameter("petNeut");
		String petWeight = request.getParameter("weight");
		if (request.getParameter("weight")=="") {
			petWeight = "0";
		}
		String petBodyType = request.getParameter("petBodyType");
		
		model.addAttribute("petType",petType);
		model.addAttribute("petName",petName);
		model.addAttribute("petImg",petImg);
		model.addAttribute("petDetailType",petDetailType);
		model.addAttribute("petBrith",petBrith);
		model.addAttribute("petGender",petGender);
		model.addAttribute("petNeut",petNeut);
		model.addAttribute("petWeight",petWeight);
		model.addAttribute("petBodyType",petBodyType);
		
		return "mypet/myPetRegistPage4";
	}
	
	@PostMapping("/myPetRegistPage5")
	public String myPetRegistPage5(HttpServletRequest request, Model model, HttpSession session) {	
		System.out.println("펫등록 완료 페이지");
		
		String petType = request.getParameter("petType");
		if (petType == "dog") {
			petType = "D";
		} else {
			petType = "C";
		}
		String petName = request.getParameter("petName");
		String petImg = request.getParameter("petImg");
		String petDetailType = request.getParameter("petDetailType");
		String petBrith = request.getParameter("petBrith");
		String petGender = request.getParameter("petGender");
		String petNeut = request.getParameter("petNeut");
		String petWeight = request.getParameter("petWeight");
		String petBodyType = request.getParameter("petBodyType");
		String petInterInfo = request.getParameter("petInterInfo");
		String petAllergy = request.getParameter("allergyInput");
		if (petAllergy == "") {
			petAllergy = "x";
		}
		
		MemberLoginDto member = new MemberLoginDto();
		member = (MemberLoginDto) session.getAttribute("loginUser");
		
		MyPetDto pet = new MyPetDto();
		String uniqueID = UUID.randomUUID().toString();
		pet.setPet_code(uniqueID);
		pet.setMem_code(member.getMem_code());
		pet.setPet_type(petType);
		pet.setPet_name(petName);
		pet.setPet_img(petImg);
		pet.setPet_breed(petDetailType);

		Date sqlDate = Date.valueOf(petBrith);
		pet.setPet_birth(sqlDate);
		
		if (petGender == "남아") {
			pet.setPet_gender("M");
		} else {
			pet.setPet_gender("F");
		}
		pet.setPet_weight(petWeight);
		if (petNeut=="완료했어요!") {
			pet.setPet_neut("Y");
		} else {
			pet.setPet_neut("N");
		}
		
		pet.setPet_form(petBodyType);
		pet.setPet_care(petInterInfo);
		pet.setPet_allergy(petAllergy);
		
		ArrayList<MyPetDto> pets = mypageDao.getPetsByMemberCode(member.getMem_code());
		if (pets == null) {
			pet.setPet_main("Y");
		} else {
			pet.setPet_main("N");
		}
		
		mypageDao.insertMyPet(pet);
		
		System.out.println("데이터 저장 완료");
		model.addAttribute("petType",petType);
		model.addAttribute("petName",petName);
		model.addAttribute("petImg",petImg);
		model.addAttribute("petDetailType",petDetailType);
		model.addAttribute("petBrith",petBrith);
		model.addAttribute("petGender",petGender);
		model.addAttribute("petNeut",petNeut);		
		model.addAttribute("petWeight",petWeight);
		model.addAttribute("petBodyType",petBodyType);
		model.addAttribute("petInterInfo",petInterInfo);
		model.addAttribute("petAllergy",petAllergy);
		
		return "mypet/myPetRegistPage5";
	}
	
}
