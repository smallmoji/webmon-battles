package com.wb.web.service;

import java.util.HashMap;

import com.wb.web.model.Webmon;


public interface WebmonService {
	HashMap<String, Object> getWebmons();
	HashMap<String, Object> getWebmonByName(String name);
	HashMap<String, String> deleteWebmon(Long id);
	HashMap<String, Object> createWebmon(Webmon webmon);
	HashMap<String, Object> updateWebmon(Webmon webmon);
	
}
