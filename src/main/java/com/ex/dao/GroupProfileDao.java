package com.ex.dao;

import com.ex.entity.GroupOfProfiles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupProfileDao extends JpaRepository<GroupOfProfiles, Integer> {
    List<GroupOfProfiles> findAll();
}
