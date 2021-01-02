package com.wb.web.model;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;

import com.sun.istack.NotNull;


@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	
	@Email
	@NotNull
	private String email;
	
	@OneToMany(
	    mappedBy = "user",
	    cascade = CascadeType.ALL
	   // orphanRemoval = true
	)
	private Collection<UserWebmon> userWebmon;
	
	public User() {
		
	}

	public User(Long id, String name, String email, Collection<UserWebmon> userWebmon) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.userWebmon = userWebmon;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Collection<UserWebmon> getUserWebmon() {
		return userWebmon;
	}

	public void setUserWebmon(Collection<UserWebmon> userWebmon) {
		this.userWebmon = userWebmon;
	}
	
	public void addUserWebmon(UserWebmon uMon) {
		userWebmon.add(uMon);
		uMon.setUser(this);
	}

	public void removeUserwebmon(UserWebmon uMon) {
		userWebmon.remove(uMon);
		uMon.setUser(null);
	}
	
}
