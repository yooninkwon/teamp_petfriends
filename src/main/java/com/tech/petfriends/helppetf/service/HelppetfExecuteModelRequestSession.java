package com.tech.petfriends.helppetf.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;

public interface HelppetfExecuteModelRequestSession {
	public void execute(Model model, HttpServletRequest request, HttpSession session);
}
