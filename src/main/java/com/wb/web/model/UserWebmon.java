package com.wb.web.model;


import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties("user")
public class UserWebmon extends AuditModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private Long level;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Webmon webmon;
	
	@ManyToOne
	private User user;
	
	@OneToMany
	private Collection<Skill> skills;
	
	public UserWebmon() {
		
	}
	
	public UserWebmon(Long id, String name, Long level, Webmon webmon, Collection<Skill> skills) {
		super();
		this.id = id;
		this.name = name;
		this.level = level;
		this.webmon = webmon;
		this.skills = skills;
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

	public Long getLevel() {
		return level;
	}

	public void setLevel(Long level) {
		this.level = level;
	}

	public Webmon getWebmon() {
		return webmon;
	}

	public void setWebmon(Webmon webmon) {
		this.webmon = webmon;
	}
	
	public Collection<Skill> getSkills() {
		return skills;
	}

	public void setSkills(Collection<Skill> skills) {
		this.skills = skills;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
