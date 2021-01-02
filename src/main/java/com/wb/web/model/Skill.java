package com.wb.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.sun.istack.NotNull;

@Entity
public class Skill extends AuditModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull
    @Column(unique = true)
	private String name;
	private String description;
	private String damageType;
	private String attribute;
	private String skillType;
	
	public Skill() {
		
	}

	public Skill(Long id, String name, String description, String damageType, String attribute, String skillType) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.damageType = damageType;
		this.attribute = attribute;
		this.skillType = skillType;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDamageType() {
		return damageType;
	}
	public void setDamageType(String damageType) {
		this.damageType = damageType;
	}
	public String getAttribute() {
		return attribute;
	}
	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}
	public String getSkillType() {
		return skillType;
	}
	public void setSkillType(String skillType) {
		this.skillType = skillType;
	}
	
	
}
