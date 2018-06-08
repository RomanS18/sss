package com.exapmle.repository;

import com.exapmle.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface User extends JpaRepository<com.exapmle.domain.User, Long> {
    abstract com.exapmle.domain.User findByUsername(String username);
}
