package com.tech.petfriends.community.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.tech.petfriends.community.mapper.IDao;

public class CWriteService implements CServiceInterface{

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
        iDao.write(cname, ctitle, ccontent);
        
        int board_no = iDao.selBid();
        String workPath = System.getProperty("user.dir");
        String root = workPath + "\\src\\main\\resources\\static\\images\\community_img";

        List<MultipartFile> fileList = mtfRequest.getFiles("file");
        for (MultipartFile mf : fileList) {
            String originalFile = mf.getOriginalFilename();
            System.out.println("original: " + originalFile);
            
            // 파일명 + 시간
            long longtime = System.currentTimeMillis();
            String changeFile = longtime + "_" + originalFile;

            System.out.println("changeFile: " + changeFile);
            
            // 경로 + 파일명
            String pathFile = root + "\\" + changeFile;
            
            try {
                if (!originalFile.isEmpty()) {
                    mf.transferTo(new File(pathFile));
                    System.out.println("다중업로드성공");
                    // db에 기록
                    iDao.imgWrite(board_no, originalFile, changeFile);
                }
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("File upload failed", e);
            }
        }
    }
}