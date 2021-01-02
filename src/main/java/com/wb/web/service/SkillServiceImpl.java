package com.wb.web.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.wb.web.model.Skill;
import com.wb.web.repository.SkillRepository;

@Component
public class SkillServiceImpl implements SkillService {
	@Autowired
	SkillRepository skillRepository;
	
	public HashMap<String, Object> getSkills(){
		HashMap<String,Object> resultMap = new HashMap<>();
		try {
			Collection<Skill> skills = skillRepository.findAll();
			if(!skills.isEmpty()) {
				resultMap.put("result", "sucess");
				resultMap.put("skills", skills);
				resultMap.put("count", skills.size());
			}else {
				resultMap.put("result", "failed");
				resultMap.put("error", "No skills exists.");
			}
		} catch (Exception e) {
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
		}
		return resultMap;
	}
	
	public HashMap<String, Object> getSkillByName(String name){
		HashMap<String,Object> resultMap = new HashMap<>();
		try {
			Skill skill = skillRepository.findByName(name);
			if(skill != null) {
				resultMap.put("result", "success");
				resultMap.put("skill", skill);
			}else {
				resultMap.put("result", "failed");
				resultMap.put("error", "Skill doesn't exist.");
			}
		} catch (Exception e) {
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
			resultMap.put("errorCause", e.getCause());
		}
		
		return resultMap;
	}
	
	public HashMap<String, String> deleteSkill(Long id){
		HashMap<String,String> resultMap = new HashMap<>();
		try {
			if(skillRepository.existsById(id)) {
				skillRepository.deleteById(id);
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
	
	public HashMap<String, Object> createSkill(Skill skill){
		HashMap<String,Object> resultMap = new HashMap<>();
		
		try {
			Skill searchSkill = skillRepository.findByName(skill.getName());
			
			if (searchSkill != null) {
				Skill newSkill = skillRepository.save(skill);
				resultMap.put("result", "success");
				resultMap.put("newSkill", newSkill);
			}else {
				resultMap.put("result", "failed");
				resultMap.put("error", "Skill already exists.");
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
			resultMap.put("errorCause", e.getCause());
		}
		
		return resultMap;
	};
	public HashMap<String, Object> updateSkill(Skill skill){
		HashMap<String,Object> resultMap = new HashMap<>();
		
		try {
			Optional<Skill> currSkill = skillRepository.findById(skill.getId());
			Skill searchSkill = skillRepository.findByName(skill.getName());
			
			if(!currSkill.isEmpty()) {
				if((searchSkill == null) || (currSkill.get().getId() == searchSkill.getId())) {
					currSkill.get().setName(skill.getName());
					currSkill.get().setAttribute(skill.getAttribute());
					currSkill.get().setDescription(skill.getDescription());
					currSkill.get().setSkillType(skill.getSkillType());
					currSkill.get().setDamageType(skill.getDamageType());
					
					skillRepository.save(currSkill.get());
					resultMap.put("result", "success");
					resultMap.put("updatedSkill", skillRepository.findById(currSkill.get().getId()));
				}else {
					resultMap.put("result", "failed");
					resultMap.put("error", "Skill name already exists.");
				}
				
			}else {
				resultMap.put("result","failed");
				resultMap.put("error", "Skill doesn't exist");
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("result", "failed");
			resultMap.put("error", e.getMessage());
		}
		
		return resultMap;
	};
}
