package com.tech.petfriends.helppetf.service.interfaces;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;

import reactor.core.publisher.Mono;


public interface HelppetfExecuteMono<T> {
	public Mono<ResponseEntity<T>> execute(Model model, HttpServletRequest request);
}
