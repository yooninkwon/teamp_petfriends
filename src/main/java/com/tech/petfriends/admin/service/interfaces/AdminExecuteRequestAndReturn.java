package com.tech.petfriends.admin.service.interfaces;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;

public interface AdminExecuteRequestAndReturn<T> {
	public ResponseEntity<T> execute(HttpServletRequest request);
}
