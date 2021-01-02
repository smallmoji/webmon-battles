package com.wb.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wb.web.model.Webmon;

public interface WebmonRepository extends JpaRepository<Webmon, Long> {
	Webmon findByName(String name);
}
