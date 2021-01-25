package com.wb.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wb.web.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByName(String name);
	User findByUsername(String username);
	Boolean existsByUsername(String username);
}
