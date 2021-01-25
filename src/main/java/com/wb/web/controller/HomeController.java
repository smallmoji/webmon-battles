package com.wb.web.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wb.web.model.User;
import com.wb.web.model.UserWebmon;
import com.wb.web.model.properties.UserRoles;
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
			@RequestParam("email") String email,
			@RequestParam("username")String username,
			@RequestParam("password")String password,
			@RequestParam("confirmPassword")String confirmPassword){
		if(password.equals(confirmPassword)) {
			User user = new User();
			user.setUsername(username);
			user.setName(name);
			user.setEmail(email);
			user.setPassword(password);
			user.setRole(UserRoles.USER);
			user.setEnabled(1);
			
			return userService.newUser(user);
		}
		
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("result", "failed");
		resultMap.put("error", "Password and Confirm Password does not match.");
		return resultMap;
		
	}
	
	@RequestMapping("/updateUser")
	HashMap<String, Object> updateUser(
			@RequestParam("userId")Long id,
			@RequestParam("name")String name,
			@RequestParam("email") String email){
		
		User user = new User();
		user.setId(id);
		user.setName(name);
		user.setEmail(email);
		return userService.updateUser(user);
	}
	
	@RequestMapping("/createUserWebmon")
	HashMap<String, Object> newUserWebmon(
			@RequestParam("webmonId")Long webmonId,
			@RequestParam("userId")Long userId,
			@RequestParam("name") String name,
			@RequestParam("level")Long level){

		return userService.newUserWebmon(userId, webmonId, name, level);
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
	
	@RequestMapping("/getScaledUserWebmons")
	HashMap<String, Object> getScaledUserWebmons(
			@RequestParam("userId")Long userId){
		return userService.getScaledUserWebmons(userId);
	}
	
	@RequestMapping("getEntitiesCount")
	HashMap<String, Object> getEntitiesCounts(){
		return userService.getEntitiesCounts();
	}
	
	
}
