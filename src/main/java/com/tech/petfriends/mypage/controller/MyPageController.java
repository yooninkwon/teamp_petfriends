package com.tech.petfriends.mypage.controller;

import java.time.LocalDate;
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
import org.springframework.web.bind.annotation.ResponseBody;

import com.tech.petfriends.admin.dto.CouponDto;
import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.mypage.dao.MypageDao;
import com.tech.petfriends.mypage.dto.GradeDto;
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
		
		ArrayList<CouponDto> issuedCoupons = new ArrayList<>();;
		// coupons 리스트에서 Iterator 사용
		Iterator<CouponDto> iterator = coupons.iterator();
		while (iterator.hasNext()) {
		    CouponDto coupon = iterator.next();
		    
		    for (CouponDto mycoupon : mycoupons) {
		        if (coupon.getCp_no() == mycoupon.getCp_no()) {
		            // cp_no가 일치하는 경우 coupons에서 제거하고 issuedCoupons에 추가
		        	iterator.remove();  // 현재 요소를 coupons 리스트에서 제거
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
