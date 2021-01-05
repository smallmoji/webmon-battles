package com.wb.web.service;

import java.util.HashMap;

import com.wb.web.model.User;
import com.wb.web.model.UserWebmon;


public interface UserService {
	HashMap<String, Object> checkUsername(String userName);
	
	HashMap<String,Object> getUsers();
	
	HashMap<String,Object> getUser(Long userId);
	
	HashMap<String,Object> newUser(User user);
	
	HashMap<String, Object> updateUser(User user);
	
	HashMap<String,Object> deleteUser(Long userId);
	
	HashMap<String,Object> deleteUserWebmon(Long userId, Long userWebmonId);
	
	HashMap<String, Object> newUserWebmon(Long userId, Long webmonId, String name, Long level);
	
	HashMap<String, Object> updateUserWebmon(UserWebmon userWebmon);
	
	HashMap<String, Object> getScaledUserWebmons(Long userId);
	
	HashMap<String, Object> getEntitiesCounts();
	
}
