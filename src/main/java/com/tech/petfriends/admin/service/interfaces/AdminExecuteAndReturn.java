package com.tech.petfriends.admin.service.interfaces;

import org.springframework.http.ResponseEntity;

public interface AdminExecuteAndReturn<T> {
	public ResponseEntity<T> execute();
}
