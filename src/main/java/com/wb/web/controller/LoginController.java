package com.wb.web.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wb.web.service.UserService;

@RestController
public class LoginController {
	@Autowired
	UserService userService;
	
	@RequestMapping("/signin")
	public HashMap<String, String> login(){
		HashMap<String, String> resultMap = new HashMap<>();
		resultMap.put("result", "success");
		
		return resultMap;
	}
	
	@RequestMapping("/checkUsername")
	public HashMap<String, Object> checkUsername(@RequestParam("username")String username){
		HashMap<String, Object> resultMap = new HashMap<>();
		
		if(!username.isEmpty() || (username != null)) {
			resultMap = userService.checkUsername(username);
		}
		
		return resultMap;
	}
	
	@RequestMapping("/checkCreator")
	public HashMap<String, Object> checkCreator(@RequestParam("creatorCode")String creatorCode){
		HashMap<String, Object> resultMap = new HashMap<>();
		
		if(creatorCode.equals("create")) {
			resultMap.put("result", "success");
			resultMap.put("role","creator");
		}else {
			resultMap.put("result", "failed");
			resultMap.put("error", "Creator code is invalid.");
		}
		
		return resultMap;
	}
}
