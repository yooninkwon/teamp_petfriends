package com.tech.petfriends.admin.service.interfaces;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

public interface AdminExecuteModelRequest {
	public void execute(Model model, HttpServletRequest request);
}
