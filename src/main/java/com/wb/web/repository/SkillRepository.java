package com.wb.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wb.web.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
	Skill findByName(String name);
}
