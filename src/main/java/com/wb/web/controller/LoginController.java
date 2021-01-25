package com.wb.web.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wb.web.service.UserService;

@RestController
public class LoginController {
	@Autowired
	UserService userService;
	
	private final AuthenticationManager authenticationManager;
	
	public LoginController(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
	
	@RequestMapping(value = "/signin", method = RequestMethod.POST)
	public HashMap<String, Object> login(@RequestParam("username")String username, @RequestParam("password")String password, HttpSession session){
		HashMap<String, Object> resultMap = new HashMap<>();
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
		
		try {
			Authentication authentication = authenticationManager.authenticate(token);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
			return userService.checkUsername(username);
		} catch (Exception e) {
			resultMap.put("result", "failed");
			resultMap.put("error",e.getMessage());
		}
		return resultMap;
	}
	
	@RequestMapping("/checkLogin")
	public HashMap<String, Object> checkLogin(HttpServletRequest request, HttpServletResponse response, Principal principal) throws IOException, ServletException{
		HashMap<String, Object> resultMap = new HashMap<>();
		boolean isLogin = request.isUserInRole("ROLE_USER");

		if (isLogin) {
			resultMap.put("result", "success");
			resultMap.put("name", principal.getName());
		}else {
			resultMap.put("result", "failed");
		}

		return resultMap;
	}
	
	@RequestMapping("/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		if ( authentication != null ) {
			new SecurityContextLogoutHandler().logout(request, response, authentication);
		}
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
