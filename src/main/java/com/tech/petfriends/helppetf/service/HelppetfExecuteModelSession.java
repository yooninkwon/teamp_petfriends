package com.tech.petfriends.helppetf.service;

import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;


public interface HelppetfExecuteModelSession {
	public void execute(HttpSession session, Model model);
}
