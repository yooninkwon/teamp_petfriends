package com.tech.petfriends.helppetf.service.interfaces;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;


public interface HelppetfExecuteModelSession<T> {
	public ResponseEntity<T> execute(Model model, HttpSession session);
}
