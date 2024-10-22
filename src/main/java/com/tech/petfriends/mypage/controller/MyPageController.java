package com.tech.petfriends.mypage.controller;

import java.util.ArrayList;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.ResponseBody;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.mypage.dao.MypageDao;
import com.tech.petfriends.mypage.dto.CouponDto;
import com.tech.petfriends.mypage.dto.GradeDto;
import com.tech.petfriends.mypage.dto.MyCouponDto;
import com.tech.petfriends.mypage.dto.MyPetDto;

@Controller
@RequestMapping("/mypage")
public class MyPageController {
	
	@Autowired
	private MypageDao mypageDao;
	
	@GetMapping("/mypet")
	public String mypet(Model model, HttpSession session) {
		
		MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
        ArrayList<MyPetDto> pets = mypageDao.getPetsByMemberCode(loginUser.getMem_code());
        
		model.addAttribute("pets",pets);
		
		return "mypage/mypet";
	}
	
	@Transactional
	@PostMapping("/mypet/setMainPet")
	public String setMainPet(HttpServletRequest request) {
        
		String newlyChecked = request.getParameter("newlyChecked");
		String previousChecked = request.getParameter("previousChecked");
		
		mypageDao.removeMainPet(previousChecked);
		mypageDao.setMainPet(newlyChecked);
		
		return "redirect:/mypage/mypet";
	}
	
	@GetMapping("/grade")
	public String grade(Model model, HttpSession session) {

		MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
        GradeDto userGrade = mypageDao.getGradeByMemberCode(loginUser.getMem_code());
        
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
		
        model.addAttribute("coupons",coupons);
        model.addAttribute("mycoupons",mycoupons);
		
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
	        	
	        	// 이미 발급된 쿠폰인지 확인
	        	int issued = mypageDao.checkIssued(loginUser.getMem_code(), keywordCoupon.getCp_no());
	        	if (issued>0) {
	        		response.put("success", true);
					response.put("message", "이미 발급된 쿠폰입니다.");
				} else {
					// 미발급이면 신규 발급
					mypageDao.insertCouponByKeyword(mc_code, loginUser.getMem_code(), keywordCoupon.getCp_no());
					response.put("success", true);
					response.put("message", "쿠폰이 발급되었습니다.");
				}
	        	
	        } else {
	            response.put("success", false);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        response.put("success", false);
	    }

	    return response;  // Map을 반환하여 JSON 형식으로 응답
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
	
	@GetMapping("/mypet/register")
	public String mypetRegister() {
		return "mypage/mypet/register";
	}
	
	@GetMapping("/mypet/modify")
	public String mypetModify(HttpServletRequest request, Model model) {
		
		String petCode = request.getParameter("petCode");
		
        MyPetDto info = mypageDao.getInfoByPetCode(petCode);
        
		model.addAttribute("info",info);
        
		return "mypage/mypet/modify";
	}
	
}
