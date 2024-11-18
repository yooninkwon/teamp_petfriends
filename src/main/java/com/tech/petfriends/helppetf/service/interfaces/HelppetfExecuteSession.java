package com.tech.petfriends.helppetf.service.interfaces;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;


public interface HelppetfExecuteSession<T> {
	public ResponseEntity<T> execute(HttpSession session);
}
