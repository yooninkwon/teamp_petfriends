package com.tech.petfriends.product.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import org.springframework.ui.Model;

import com.tech.petfriends.product.dao.ProductDao;

public class ProductDetailCartService implements ProductService {

	private String cart_code;
	
	ProductDao productDao;

	public ProductDetailCartService(ProductDao productDao) {
		this.productDao = productDao;
	}

	@Override
	public void execute(Model model) {

		this.cart_code = generateProductCode();
		String mem_code = (String) model.getAttribute("mem_code");
		String pro_code = (String) model.getAttribute("pro_code");
		String opt_code = (String) model.getAttribute("opt_code");
		int cart_cnt= (int) model.getAttribute("cart_cnt");
		
		System.out.println(cart_code);
		System.out.println(mem_code);
		System.out.println(pro_code);
		System.out.println(opt_code);
		System.out.println(cart_cnt);

		
		productDao.productDetailCart(mem_code, pro_code, opt_code, cart_cnt, cart_code);

	}

	private String generateProductCode() {
	    // 날짜 포맷 (예: 20241022)
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
	    String date = sdf.format(new Date());

	    // 랜덤 알파벳과 숫자를 결합한 문자열 생성
	    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";  // 대문자 알파벳과 숫자
	    Random random = new Random();
	    StringBuilder randomCode = new StringBuilder();

	    // 10자리 랜덤 코드 생성 (알파벳 + 숫자)
	    for (int i = 0; i < 10; i++) {
	        randomCode.append(characters.charAt(random.nextInt(characters.length())));
	    }

	    // 최종 코드는 "yyyyMMdd-랜덤문자열" 형식
	    return date + "-" + randomCode.toString();  // 예: 20241022-A1B2C
	}
}
