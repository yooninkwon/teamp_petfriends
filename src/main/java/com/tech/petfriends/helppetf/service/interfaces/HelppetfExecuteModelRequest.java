package com.tech.petfriends.helppetf.service.interfaces;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;


public interface HelppetfExecuteModelRequest<T> {
	public ResponseEntity<T> execute(Model model, HttpServletRequest request);
}
