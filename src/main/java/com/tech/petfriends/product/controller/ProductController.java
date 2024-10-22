package com.tech.petfriends.product.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tech.petfriends.login.dto.MemberLoginDto;
import com.tech.petfriends.product.dao.ProductDao;
import com.tech.petfriends.product.dto.ProductDetailWishListDto;
import com.tech.petfriends.product.dto.ProductListViewDto;
import com.tech.petfriends.product.service.ProductDetailService;
import com.tech.petfriends.product.service.ProductListViewService;
import com.tech.petfriends.product.service.ProductService;
import com.tech.petfriends.product.service.ProductWishListService;

@Controller
@RequestMapping("/product")
public class ProductController {

	@Autowired
	ProductDao productDao;
	
	ProductService productService;
	
	//제품리스트 페이지 _ productlist.jsp
	@GetMapping("/productlist")
	public String productlist(Model model) {
		
		
		return "/product/productlist";
	}
	
	//제품리스트 비동기 불러오기 ajax용 _ productlist.jsp
	@PostMapping("/productlistview")
	@ResponseBody
	public ResponseEntity<List<ProductListViewDto>> productlistview(@RequestBody Map<String, Object> param, Model model){
		
		model.addAllAttributes(param);
		 
		productService = new ProductListViewService(productDao);
		productService.execute(model);
		
		// model에서 "list" 속성 가져오기
        List<ProductListViewDto> productList = (List<ProductListViewDto>) model.asMap().get("list");
		
		return ResponseEntity.ok(productList);
	}
	
	//제품상세페이지
	@GetMapping("/productDetail")
	public String productDetail(@RequestParam("code") String productCode,HttpSession session, Model model ) {
		
		// 세션에서 loginUser 객체를 가져오기
	    MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");
	    
	    // mem_code 추출
	    String mem_code = loginUser != null ? loginUser.getMem_code() : null;

		
		
		model.addAttribute("productCode",productCode);
		model.addAttribute("memberCode",mem_code);
		productService = new ProductDetailService(productDao);
		productService.execute(model);
		
		
		return "product/productDetail";
	}
	
	//찜버튼 클릭시 ajax용
	@PostMapping("/productWishList")
	@ResponseBody
	public int productWishlist(
            @RequestBody Map<String, Object> wishlist, Model model) {
		
		model.addAllAttributes(wishlist);
		
		productService = new ProductWishListService(productDao);
		productService.execute(model);
		
		// model에서 result 값을 꺼내오기
	    ProductDetailWishListDto result = (ProductDetailWishListDto) model.getAttribute("result");
		int resultWish = result.getWishListResult();

		    return resultWish; // 클라이언트에 응답
		}
 
	

}
