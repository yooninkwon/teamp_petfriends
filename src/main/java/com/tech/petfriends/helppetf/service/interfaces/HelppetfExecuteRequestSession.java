package com.tech.petfriends.helppetf.service.interfaces;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;

public interface HelppetfExecuteRequestSession<T> {
	public ResponseEntity<T> execute(HttpServletRequest request, HttpSession session);
}
