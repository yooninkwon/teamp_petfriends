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
import com.tech.petfriends.product.domain.ProductCategory;
import com.tech.petfriends.product.dto.ProductDetailReviewListDto;
import com.tech.petfriends.product.dto.ProductDetailWishListDto;
import com.tech.petfriends.product.dto.ProductListViewDto;
import com.tech.petfriends.product.service.ProductAddWindowService;
import com.tech.petfriends.product.service.ProductCategoryService;
import com.tech.petfriends.product.service.ProductDetailCartCheckService;
import com.tech.petfriends.product.service.ProductDetailCartService;
import com.tech.petfriends.product.service.ProductDetailReviewListService;
import com.tech.petfriends.product.service.ProductDetailService;
import com.tech.petfriends.product.service.ProductListViewService;
import com.tech.petfriends.product.service.ProductSearchListService;
import com.tech.petfriends.product.service.ProductSearchReviewRank10Service;
import com.tech.petfriends.product.service.ProductService;
import com.tech.petfriends.product.service.ProductWishListService;

@Controller
@RequestMapping("/product")
public class ProductController {

	@Autowired
	ProductDao productDao;

	@Autowired
	private ProductCategoryService productCategoryService; 
	
	ProductService productService;

	// 제품리스트 페이지 _ productlist.jsp
	@GetMapping("/productlist")
	public String productlist(Model model) {

		
		
		
		return "/product/productlist";
	}

	//펫타입 필터목록 가져오기 ajax
	@ResponseBody
	@GetMapping("/opt")
	public List<ProductCategory> opt() {
		
		
		return productCategoryService.getCategory(); 
	}
	
	@ResponseBody
	@GetMapping("/list")
	public List<ProductListViewDto> list (@RequestParam String first,
			@RequestParam String second,
			@RequestParam String third) {
		
		
		
		return productDao.productList(first,second,third); 
	}


	
	
	// 제품리스트 비동기 불러오기 ajax용 _ productlist.jsp
	@PostMapping("/productlistview")
	@ResponseBody
	public ResponseEntity<List<ProductListViewDto>> productlistview(@RequestBody Map<String, Object> param,
			Model model) {

		model.addAllAttributes(param);

		productService = new ProductListViewService(productDao);
		productService.execute(model);

		// model에서 "list" 속성 가져오기
		@SuppressWarnings("unchecked")
		List<ProductListViewDto> productList = (List<ProductListViewDto>) model.asMap().get("list");

		return ResponseEntity.ok(productList);
	}

	// 제품상세페이지
	@GetMapping("/productDetail")
	public String productDetail(@RequestParam("code") String productCode, HttpSession session, Model model) {

		// 세션에서 loginUser 객체를 가져오기
		MemberLoginDto loginUser = (MemberLoginDto) session.getAttribute("loginUser");

		// mem_code 추출
		String mem_code = loginUser != null ? loginUser.getMem_code() : null;

		model.addAttribute("productCode", productCode);
		model.addAttribute("memberCode", mem_code);
		productService = new ProductDetailService(productDao);
		productService.execute(model);

		return "product/productDetail";
	}

	// 찜버튼 클릭시 ajax용
	@PostMapping("/productWishList")
	@ResponseBody
	public int productWishlist(@RequestBody Map<String, Object> wishlist, Model model) {

		model.addAllAttributes(wishlist);

		productService = new ProductWishListService(productDao);
		productService.execute(model);

		// model에서 result 값을 꺼내오기
		ProductDetailWishListDto result = (ProductDetailWishListDto) model.getAttribute("result");

		return result.getWishListResult(); // 클라이언트에 응답
	}

	// 장바구니 담기
	@PostMapping("/productDetailCart")
	public String productDetailCart(@RequestParam("mem_code") String mem_code,
			@RequestParam("pro_code") String pro_code, @RequestParam("opt_code") String opt_code,
			@RequestParam("quantity") int cart_cnt, Model model) {

		model.addAttribute("mem_code", mem_code);
		model.addAttribute("pro_code", pro_code);
		model.addAttribute("opt_code", opt_code);
		model.addAttribute("cart_cnt", cart_cnt);

		productService = new ProductDetailCartService(productDao);
		productService.execute(model);

		return "redirect:/product/productDetail?code=" + pro_code;
	}

	// 장바구니 담겨있는지 확인
	@PostMapping("/productDetailCartCheck")
	@ResponseBody
	public int productDetailCartCheck(@RequestBody Map<String, Object> request, Model model) {
		model.addAllAttributes(request);

		productService = new ProductDetailCartCheckService(productDao);
		productService.execute(model);

		int cartCheckResult = (int) model.getAttribute("cartResult");

		return cartCheckResult;
	}

	// 리뷰리스트 불러오기 ajax
	@PostMapping("/productDetailReivewList")
	@ResponseBody
	public List<ProductDetailReviewListDto> productDetailReviewList(@RequestBody Map<String, Object> data,
			Model model) {
		model.addAllAttributes(data);

		productService = new ProductDetailReviewListService(productDao);
		productService.execute(model);

		@SuppressWarnings("unchecked")
		List<ProductDetailReviewListDto> reviewList = (List<ProductDetailReviewListDto>) model
				.getAttribute("reviewList");

		return reviewList;
	}

	// 헤더 검색기능 페이지
	@RequestMapping("/productSearch")
	public String productSearch(Model model) {

		productService = new ProductSearchReviewRank10Service(productDao);
		productService.execute(model);

		return "product/productSearch";
	}

	// 헤더 검색,둘러본 상품 리스트불러오기 ajax 기능
	@PostMapping("/productSearchList")
	@ResponseBody
	public Map<String, Object> productSearchList(@RequestBody Map<String, Object> searchPro, Model model) {
		model.addAllAttributes(searchPro);
		System.out.println("controll " + (model.getAttribute("searchPro")));

		productService = new ProductSearchListService(productDao);
		productService.execute(model);

		Map<String, Object> response = (Map<String, Object>) model.getAttribute("resultMap");

		return response;
	}

	// 해당 유저가 둘러본 상품 insert ajax
	@PostMapping("productAddWindow")
	@ResponseBody
	public void productAddWindow(@RequestBody Map<String, Object> data, Model model) {
		model.addAllAttributes(data);

		productService = new ProductAddWindowService(productDao);
		productService.execute(model);

	}

}
