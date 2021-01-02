package com.wb.web.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wb.web.model.UserWebmon;
import com.wb.web.model.Webmon;
import com.wb.web.repository.UserRepository;
import com.wb.web.repository.UserWebmonRepository;
import com.wb.web.repository.WebmonRepository;

@Component
public class WebmonServiceImpl implements WebmonService {
	@Autowired
	WebmonRepository webmonRepository;
	@Autowired
	UserWebmonRepository userWebmonRepository;
	@Autowired
	UserRepository userRepository;
	
	public HashMap<String, Object> getWebmonByName(String name){
		HashMap<String,Object> resultMap = new HashMap<>();
		try {
			Webmon webmon = webmonRepository.findByName(name);
			if(webmon != null) {
				resultMap.put("result", "success");
				resultMap.put("webmon", webmon);
			}else {
				resultMap.put("result", "failed");
				resultMap.put("error", "Webmon doesn't exist.");
			}
		} catch (Exception e) {
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
			resultMap.put("errorCause", e.getCause());
		}
		
		return resultMap;
	}
	
	public HashMap<String, Object> getWebmons(){
		HashMap<String,Object> resultMap = new HashMap<>();
		try {
			Collection<Webmon> webmons = webmonRepository.findAll();
			if(!webmons.isEmpty()) {
				resultMap.put("result", "success");
				resultMap.put("webmons", webmons);
				resultMap.put("count", webmons.size());
			}else {
				resultMap.put("result", "failed");
				resultMap.put("error", "No existing webmons.");
			}
		} catch (Exception e) {
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	public HashMap<String, String> deleteWebmon(Long id){
		HashMap<String,String> resultMap = new HashMap<>();
		try {
			if(webmonRepository.existsById(id)) {
//				List<UserWebmon> uWebmons = userWebmonRepository.findByWebmon(webmonRepository.findById(id).get());
//				for (UserWebmon userWebmon : uWebmons) {
//					userWebmonRepository.delete(userWebmon);
//				}
				webmonRepository.deleteById(id);
				
				resultMap.put("result", "success");
			}else {
				resultMap.put("result", "failed");
				resultMap.put("error", "Webmon doesn't exist");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
		}
		return resultMap;
	}
	
	public HashMap<String, Object> createWebmon(Webmon webmon){
		HashMap<String,Object> resultMap = new HashMap<>();
		
		try {
			Webmon searchWebmon = webmonRepository.findByName(webmon.getName());
			
			if (searchWebmon == null) {
				Webmon newWebmon = webmonRepository.save(webmon);
				resultMap.put("result", "success");
				resultMap.put("newWebmon", newWebmon);
			}else {
				resultMap.put("result", "failed");
				resultMap.put("error", "Webmon already exists.");
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
			resultMap.put("errorCause", e.getCause());
		}
		
		return resultMap;
	}
	
	public HashMap<String, Object> updateWebmon(Webmon webmon){
		HashMap<String,Object> resultMap = new HashMap<>();
		
		try {
			Optional<Webmon> currWebmon = webmonRepository.findById(webmon.getWebmonId());
			Webmon searchWebmon = webmonRepository.findByName(webmon.getName());
			
			if(!currWebmon.isEmpty()) {
				if((searchWebmon == null) || (currWebmon.get().getWebmonId() == searchWebmon.getWebmonId())) {
					currWebmon.get().setAttack(webmon.getAttack());
					currWebmon.get().setAttribute(webmon.getAttribute());
					currWebmon.get().setType(webmon.getType());
					currWebmon.get().setHealth(webmon.getHealth());
					currWebmon.get().setName(webmon.getName());
					currWebmon.get().setRating(webmon.getRating());
					currWebmon.get().setPhysicalDefense(webmon.getPhysicalDefense());
					currWebmon.get().setMagicDefense(webmon.getMagicDefense());
					
					webmonRepository.save(currWebmon.get());
					resultMap.put("result", "success");
					resultMap.put("updatedWebmon", webmonRepository.findById(currWebmon.get().getWebmonId()));
				}else {
					resultMap.put("result", "failed");
					resultMap.put("error", "Webmon name already exists.");
				}
				
			}else {
				resultMap.put("result","failed");
				resultMap.put("error", "Webmon doesn't exist");
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
		}
		
		return resultMap;
	}
	
}
