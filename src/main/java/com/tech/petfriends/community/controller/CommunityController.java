package com.tech.petfriends.community.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.tech.petfriends.community.dto.CCategoryDto;
import com.tech.petfriends.community.dto.CDto;
import com.tech.petfriends.community.dto.CReportDto;
import com.tech.petfriends.community.mapper.IDao;
import com.tech.petfriends.community.service.CCommentReplyService;
import com.tech.petfriends.community.service.CCommentService;
import com.tech.petfriends.community.service.CContentViewService;
import com.tech.petfriends.community.service.CDeleteService;
import com.tech.petfriends.community.service.CDownloadService;
import com.tech.petfriends.community.service.CFriendService;
import com.tech.petfriends.community.service.CModifyService;
import com.tech.petfriends.community.service.CMyFeedService;

import com.tech.petfriends.community.service.CPostListService;
import com.tech.petfriends.community.service.CReportService;
import com.tech.petfriends.community.service.CServiceInterface;
import com.tech.petfriends.community.service.CUpdateLikeService;
import com.tech.petfriends.community.service.CWriteService;
import com.tech.petfriends.community.service.CWriteViewService;

@Controller
@RequestMapping("/community")
public class CommunityController {

	@Autowired
	private IDao iDao;

	@Autowired
	private CServiceInterface serviceInterface;

	// 커뮤니티 페이지로 이동
	@GetMapping("/main")
	public String communityMain(HttpSession session, HttpServletRequest request, Model model) {
		System.out.println("community_main() ctr");
		model.addAttribute("session", session);
		model.addAttribute("request", request);

		serviceInterface = new CPostListService(iDao);
		serviceInterface.execute(model);

		return "/community/main";
	}

	@GetMapping("/writeView")
	public String writeView(HttpSession session, HttpServletRequest request, Model model) {
		model.addAttribute("session", session);
		model.addAttribute("request", request);
		serviceInterface = new CWriteViewService(iDao);
		serviceInterface.execute(model);

		return "/community/writeView";
	}

	@PostMapping("/write")
	public String communityWrite(MultipartHttpServletRequest mtfRequest, Model model) {
		System.out.println("community_write");
		model.addAttribute("request", mtfRequest);

		model.addAttribute("msg", "게시글이 작성됐습니다.");
		model.addAttribute("url", "/community/main");
		serviceInterface = new CWriteService(iDao);
		serviceInterface.execute(model);

		return "/community/alert";

	}

	@GetMapping("/download")
	public String download(HttpServletRequest request, Model model, HttpServletResponse response) throws Exception {

		model.addAttribute("request", request);
		model.addAttribute("response", response);
		serviceInterface = new CDownloadService(iDao);
		serviceInterface.execute(model);

		String bid = request.getParameter("bid");

		return "contentView?bid=" + bid;
	}

	@GetMapping("/contentView")
	public String contentView(HttpSession session, HttpServletRequest request, Model model) {
		System.out.println("contentView() ctr");
		model.addAttribute("request", request);
		model.addAttribute("session", session);
		serviceInterface = new CContentViewService(iDao);
		serviceInterface.execute(model);

		
		return "/community/contentView";

	}

	@GetMapping("/getPostsByCategory")
	public String getPostsByCategory(@RequestParam("b_cate_no") int bCateNo, Model model) {
		System.out.println("getPostsByCategory() ctr");
		// 카테고리 번호로 게시글 리스트를 가져옴
		List<CDto> postList = iDao.getPostsByCategory(bCateNo);
		model.addAttribute("postList", postList); // 모델에 게시글 리스트 추가

		return "community/postList"; // 부분 뷰 리턴
	}

	@PostMapping("/modify")
	public String modify(MultipartHttpServletRequest mtfRequest, Model model) {
		model.addAttribute("request", mtfRequest);
		serviceInterface = new CModifyService(iDao);
		serviceInterface.execute(model);

		return "redirect:/community/contentView?board_no=" + mtfRequest.getParameter("board_no");

	}

	@GetMapping("/modifyView")
	public String modifyView(@RequestParam("board_no") String board_no, Model model) {
		CDto content = iDao.contentView(board_no); // 게시글 정보를 가져옴
		model.addAttribute("contentView", content); // 게시글 정보를 모델에 담아서 JSP로 전달

		CWriteViewService categoryService = new CWriteViewService(iDao);
		List<CCategoryDto> categoryList = iDao.getCategoryList();
		model.addAttribute("categoryList", categoryList);

		return "/community/modifyView";

	}

	@PostMapping("/delete")
	public String delete(HttpServletRequest request, Model model) {
		System.out.println("community_delete");
		model.addAttribute("request", request);

		serviceInterface = new CDeleteService(iDao);
		serviceInterface.execute(model);

		return "redirect:/community/main";
	}

	@PostMapping("/comment")
	public String comment(HttpServletRequest request, Model model) {
		System.out.println("community_comment");
		model.addAttribute("request", request);

		serviceInterface = new CCommentService(iDao);
		serviceInterface.execute(model);

		return "redirect:/community/contentView?board_no=" + request.getParameter("board_no");
	}

	@PostMapping("/commentReply")
	public String commentReply(HttpServletRequest request, Model model) {
		System.out.println("commentReply");
		model.addAttribute("request", request);

		serviceInterface = new CCommentReplyService(iDao);
		serviceInterface.execute(model);

		return "redirect:/community/contentView?board_no=" + request.getParameter("board_no");
	}

	@PostMapping("/replyDelete")
	public String replyDelete(HttpServletRequest request, Model model) {
		System.out.println("replyDelete");
		model.addAttribute("request", request);

		String board_no = request.getParameter("board_no");
		String comment_no = request.getParameter("comment_no");
//	String user_id = request.getParameter("user_id");
//	String comment_content = request.getParameter("comment_content");
		String parent_comment_no = request.getParameter("parent_comment_no");
		String comment_level = request.getParameter("comment_level");
		String comment_order_no = request.getParameter("comment_order_no");

		// 댓글 삭제 시도
		int rn = iDao.replyDelete(comment_no, parent_comment_no, comment_level, comment_order_no);
		if (rn == 0) {
			// 삭제 실패 (상위 댓글이 존재)
			System.out.println("댓글 삭제 실패");
			model.addAttribute("msg", "이 댓글은 상위 댓글을 가지고 있어 삭제할 수 없습니다.");
			model.addAttribute("url", "/community/contentView?board_no=" + board_no);
			return "/community/alert";

		} else {
			// 삭제 성공
			System.out.println("댓글 삭제 성공");
			iDao.stepInit(comment_no, parent_comment_no, comment_level);
			model.addAttribute("msg", "댓글이 삭제됐습니다.");
			model.addAttribute("url", "/community/contentView?board_no=" + board_no);
			return "/community/alert";
		}
	}

	@PostMapping("/updateLike")
	public ResponseEntity<Map<String, Object>> updateLike(HttpServletRequest request, Model model) {
		System.out.println("updateLike");
		model.addAttribute("request", request);

		serviceInterface = new CUpdateLikeService(iDao);
		serviceInterface.execute(model);

		Map<String, Object> response = new HashMap<>();
		response.put("likes", model.getAttribute("likes"));
		response.put("likesCount", model.getAttribute("likesCount"));

		return ResponseEntity.ok(response); // JSON 형식으로 응답 반환
	}

	@RequestMapping("/myfeed/{mem_code}")
	public String myfeed(@PathVariable String mem_code, HttpSession session, HttpServletRequest request, Model model) {
		model.addAttribute("request", request);
		model.addAttribute("mem_code", mem_code);
		model.addAttribute("session", session);
		System.out.println(mem_code);

		serviceInterface = new CMyFeedService(iDao);
		serviceInterface.execute(model);

		
		
		return "/community/myfeed";
	}

	@PostMapping("/report")
	public  ResponseEntity<Map<String, String>> communityReport(@RequestBody CReportDto reportDto, Model model) {
		
	
		System.out.println("communityReport");
		
		model.addAttribute("board_no", reportDto.getBoard_no());
	    model.addAttribute("reporter_id", reportDto.getReporter_id());
	    model.addAttribute("reason", reportDto.getReason());
	    model.addAttribute("comment_no", reportDto.getComment_no());
	    model.addAttribute("report_type", reportDto.getReport_type());
	   
	    System.out.println("reportDto.getBoard_no() " + reportDto.getBoard_no());
	    System.out.println("reportDto.reporter_id() " + reportDto.getReporter_id());
	    System.out.println("reportDto.reason() " + reportDto.getReason());
	    System.out.println("reportDto.getComment_no() " + reportDto.getComment_no());
	  
	   
	    serviceInterface = new CReportService(iDao);
	    serviceInterface.execute(model);
	   
	    Map<String, String> response = new HashMap<>();
	    response.put("message", "신고가 제출되었습니다.");
	    return ResponseEntity.ok(response);
	    
	}

	
	@GetMapping("/addFriend/{mem_code}")
	public String addFriend(@PathVariable String mem_code, HttpSession session, HttpServletRequest request, Model model) {
	    System.out.println("addFriend()");
	    model.addAttribute("session", session);
	    model.addAttribute("request", request);
	    serviceInterface = new CFriendService(iDao);
	    serviceInterface.execute(model);
	    System.out.println("mem_code: " + mem_code);
	    
	    System.out.println("isFriendBool: " + model.getAttribute("isFriendBool")); // 디버깅용
	    return "redirect:/community/myfeed/" + mem_code;
	}
	
	
	
}