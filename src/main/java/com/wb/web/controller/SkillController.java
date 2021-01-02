package com.wb.web.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wb.web.model.Skill;
import com.wb.web.service.SkillService;

@RestController
public class SkillController {
	@Autowired
	SkillService skillService;
	
	@RequestMapping("/getSkill")
	HashMap<String, Object> getSkillByName(@RequestParam("name") String name){
		return skillService.getSkillByName(name);
	}
	
	
	@RequestMapping("/getSkills")
	HashMap<String, Object> getSkills(){
		return skillService.getSkills();
	}
	
	@RequestMapping("/createSkill")
	HashMap<String, Object> newSkill(
			@RequestParam("name") String name, 
			@RequestParam("attribute") String attrib,
			@RequestParam("description") String desc,
			@RequestParam("skillType") String skillType,
			@RequestParam("damageType") String damageType){

		Skill skill = new Skill();
		skill.setName(name);
		skill.setDescription(desc);
		skill.setAttribute(attrib);
		skill.setSkillType(skillType);
		skill.setDamageType(damageType);
;
		return skillService.createSkill(skill);
	}
	
	@RequestMapping("/updateSkill")
	HashMap<String, Object> updateSkill(
			@RequestParam("skillId") long skillId, 
			@RequestParam("name") String name, 
			@RequestParam("attribute") String attrib,
			@RequestParam("description") String desc,
			@RequestParam("skillType") String skillType,
			@RequestParam("damageType") String damageType){

		Skill skill = new Skill();
		skill.setId(skillId);
		skill.setName(name);
		skill.setDescription(desc);
		skill.setAttribute(attrib);
		skill.setSkillType(skillType);
		skill.setDamageType(damageType);
;

		
		return skillService.updateSkill(skill);
	}
	
	@RequestMapping("/deleteSkill")
	HashMap<String,String> deleteSkill(@RequestParam("id") Long id){
		
		return skillService.deleteSkill(id);
	}
}
