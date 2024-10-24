package com.tech.petfriends.admin.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.mapper.CouponDao;
import com.tech.petfriends.admin.service.AdminPetteacherDelete;
import com.tech.petfriends.admin.service.AdminPetteacherDetailService;
import com.tech.petfriends.admin.service.AdminPetteacherService;
import com.tech.petfriends.admin.service.AdminPetteacherWriteService;
import com.tech.petfriends.admin.service.AdminServiceInterface;
import com.tech.petfriends.mypage.dto.CouponDto;


@Controller
@RequestMapping("/admin")
public class AdminPageController {
	
	@Autowired
	AdminPageDao adminDao;
	@Autowired
	CouponDao couponDao;
	
	AdminServiceInterface adminServInter;
	
	// 어드민 페이지 내부에서의 펫티쳐페이지로 이동
	@GetMapping("/admin_petteacher")
	public String petteacherAdminPage(Model model) {
		adminServInter = new AdminPetteacherService(adminDao);
		adminServInter.execute(model);
		return "/admin/admin_petteacher";
	}
	
	// 어드민-펫티쳐 게시글 작성 페이지 이동
	@GetMapping("/admin_petteacher_form")
	public String petteacherAdminForm() {
		return "/admin/admin_petteacher_form";
	}
	
	// 어드민-펫티쳐 상세페이지
	@GetMapping("/admin_petteacher_detail")
	public String petteacherAdminDetail(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		adminServInter = new AdminPetteacherDetailService(adminDao);
		adminServInter.execute(model);
		return "/admin/admin_petteacher_detail";
	}
	
	// 어드민-펫티쳐 게시글 작성완료 버튼 클릭시
	@PostMapping("/admin_petteacher_write")
	public String petteacherAdminWrite(HttpServletRequest request, 
			Model model) {
		model.addAttribute("request", request);
		adminServInter = new AdminPetteacherWriteService(adminDao);
		adminServInter.execute(model);
		return "redirect:/admin/admin_petteacher";
	}
	
	// 어드민-펫티쳐 상세페이지에서 삭제버튼 클릭시
	@GetMapping("/admin_petteacher_delete")
	public String petteacherAdminDelete(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		adminServInter = new AdminPetteacherDelete(adminDao);
		adminServInter.execute(model);
		return "redirect:/admin/admin_petteacher";
	}
	
	@GetMapping("/home")
	public String home() {
		return "admin/home";
	}
	
	@GetMapping("/order")
	public String order() {
		return "admin/order";
	}
	
	@GetMapping("/coupon")
	public String couponPage() {
		return "admin/coupon";
	}
	
	@GetMapping("/coupon/data")
	@ResponseBody
	public List<CouponDto> getCouponData(HttpServletRequest request) {
		
		String status = request.getParameter("status");
		String type = request.getParameter("type");
		String sort = request.getParameter("sort");
		
		List<CouponDto> coupons = couponDao.getAllCoupons(status, type, sort);
		
	    return coupons;
	}
	
	@GetMapping("/product")
	public String product() {
		return "admin/product";
	}
	
	@GetMapping("/customer_status")
	public String customer_status() {
		return "admin/customer_status";
	}
	
	@GetMapping("/customer_info")
	public String customer_info() {
		return "admin/customer_info";
	}
	
	@GetMapping("/community")
	public String community() {
		return "admin/community";
	}
	
	@GetMapping("/petteacher")
	public String petture() {
		return "admin/petteacher";
	}

	@GetMapping("/pethotel")
	public String pethotel() {
		return "admin/pethotel";
	}

	@GetMapping("/pethotel_reserve")
	public String pethotelReserve() {
		return "admin/pethotel_reserve";
	}
	
	@GetMapping("/notice")
	public String notice() {
		return "admin/notice";
	}
	
	@GetMapping("/sales")
	public String sales() {
		return "admin/sales";
	}
	
	@GetMapping("/customer")
	public String customer() {
		return "admin/customer";
	}
	
}
