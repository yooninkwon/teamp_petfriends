package com.tech.petfriends.helppetf.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;


public interface HelppetfExecuteModelRequest {
	public void execute(HttpServletRequest request, Model model);
}
