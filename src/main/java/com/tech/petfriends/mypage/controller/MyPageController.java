package com.tech.petfriends.mypage.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.service.AdminPetteacherDelete;
import com.tech.petfriends.admin.service.AdminPetteacherDetailService;
import com.tech.petfriends.admin.service.AdminPetteacherService;
import com.tech.petfriends.admin.service.AdminPetteacherWriteService;
import com.tech.petfriends.admin.service.AdminServiceInterface;


@Controller
@RequestMapping("/mypage")
public class MyPageController {
	
	@GetMapping("/mypet")
	public String mypet() {
		return "mypage/mypet";
	}
	
	@GetMapping("/grade")
	public String grade() {
		return "mypage/grade";
	}
	
	@GetMapping("/point")
	public String point() {
		return "mypage/point";
	}
	
	@GetMapping("/coupon")
	public String coupon() {
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
	
}
