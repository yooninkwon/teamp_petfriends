package com.tech.petfriends.admin.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tech.petfriends.admin.dto.CouponDto;
import com.tech.petfriends.admin.dto.MemberCouponDto;
import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.mapper.CouponDao;
import com.tech.petfriends.admin.service.AdminPetteacherDelete;
import com.tech.petfriends.admin.service.AdminPetteacherDetailService;
import com.tech.petfriends.admin.service.AdminPetteacherService;
import com.tech.petfriends.admin.service.AdminPetteacherWriteService;
import com.tech.petfriends.admin.service.AdminServiceInterface;

@Controller
@RequestMapping("/admin")
public class AdminPageController {

	@Autowired
	AdminPageDao adminDao;
	
	@Autowired
	CouponDao couponDao;

	AdminServiceInterface adminServInter;

	// 어드민 페이지 내부에서의 펫티쳐페이지로 이동
	@GetMapping("/petteacher")
	public String petteacherAdminPage(Model model) {
		adminServInter = new AdminPetteacherService(adminDao);
		adminServInter.execute(model);
		return "admin/petteacher";
	}

	// 어드민-펫티쳐 게시글 작성 페이지 이동
	@GetMapping("/petteacher_form")
	public String petteacherAdminForm() {
		return "admin/petteacher_form";
	}

	// 어드민-펫티쳐 상세페이지
	@GetMapping("/petteacher_detail")
	public String petteacherAdminDetail(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		adminServInter = new AdminPetteacherDetailService(adminDao);
		adminServInter.execute(model);
		return "admin/petteacher_detail";
	}

	// 어드민-펫티쳐 게시글 작성완료 버튼 클릭시
	@PostMapping("/petteacher_write")
	public String petteacherAdminWrite(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		adminServInter = new AdminPetteacherWriteService(adminDao);
		adminServInter.execute(model);
		return "redirect:admin/petteacher";
	}

	// 어드민-펫티쳐 상세페이지에서 삭제버튼 클릭시
	@GetMapping("/petteacher_delete")
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
		String kind = request.getParameter("kind");
		String type = request.getParameter("type");
		String sort = request.getParameter("sort");

		List<CouponDto> coupons = couponDao.getAllCoupons(status, kind, type, sort);

		return coupons;
	}

	@GetMapping("/memberCoupon/data")
	@ResponseBody
	public List<MemberCouponDto> getMemberCouponData(HttpServletRequest request) {

		String status = request.getParameter("status");
		String searchOrder = request.getParameter("searchOrder");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String memberCode = request.getParameter("memberCode");
		String couponCode = request.getParameter("couponCode");
		String orderCode = request.getParameter("orderCode");

		List<MemberCouponDto> coupons = couponDao.getMemberCoupons(status, searchOrder, startDate, endDate, memberCode,
				couponCode, orderCode);
		return coupons;
	}

	@PostMapping("/coupon/register")
	public String registerCoupon(@RequestBody CouponDto couponDto) {

		couponDao.registerCoupon(couponDto);

		return "redirect:/admin/coupon";
	}

	@GetMapping("/coupon/modify")
	@ResponseBody
	public CouponDto getCoupon(HttpServletRequest request) {

		String cp_no = request.getParameter("cpNo");

		CouponDto coupon = couponDao.getCouponById(cp_no);

		return coupon;
	}

	@PutMapping("/coupon/update")
	@ResponseBody
	public String updateCoupon(HttpServletRequest request, @RequestBody CouponDto couponDto) {

		String cp_no = request.getParameter("cpNo");
		couponDto.setCp_no(Integer.parseInt(cp_no));
		
		couponDao.updateCoupon(couponDto);
		
	    return "redirect:/admin/coupon";
	}
	
	@DeleteMapping("/coupon/delete")
	@ResponseBody
	public String deleteCoupon(HttpServletRequest request) {

		String cp_no = request.getParameter("cpNo");
		
		couponDao.deleteCoupon(cp_no);
	    
	    return "redirect:/admin/coupon";
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
