package com.wb.web.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.wb.web.model.UserWebmon;
import com.wb.web.model.Webmon;

public interface UserWebmonRepository extends JpaRepository<UserWebmon, Long>{
	List<UserWebmon> findByWebmon(Webmon webmon);
}
