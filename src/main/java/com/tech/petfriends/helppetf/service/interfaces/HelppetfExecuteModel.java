package com.tech.petfriends.helppetf.service.interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;


public interface HelppetfExecuteModel<T> {
	public ResponseEntity<T> execute(Model model);
}
