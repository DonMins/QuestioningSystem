package com.ex.dao;

import com.ex.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfileDao extends JpaRepository<Profile, Integer> {

    @Query(value = "SELECT IDPROFILE,NAMEPROFILE, DESCRIPTION FROM Profile where IDGROUPPROFILE =:id", nativeQuery = true)
    List<Profile> findByIdGroupProfiles(@Param("id") Integer id);

}
