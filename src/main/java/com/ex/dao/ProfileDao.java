package com.ex.dao;

import com.ex.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileDao extends JpaRepository<Profile, Integer> {
    List<Profile> findAll();
}
