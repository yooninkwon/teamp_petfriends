package com.tech.petfriends.mypage.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.tech.petfriends.admin.dto.CouponDto;
import com.tech.petfriends.configuration.ApikeyConfig;
import com.tech.petfriends.login.dto.MemberAddressDto;
import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.mypage.dao.MypageDao;
import com.tech.petfriends.mypage.dto.GradeDto;
import com.tech.petfriends.mypage.dto.MyPetDto;

@Controller
@RequestMapping("/mypage")
public class MyPageController {
	
	@Autowired
	private MypageDao mypageDao;
	@Autowired
	ApikeyConfig apikeyConfig;
	
	@GetMapping("/mypet")
	public String mypet(Model model, HttpSession session) {
		
		MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
        ArrayList<MyPetDto> pets = mypageDao.getPetsByMemberCode(loginUser.getMem_code());
        
		model.addAttribute("pets",pets);
		
		return "mypage/mypet";
	}
	
	@Transactional
	@PostMapping("/mypet/setMainPet")
	public String setMainPet(HttpServletRequest request, HttpSession session) {

		MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
		String newlyChecked = request.getParameter("newlyChecked");
		
		mypageDao.removeMainPet(loginUser.getMem_code());
		mypageDao.setMainPet(newlyChecked);
		
		return "redirect:/mypage/mypet";
	}
	
	@GetMapping("/mypet/register")
	public String mypetRegister() {
		return "mypage/mypet/register";
	}
	
	@GetMapping("register/breedOption")
	public String breedOption(HttpServletRequest request, Model model) {
		
		String petType = request.getParameter("petType");
		
		ArrayList<String> options = mypageDao.getBreedOptionByType(petType);
		
		model.addAttribute("petType",petType);
		model.addAttribute("options",options);
		
		return "/mypage/popup/breedOption";
	}
	
	@Transactional
	@PostMapping("/registPet")
	public String registerPet(HttpServletRequest request, HttpSession session, @RequestParam("petImgFile") MultipartFile petImgFile) {
		
	    String petCode = UUID.randomUUID().toString();
	    String memCode = ((MemberLoginDto) session.getAttribute("loginUser")).getMem_code();

	    MyPetDto myPetDto = new MyPetDto(); //초기화
	    
	    // 폼에서 전달된 정보들 Dto에 넣어주기
	    myPetDto.setPet_code(petCode);
	    myPetDto.setMem_code(memCode);
	    myPetDto.setPet_type(request.getParameter("petType"));
	    myPetDto.setPet_name(request.getParameter("petName"));
	    myPetDto.setPet_breed(request.getParameter("petBreed"));
	    
	    String fileName = null;
		try {
			if (petImgFile != null && !petImgFile.isEmpty()) {
				
				String imagesDir = new File("src/main/resources/static/Images/pet").getAbsolutePath();
				
				// 파일 이름 가져오기
				fileName = petImgFile.getOriginalFilename();
				File saveFile = new File(imagesDir, fileName);
				
				// 파일 이름 중복 체크
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
		} catch (IOException e) {
	        e.printStackTrace();
	        return "파일 업로드 실패";
	    }
	    
	    // 날짜 형식 변환
	    try {
	    	myPetDto.setPet_birth(Date.valueOf(LocalDate.parse(request.getParameter("petBirth"), DateTimeFormatter.ofPattern("yyyy-MM-dd"))));
	    } catch (DateTimeParseException e) {
	        e.printStackTrace();
	    }
	    
	    myPetDto.setPet_img(fileName);
	    myPetDto.setPet_gender(request.getParameter("petGender"));
	    myPetDto.setPet_weight(request.getParameter("petWeight"));
	    myPetDto.setPet_neut(request.getParameter("petNeut"));
	    myPetDto.setPet_form(request.getParameter("petForm"));
	    myPetDto.setPet_care(request.getParameter("petCare"));
	    myPetDto.setPet_allergy(request.getParameter("petAllergy"));

	    mypageDao.removeMainPet(memCode);
	    mypageDao.insertPet(myPetDto);

	    return "redirect:/mypage/mypet";
	}
	
	@GetMapping("/mypet/modify")
	public String mypetModify(HttpServletRequest request, Model model) {
		
		String petCode = request.getParameter("petCode");
		
        MyPetDto info = mypageDao.getInfoByPetCode(petCode);
        
		model.addAttribute("info",info);
        
		return "mypage/mypet/modify";
	}
	
	@PostMapping("/modifyPet")
	public String modifyPet(HttpServletRequest request, @RequestParam("petImgFile") MultipartFile petImgFile) {

	    MyPetDto myPetDto = new MyPetDto();
	    
	    myPetDto.setPet_code(request.getParameter("petCode"));
	    myPetDto.setPet_name(request.getParameter("petName"));
	    
	    String fileName = null;
		try {
			if (petImgFile != null && !petImgFile.isEmpty()) {
				
				String imagesDir = new File("src/main/resources/static/Images/pet").getAbsolutePath();
				
				fileName = petImgFile.getOriginalFilename();
				File saveFile = new File(imagesDir, fileName);
				
				int count = 1;
				String nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
				String ext = fileName.substring(fileName.lastIndexOf('.'));
				while (saveFile.exists()) {
					fileName = nameWithoutExt + "(" + count + ")" + ext;
					saveFile = new File(imagesDir, fileName);
					count++;
				}
				petImgFile.transferTo(saveFile);
			} else {
				fileName = "noPetImg.jpg";
			}
		} catch (IOException e) {
	        e.printStackTrace();
	        return "파일 업로드 실패";
	    }
	    
		myPetDto.setPet_img(fileName);
	    myPetDto.setPet_gender(request.getParameter("petGender"));
	    myPetDto.setPet_weight(request.getParameter("petWeight"));
	    myPetDto.setPet_neut(request.getParameter("petNeut"));
	    myPetDto.setPet_form(request.getParameter("petForm"));
	    myPetDto.setPet_care(request.getParameter("petCare"));
	    myPetDto.setPet_allergy(request.getParameter("petAllergy"));
		
		mypageDao.modifyPetByPetCode(myPetDto);
		
		return "redirect:/mypage/mypet";
	}
	
	@PostMapping("/deletePet")
	public String deletePet(HttpServletRequest request) {
		
		mypageDao.deletePetByPetCode(request.getParameter("petCode"));
		
		return "redirect:/mypage/mypet";
	}
	
	@GetMapping("/grade")
	public String grade(Model model, HttpSession session) {

		MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
		GradeDto userGrade = (GradeDto) session.getAttribute("userGrade");
        
        model.addAttribute("loginUser",loginUser);
        model.addAttribute("userGrade",userGrade);
		
		return "mypage/grade";
	}
	
	@GetMapping("/point")
	public String point() {
		return "mypage/point";
	}
	
	@GetMapping("/coupon")
	public String coupon(Model model, HttpSession session) {
		
		MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
		
		ArrayList<CouponDto> coupons = mypageDao.getAllCoupon();
		ArrayList<CouponDto> mycoupons = mypageDao.getCouponByMemberCode(loginUser.getMem_code());
		
		ArrayList<CouponDto> issuedCoupons = new ArrayList<>();
		// coupons 리스트에서 Iterator 사용
		Iterator<CouponDto> iterator = coupons.iterator();
		while (iterator.hasNext()) {
		    CouponDto coupon = iterator.next();
		    
		    for (CouponDto mycoupon : mycoupons) {
		        if (coupon.getCp_no() == mycoupon.getCp_no()) {
		            // cp_no가 일치하는 경우 coupons에서 제거하고 issuedCoupons에 추가
		        	iterator.remove();
		            issuedCoupons.add(coupon);
		        }
		    }
		}
		
        model.addAttribute("coupons",coupons);
        model.addAttribute("mycoupons",mycoupons);
        model.addAttribute("issuedCoupons",issuedCoupons);
		
		return "mypage/coupon";
	}
	
	@Transactional
	@PostMapping("/coupon/searchCoupon")
	@ResponseBody  // JSON 응답을 위해 추가
	public Map<String, Object> searchCoupon(HttpServletRequest request, HttpSession session) {
		
	    Map<String, Object> response = new HashMap<>();  // 응답할 Map 객체
	    
	    try {
	    	String keyword = request.getParameter("keyword");
	        String mc_code = UUID.randomUUID().toString();
	        MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
	        
	        // 키워드로 쿠폰 검색
	        CouponDto keywordCoupon = mypageDao.searchCouponByKeyword(keyword);
	        if (keywordCoupon != null) {
	        	
	        	// 발급 기간 확인
	        	LocalDate now = LocalDate.now(); // 현재 날짜를 가져옴
	            LocalDate cpStart = keywordCoupon.getCp_start().toLocalDate(); // 쿠폰 시작 날짜를 LocalDate로 변환
	            LocalDate cpEnd = keywordCoupon.getCp_end().toLocalDate();     // 쿠폰 종료 날짜를 LocalDate로 변환
	            
	            if (now.isBefore(cpStart) || now.isAfter(cpEnd)) {
	        		response.put("success", false);
					response.put("message", "해당 쿠폰 이벤트 기간이 아닙니다.");
				} else {
					// 이미 발급된 쿠폰인지 확인
					int issued = mypageDao.checkIssued(loginUser.getMem_code(), keywordCoupon.getCp_no());
					if (issued>0) {
						response.put("success", true);
						response.put("message", "이미 발급된 쿠폰입니다.");
					} else {
						// 미발급이면 신규 발급
						mypageDao.insertCouponByCouponNo(mc_code, loginUser.getMem_code(), keywordCoupon.getCp_no());
						response.put("success", true);
						response.put("message", "쿠폰이 발급되었습니다.");
					}
				}
	        } else {
	            response.put("success", false);
				response.put("message", "키워드에 해당하는 쿠폰이 없습니다.");
		    }
	    } catch (Exception e) {
	        e.printStackTrace();
            response.put("success", false);
			response.put("message", "오류가 발생했습니다. 다시 시도해주세요.");
	    }

	    return response;  // Map을 반환하여 JSON 형식으로 응답
	}
	
	@PostMapping("/coupon/receive")
	public String receiveCoupon(HttpServletRequest request, HttpSession session) {
		
		String cp_no = request.getParameter("couponNo");
        String mc_code = UUID.randomUUID().toString();
        MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
        
        mypageDao.insertCouponByCouponNo(mc_code, loginUser.getMem_code(), Integer.parseInt(cp_no));
		
        return "mypage/coupon";
	}
	
	@GetMapping("/setting")
	public String setting(Model model, HttpSession session) {
		
		MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
		ArrayList<MemberAddressDto> address = mypageDao.getAddrByMemberCode(loginUser.getMem_code());
		
		model.addAttribute("loginUser",loginUser);
		model.addAttribute("address",address);
		
		return "mypage/setting";
	}
	
	@GetMapping("/setting/tellChange")
	public String tellChange(Model model, HttpSession session) {
		return "/mypage/popup/tellChange";
	}
	
	@PostMapping("/setting/updatePhoneNumber")
	@ResponseBody
	public String updatePhoneNumber(@RequestParam String phoneNumber, HttpSession session) {
		
		MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
	    
	    mypageDao.updatePhoneNumber(loginUser.getMem_code(), phoneNumber);
	    
	    // 세션에 최신화된 연락처 정보를 반영
	    loginUser.setMem_tell(phoneNumber);
	    session.setAttribute("loginUser", loginUser);

	    return "redirect:/mypage/popup/tellChange";
	}
	
	@GetMapping("/setting/addressChange")
	public String addressChange(Model model, HttpSession session) {
		
		MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
		ArrayList<MemberAddressDto> address = mypageDao.getAddrByMemberCode(loginUser.getMem_code());
		
		model.addAttribute("address",address);
		
		return "/mypage/popup/addressChange";
	}

	@Transactional
	@PostMapping("/setting/setMainAddress")
	@ResponseBody
	public String setMainAddress(@RequestParam String addrCode, HttpSession session) {
		
	    MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
	    
	    mypageDao.updateDefaultAddress(loginUser.getMem_code()); // 기존 기본 주소 'N'으로 변경
	    mypageDao.setMainAddress(addrCode); // 선택 주소 'Y'로 업데이트
	    
	    return "redirect:/mypage/popup/addressChange";
	}
	
	@PostMapping("/setting/deleteAddress")
	@ResponseBody
	public String deleteAddress(@RequestParam String addrCode) {
		
		mypageDao.deleteAddress(addrCode);
		
	    return "redirect:/mypage/popup/addressChange";
	}
	
	@GetMapping("/setting/addressCheck")
	public String addressCheck(Model model, HttpServletRequest request) {
		
		String kakaoApiKey = apikeyConfig.getKakaoApikey();
		String roadAddr = request.getParameter("roadAddr");
		String jibunAddr = request.getParameter("jibunAddr");
		String postcode = request.getParameter("postcode");
		
		model.addAttribute("kakaoApi",kakaoApiKey);
		model.addAttribute("roadAddr",roadAddr);
		model.addAttribute("jibunAddr",jibunAddr);
		model.addAttribute("postcode",postcode);
		
		return "/mypage/popup/addressCheck";
	}
	
	@PostMapping("/setting/insertAddress")
	@ResponseBody
	public Map<String, Object> insertAddress(HttpServletRequest request, HttpSession session) {
		
		Map<String, Object> response = new HashMap<>();
		
		MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
		
	    String memCode = loginUser.getMem_code();
	    String addrPostal = request.getParameter("addrPostal");
	    String addrLine1 = request.getParameter("addrLine1");
	    String addrLine2 = request.getParameter("addrLine2");

	    mypageDao.updateDefaultAddress(memCode);
	    boolean success = mypageDao.insertNewAddress(UUID.randomUUID().toString(), memCode, addrPostal, addrLine1, addrLine2);

	    response.put("success", success);
	    
	    return response;
	}
	
	@PostMapping("/updateMember")
	public String updateMember(HttpServletRequest request, HttpSession session) {
		
	    MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
	    loginUser.setMem_email(request.getParameter("mem_email"));
	    loginUser.setMem_name(request.getParameter("mem_name"));
	    loginUser.setMem_nick(request.getParameter("mem_nick"));
	    
	    // 날짜 형식 변환
	    try {
	        loginUser.setMem_birth(Date.valueOf(LocalDate.parse(request.getParameter("mem_birth"), DateTimeFormatter.ofPattern("yyyyMMdd"))));
	    } catch (DateTimeParseException e) {
	        e.printStackTrace();
	    }
	    
	    mypageDao.updateMemberInfo(loginUser);
	    
	    session.setAttribute("loginUser", loginUser);  // 세션 갱신
	    
	    return "redirect:/mypage/setting";
	}
	
	@GetMapping("/withdrawal")
	public String withdrawal() {
		return "/mypage/withdrawal";
	}
	
	@GetMapping("/cart")
	public String cart() {
		return "mypage/cart";
	}
	
	@GetMapping("/order")
	public String order() {
		return "mypage/order";
	}
	
	@GetMapping("/review")
	public String review() {
		return "mypage/review";
	}
	
	@GetMapping("/wish")
	public String wish() {
		return "mypage/wish";
	}
	
	@GetMapping("/cscenter")
	public String cscenter() {
		return "/mypage/cscenter";
	}
	
	@GetMapping("/logout")
    public String logout(HttpSession session) {
		
        // 세션 무효화
        session.invalidate();
        
        return "redirect:/";
    }
	
}
