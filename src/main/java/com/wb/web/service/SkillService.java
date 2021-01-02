package com.wb.web.service;

import java.util.HashMap;

import com.wb.web.model.Skill;

public interface SkillService {
	HashMap<String, Object> getSkills();
	HashMap<String, Object> getSkillByName(String name);
	HashMap<String, String> deleteSkill(Long id);
	HashMap<String, Object> createSkill(Skill skill);
	HashMap<String, Object> updateSkill(Skill skill);
}
