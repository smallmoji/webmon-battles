package com.wb.web.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wb.web.model.User;
import com.wb.web.model.UserWebmon;
import com.wb.web.model.Webmon;
import com.wb.web.repository.UserRepository;
import com.wb.web.repository.UserWebmonRepository;
import com.wb.web.repository.WebmonRepository;

@Component
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	UserWebmonRepository userWebmonRepository;
	@Autowired
	WebmonRepository webmonRepository;
	
	public HashMap<String, Object> checkUsername(String userName){
		HashMap<String, Object> resultMap = new HashMap<>();
		
		try {
			User user = userRepository.findByName(userName);
			if(user != null) {
				resultMap.put("result", "success");
				resultMap.put("role","user");
				resultMap.put("user", user);
			}else {
				resultMap.put("result", "failed");
				resultMap.put("error", "Username doesn't exist");
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
		}
		
		return resultMap;
	}
	
	public HashMap<String,Object> getUsers(){
		HashMap<String, Object> resultMap = new HashMap<>();

		try {
			Collection<User> users = userRepository.findAll();
			if(!users.isEmpty()) {
				resultMap.put("result", "success");
				resultMap.put("users", users);
				resultMap.put("count", users.size());
			}else {
				resultMap.put("result","failed");
				resultMap.put("error", "There is no existing users.");
			}
		} catch (Exception e) {
			resultMap.put("result","failed");
			resultMap.put("error", e.getMessage());
		}
		
		
		
		return resultMap;
	}
	
	public HashMap<String,Object> getUser(Long userId){
		HashMap<String, Object> resultMap = new HashMap<>();
		try {
			Optional<User> user = userRepository.findById(userId);
			if(!user.isEmpty()) {
				resultMap.put("result", "success");
				resultMap.put("user", user);
			}else {
				resultMap.put("result","failed");
				resultMap.put("error", "User doesn't exist.");
			}
		} catch (Exception e) {
			resultMap.put("result","failed");
			resultMap.put("error", e.getMessage());
		}
		
		
		
		return resultMap;
	}
	public HashMap<String,Object> newUser(User user){
		HashMap<String, Object> resultMap = new HashMap<>();
		try {
			userRepository.save(user);
			resultMap.put("result", "success");
		} catch (Exception e) {
			resultMap.put("result","failed");
			resultMap.put("error", e.getMessage());
		}
		
		
		
		return resultMap;
	}
	
	public HashMap<String,Object> deleteUser(Long userId){
		HashMap<String, Object> resultMap = new HashMap<>();
		try {
			Optional<User> user = userRepository.findById(userId);
			if(!user.isEmpty()) {
				userRepository.deleteById(userId);
				resultMap.put("result", "success");

			}else {
				resultMap.put("result","failed");
				resultMap.put("error", "User doesn't exist.");
			}
		} catch (Exception e) {
			resultMap.put("result","failed");
			resultMap.put("error", e.getMessage());
		}
		
		return resultMap;
	}
	
	public HashMap<String,Object> deleteUserWebmon(Long userId, Long userWebmonId){
		HashMap<String, Object> resultMap = new HashMap<>();
		String errorMessage = "";
		
		try {
			Optional<User> user = userRepository.findById(userId);
			Optional<UserWebmon> userWebmon = userWebmonRepository.findById(userWebmonId);
			
			if(!user.isEmpty()) {
				if(!userWebmon.isEmpty()) {
//					user.get().removeUserwebmon(userWebmon.get());
					userWebmonRepository.delete(userWebmon.get());
					resultMap.put("result", "success");
//					Iterator<UserWebmon> userWebmons = user.get().getUserWebmon().iterator();
//					Boolean webmonExists = false;
//					
//					while(userWebmons.hasNext()) {
//						if(userWebmons.next().equals(userWebmon.get())) {
//							webmonExists = true;
//							userWebmons.remove();
//							userRepository.save(user.get());
//							break;
//						}else {
//							webmonExists = false;
//						}
//					}
					
//					if(webmonExists) {
//						resultMap.put("result", "success");
//					}else {
//						resultMap.put("result", "failed");
//						errorMessage = "User webmon doesn't exist.";
//					}
//					
					
				}else {
					resultMap.put("result","failed");
					errorMessage = "User webmon doesn't exist.";
				}
				
			}else {
				resultMap.put("result","failed");
				errorMessage = "User doesn't exist.";
			}
			
		} catch (Exception e) {
			resultMap.put("result","failed");
			errorMessage = e.getMessage();
		}
		
		if(!errorMessage.isEmpty()) {
			resultMap.put("error", errorMessage);
		}
		
		return resultMap;
	}
	
	public HashMap<String, Object> newUserWebmon(Long userId, Long webmonId, String name){
		HashMap<String,Object> resultMap = new HashMap<>();
		UserWebmon newUsermon = new UserWebmon();
		
		try {
			Optional<Webmon> webmon = webmonRepository.findById(webmonId);
			Optional<User> user = userRepository.findById(userId);
			
			if(webmon.isPresent()) {
				newUsermon.setWebmon(webmon.get());
				if(name.isEmpty() || (name == null)) {
					newUsermon.setName(webmon.get().getName());
				}else {
					newUsermon.setName(name);
				}
				newUsermon.setLevel((long) 1);
				UserWebmon savedUsermon = userWebmonRepository.save(newUsermon);
				
				if(userWebmonRepository.existsById(savedUsermon.getId())) {
					if(user.isPresent()) {
//						user.get().getUserWebmon().add(newUsermon);
//						user.get().getUserWebmon().add(savedUsermon);
						user.get().addUserWebmon(savedUsermon);
						User updatedUser = userRepository.save(user.get());
						
						resultMap.put("result", "success");
						resultMap.put("user", updatedUser);
//						resultMap.put("userWebmons", updatedUser.getUserWebmon());
						
					}else {
						resultMap.put("result", "failed");
						resultMap.put("error", "User doesn't exist");
					}
				};
				
				
				
			}else {
				resultMap.put("result", "failed");
				resultMap.put("error", "Webmon doesn't exist");
			}
			
		} catch (Exception e) {
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
		}
		
		return resultMap;
	}
	
	public HashMap<String, Object> updateUserWebmon(UserWebmon userWebmon){
		HashMap<String,Object> resultMap = new HashMap<>();
		try {
			Optional<UserWebmon> userMon = userWebmonRepository.findById(userWebmon.getId());
			if(!userMon.isEmpty()) {
				userMon.get().setName(userWebmon.getName());
				userMon.get().setLevel(userWebmon.getLevel());
				userWebmonRepository.save(userMon.get());
				resultMap.put("result", "success");
				resultMap.put("updatedUserWebmon", userWebmonRepository.findById(userMon.get().getId()));
			}else {
				resultMap.put("result", "failed");
				resultMap.put("error", "User webmon doesn't exist.");
			}
		} catch (Exception e) {
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
		}
		
		return resultMap;
	}
	
	
}
