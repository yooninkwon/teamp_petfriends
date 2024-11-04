package com.tech.petfriends.notice.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tech.petfriends.notice.dao.NoticeDao;

@RestController
public class NoticeRestController {

	@Autowired
	private NoticeDao noticeDao;
	
	@DeleteMapping("/deleteNotice")
    public ResponseEntity<?> deleteNotice(@RequestParam("id") int noticeNo) {
        int deletedCount = noticeDao.deleteNotice(noticeNo); // 삭제된 행 개수 반환

        if (deletedCount > 0) {
            return ResponseEntity.ok("삭제되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 게시글이 존재하지 않습니다.");
        }
    }
	
	@PostMapping("/deleteSelectedNotices")
    public ResponseEntity<?> deleteSelectedNotices(@RequestBody Map<String, List<Long>> request) {
        List<Long> ids = request.get("ids");

        if (ids != null && !ids.isEmpty()) {
            noticeDao.deleteNoticesByIds(ids); // MyBatis 매퍼에서 다중 삭제 처리
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("유효하지 않은 요청입니다.");
        }
    }
	
	@PostMapping("/setVisibilityForNotices")
    public ResponseEntity<?> setVisibilityForNotices(@RequestBody Map<String, Object> request) {
        List<Long> ids = (List<Long>) request.get("ids");
        String visibility = (String) request.get("visibility");

        if (ids != null && !ids.isEmpty()) {
            boolean isVisible = "show".equals(visibility);
            noticeDao.updateVisibility(ids, isVisible); // MyBatis 매퍼에서 공개 여부 업데이트
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("유효하지 않은 요청입니다.");
        }
    }

}
