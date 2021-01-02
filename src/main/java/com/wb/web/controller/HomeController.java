package com.wb.web.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wb.web.model.User;
import com.wb.web.model.UserWebmon;
import com.wb.web.service.UserService;
import com.wb.web.service.WebmonService;

@RestController
public class HomeController {
	@Autowired
	WebmonService webmonService;
	@Autowired
	UserService userService;
	
	@RequestMapping("/getUsers")
	HashMap<String,Object> getUsers(){
		return userService.getUsers();
	}
	
	@RequestMapping("/getUser")
	HashMap<String,Object> getUser(
			@RequestParam("userId")Long userId){
		return userService.getUser(userId);
	}
	
	@RequestMapping("/deleteUser")
	HashMap<String,Object> deleteUser(
			@RequestParam("userId")Long userId){
		return userService.deleteUser(userId);
	}
	
	@RequestMapping("/createUser")
	HashMap<String, Object> createUser(
			@RequestParam("name")String name,
			@RequestParam("email") String email){
		
		User user = new User();
		user.setName(name);
		user.setEmail(email);
		return userService.newUser(user);
	}
	
	@RequestMapping("/createUserWebmon")
	HashMap<String, Object> newUserWebmon(
			@RequestParam("webmonId")Long webmonId,
			@RequestParam("userId")Long userId,
			@RequestParam("name") String name){

		return userService.newUserWebmon(userId, webmonId, name);
	}
	
	@RequestMapping("/updateUserWebmon")
	HashMap<String, Object> updateUserWebmon(
			@RequestParam("userWebmonId")Long userWebmonId,
			@RequestParam("level")Long level,
			@RequestParam("name") String name){
		UserWebmon userWebmon = new UserWebmon();
		userWebmon.setId(userWebmonId);
		userWebmon.setLevel(level);
		userWebmon.setName(name);
		return userService.updateUserWebmon(userWebmon);
	}
	@RequestMapping("/deleteUserWebmon")
	HashMap<String, Object> deleteUserWebmon(
			@RequestParam("userId")Long userId,
			@RequestParam("userWebmonId")Long userWebmonId){

		return userService.deleteUserWebmon(userId, userWebmonId);
	}
	
}
