package com.ex.dao;

import com.ex.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfileDao extends JpaRepository<Profile, Integer> {

    @Query("select u from Profile u where u.groupOfProfiles.idgroupOfProfiles = :id")
    List<Profile> findByIdGroupProfiles(@Param("id")Integer id);

    @Query("select new com.ex.entity.Profile(idProfile.id, d.nameProfile) from Profile d where d.groupOfProfiles.idgroupOfProfiles = :id")
    List<Profile> findIdAndNameProfile(@Param("id")Integer id);

}

