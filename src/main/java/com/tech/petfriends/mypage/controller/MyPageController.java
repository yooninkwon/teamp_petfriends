package com.tech.petfriends.mypage.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
	public String setMainPet(Model model, HttpServletRequest request) {
        
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
		ArrayList<MyCouponDto> mycoupons = mypageDao.getCouponByMemberCode(loginUser.getMem_code());
		
        model.addAttribute("coupons",coupons);
        model.addAttribute("mycoupons",mycoupons);
		
		return "mypage/coupon";
	}
	
	@GetMapping("/setting")
	public String setting() {
		return "mypage/setting";
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
