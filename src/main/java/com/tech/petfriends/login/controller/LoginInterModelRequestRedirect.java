package com.tech.petfriends.login.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

public interface LoginInterModelRequestRedirect {
	

	public void execute(Model model, HttpServletRequest request, RedirectAttributes rs);
}
