package com.wb.web.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.wb.web.model.User;
import com.wb.web.model.UserWebmon;
import com.wb.web.model.Webmon;
import com.wb.web.repository.SkillRepository;
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
	@Autowired
	SkillRepository skillRepository;
	
	
	public HashMap<String, Object> checkUsername(String userName){
		HashMap<String, Object> resultMap = new HashMap<>();
		
		try {
			User user = userRepository.findByUsername(userName);
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
			if(userRepository.existsByUsername(user.getUsername())) {
				resultMap.put("result", "failed");
				resultMap.put("error", "Username already exists.");
			}else {
				String encryptedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
				user.setPassword(encryptedPassword);
				userRepository.save(user);
				resultMap.put("result", "success");
			}
			
		} catch (Exception e) {
			resultMap.put("result","failed");
			resultMap.put("error", e.getMessage());
		}
		
		return resultMap;
	}
	
	public 	HashMap<String, Object> updateUser(User user){
		HashMap<String, Object> resultMap = new HashMap<>();
		try {
			Optional<User> currUser = userRepository.findById(user.getId());
			if(!currUser.isEmpty()) {
				userRepository.save(user);
				resultMap.put("result", "success");
			}else {
				resultMap.put("result", "success");
				resultMap.put("error", "User doesn't exist.");
			}
			
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
	
	public HashMap<String, Object> newUserWebmon(Long userId, Long webmonId, String name, Long level){
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
				newUsermon.setLevel(level);
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
	
	public 	HashMap<String, Object> getScaledUserWebmons(Long userId){
		HashMap<String,Object> resultMap = new HashMap<>();
		try {
			Optional<User> user = userRepository.findById(userId);
			if(!user.isEmpty()) {
				Collection<UserWebmon> userWebmons = user.get().getUserWebmon();
	
				if(!userWebmons.isEmpty()) {
					
					List scaledWebmons = new ArrayList();
					
					for (UserWebmon userWebmon : userWebmons) {
						HashMap<String,Object> tempResult = new HashMap<>();
						
						Long level = userWebmon.getLevel();
						int scale = (int) (level * 0.2 + 1);
						tempResult.put("id",userWebmon.getId());
						tempResult.put("name", userWebmon.getName());
						tempResult.put("level", userWebmon.getLevel());
						tempResult.put("webmon", userWebmon.getWebmon().getName());
						tempResult.put("webmonId", userWebmon.getWebmon().getWebmonId());
						tempResult.put("type", userWebmon.getWebmon().getType());
						tempResult.put("rating", userWebmon.getWebmon().getRating());
						tempResult.put("attribute", userWebmon.getWebmon().getAttribute());
						tempResult.put("attack", userWebmon.getWebmon().getAttack() * scale);
						tempResult.put("health", userWebmon.getWebmon().getHealth() * scale);
						tempResult.put("physicalDefense", userWebmon.getWebmon().getPhysicalDefense() * scale);
						tempResult.put("magicDefense", userWebmon.getWebmon().getMagicDefense() * scale);
						
						scaledWebmons.add(tempResult);
					}
					resultMap.put("result", "sucess");
					resultMap.put("scaledUserWebmons", scaledWebmons);
					
				}else {
					resultMap.put("result", "failed");
					resultMap.put("error", "User doesn't own any webmons");
				}
			}else {
				resultMap.put("result", "failed");
				resultMap.put("error", "User doesn't exist.");
			}
		} catch (Exception e) {
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
		}
		return resultMap;
	}
	
	public HashMap<String, Object> getEntitiesCounts(){
		HashMap<String, Object> resultMap = new HashMap<>();
		try {
			long usersCount = userRepository.count();
			long webmonsCount = webmonRepository.count();
			long skillsCount = skillRepository.count();
			
			resultMap.put("result", "success");
			resultMap.put("usersCount", usersCount);
			resultMap.put("webmonsCount", webmonsCount);
			resultMap.put("skillsCount", skillsCount);
		} catch (Exception e) {
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
		}
		
		return resultMap;
	}
	
}
