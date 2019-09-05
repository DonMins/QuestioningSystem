package com.ex.dao;

import com.ex.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User,Integer> {
    User findByUsername(String username);
}