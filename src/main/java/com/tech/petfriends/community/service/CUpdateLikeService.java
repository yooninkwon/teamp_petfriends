package com.tech.petfriends.community.service;

import java.io.BufferedReader;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tech.petfriends.community.mapper.IDao;

public class CUpdateLikeService implements CServiceInterface {
	private IDao iDao;

	public CUpdateLikeService(IDao idao) {
		this.iDao = idao;
	}

	@Override
	public void execute(Model model) {
		Map<String, Object> m = model.asMap();
		HttpServletRequest request = (HttpServletRequest) m.get("request");
		
		// 파라미터 수집
	
		try {
	        // JSON 데이터를 직접 읽어들임
	        StringBuilder sb = new StringBuilder();
	        BufferedReader reader = request.getReader();
	        String line;
	        while ((line = reader.readLine()) != null) {
	            sb.append(line);
	        }

	        // JSON 문자열을 Map으로 변환
	        ObjectMapper mapper = new ObjectMapper();
	        Map<String, String> likeData = mapper.readValue(sb.toString(), Map.class);

	        // Map에서 필요한 값 추출
	        String boardNo = likeData.get("board_no");
	        String memNick = likeData.get("mem_nick");
	        String memCode = likeData.get("mem_code");

	        // 좋아요 여부 확인
	              
	        int likesCount = iDao.isLiked(boardNo, memCode); // int 타입으로 받아옴
	        boolean likes = (likesCount > 0); // 0보다 크면 true, 아니면 false
	   
	        // 좋아요 추가 또는 취소
	        if (likes) {	        
	            iDao.removeLike(boardNo, memNick, memCode); // 좋아요 취소
	            System.out.println("좋아요 제거");
	        } else {
	        
	            iDao.addLike(boardNo, memNick, memCode); // 좋아요 추가
	            System.out.println("좋아요 추가");
	           
//	            iDao.likeActivity(line, memNick, boardNo, memCode);
	            
	            
	        }
	        int updatedLikesCount = iDao.getLikesCount(boardNo); // 전체 좋아요 수를 가져옴
	        model.addAttribute("likesCount", updatedLikesCount); // 업데이트된 좋아요 수
	        model.addAttribute("likes", !likes); // 현재 좋아요 상태
	        
	        
	    } catch (Exception e) {
	        e.printStackTrace();
	        model.addAttribute("error", "좋아요 업데이트 중 오류가 발생했습니다."); // 오류 메시지 추가
	    }
	}
}