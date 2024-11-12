package com.tech.petfriends.admin.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

public interface AdminExecuteModelRequest {
	public void execute(HttpServletRequest request, Model model);
}
