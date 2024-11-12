package com.tech.petfriends.admin.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import com.tech.petfriends.notice.dao.NoticeDao;

@Service
public class AdminNoticeWriteService implements AdminExecuteModel {
	
    private final NoticeDao noticeDao;

    public AdminNoticeWriteService(NoticeDao noticeDao) {
        this.noticeDao = noticeDao;
    }

    @Override
    public void execute(Model model) {
        HttpServletRequest request = (HttpServletRequest) model.getAttribute("request");
        MultipartFile thumbnail = (MultipartFile) model.getAttribute("thumbnail");
        MultipartFile slideImg = (MultipartFile) model.getAttribute("slideImg");

        String category = request.getParameter("category");
        String show = request.getParameter("notice_show");
        String title = request.getParameter("notice_title");
        String content = request.getParameter("notice_content");

        Date startDate = null;
        Date endDate = null;
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

            // 날짜 값이 있는 경우에만 파싱
            String startDateStr = request.getParameter("startDate");
            String endDateStr = request.getParameter("endDate");

            if (startDateStr != null && !startDateStr.isEmpty()) {
                startDate = dateFormat.parse(startDateStr);
            }
            if (endDateStr != null && !endDateStr.isEmpty()) {
                endDate = dateFormat.parse(endDateStr);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        String thumbnailFileName = null;
        String slideImgFileName = null;

        if (!category.equals("공지사항")) { // 공지사항이 아닐 경우에만 이미지 저장
            String uploadDir = new File("src/main/resources/static/Images/").getAbsolutePath();

            try {
                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                // Thumbnail 이미지 저장
                if (!thumbnail.isEmpty()) {
                    thumbnailFileName = saveFile(thumbnail, new File(uploadDir + "/thumbnail"));
                }

                // Slide 이미지 저장
                if (!slideImg.isEmpty()) {
                    slideImgFileName = saveFile(slideImg, new File(uploadDir + "/slideImg"));
                }

                System.out.println("Thumbnail saved: " + thumbnailFileName);
                System.out.println("Slide image saved: " + slideImgFileName);

            } catch (IOException e) {
                e.printStackTrace();
                model.addAttribute("result", "파일 업로드 실패");
            }
        }

        if (category.equals("공지사항")) {
            noticeDao.noticeWrite(show, title, content);
        } else {
            noticeDao.eventWrite(show, title, content, startDate, endDate, thumbnailFileName, slideImgFileName);
        }
    }

    private String saveFile(MultipartFile file, File dir) throws IOException {
        if (!dir.exists()) dir.mkdirs();

        String fileName = file.getOriginalFilename();
        File saveFile = new File(dir, fileName);

        // 파일 이름 중복 체크
        int count = 1;
        String nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
        String ext = fileName.substring(fileName.lastIndexOf('.'));
        while (saveFile.exists()) {
            fileName = nameWithoutExt + "(" + count++ + ")" + ext;
            saveFile = new File(dir, fileName);
        }

        file.transferTo(saveFile);
        return fileName;
    }
}