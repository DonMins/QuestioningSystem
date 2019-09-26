package com.ex.dao;

import com.ex.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProfileDao extends JpaRepository<Profile, Integer> {

    @Query("select u from Profile u where u.groupOfProfiles.idgroupOfProfiles = :id")
    List<Profile> findByIdGroupProfiles(@Param("id")Integer id);


    @Modifying
    @Transactional
    @Query(value = "delete from Profile where idgroupProfile = :id", nativeQuery = true)
    void deleteByIdGroupProfile(@Param("id")Integer id);

    @Query(value = "select PROFILE_IDPROFILE from Question  where IDQUESTION = :id" ,nativeQuery = true)
    Integer findIdProfileByIdQuestion(@Param("id")Integer id);

    @Query("SELECT new com.ex.entity.Profile(d.idProfile, d.nameProfile, d.description, d.groupOfProfiles) from Profile d where d.idProfile=:id" )
    Profile findProfileByIdProfile (@Param("id")Integer id);

}

