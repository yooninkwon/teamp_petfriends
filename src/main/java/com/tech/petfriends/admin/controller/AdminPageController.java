package com.tech.petfriends.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.tech.petfriends.admin.dto.CouponDto;
import com.tech.petfriends.admin.dto.MemberCouponDto;
import com.tech.petfriends.admin.dto.ProductListDto;
import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.mapper.AdminProductDao;
import com.tech.petfriends.admin.mapper.CouponDao;
import com.tech.petfriends.admin.service.AdminPetteacherDetailService;
import com.tech.petfriends.admin.service.AdminProductAddService;
import com.tech.petfriends.admin.service.AdminProductDetailService;
import com.tech.petfriends.admin.service.AdminProductListService;
import com.tech.petfriends.admin.service.AdminProductModifyService;
import com.tech.petfriends.admin.service.AdminServiceInterface;
import com.tech.petfriends.notice.dao.NoticeDao;
import com.tech.petfriends.notice.dto.NoticeDto;

@Controller
@RequestMapping("/admin")
public class AdminPageController {

	@Autowired
	AdminPageDao adminDao;
	
	@Autowired
	NoticeDao noticeDao;
	
	@Autowired
	CouponDao couponDao;
	
	@Autowired
	AdminProductDao adminProductDao;

	AdminServiceInterface adminServInter;

	// 어드민 페이지 내부에서의 펫티쳐페이지로 이동
	@GetMapping("/petteacher")
	public String petteacherAdminPage(Model model) {
		return "admin/petteacher";
	}

	// 어드민-펫티쳐 상세페이지
	@GetMapping("/petteacher_admin_detail")
	public String petteacherAdminDetail(HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		adminServInter = new AdminPetteacherDetailService(adminDao);
		adminServInter.execute(model);
		return "admin/petteacher_detail";
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
	
	//관리자페이지 상품리스트 조회
	@PostMapping("/product/list")
	@ResponseBody
	public List<ProductListDto> productList(@RequestBody Map<String, Object> data,Model model) {
		model.addAllAttributes(data);
		
		adminServInter = new AdminProductListService(adminProductDao);
		adminServInter.execute(model);
		
		List<ProductListDto> productList = (List<ProductListDto>) model.getAttribute("productList");
		
		return productList;
	}
	
	//관리자페이지 상품 등록
	@PostMapping("/product/add")
	@ResponseBody
	 public void productAdd(
			 	@RequestParam Map<String, Object> data,
		        @RequestParam(value = "mainImages", required = false) MultipartFile[] mainImages,
		        @RequestParam(value = "desImages", required = false) MultipartFile[] desImages,
		        @RequestParam(value = "options") String options,
		        Model model) {
		
		// Model에 데이터 추가
		model.addAllAttributes(data);
	    model.addAttribute("mainImages", mainImages);
	    model.addAttribute("desImages", desImages);
	    model.addAttribute("options", options);
		
		adminServInter = new AdminProductAddService(adminProductDao);
		adminServInter.execute(model);
		
	}
	
	@GetMapping("/product/detail")
	@ResponseBody
	public Map<String, Object> productDetail(HttpServletRequest request, Model model) {
		
		String proCode = request.getParameter("proCode");
		model.addAttribute("proCode",proCode);
		
		adminServInter = new AdminProductDetailService(adminProductDao);
		adminServInter.execute(model);
		
		Map<String, Object> data = new HashMap<>();
		data.put("pro", model.getAttribute("pro"));
		data.put("img", model.getAttribute("img"));
		data.put("opt", model.getAttribute("opt"));
		
		return data;
	}
	
	//관리자페이지 상품 등록
		@PostMapping("/product/modify")
		@ResponseBody
		 public void productModify(
				 	@RequestParam Map<String, Object> data,
			        @RequestParam(value = "mainImages", required = false) MultipartFile[] mainImages,
			        @RequestParam(value = "desImages", required = false) MultipartFile[] desImages,
			        @RequestParam(value = "removeImages", required = false) MultipartFile[] removeImages,
			        @RequestParam(value = "options") String options,
			        Model model) {
			
			// Model에 데이터 추가
			model.addAllAttributes(data);
		    model.addAttribute("mainImages", mainImages);
		    model.addAttribute("desImages", desImages);
		    model.addAttribute("removeImages", removeImages);
		    model.addAttribute("options", options);
			
			adminServInter = new AdminProductModifyService(adminProductDao);
			adminServInter.execute(model);
			
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
	public String NoticeWrite(Model model) {
		ArrayList<NoticeDto> noticeAdminList = noticeDao.NoticeAdminList();
        model.addAttribute("noticeAdminList", noticeAdminList);
		
		return "admin/notice";
	}
	
	@GetMapping("/notice_write")
	public String Notice() {
		System.out.println("글작성페이지");
		return "admin/notice_write";
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
