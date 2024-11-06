package com.tech.petfriends.admin.service;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import com.tech.petfriends.notice.dao.NoticeDao;
import com.tech.petfriends.notice.dto.EventDto;

@Service
public class AdminEventEditService implements AdminServiceInterface {

	private final NoticeDao noticeDao;

	public AdminEventEditService(NoticeDao noticeDao) {
		this.noticeDao = noticeDao;
	}

	public void execute(Model model) {
		try {
			HttpServletRequest request = (HttpServletRequest) model.getAttribute("request");
			MultipartFile thumbnail = (MultipartFile) model.getAttribute("thumbnail");
			MultipartFile slideImg = (MultipartFile) model.getAttribute("slideImg");

			int eventId = Integer.parseInt(request.getParameter("eventId"));
			String startDateStr = request.getParameter("startDate");
			String endDateStr = request.getParameter("endDate");
			String eventShow = request.getParameter("notice_show");
			String eventTitle = request.getParameter("notice_title");
			String eventContent = request.getParameter("notice_content");

			EventDto existingEvent = noticeDao.findEventById(eventId);

			String uploadDir = new File("src/main/resources/static/Images/").getAbsolutePath();
			String thumbnailName = (thumbnail != null && !thumbnail.isEmpty())
					? saveFile(thumbnail, new File(uploadDir, "thumbnail"))
					: existingEvent.getEvent_thumbnail(); // 파일이 없으면 기존 이미지 유지

			String slideImgName = (slideImg != null && !slideImg.isEmpty())
					? saveFile(slideImg, new File(uploadDir, "slideImg"))
					: existingEvent.getEvent_slideimg(); // 파일이 없으면 기존 이미지 유지

			// SimpleDateFormat을 사용하여 날짜 문자열을 Date 객체로 변환
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			java.util.Date utilStartDate = dateFormat.parse(startDateStr);
			java.util.Date utilEndDate = dateFormat.parse(endDateStr);

			// java.sql.Date로 변환
			Date startDate = new Date(utilStartDate.getTime());
			Date endDate = new Date(utilEndDate.getTime());

			EventDto event = new EventDto();
			event.setEvent_no(eventId);
			event.setEvent_startdate(startDate);
			event.setEvent_enddate(endDate);
			event.setEvent_thumbnail(thumbnailName);
			event.setEvent_slideimg(slideImgName);
			event.setEvent_show(eventShow);
			event.setEvent_title(eventTitle);
			event.setEvent_content(eventContent);

			noticeDao.updateEvent(event);
		} catch (Exception e) {
			e.printStackTrace();
			// 추가적인 예외 처리 로직 (예: 사용자에게 알림 등)
		}
	}

	private String saveFile(MultipartFile file, File dir) throws IOException {
		if (!dir.exists())
			dir.mkdirs();

		String fileName = file.getOriginalFilename();
		File saveFile = new File(dir, fileName);

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
