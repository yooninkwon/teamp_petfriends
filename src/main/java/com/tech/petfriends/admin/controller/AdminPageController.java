package com.tech.petfriends.admin.controller;

import java.text.SimpleDateFormat;
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
import com.tech.petfriends.admin.dto.SalesDetailDto;
import com.tech.petfriends.admin.mapper.AdminPageDao;
import com.tech.petfriends.admin.mapper.AdminProductDao;
import com.tech.petfriends.admin.mapper.AdminSalesDao;
import com.tech.petfriends.admin.mapper.CouponDao;
import com.tech.petfriends.admin.service.AdminEventEditService;
import com.tech.petfriends.admin.service.AdminExecuteModel;
import com.tech.petfriends.admin.service.AdminNoticeEditService;
import com.tech.petfriends.admin.service.AdminNoticeWriteService;
import com.tech.petfriends.admin.service.AdminProductAddService;
import com.tech.petfriends.admin.service.AdminProductDetailService;
import com.tech.petfriends.admin.service.AdminProductListService;
import com.tech.petfriends.admin.service.AdminProductModifyService;
import com.tech.petfriends.admin.service.AdminSalesDetailService;
import com.tech.petfriends.admin.service.AdminSalesService;
import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.login.mapper.MemberMapper;
import com.tech.petfriends.notice.dao.NoticeDao;
import com.tech.petfriends.notice.dto.EventDto;
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
	
	@Autowired
	AdminSalesDao adminSalesDao;
  
	@Autowired
	MemberMapper memberDao;

	AdminExecuteModel adminExcuteM;
	

	// 어드민 페이지 내부에서의 펫티쳐페이지로 이동
	@GetMapping("/petteacher")
	public String petteacherAdminPage(Model model) {
		return "admin/petteacher";
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
		String grade = request.getParameter("grade");
		String type = request.getParameter("type");
		String sort = request.getParameter("sort");

		List<CouponDto> coupons = couponDao.getAllCoupons(status, kind, grade, type, sort);

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

		List<MemberCouponDto> coupons = couponDao.getMemberCoupons(status, searchOrder, startDate, endDate, memberCode, couponCode, orderCode);
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
		
		adminExcuteM = new AdminProductListService(adminProductDao);
		adminExcuteM.execute(model);
		
		@SuppressWarnings("unchecked")
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
		
		adminExcuteM = new AdminProductAddService(adminProductDao);
		adminExcuteM.execute(model);
		
	}
	
	@GetMapping("/product/detail")
	@ResponseBody
	public Map<String, Object> productDetail(HttpServletRequest request, Model model) {
		
		String proCode = request.getParameter("proCode");
		model.addAttribute("proCode",proCode);
		
		adminExcuteM = new AdminProductDetailService(adminProductDao);
		adminExcuteM.execute(model);
		
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
			        @RequestParam(value = "removeImages", required = false) String[] removeImages,
			        @RequestParam(value = "mainImagesPath", required = false) List<String> mainImagesPath,
			        @RequestParam(value = "desImagesPath", required = false) List<String> desImagesPath,
			        @RequestParam(value = "options") String options,
			        Model model) {
			
			// Model에 데이터 추가
			model.addAllAttributes(data);
		    model.addAttribute("mainImages", mainImages);
		    model.addAttribute("desImages", desImages);
		    model.addAttribute("removeImages", removeImages);
		    model.addAttribute("options", options);
		    model.addAttribute("mainImagesPath", mainImagesPath);
		    model.addAttribute("desImagesPath", desImagesPath);
			
			adminExcuteM = new AdminProductModifyService(adminProductDao);
			adminExcuteM.execute(model);
			
		}
	

	@GetMapping("/customer_status")
	public String customer_status(Model model) {
		System.out.println("고객");
		int newMember = memberDao.newMemberForWeek();
		int visitMember = memberDao.visitMemberForWeek();
		int withdrawMember = memberDao.withdrawMemberForWeek();
		int total = memberDao.totalMember();
		ArrayList<MemberLoginDto> newMemberList = memberDao.newMemberList();
		ArrayList<MemberLoginDto> withdrawMemberList = memberDao.withdrawMemberList();

		model.addAttribute("newMember",newMember);
		model.addAttribute("visitMember",visitMember);
		model.addAttribute("withdrawMember",withdrawMember);
		model.addAttribute("total",total);
		model.addAttribute("newMemberList",newMemberList);
		model.addAttribute("withdrawMemberList",withdrawMemberList);
		return "admin/customer_status";
	}

	@GetMapping("/customer_info")
	public String customer_info() {
		return "admin/customer_info";
	}
	
	@GetMapping("/pet_info")
	public String pet_info() {
		return "admin/pet_info";
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
	public String Notice(Model model) {
		ArrayList<NoticeDto> noticeAdminList = noticeDao.noticeAdminList();
//        model.addAttribute("noticeAdminList", noticeAdminList);
        ArrayList<EventDto> eventAdminList = noticeDao.eventAdminList();
//        model.addAttribute("eventAdminList", eventAdminList);
		
		return "admin/notice";
	}
	
	@GetMapping("/notice_write")
	public String Notice_write() {
		System.out.println("글작성페이지");
		return "admin/notice_write";
	}
	
	@PostMapping("/notice_write_service")
	public String Notice_write_service(HttpServletRequest request, 
	                                   @RequestParam("thumbnail") MultipartFile thumbnail,
	                                   @RequestParam("slideImg") MultipartFile slideImg, 
	                                   Model model) {
	    model.addAttribute("request", request);
	    model.addAttribute("thumbnail", thumbnail);
	    model.addAttribute("slideImg", slideImg);

	    AdminNoticeWriteService adminNoticeWriteService = new AdminNoticeWriteService(noticeDao);
	    adminNoticeWriteService.execute(model);

	    return "redirect:/admin/notice";
	}
	
	@GetMapping("/notice_edit")
	public String Notice_edit(@RequestParam("id") Long noticeId, Model model) {
	    // 공지사항 데이터를 ID로 조회
	    NoticeDto noticeDto = noticeDao.findNoticeById(noticeId);

	    // 조회한 데이터를 모델에 추가하여 JSP에서 사용할 수 있게 함
	    model.addAttribute("notice", noticeDto);
	    
	    // 수정 화면으로 이동
	    return "admin/notice_edit";
	}
	
	@GetMapping("/event_edit")
	public String Event_edit(@RequestParam("id") Long eventId, Model model) {
	    // 공지사항 데이터를 ID로 조회
	    EventDto eventDto = noticeDao.findEventById(eventId);
	    
	    // 날짜 형식 지정
	    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	    
	    // 시작일과 종료일을 포맷팅하여 문자열로 변환
	    String formattedStartDate = dateFormat.format(eventDto.getEvent_startdate());
	    String formattedEndDate = dateFormat.format(eventDto.getEvent_enddate());

	    // 변환된 날짜 문자열을 모델에 추가
	    model.addAttribute("event", eventDto);
	    model.addAttribute("formattedStartDate", formattedStartDate);
	    model.addAttribute("formattedEndDate", formattedEndDate);

	    // 수정 화면으로 이동
	    return "admin/event_edit";
	}
	
	@PostMapping("/notice_edit_service")
	public String Notice_edit_service(HttpServletRequest request, 
	                                   Model model) {
	    model.addAttribute("request", request);

	    AdminNoticeEditService adminNoticeEditService = new AdminNoticeEditService(noticeDao);
	    adminNoticeEditService.execute(model);

	    return "redirect:/admin/notice";
	}
	
	@PostMapping("/event_edit_service")
	public String EventEditService(
		HttpServletRequest request,
	    @RequestParam("thumbnail") MultipartFile thumbnail,
	    @RequestParam("slideImg") MultipartFile slideImg,
	    Model model) {
	    
		model.addAttribute("request",request);
		model.addAttribute("thumbnail",thumbnail);
		model.addAttribute("slideImg",slideImg);
		
		AdminEventEditService adminEventEditService = new AdminEventEditService(noticeDao);
		adminEventEditService.execute(model);

	    return "redirect:/admin/notice";
	}
	
	@GetMapping("/searchNotices")
	public String searchNotices(@RequestParam("title") String title, Model model) {
	    List<NoticeDto> noticeAdminList = noticeDao.searchNoticesByTitle(title);
	    model.addAttribute("noticeAdminList", noticeAdminList);
	    return "admin/notice"; // 검색 결과를 표시할 JSP 경로
	}
	

	@GetMapping("/sales")
	public String sales(Model model) {
		
		adminExcuteM = new AdminSalesService(adminSalesDao);
		adminExcuteM.execute(model);
		
		return "admin/sales";
	}
	
	@PostMapping("/salesDetail")
	@ResponseBody
	public List<SalesDetailDto> salesDetail(@RequestBody Map<String, Object> data, Model model) {
		
		model.addAllAttributes(data);
		adminExcuteM = new AdminSalesDetailService(adminSalesDao);
		adminExcuteM.execute(model);
		
		return (List<SalesDetailDto>) model.getAttribute("list");
	}

	@GetMapping("/customer")
	public String customer(Model model) {
		ArrayList<MemberLoginDto> newMemberList = memberDao.newMemberList();
		model.addAttribute("newMemberList",newMemberList);
		return "admin/customer";
	}

}
