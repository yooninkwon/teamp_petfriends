package com.tech.petfriends.admin.service.interfaces;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;

public interface AdminExecuteModelRequestAndReturn<T> {
	public ResponseEntity<T> execute(Model model, HttpServletRequest request);
}
