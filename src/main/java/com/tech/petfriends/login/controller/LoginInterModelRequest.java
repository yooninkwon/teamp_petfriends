package com.tech.petfriends.login.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

public interface LoginInterModelRequest {
	
	
	public void execute(Model model, HttpServletRequest request);
}
