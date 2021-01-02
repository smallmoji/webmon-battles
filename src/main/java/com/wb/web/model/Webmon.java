package com.wb.web.model;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.OnDelete;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;


@Entity
@JsonIgnoreProperties("userWebmon")
public class Webmon extends AuditModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull
    @Column(unique = true)
	private String name;
	@NotNull
	private String rating;
	@NotNull
	private String type;
	@NotNull
	private String attribute;
	@NotNull
	private Long attack;
	@NotNull
	private Long health;
	@NotNull
	private Long physicalDefense;
	@NotNull
	private Long magicDefense;
	
	@OneToMany(
		    mappedBy = "webmon",
		    cascade = CascadeType.ALL,
		    orphanRemoval = true
		)
	private Collection<UserWebmon> userWebmon;
	
	public Webmon() {
		
	}
	
	public Webmon(Long id, String name, String rating, String type, String attribute, Long attack, Long health, Long physicalDefense,
			Long magicDefense) {
		super();
		this.id = id;
		this.name = name;
		this.rating = rating;
		this.type = type;
		this.attribute = attribute;
		this.attack = attack;
		this.health = health;
		this.physicalDefense = physicalDefense;
		this.magicDefense = magicDefense;
	}
	public Long getWebmonId() {
		return id;
	}
	public void setWebmonId(Long webmonId) {
		this.id = webmonId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRating() {
		return rating;
	}
	public void setRating(String rating) {
		this.rating = rating;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getAttribute() {
		return attribute;
	}
	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}
	public Long getAttack() {
		return attack;
	}
	public void setAttack(Long level) {
		this.attack = level;
	}
	public Long getHealth() {
		return health;
	}
	public void setHealth(Long health) {
		this.health = health;
	}
	public Long getPhysicalDefense() {
		return physicalDefense;
	}
	public void setPhysicalDefense(Long physicalDefense) {
		this.physicalDefense = physicalDefense;
	}
	public Long getMagicDefense() {
		return magicDefense;
	}
	public void setMagicDefense(Long magicDefense) {
		this.magicDefense = magicDefense;
	}
	
	public void addUserWebmon(UserWebmon uMon) {
		userWebmon.add(uMon);
		uMon.setWebmon(this);
	}

	public void removeUserwebmon(UserWebmon uMon) {
		userWebmon.remove(uMon);
		uMon.setWebmon(this);
	}
	
}
