package com.tech.petfriends.helppetf.service.interfaces;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;


public interface HelppetfExecuteRequest<T> {
	public ResponseEntity<T> execute(HttpServletRequest request);
}
