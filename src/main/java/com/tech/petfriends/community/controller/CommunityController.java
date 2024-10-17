package com.tech.petfriends.community.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.tech.petfriends.community.mapper.IDao;
import com.tech.petfriends.community.service.CDownloadService;
import com.tech.petfriends.community.service.CPostListService;
import com.tech.petfriends.community.service.CServiceInterface;
import com.tech.petfriends.community.service.CWriteService;

@Controller
@RequestMapping("/community")
public class CommunityController {
	
	@Autowired
	private IDao iDao;
	
	@Autowired
	private CServiceInterface serviceInterface;
	
	//커뮤니티 페이지로 이동
	@GetMapping("/main")
	public String communityMain(HttpServletRequest request, Model model) {
		System.out.println("community_main() ctr");
		serviceInterface = new CPostListService(iDao);
		serviceInterface.execute(model); 
	
		return "/community/main";
	}
	
	@GetMapping("/writeView")
	public String writeView() {
		return "/community/writeView";
	}
	
	@PostMapping("/write")
	public String communityWrite(MultipartHttpServletRequest mtfRequest, Model model) {
		System.out.println("community_write");
		model.addAttribute("request", mtfRequest);
		serviceInterface = new CWriteService(iDao);
		serviceInterface.execute(model);
		
		return "redirect:/community/main";

	}

	@GetMapping("/download")
	public String download(HttpServletRequest request, Model model,
			HttpServletResponse response) throws Exception {
		
		model.addAttribute("request", request);
		model.addAttribute("response", response);
		serviceInterface = new CDownloadService(iDao);
		serviceInterface.execute(model);
		
		String bid = request.getParameter("bid");
	
		return "contentView?bid=" + bid;
	}


}
