package com.ex.dao;

import com.ex.entity.GroupOfProfiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GroupProfileDao extends JpaRepository<GroupOfProfiles, Integer> {
    @Query("select idgroupOfProfiles  as idgroupOfProfiles , title as title from GroupOfProfiles")
    List<GroupOfProfiles> findIdAndTit();
    List<GroupOfProfiles> findAll();
}
