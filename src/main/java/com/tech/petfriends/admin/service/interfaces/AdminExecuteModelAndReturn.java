package com.tech.petfriends.admin.service.interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;

public interface AdminExecuteModelAndReturn<T> {
	public ResponseEntity<T> execute(Model model);
}
