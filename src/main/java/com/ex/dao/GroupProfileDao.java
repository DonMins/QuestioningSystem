package com.ex.dao;

import com.ex.entity.GroupOfProfiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupProfileDao extends JpaRepository<GroupOfProfiles, Integer> {

    @Query("SELECT new com.ex.entity.GroupOfProfiles(d.idgroupOfProfiles, d.title) from GroupOfProfiles d")
     List<GroupOfProfiles> findIdAndTitle();

    List<GroupOfProfiles> findAll();
}
