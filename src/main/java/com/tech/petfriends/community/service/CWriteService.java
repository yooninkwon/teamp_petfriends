package com.tech.petfriends.community.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.tech.petfriends.community.mapper.IDao;

public class CWriteService implements CServiceInterface {

	private IDao iDao;

	public CWriteService(IDao iDao) {
		this.iDao = iDao;
	}

	@Transactional
	@Override
	public void execute(Model model) {
		Map<String, Object> m = model.asMap();
		MultipartHttpServletRequest mtfRequest = (MultipartHttpServletRequest) m.get("request");

		String cname = mtfRequest.getParameter("user_id");
		String ctitle = mtfRequest.getParameter("board_title");
		String ccontent = mtfRequest.getParameter("board_content");
		int b_cate_no = Integer.parseInt(mtfRequest.getParameter("b_cate_no"));

		// 게시글 작성
		iDao.write(cname, ctitle, ccontent, b_cate_no);
// 
		// 방금 작성한 게시글의 id 가져오기
		int board_no = iDao.selBid();
		String workPath = System.getProperty("user.dir");
		String root = workPath + "\\src\\main\\resources\\static\\images\\community_img";
		System.out.println(System.getProperty("user.dir"));

		// 파일 업로드 처리 (일반 이미지)
		List<MultipartFile> fileList = mtfRequest.getFiles("file");
		String repImgOriginal = null; // 대표 이미지 원본 파일명
		String repImgChange = null; // 대표 이미지 변경 파일명

		// 대표 이미지 처리
		MultipartFile repFile = mtfRequest.getFile("repfile");
		if (repFile != null && !repFile.isEmpty()) {
			String originalRepFile = repFile.getOriginalFilename();
			long longtime = System.currentTimeMillis();
			repImgChange = longtime + "_" + originalRepFile;
			String pathRepFile = root + "\\" + repImgChange;

			try {
				repFile.transferTo(new File(pathRepFile));
				repImgOriginal = originalRepFile; // 대표 이미지 원본 파일명 저장
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException("Representative image upload failed", e);
			}
		}

		// 일반 이미지 업로드 처리
		for (MultipartFile mf : fileList) {
			String originalFile = mf.getOriginalFilename();
			System.out.println("original: " + originalFile);

			long longtime = System.currentTimeMillis();
			String changeFile = longtime + "_" + originalFile;
			String pathFile = root + "\\" + changeFile;

			try {
				if (!originalFile.isEmpty()) {
					mf.transferTo(new File(pathFile));
					System.out.println("다중업로드성공");
					// db에 기록
					iDao.imgWrite(board_no, originalFile, changeFile, repImgOriginal, repImgChange);
				}
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException("File upload failed", e);
			}
		}
	}
}