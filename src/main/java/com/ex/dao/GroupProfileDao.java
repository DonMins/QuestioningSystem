package com.ex.dao;

import com.ex.entity.GroupOfProfiles;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupProfileDao extends CrudRepository<GroupOfProfiles, Integer> {

    @Query(value = "SELECT IDGROUPOFPROFILES, TITLE FROM GroupOfProfiles", nativeQuery = true)
    List<GroupOfProfiles> findIdAndTitle();
    List<GroupOfProfiles> findAll();
}
