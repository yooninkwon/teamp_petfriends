package com.tech.petfriends.helppetf.service.interfaces;

import org.springframework.http.ResponseEntity;


public interface HelppetfExecute<T> {
	public ResponseEntity<T> execute();
}
